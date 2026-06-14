from fastapi import APIRouter
from app.models.audit import AuditRequest
from app.services.groq_seo import run_seo_agent
from app.services.mongo import save_audit, get_all_audits
from datetime import datetime

router = APIRouter(prefix="/api/audit", tags=["Audit"])

@router.post("/")
async def create_audit(req: AuditRequest):
    result = await run_seo_agent(req.url, req.mode)
    doc = {
        "url": req.url,
        "mode": req.mode,
        "score": result.get("score"),
        "issues": result.get("issues", []),
        "recommendations": result.get("recommendations", []),
        "created_at": datetime.utcnow().isoformat(),
    }
    audit_id = await save_audit(doc)
    return {
        "id": audit_id,
        "url": doc["url"],
        "mode": doc["mode"],
        "score": doc["score"],
        "issues": doc["issues"],
        "recommendations": doc["recommendations"],
        "created_at": doc["created_at"],
    }

@router.get("/history")
async def audit_history(url: str = None):
    return await get_all_audits(url)