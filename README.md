# CarbonLens

Urban carbon emission hotspot mapping and preventive action recommendation system for Bhubaneswar.

## Overview

CarbonLens is a full-stack web application that identifies, visualizes, and analyzes carbon emission hotspots in urban areas. The platform helps city planners, environmental agencies, and citizens understand emission patterns and take preventive measures.

**⚠️ Important:** This application currently uses **MOCK DATA** for demonstration purposes. All emission data, risk classifications, and preventive measures are simulated.

## Tech Stack

- **Frontend:** Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend:** Next.js API Routes (Node.js)
- **Database:** MongoDB Atlas (via Mongoose)
- **Mapping:** Leaflet / react-leaflet
- **Data Processing:** Python (mock logic, ready for real models)

## Project Structure

```
carbonlens/
├── frontend/          # Next.js frontend application
│   ├── app/          # App Router pages
│   ├── components/   # React components
│   └── lib/         # API helpers
├── backend/         # Backend API and models
│   ├── models/      # Mongoose schemas
│   ├── lib/         # MongoDB connection
│   └── app/api/     # API routes
├── data/            # Mock data files
├── python/          # Python data processing scripts
└── package.json     # Dependencies
```

## Features

- 🗺️ **Interactive Map View:** Visualize emission hotspots on an interactive map with color-coded risk levels
- 📊 **Data Analysis:** View aggregate statistics, risk distributions, and source type breakdowns
- 🔍 **Hotspot Filtering:** Filter hotspots by risk level and explore detailed information
- 🛡️ **Preventive Measures:** Access recommended preventive measures for each hotspot

## Installation

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (or local MongoDB)
- Python 3.8+ (for data generation scripts)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CarbonLens
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your MongoDB Atlas connection string:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/carbonlens?retryWrites=true&w=majority
   ```

4. **Generate mock data** (optional, if you want to regenerate)
   ```bash
   cd python
   python generate_mock_data.py
   cd ..
   ```

5. **Seed the database**
   ```bash
   npm run seed
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

### Home Page (`/`)
- Project overview and introduction
- Key statistics dashboard
- Quick navigation to map and hotspots

### Map Page (`/map`)
- Interactive Leaflet map centered on Bhubaneswar
- Color-coded markers (Red: High, Amber: Medium, Green: Low)
- Click markers to view hotspot details
- Risk level legend

### Hotspots Page (`/hotspots`)
- List view of all emission hotspots
- Filter by risk level (All, High, Medium, Low)
- View detailed information and preventive measures

## API Endpoints

- `GET /api/hotspots` - Get all hotspots (supports `?risk_level=` and `?source_type=` filters)
- `GET /api/hotspots/:id` - Get single hotspot by zone_id
- `GET /api/stats` - Get aggregate statistics

## Replacing Mock Data with Real Data

### 1. Replace CSV Files

1. Export your real sensor data as CSV
2. Modify `backend/scripts/seed.js` to read CSV files:
   ```javascript
   const csv = require('csv-parser');
   const fs = require('fs');
   // Parse CSV and convert to hotspot documents
   ```
3. Run `npm run seed` to import real data

### 2. Replace Python Logic

1. Train your ML model for risk classification
2. Update `python/process_emissions.py`:
   ```python
   # Replace mock thresholds with:
   risk_level = model.predict([[pm25, co2]])
   ```
3. Integrate with your data pipeline

### 3. Replace MongoDB Seed Data

1. Set up a data ingestion pipeline
2. Create scheduled jobs to update MongoDB
3. Replace `data/mock_hotspots.json` with real-time data sources

## Why MongoDB + Next.js?

- **MongoDB Atlas:** Cloud-hosted, scalable, flexible schema for emission data
- **Next.js:** Full-stack framework with built-in API routes, server-side rendering, and excellent developer experience
- **Modular Architecture:** Easy to swap mock data/logic with real implementations

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run seed` - Seed database with mock data
- `npm run lint` - Run ESLint

### Code Structure

- **Modular Design:** All logic is separated into modules for easy replacement
- **Type Safety:** Full TypeScript support throughout
- **Comments:** Extensive comments explaining where real data would replace mocks

## Future Enhancements

- Real-time sensor data integration
- Machine learning model integration
- Historical trend analysis
- User authentication and personalized dashboards
- Mobile app support
- Advanced filtering and search
- Export functionality (PDF, CSV)
- Alert system for high-risk zones

## Contributing

This is a capstone project. For production use, ensure:
- Data validation and sanitization
- Error handling and logging
- Security best practices
- Performance optimization
- Accessibility compliance

## License

MIT License - see LICENSE file for details

## Disclaimer

This application uses **MOCK DATA** for demonstration purposes. All emission values, risk classifications, and preventive measures are simulated and should not be used for real-world decision-making without proper validation and real data integration.
