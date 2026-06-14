import json, re, random, asyncio

DEMO_DATA = {
    "audit": {
        "score": 74,
        "issues": ["Missing meta description", "3 pages have duplicate title tags", "Images missing alt text", "No structured data markup", "Page load time > 3s on mobile"],
        "recommendations": ["Write unique meta descriptions under 160 chars", "Fix duplicate titles on key pages", "Add descriptive alt text to all images", "Implement schema markup", "Compress images and enable lazy loading"]
    },
    "geo": {
        "score": 61,
        "issues": ["No FAQ schema markup", "Content not in Q&A format", "Missing author E-E-A-T signals", "No topical authority", "Thin content on landing pages"],
        "recommendations": ["Add FAQPage schema", "Rewrite content in Q&A format", "Add author bios with credentials", "Create topic cluster content", "Expand thin pages to 1000+ words"]
    },
    "competitor": {
        "score": 55,
        "issues": ["Low domain authority vs competitors", "Missing 340+ competitor keywords", "Backlink gap: 1.2k vs 8.4k", "No featured snippet presence", "Competitor content 3x longer"],
        "recommendations": ["Target long-tail keywords", "Build backlinks via guest posts", "Create comprehensive guides", "Expand content on top pages", "Implement topic cluster strategy"]
    },
    "cluster": {
        "score": 68,
        "issues": ["No pillar page structure", "Keyword cannibalization on 8 pages", "Supporting content too thin", "Internal linking missing", "No topical hierarchy in URLs"],
        "recommendations": ["Create 3 pillar pages", "Consolidate overlapping content", "Expand articles to 800-1200 words", "Add internal links between cluster pages", "Restructure URLs for topic hierarchy"]
    }
}

from app.config import settings
from app.services.claude_seo import run_seo_analysis
import logging

logger = logging.getLogger("uvicorn")

async def run_seo_agent(url: str, mode: str = "audit") -> dict:
    if settings.GROQ_API_KEY:
        try:
            logger.info(f"Running real Groq SEO analysis for {url} in mode {mode}")
            return await run_seo_analysis(url, mode)
        except Exception as e:
            logger.error(f"Groq SEO analysis failed: {e}. Falling back to demo data.")
    
    logger.info(f"Running mock SEO analysis for {url} in mode {mode}")
    await asyncio.sleep(2)
    data = DEMO_DATA.get(mode, DEMO_DATA["audit"]).copy()
    data["score"] = min(100, max(0, data["score"] + random.randint(-5, 5)))
    return data