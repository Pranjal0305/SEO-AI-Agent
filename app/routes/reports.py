from fastapi import APIRouter, HTTPException
from app.services.mongo import get_all_audits

router = APIRouter(prefix="/api/reports", tags=["Reports"])

@router.get("/")
async def get_reports():
    """
    Returns aggregated report statistics from all past audits.
    """
    try:
        audits = await get_all_audits()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch reports: {str(e)}")

    if not audits:
        return {
            "total_audits": 0,
            "average_score": 0,
            "mode_breakdown": {},
            "score_distribution": {"good": 0, "average": 0, "poor": 0},
            "recent_audits": [],
        }

    total = len(audits)
    avg_score = round(sum(a["score"] for a in audits) / total, 1)

    mode_breakdown = {}
    score_distribution = {"good": 0, "average": 0, "poor": 0}

    for audit in audits:
        mode = audit.get("mode", "audit")
        mode_breakdown[mode] = mode_breakdown.get(mode, 0) + 1

        score = audit.get("score", 0)
        if score >= 70:
            score_distribution["good"] += 1
        elif score >= 40:
            score_distribution["average"] += 1
        else:
            score_distribution["poor"] += 1

    return {
        "total_audits": total,
        "average_score": avg_score,
        "mode_breakdown": mode_breakdown,
        "score_distribution": score_distribution,
        "recent_audits": audits[:5],
    }
