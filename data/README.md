# Data Directory

This directory contains mock emission hotspot data for the CarbonLens platform.

## Files

### `mock_hotspots.json`
Mock JSON file containing emission hotspot data for Bhubaneswar. This file is used to seed the MongoDB database during development.

**Structure:**
- Each hotspot contains: zone_id, name, coordinates, emission values (PM2.5, CO2), risk level, source type, preventive measures, and last updated timestamp
- Total: 20 hotspots across different zones in Bhubaneswar

**Usage:**
```bash
npm run seed
```

## Replacing Mock Data with Real Data

### Option 1: CSV Import
1. Export your real data as CSV with columns matching the hotspot schema
2. Modify `backend/scripts/seed.js` to read and parse CSV files
3. Map CSV columns to MongoDB document fields
4. Run the seed script

### Option 2: Python Processing Pipeline
1. Place raw sensor data or CSV files in this directory
2. Run `python/python/process_emissions.py` to process the data
3. Output processed JSON to this directory
4. Update seed script to use the new JSON file

### Option 3: Real-time API Integration
1. Set up API endpoints to fetch real-time sensor data
2. Create a data ingestion script that periodically fetches and updates MongoDB
3. Replace mock data with live data from sensors

## Data Sources (Future Integration)

- Environmental monitoring stations
- IoT sensor networks
- Satellite data
- Government environmental databases
- Traffic monitoring systems

## Notes

- All data in this directory is **MOCK DATA** for development purposes
- In production, ensure data validation and sanitization
- Consider data privacy and compliance requirements
- Implement data backup and versioning strategies

