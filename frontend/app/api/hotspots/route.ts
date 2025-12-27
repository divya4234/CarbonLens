/**
 * API Route: GET /api/hotspots
 * 
 * Returns all emission hotspots from the database.
 * 
 * Query parameters:
 * - risk_level: Filter by risk level (Low, Medium, High)
 * - source_type: Filter by source type (Traffic, Industry, Residential)
 * 
 * In production, this would:
 * - Support pagination
 * - Add caching for performance
 * - Include real-time data from sensors
 */

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../lib/backend/mongodb';
import Hotspot from '../../lib/backend/models/Hotspot';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const riskLevel = searchParams.get('risk_level');
    const sourceType = searchParams.get('source_type');

    // Build filter object
    const filter: any = {};
    if (riskLevel && ['Low', 'Medium', 'High'].includes(riskLevel)) {
      filter.risk_level = riskLevel;
    }
    if (sourceType && ['Traffic', 'Industry', 'Residential'].includes(sourceType)) {
      filter.source_type = sourceType;
    }

    // Fetch hotspots from database
    const hotspots = await Hotspot.find(filter).sort({ last_updated: -1 });

    return NextResponse.json(
      {
        success: true,
        count: hotspots.length,
        data: hotspots,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching hotspots:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch hotspots',
      },
      { status: 500 }
    );
  }
}

