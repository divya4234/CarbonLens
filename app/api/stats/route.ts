/**
 * API Route: GET /api/stats
 * 
 * Returns aggregate statistics about emission hotspots.
 * 
 * In production, this would:
 * - Include time-series data
 * - Add trend analysis
 * - Include predictions from ML models
 * - Cache results for performance
 */

import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../lib/backend/mongodb';
import Hotspot from '../../../lib/backend/models/Hotspot';

export async function GET(request: NextRequest) {
  try {
    // Connect to database
    await connectDB();

    // Get total count
    const totalHotspots = await Hotspot.countDocuments();

    // Get counts by risk level
    const highRiskCount = await Hotspot.countDocuments({ risk_level: 'High' });
    const mediumRiskCount = await Hotspot.countDocuments({ risk_level: 'Medium' });
    const lowRiskCount = await Hotspot.countDocuments({ risk_level: 'Low' });

    // Get counts by source type
    const trafficCount = await Hotspot.countDocuments({ source_type: 'Traffic' });
    const industryCount = await Hotspot.countDocuments({ source_type: 'Industry' });
    const residentialCount = await Hotspot.countDocuments({ source_type: 'Residential' });

    // Get average emissions
    const avgPm25 = await Hotspot.aggregate([
      {
        $group: {
          _id: null,
          avg: { $avg: '$pm25' },
        },
      },
    ]);

    const avgCo2 = await Hotspot.aggregate([
      {
        $group: {
          _id: null,
          avg: { $avg: '$co2' },
        },
      },
    ]);

    const stats = {
      totalHotspots,
      riskLevels: {
        high: highRiskCount,
        medium: mediumRiskCount,
        low: lowRiskCount,
      },
      sourceTypes: {
        traffic: trafficCount,
        industry: industryCount,
        residential: residentialCount,
      },
      averages: {
        pm25: avgPm25[0]?.avg ? Math.round(avgPm25[0].avg * 100) / 100 : 0,
        co2: avgCo2[0]?.avg ? Math.round(avgCo2[0].avg * 100) / 100 : 0,
      },
    };

    return NextResponse.json(
      {
        success: true,
        data: stats,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching stats:', error);
    
    // Provide more specific error messages
    let errorMessage = 'Failed to fetch stats';
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

