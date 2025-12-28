import json
import random
import pandas as pd
from datetime import datetime, timedelta

from pymongo import MongoClient
import certifi

CONNECTION_STRING = "mongodb+srv://divya1234:fighters123@bhubaneswar-aqi-data.k3appqf.mongodb.net/?appName=Bhubaneswar-AQI-Data"

try:
    client = MongoClient(CONNECTION_STRING)
    db = client["Bhubaneswar_Research"]
    collection = db["AirQuality_2025"]
    print("Connected to MongoDB Atlas")
except Exception as e:
    print(f"Connection failed: {e}")
    exit()

# --- EXPANDED RESEARCH-BACKED REGIONS ---
locations = [
    {"id": "BBSR-01", "name": "Rasulgarh Square", "type": "Traffic Hub", "lat": 20.2900, "lon": 85.8650, "load": 85},
    {"id": "BBSR-02", "name": "Palasuni", "type": "High Emission", "lat": 20.3010, "lon": 85.8680, "load": 95},
    {"id": "BBSR-03", "name": "Laxmi Sagar", "type": "Mixed/Urban", "lat": 20.2800, "lon": 85.8500, "load": 80},
    {"id": "BBSR-04", "name": "Patia (Infocity)", "type": "Institutional", "lat": 20.3500, "lon": 85.8150, "load": 45},
    {"id": "BBSR-05", "name": "Mancheswar IE", "type": "Industrial", "lat": 20.3150, "lon": 85.8550, "load": 88},
    {"id": "BBSR-06", "name": "Master Canteen", "type": "Transit/Station", "lat": 20.2667, "lon": 85.8430, "load": 75},
    {"id": "BBSR-07", "name": "Nayapalli", "type": "Residential/Commercial", "lat": 20.2980, "lon": 85.8200, "load": 65},
    {"id": "BBSR-08", "name": "Old Town (Lingaraj)", "type": "Heritage/Dense", "lat": 20.2350, "lon": 85.8330, "load": 55},
    {"id": "BBSR-09", "name": "Khandagiri", "type": "Highway Entry", "lat": 20.2550, "lon": 85.7950, "load": 82},
    {"id": "BBSR-10", "name": "Chandrasekharpur", "type": "Residential", "lat": 20.3200, "lon": 85.8250, "load": 50}
]

def get_calibrated_factors(dt):
    if dt.month in [8, 9]: return 0.55
    if dt.month == 10:
        if 20 <= dt.day <= 22: return 3.2 
        return 1.1
    if dt.month == 11: return 1.9
    if dt.month == 12:
        if dt.day > 24: return 3.4 
        return 2.7
    return 1.0

rows = []
start = datetime(2025, 8, 1)
end = datetime(2025, 12, 28)
curr = start

while curr <= end:
    season_factor = get_calibrated_factors(curr)
    for loc in locations:
        hour = curr.hour
        time_factor = 1.7 if (hour >= 21 or hour <= 3) else 0.8 if (11 <= hour <= 16) else 1.3
        
        pm2_5 = int(loc['load'] * season_factor * time_factor + random.uniform(-10, 10))
        pm2_5 = max(10, pm2_5)
        pm10 = int(pm2_5 * 1.5)
        no2 = int(pm2_5 * 0.3) if loc['type'] != 'Traffic Hub' else int(pm2_5 * 0.7)
        aqi = int(pm2_5 * 1.4)
        
        status = "Good" if aqi <= 50 else "Satisfactory" if aqi <= 100 else "Moderate" if aqi <= 200 else "Poor" if aqi <= 300 else "Very Poor" if aqi <= 400 else "Severe"

        # FLATTENED STRUCTURE FOR CSV
        rows.append({
            "region_id": loc['id'],
            "name": loc['name'],
            "zone": loc['type'],
            "latitude": loc['lat'],
            "longitude": loc['lon'],
            "timestamp": curr.strftime("%Y-%m-%d %H:%M:%S"),
            "aqi": aqi,
            "pm2_5": pm2_5,
            "pm10": pm10,
            "no2": no2,
            "temp_c": 28 if curr.month < 11 else 21,
            "status": status
        })
    curr += timedelta(hours=6)

# --- CSV EXPORT ---
df = pd.DataFrame(rows)
df.to_csv("Bhubaneswar_Professional_Final.csv", index=False)
print(f"CSV saved with {len(df)} records.")





def manual_upload():
    try:
        # Connect using the SSL certificate fix
        client = MongoClient(CONNECTION_STRING, tlsCAFile=certifi.where())
        
        # Define Database and Collection
        db = client["Bhubaneswar_Analytics"]
        collection = db["AQI_Historical_Data"]
        
        # 2. LOAD YOUR LOCAL FILE
        with open("Bhubaneswar_Professional_Final.json", "r") as file:
            data = json.load(file)
            
        print(f"File loaded. Found {len(data)} records.")

        # 3. MANUAL UPLOAD
        # We delete existing data first to avoid duplicates during testing
        collection.delete_many({}) 
        print("Cleaned old data from collection.")

        result = collection.insert_many(data)
        print(f"Success! {len(result.inserted_ids)} records are now in MongoDB Atlas.")

    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    manual_upload()