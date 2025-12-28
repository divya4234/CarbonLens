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
import connectDB from '../../../../lib/backend/mongodb';
import Hotspot from '../../../../lib/backend/models/Hotspot';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Connect to database
    await connectDB();

    const { id } = params;

    // Find hotspot by zone_id
    const hotspot = await Hotspot.findOne({ zone_id: id }).lean();

    if (!hotspot) {
      return NextResponse.json(
        {
          success: false,
          error: 'Hotspot not found',
        },
        { status: 404 }
      );
    }

    // Convert MongoDB _id and dates to JSON-serializable format
    const serializedHotspot = {
      ...hotspot,
      _id: (hotspot as any)._id.toString(),
      last_updated: (hotspot as any).last_updated.toISOString(),
      createdAt: (hotspot as any).createdAt?.toISOString(),
      updatedAt: (hotspot as any).updatedAt?.toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        data: serializedHotspot,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching hotspot:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to fetch hotspot';
    if (error.message?.includes('MongoServerError') || error.message?.includes('MongoNetworkError')) {
      errorMessage = 'Database connection error. Please check your MongoDB connection.';
    } else if (error.message) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}

