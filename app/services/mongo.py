from datetime import datetime

# In-memory storage - no MongoDB needed!
audits_store = []

async def save_audit(data: dict):
    import uuid
    audit_id = str(uuid.uuid4())
    data["_id"] = audit_id
    audits_store.append(data)
    return audit_id

async def get_all_audits(url: str = None):
    if url:
        return [a for a in audits_store if a.get("url") == url]
    return list(reversed(audits_store))[-20:]