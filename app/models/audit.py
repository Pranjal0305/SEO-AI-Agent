from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class AuditRequest(BaseModel):
    url: str
    mode: str = "audit"

class AuditResult(BaseModel):
    url: str
    mode: str
    score: Optional[int] = None
    issues: Optional[List[str]] = []
    recommendations: Optional[List[str]] = []
    created_at: datetime = datetime.utcnow()