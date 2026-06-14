from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes.audit import router as audit_router
from app.routes.reports import router as reports_router

app = FastAPI(title="SEO AI Agent", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(audit_router)
app.include_router(reports_router)

@app.get("/")
def root():
    return {"status": "SEO AI Agent Running"}