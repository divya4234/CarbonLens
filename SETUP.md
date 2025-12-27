# CarbonLens Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your MongoDB Atlas connection string.

3. **Seed the Database**
   ```bash
   npm run seed
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open Browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
carbonlens/
├── frontend/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # API routes
│   │   │   ├── hotspots/       # Hotspot endpoints
│   │   │   └── stats/          # Statistics endpoint
│   │   ├── map/                # Map page
│   │   ├── hotspots/           # Hotspots list page
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   ├── MapView.tsx
│   │   ├── HotspotCard.tsx
│   │   ├── RiskBadge.tsx
│   │   └── StatsPanel.tsx
│   └── lib/
│       ├── api.ts              # API helper functions
│       └── backend/            # Backend utilities
│           ├── lib/
│           │   └── mongodb.ts  # MongoDB connection
│           └── models/
│               └── Hotspot.ts  # Mongoose model
├── backend/
│   └── scripts/
│       └── seed.js             # Database seeding script
├── data/
│   └── mock_hotspots.json      # Mock data file
├── python/
│   ├── generate_mock_data.py   # Generate mock data
│   └── process_emissions.py    # Mock processing logic
└── package.json
```

## Important Notes

- All data is **MOCK DATA** for demonstration
- TypeScript errors will resolve after `npm install`
- Ensure MongoDB Atlas connection string is correct
- Leaflet map requires internet connection for tiles

## Troubleshooting

### MongoDB Connection Issues
- Verify your MongoDB Atlas connection string
- Check network access in MongoDB Atlas dashboard
- Ensure IP whitelist includes your IP address

### TypeScript Errors
- Run `npm install` first
- Restart your IDE/editor
- Check that all dependencies are installed

### Map Not Loading
- Check browser console for errors
- Verify internet connection (Leaflet needs tile server)
- Clear browser cache

## Next Steps

1. Replace mock data with real CSV files
2. Integrate real Python ML models
3. Set up data ingestion pipeline
4. Add authentication if needed
5. Deploy to production

