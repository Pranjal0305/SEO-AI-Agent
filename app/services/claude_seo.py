import re
import json
from groq import AsyncGroq
from app.config import settings

MODEL = "llama-3.3-70b-versatile"
TEMPERATURE = 0.3
MAX_TOKENS = 1024

PROMPTS = {
    "audit": """You are an expert SEO analyst. Perform a comprehensive technical SEO audit for the following URL.
Analyze on-page SEO factors, technical issues, content quality, and performance signals.
URL: {url}

Respond ONLY with valid JSON, no markdown, no explanation, no code blocks.
The JSON must follow this exact format:
{{"score": <integer 0-100>, "issues": [<list of specific SEO issues found>], "recommendations": [<list of actionable recommendations>]}}""",

    "geo": """You are an expert in Local SEO and Geographic targeting. Analyze the following URL for geo-targeted SEO opportunities and issues.
Focus on: local keyword targeting, Google Business Profile signals, NAP consistency, local backlinks, geo-specific content, schema markup for local SEO.
URL: {url}

Respond ONLY with valid JSON, no markdown, no explanation, no code blocks.
The JSON must follow this exact format:
{{"score": <integer 0-100>, "issues": [<list of geo/local SEO issues>], "recommendations": [<list of geo/local SEO recommendations>]}}""",

    "competitor": """You are an expert competitive SEO strategist. Analyze the following URL from a competitive SEO standpoint.
Evaluate: keyword gaps likely present, backlink profile weaknesses, content differentiation opportunities, SERP feature opportunities, competitive positioning, domain authority signals.
URL: {url}

Respond ONLY with valid JSON, no markdown, no explanation, no code blocks.
The JSON must follow this exact format:
{{"score": <integer 0-100>, "issues": [<list of competitive SEO weaknesses>], "recommendations": [<list of competitive SEO strategies>]}}""",

    "cluster": """You are an expert in SEO content strategy and topic clustering. Analyze the following URL for content cluster and topical authority opportunities.
Focus on: pillar page potential, topic coverage gaps, internal linking structure, content silos, semantic SEO, entity coverage, topical authority signals.
URL: {url}

Respond ONLY with valid JSON, no markdown, no explanation, no code blocks.
The JSON must follow this exact format:
{{"score": <integer 0-100>, "issues": [<list of content cluster / topical authority issues>], "recommendations": [<list of content cluster strategies and topic ideas>]}}""",
}

async def run_seo_analysis(url: str, mode: str) -> dict:
    if mode not in PROMPTS:
        mode = "audit"

    prompt = PROMPTS[mode].format(url=url)

    client = AsyncGroq(api_key=settings.GROQ_API_KEY)

    chat_completion = await client.chat.completions.create(
        model=MODEL,
        temperature=TEMPERATURE,
        max_tokens=MAX_TOKENS,
        messages=[
            {
                "role": "system",
                "content": "You are an SEO expert AI agent. Always respond with valid JSON only. No markdown formatting, no code blocks, no extra text.",
            },
            {
                "role": "user",
                "content": prompt,
            },
        ],
    )

    raw_text = chat_completion.choices[0].message.content.strip()

    # Extract JSON using regex in case model adds any extra text
    match = re.search(r"\{.*\}", raw_text, re.DOTALL)
    if not match:
        raise ValueError(f"No valid JSON found in Groq response: {raw_text[:200]}")

    parsed = json.loads(match.group())

    # Validate and sanitize fields
    score = int(parsed.get("score", 50))
    score = max(0, min(100, score))
    issues = parsed.get("issues", [])
    recommendations = parsed.get("recommendations", [])

    if not isinstance(issues, list):
        issues = [str(issues)]
    if not isinstance(recommendations, list):
        recommendations = [str(recommendations)]

    return {
        "score": score,
        "issues": issues[:15],
        "recommendations": recommendations[:15],
    }
