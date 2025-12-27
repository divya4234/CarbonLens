/**
 * API Route: GET /api/hotspots/:id
 * 
 * Returns a single hotspot by its zone_id.
 * 
 * In production, this would:
 * - Include detailed historical data
 * - Add related recommendations
 * - Include real-time sensor readings
 */

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/backend/mongodb';
import Hotspot from '../../../lib/backend/models/Hotspot';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    // Find hotspot by zone_id
    const hotspot = await Hotspot.findOne({ zone_id: id });

    if (!hotspot) {
      return NextResponse.json(
        {
          success: false,
          error: 'Hotspot not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: hotspot,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching hotspot:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to fetch hotspot',
      },
      { status: 500 }
    );
  }
}

