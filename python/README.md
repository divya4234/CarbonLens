# Python Data Processing

This directory contains Python scripts for generating and processing emission hotspot data.

## Files

### `generate_mock_data.py`
Generates realistic mock hotspot data for Bhubaneswar. Creates JSON file with hotspot information including coordinates, emission values, risk levels, and preventive measures.

**Usage:**
```bash
cd python
python generate_mock_data.py
```

**Output:** `../data/mock_hotspots.json`

**In Production:**
- Replace with real sensor data ingestion
- Read from CSV files provided by environmental agencies
- Integrate with IoT sensor networks
- Use real-time data streams

### `process_emissions.py`
Contains mock logic for processing emission data and classifying risk levels. Uses simple threshold-based rules.

**In Production:**
- Replace with trained ML models (e.g., Random Forest, Neural Networks)
- Apply official AQI (Air Quality Index) standards
- Use ensemble methods for better accuracy
- Include time-series analysis and predictions
- Add uncertainty estimates

## Dependencies

No external dependencies required for mock scripts. In production, you may need:
- `pandas` - for data processing
- `scikit-learn` - for ML models
- `numpy` - for numerical operations
- `tensorflow` or `pytorch` - for deep learning models

## Integration with Backend

Currently, the backend reads from `data/mock_hotspots.json`. In production:

1. **CSV Import:** Modify `backend/scripts/seed.js` to read CSV files
2. **Python Integration:** Use a Python API or call Python scripts from Node.js
3. **Real-time Updates:** Set up a data pipeline that processes new data and updates MongoDB

## Example Production Workflow

```bash
# 1. Collect sensor data (CSV or API)
# 2. Process with Python model
python process_emissions.py --input data/raw_sensor_data.csv --output data/processed_hotspots.json

# 3. Seed database with processed data
npm run seed
```

