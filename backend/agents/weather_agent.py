import requests

API_KEY = "d495063501dfdf2f4d5597e761d609e5"

def weather_agent(source, destination, time):
    """
    OpenWeatherMap powered Weather Agent.
    Fetches real-time atmospheric data for the destination.
    """
    try:
        url = f"http://api.openweathermap.org/data/2.5/weather"
        params = {
            "q":     destination,
            "appid": API_KEY,
            "units": "metric"
        }
        res = requests.get(url, params=params).json()

        if res.get("cod") != 200:
            raise KeyError(f"Weather API Error: {res.get('message', 'Unknown error')}")

        temp    = res["main"]["temp"]
        weather = res["weather"][0]["description"]
        
        risk    = "LOW"
        hazards = []

        if any(kw in weather.lower() for kw in ["rain", "storm", "snow", "fog", "thunder", "mist", "haze"]):
            risk = "HIGH"
            hazards.append(weather.capitalize())
        elif temp > 40 or temp < 0:
            risk = "MEDIUM"
            hazards.append(f"Extreme Temperature: {temp}°C")

        return {
            "weather_summary": f"{weather.capitalize()}, {temp}°C",
            "risk_level": risk,
            "hazards": hazards if hazards else ["Clear conditions"],
            "recommendation": "Be extremely cautious" if risk == "HIGH" else ("Exercise moderate caution" if risk == "MEDIUM" else "Optimal travel conditions")
        }
    except Exception as e:
        print(f"Weather Agent Error: {str(e)}")
        return {
            "weather_summary": "Weather intelligence unavailable.",
            "risk_level":      "UNKNOWN",
            "hazards":         ["Data retrieval failure"],
            "recommendation":  "Assume standard risk and check manual forecasts."
        }