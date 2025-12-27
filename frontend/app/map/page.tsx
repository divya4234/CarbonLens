/**
 * Map Page
 * 
 * Interactive map view showing all emission hotspots.
 * Uses Leaflet for mapping functionality.
 * 
 * In production, this would:
 * - Add clustering for many markers
 * - Include heatmap visualization
 * - Add time-based filtering
 * - Show real-time updates
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getHotspots, Hotspot } from '../../lib/api';
import MapView from '../../components/MapView';

// Dynamically import MapView to avoid SSR issues with Leaflet
const DynamicMapView = dynamic(() => import('../../components/MapView'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <p className="text-gray-600">Loading map...</p>
    </div>
  ),
});

export default function MapPage() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHotspots() {
      try {
        const data = await getHotspots();
        setHotspots(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load hotspots');
        setLoading(false);
      }
    }
    loadHotspots();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900">CarbonLens</h1>
          <p className="text-gray-600 mt-1">Urban Emission Hotspot Mapping Platform</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 py-4">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-900 pb-4 font-medium"
            >
              Home
            </Link>
            <Link
              href="/map"
              className="text-blue-600 border-b-2 border-blue-600 pb-4 font-medium"
            >
              Map View
            </Link>
            <Link
              href="/hotspots"
              className="text-gray-600 hover:text-gray-900 pb-4 font-medium"
            >
              Hotspots
            </Link>
          </div>
        </div>
      </nav>

      {/* Map Container */}
      <main className="flex-1 relative">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <p className="text-gray-600">Loading map data...</p>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && (
          <DynamicMapView hotspots={hotspots} />
        )}
      </main>

      {/* Legend */}
      <div className="bg-white border-t p-4">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Risk Level Legend:</h3>
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-risk-high rounded-full mr-2"></div>
              <span className="text-gray-700">High Risk</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-risk-medium rounded-full mr-2"></div>
              <span className="text-gray-700">Medium Risk</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-risk-low rounded-full mr-2"></div>
              <span className="text-gray-700">Low Risk</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

