import random

# agents/summary_agent.py — Premium Intelligence Synthesizer
# Generates stops, hotels, exploration data, and human-friendly itineraries.

def summary_agent(route, weather, budget):
    """
    Advanced agent that generates a multi-dimensional travel brief.
    Includes Smart Stops, Hotels, Exploration, and Itinerary logic.
    """
    dist   = route.get("distance_km", 0)
    risk   = (weather or {}).get("risk_level", "LOW")
    w_summ = (weather or {}).get("weather_summary", "Clear conditions")
    mode   = (budget or {}).get("recommended_option", "Car")

    # 1. 🛑 SMART STOPS DETECTION
    stops = []
    if dist > 300:
        # Heuristic: One stop per 300km roughly
        num_stops = int(dist // 300)
        for i in range(num_stops):
            stop_dist = (i + 1) * 280 + random.randint(-20, 20)
            if stop_dist < dist:
                stops.append({
                    "location": f"Waypoint-{i+1} (Refuel & Rest)",
                    "reason":   "Strategic stop for fuel and fatigue management.",
                    "distance_from_origin": stop_dist,
                    "hotels":   _get_mock_hotels(f"Waypoint-{i+1}"),
                    "explore":  _get_mock_explore(f"Waypoint-{i+1}")
                })
    
    if risk == "HIGH":
        stops.insert(0, {
            "location": "Early Safety Hub",
            "reason":   f"Emergency weather stop due to {w_summ}.",
            "distance_from_origin": min(100, dist // 4),
            "hotels":   _get_mock_hotels("Safety Zone"),
            "explore":  {"food": ["Comfort Food Hub"], "places": ["Safe Haven Shelter"]}
        })

    # 2. 🗺️ ENHANCED ITINERARY
    itinerary = []
    days = 1
    if dist > 600: days = round(dist / 500) + 1
    
    for d in range(1, days + 1):
        day_brief = f"Day {d}: "
        if d == 1:
            day_brief += f"Initialize deployment via {mode}. "
            if stops:
                day_brief += f"Stop at {stops[0]['location']} for {stops[0]['reason']}. "
                day_brief += f"Activity: Explore {stops[0]['explore']['food'][0]}."
            else:
                day_brief += "Direct non-stop transit to objective."
        elif d == days:
            day_brief += f"Final approach. Arrive at destination after {dist} km total coverage. Debrief protocols active."
        else:
            day_brief += f"Strategic resumption of transit. Maintain waypoint tracking and atmospheric monitoring."
        
        itinerary.append(day_brief)

    # 3. 🏨 DESTINATION HOTELS
    dest_hotels = _get_mock_hotels("Destination Peak")

    # 4. 🍽️ DESTINATION EXPLORE
    dest_explore = _get_mock_explore("Destination Objective")

    return {
        "summary":      f"A {days}-day {mode} mission covering {dist} km. Atmosphere at {risk} risk. Waypoints established.",
        "itinerary":    itinerary,
        "stops":        stops,
        "hotels":       dest_hotels,
        "explore":      [{"location": "Destination", **dest_explore}],
        "explanations": [
            f"Mode: {mode} recommended for optimized {dist}km coverage.",
            f"Weather: Risk is {risk}; monitoring {w_summ}.",
            f"Logistics: {len(stops)} strategic waypoints injected for mission integrity."
        ]
    }

def _get_mock_hotels(loc):
    return [
        {"name": f"{loc} Grand Plaza",  "rating": 4.8, "price": "₹6000-₹9000", "type": "Premium"},
        {"name": f"{loc} Transit Inn", "rating": 4.1, "price": "₹2000-₹3500", "type": "Business"},
        {"name": f"{loc} Safe Stay",   "rating": 3.7, "price": "₹1200-₹2000", "type": "Budget"}
    ]

def _get_mock_explore(loc):
    return {
        "food":   ["Local Specialty Dhaba", "Central Fusion Cafe", "Mission-Ready Diner"],
        "places": ["Strategic Viewpoint", "Regional Asset Hub", "Historical Monument"]
    }