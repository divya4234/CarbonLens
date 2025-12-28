/**
 * Hotspots Page
 * 
 * List view of all emission hotspots with filtering capabilities.
 * 
 * In production, this would:
 * - Add pagination for large datasets
 * - Include sorting options
 * - Add search functionality
 * - Show historical trends
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getHotspots, Hotspot } from '../../lib/api';
import HotspotCard from '../../components/HotspotCard';

export default function HotspotsPage() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [filteredHotspots, setFilteredHotspots] = useState<Hotspot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');

  useEffect(() => {
    async function loadHotspots() {
      try {
        setLoading(true);
        setError(null);
        const data = await getHotspots();
        setHotspots(data);
        setFilteredHotspots(data);
        setLoading(false);
      } catch (err: any) {
        console.error('Error loading hotspots:', err);
        setError(err.message || 'Failed to load hotspots. Please check your database connection.');
        setLoading(false);
      }
    }
    loadHotspots();
  }, []);

  useEffect(() => {
    let filtered = hotspots;

    // Apply risk level filter
    if (riskFilter !== 'all') {
      filtered = filtered.filter(
        (h) => h.risk_level.toLowerCase() === riskFilter
      );
    }

    // Apply source type filter
    if (sourceFilter !== 'all') {
      filtered = filtered.filter(
        (h) => h.source_type.toLowerCase() === sourceFilter
      );
    }

    setFilteredHotspots(filtered);
  }, [riskFilter, sourceFilter, hotspots]);

  return (
    <div className="min-h-screen bg-gray-50">
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
              className="text-gray-600 hover:text-gray-900 pb-4 font-medium"
            >
              Map View
            </Link>
            <Link
              href="/hotspots"
              className="text-blue-600 border-b-2 border-blue-600 pb-4 font-medium"
            >
              Hotspots
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Emission Hotspots
          </h2>

          {/* Filters */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="risk-filter" className="text-sm font-medium text-gray-700">
                Risk:
              </label>
              <select
                id="risk-filter"
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="source-filter" className="text-sm font-medium text-gray-700">
                Source:
              </label>
              <select
                id="source-filter"
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="traffic">Traffic</option>
                <option value="industry">Industry</option>
                <option value="residential">Residential</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading hotspots...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Hotspots Grid */}
        {!loading && !error && (
          <>
            <p className="text-sm text-gray-600 mb-6">
              Showing {filteredHotspots.length} of {hotspots.length} hotspots
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredHotspots.map((hotspot) => (
                <HotspotCard key={hotspot.zone_id} hotspot={hotspot} />
              ))}
            </div>
            {filteredHotspots.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600">No hotspots found with the selected filter.</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-600 text-sm">
            CarbonLens - Urban Emission Hotspot Mapping Platform | Using Mock
            Data
          </p>
        </div>
      </footer>
    </div>
  );
}

