# orchestrator.py — Central Pipeline Coordinator
#
# Controls the sequential execution of all agents:
#   1. Route Agent    → computes distance, ETA, navigation steps
#   2. Weather Agent  → evaluates atmospheric risk along the route
#   3. Budget Agent   → estimates fuel and total operational cost
#   4. Summary Agent  → synthesises all outputs into a structured plan
#
# Design Rules:
#   - Each agent call is wrapped in try/except → no silent failures
#   - If an agent fails, a structured error payload is injected & pipeline continues
#   - Final output always returns a clean, consistent JSON shape

import traceback
from agents import route_agent, weather_agent, budget_agent, summary_agent


def _safe_run(agent_name: str, fn, *args, **kwargs):
    """
    Execute an agent function safely.
    On success → returns (True, result)
    On failure → logs error, returns (False, error_payload)
    Never raises — ensures the pipeline never silently dies.
    """
    try:
        result = fn(*args, **kwargs)
        if result is None:
            raise ValueError(f"{agent_name} returned None unexpectedly.")
        print(f"  [✓] {agent_name} completed successfully.")
        return True, result
    except Exception as exc:
        error_msg = f"{agent_name} FAILED: {str(exc)}"
        print(f"  [✗] {error_msg}")
        traceback.print_exc()
        return False, {
            "error":   error_msg,
            "agent":   agent_name,
            "status":  "failed"
        }


def run_orchestrator(source: str, destination: str, time: str) -> dict:
    """
    Master pipeline function. Runs all agents in strict sequential order
    and returns the fully structured combined response.

    Args:
        source      : Origin city / location
        destination : Destination city / location
        time        : Departure time string (e.g. "08:30" or "Monday 9 AM")

    Returns:
        {
            "route":       { ... },
            "weather":     { ... },
            "budget":      { ... },
            "final_plan":  { ... }
        }
    """
    print(f"\n{'='*60}")
    print(f"  ORCHESTRATOR STARTED")
    print(f"  Route  : {source} → {destination}")
    print(f"  Time   : {time}")
    print(f"{'='*60}")

    # ── STEP 1: Route Agent ────────────────────────────────────
    print("\n[STEP 1] Calling Route Agent...")
    route_ok, route = _safe_run("Route Agent", route_agent.route_agent, source, destination)

    # Fallback route data to allow pipeline continuation if route agent fails
    if not route_ok:
        route = {
            "distance_km":       0,
            "eta_minutes":       0,
            "main_route":        "Unavailable",
            "steps":             ["Route data could not be retrieved."],
            "alternative_route": "N/A",
            "error":             route.get("error", "Unknown error")
        }
    
    # ── STEP 2: Weather Agent (uses route context) ─────────────
    print("\n[STEP 2] Calling Weather Agent...")
    weather_ok, weather = _safe_run("Weather Agent", weather_agent.weather_agent, source, destination, time)

    if not weather_ok:
        weather = {
            "weather_summary": "Weather data unavailable — proceed with standard caution.",
            "risk_level":      "UNKNOWN",
            "hazards":         ["Data retrieval failure"],
            "recommendation":  "Check local weather services before departure.",
            "error":           weather.get("error", "Unknown error")
        }

    # If weather agent reports HIGH risk, we could inject logic here
    if weather.get("risk_level") == "HIGH":
        print(" [!] HIGH RISK DETECTED — Proceeding with caution protocols.")

    # ── STEP 3: Budget Agent (uses distance and weather context) ──
    print("\n[STEP 3] Calling Budget Agent...")
    distance = route.get("distance_km", 0)
    eta      = route.get("eta_minutes", 0)
    budget_ok, budget = _safe_run("Budget Agent", budget_agent.run, distance, eta, weather)

    if not budget_ok:
        budget = {
            "fuel_required_liters":   0.0,
            "fuel_cost_inr":          0,
            "operational_buffer_inr": 0,
            "total_estimated_cost":   0,
            "error":                  budget.get("error", "Unknown error")
        }

    # ── STEP 4: Summary Agent (receives all three outputs) ─────
    print("\n[STEP 4] Calling Summary Agent...")
    summary_ok, final_plan = _safe_run(
        "Summary Agent",
        summary_agent.summary_agent,
        route, weather, budget
    )

    if not summary_ok:
        final_plan = {
            "final_plan": [
                "Summary generation failed. Please review individual agent outputs.",
                f"Route: {route.get('main_route', 'N/A')}",
                f"Weather Risk: {weather.get('risk_level', 'N/A')}",
                f"Estimated Budget: ₹{budget.get('total_estimated_cost', 0):,}"
            ],
            "warnings": [
                "Summary Agent encountered an error.",
                "Partial data is available — manual review recommended."
            ],
            "summary": "Partial orchestration — Summary Agent failed. Review sub-agent outputs."
        }

    # ── PIPELINE COMPLETE ──────────────────────────────────────
    all_ok = all([route_ok, weather_ok, budget_ok, summary_ok])
    status = "success" if all_ok else "partial_success"

    print(f"\n{'='*60}")
    print(f"  ORCHESTRATOR COMPLETE — Status: {status.upper()}")
    print(f"{'='*60}\n")

    return {
        "status":     status,
        "source":     source,
        "destination": destination,
        "travel_time": time,
        "route":      route,
        "weather":    weather,
        "budget":     budget,
        "final_plan": final_plan
    }
