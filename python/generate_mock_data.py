"""
Generate Mock Hotspot Data

This script generates realistic mock emission hotspot data for Bhubaneswar.
The data includes various zones across the city with different risk levels
and source types.

In production, this would:
- Read from real sensor data
- Process CSV files from environmental agencies
- Integrate with IoT sensor networks
- Use real-time data streams
"""

import json
import random
from datetime import datetime, timedelta

# Bhubaneswar coordinates (approximate center)
BHUBANESWAR_CENTER_LAT = 20.2961
BHUBANESWAR_CENTER_LON = 85.8245

# Zone names in Bhubaneswar (realistic locations)
ZONE_NAMES = [
    "Acharya Vihar",
    "Bapuji Nagar",
    "Bhubaneswar Railway Station",
    "Cuttack Road",
    "Dumduma",
    "Gangapada",
    "Infocity",
    "Jagamara",
    "Khandagiri",
    "Lingaraj Temple Area",
    "Master Canteen",
    "Nayapalli",
    "Old Town",
    "Patia",
    "Rasulgarh",
    "Sahid Nagar",
    "Sainik School",
    "Vani Vihar",
    "VSS Nagar",
    "Bhubaneswar Airport",
]

SOURCE_TYPES = ["Traffic", "Industry", "Residential"]

# Risk level thresholds (mock thresholds - replace with real model logic)
RISK_THRESHOLDS = {
    "High": {"pm25_min": 100, "co2_min": 450},
    "Medium": {"pm25_min": 50, "co2_min": 350},
    "Low": {"pm25_min": 0, "co2_min": 0},
}


def generate_risk_level(pm25: float, co2: float) -> str:
    """
    Determine risk level based on emission values.
    
    In production, this would use a trained ML model or
    official environmental standards (e.g., AQI thresholds).
    """
    if pm25 >= RISK_THRESHOLDS["High"]["pm25_min"] or co2 >= RISK_THRESHOLDS["High"]["co2_min"]:
        return "High"
    elif pm25 >= RISK_THRESHOLDS["Medium"]["pm25_min"] or co2 >= RISK_THRESHOLDS["Medium"]["co2_min"]:
        return "Medium"
    else:
        return "Low"


def generate_preventive_measures(risk_level: str, source_type: str) -> list:
    """
    Generate preventive measures based on risk level and source type.
    
    In production, this would:
    - Use expert system rules
    - Integrate with city planning recommendations
    - Include cost-benefit analysis
    """
    measures = []
    
    if source_type == "Traffic":
        measures.append("Implement traffic flow optimization")
        measures.append("Promote public transportation")
        if risk_level == "High":
            measures.append("Consider vehicle restrictions during peak hours")
            measures.append("Install air purifiers at traffic intersections")
    elif source_type == "Industry":
        measures.append("Enforce emission control regulations")
        measures.append("Regular monitoring and compliance checks")
        if risk_level == "High":
            measures.append("Temporary shutdown for maintenance")
            measures.append("Upgrade to cleaner production technologies")
    elif source_type == "Residential":
        measures.append("Promote clean cooking fuels")
        measures.append("Awareness campaigns on waste management")
        if risk_level == "High":
            measures.append("Install community air quality monitors")
            measures.append("Green space development initiatives")
    
    # Common measures
    measures.append("Plant trees and create green buffers")
    if risk_level == "High":
        measures.append("Issue health advisories for sensitive groups")
    
    return measures[:4]  # Return top 4 measures


def generate_hotspot(zone_id: str, name: str) -> dict:
    """
    Generate a single hotspot with realistic data.
    """
    # Generate random coordinates around Bhubaneswar center
    lat = BHUBANESWAR_CENTER_LAT + random.uniform(-0.15, 0.15)
    lon = BHUBANESWAR_CENTER_LON + random.uniform(-0.15, 0.15)
    
    # Generate source type
    source_type = random.choice(SOURCE_TYPES)
    
    # Generate emission values based on source type and risk level
    # (This is mock logic - replace with real data/model predictions)
    if source_type == "Traffic":
        pm25 = random.uniform(40, 120)
        co2 = random.uniform(300, 500)
    elif source_type == "Industry":
        pm25 = random.uniform(60, 150)
        co2 = random.uniform(400, 600)
    else:  # Residential
        pm25 = random.uniform(20, 80)
        co2 = random.uniform(250, 400)
    
    # Determine risk level
    risk_level = generate_risk_level(pm25, co2)
    
    # Generate preventive measures
    preventive_measures = generate_preventive_measures(risk_level, source_type)
    
    # Generate last updated timestamp (within last 7 days)
    days_ago = random.randint(0, 7)
    hours_ago = random.randint(0, 23)
    last_updated = datetime.now() - timedelta(days=days_ago, hours=hours_ago)
    
    return {
        "zone_id": zone_id,
        "name": name,
        "latitude": round(lat, 6),
        "longitude": round(lon, 6),
        "pm25": round(pm25, 2),
        "co2": round(co2, 2),
        "risk_level": risk_level,
        "source_type": source_type,
        "preventive_measures": preventive_measures,
        "last_updated": last_updated.isoformat(),
    }


def main():
    """
    Generate mock hotspot data and save to JSON file.
    """
    print("Generating mock hotspot data for Bhubaneswar...")
    
    hotspots = []
    
    for idx, zone_name in enumerate(ZONE_NAMES, start=1):
        zone_id = f"BH-{idx:03d}"
        hotspot = generate_hotspot(zone_id, zone_name)
        hotspots.append(hotspot)
    
    # Save to JSON file
    output_path = "../data/mock_hotspots.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(hotspots, f, indent=2, ensure_ascii=False)
    
    print(f"Generated {len(hotspots)} hotspots")
    print(f"Saved to {output_path}")
    
    # Print summary
    risk_counts = {}
    source_counts = {}
    for hotspot in hotspots:
        risk_counts[hotspot["risk_level"]] = risk_counts.get(hotspot["risk_level"], 0) + 1
        source_counts[hotspot["source_type"]] = source_counts.get(hotspot["source_type"], 0) + 1
    
    print("\nSummary:")
    print(f"   Risk Levels: {risk_counts}")
    print(f"   Source Types: {source_counts}")


if __name__ == "__main__":
    random.seed(42)  # For reproducible results
    main()

