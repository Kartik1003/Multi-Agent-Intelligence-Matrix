# agents/budget_agent.py — Multi-Modal Budget Agent
# Estimates travel costs across Car, Bus, and Flight modes.

def run(distance_km: float, eta_minutes: int = 0, weather: dict = None) -> dict:
    """
    Computes multi-modal travel budget and provides a tactical recommendation.
    
    Args:
        distance_km : Total route distance
        eta_minutes : Estimated time (optional)
        weather     : Weather risk context (optional)
    """
    if distance_km <= 0:
        return {
            "car_travel": {"fuel_required_liters": 0, "cost": 0},
            "bus_travel": {"estimated_cost": 0},
            "flight_travel": {"estimated_cost": "N/A"},
            "recommended_option": "N/A",
            "reasoning": "Distance is invalid."
        }

    # 1. CAR TRAVEL (Fuel-Based)
    fuel_efficiency = 15.0 # km/l
    fuel_price = 100.0     # INR/l
    fuel_req = round(distance_km / fuel_efficiency, 2)
    car_cost = int(fuel_req * fuel_price)

    # 2. PUBLIC TRANSPORT (Bus/Train)
    bus_cost_per_km = 1.5
    bus_cost = int(distance_km * bus_cost_per_km)

    # 3. FLIGHT ESTIMATION
    if distance_km > 400:
        flight_cost = int(3000 + (distance_km * 5))
    else:
        flight_cost = "Not recommended"

    # 4. INTELLIGENT DECISION LOGIC
    risk = (weather or {}).get("risk_level", "LOW")
    
    if risk == "HIGH":
        # Strategy: Avoid long road travel if possible
        if distance_km > 400 and isinstance(flight_cost, int):
            recommendation = "Flight"
            reasoning = "High weather risk detected. Aerial transit recommended to avoid ground hazards."
        else:
            recommendation = "Bus" # Assume bus is slightly safer than private car in storm?
            reasoning = "High weather risk. Professional transit recommended over private driving."
    else:
        if distance_km < 200:
            recommendation = "Car"
            reasoning = "Short distance; private transit offers maximum flexibility."
        elif 200 <= distance_km <= 500:
            recommendation = "Bus"
            reasoning = "Mid-range distance; cost-effective public transit recommended."
        else:
            recommendation = "Flight"
            reasoning = "Long distance; flight is the most efficient transit mode."

    # Return structured output
    # For backward compatibility with existing UI, we'll keep total_estimated_cost 
    # as the recommended option's cost.
    rec_cost = car_cost
    if recommendation == "Bus": rec_cost = bus_cost
    if recommendation == "Flight" and isinstance(flight_cost, int): rec_cost = flight_cost

    return {
        "car_travel": {
            "fuel_required_liters": fuel_req,
            "cost": car_cost
        },
        "bus_travel": {
            "estimated_cost": bus_cost
        },
        "flight_travel": {
            "estimated_cost": flight_cost
        },
        "recommended_option": recommendation,
        "reasoning": reasoning,
        # Legacy fields for existing dashboard components
        "fuel_cost_inr": car_cost,
        "total_estimated_cost": rec_cost
    }
