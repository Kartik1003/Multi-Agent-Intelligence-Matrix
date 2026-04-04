# main.py — Entry point for the Multi-Agent Pursuit Planning AI System
# Run with: uvicorn main:app --reload

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from orchestrator import run_orchestrator

app = FastAPI(
    title="Multi-Agent Pursuit Planning AI System",
    description="Coordinates Weather, Route, Budget & Summary agents to generate a complete travel plan.",
    version="1.0.0"
)

# Allow frontend (HTML/JS) to call this API from any origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Input Schema ──────────────────────────────────────────────
class PlanRequest(BaseModel):
    source: str
    destination: str
    time: str  # e.g. "08:00" or "Tomorrow 9 AM"

# ── Health Check ──────────────────────────────────────────────
@app.get("/", tags=["Health"])
def root():
    return {"status": "online", "system": "Multi-Agent Pursuit Planning AI"}

# ── Main Endpoint ─────────────────────────────────────────────
@app.post("/generate-plan", tags=["Orchestrator"])
def generate_plan(request: PlanRequest):
    """
    Orchestrates all agents sequentially:
      1. Route Agent  → distance, ETA, steps
      2. Weather Agent → risk level, hazards
      3. Budget Agent  → fuel cost
      4. Summary Agent → final plan, warnings, summary
    Returns structured JSON output.
    """
    if not request.source.strip() or not request.destination.strip():
        raise HTTPException(status_code=400, detail="Source and destination must not be empty.")

    result = run_orchestrator(
        source=request.source.strip(),
        destination=request.destination.strip(),
        time=request.time.strip()
    )
    return result
