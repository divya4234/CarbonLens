/**
 * Home Page
 * 
 * Overview page showing project introduction and key statistics.
 * 
 * In production, this would:
 * - Include real-time updates
 * - Add charts and visualizations
 * - Show recent alerts or notifications
 */

import Link from 'next/link';
import { getStats } from '../lib/api';
import StatsPanel from '../components/StatsPanel';

export default async function HomePage() {
  let stats;
  try {
    stats = await getStats();
  } catch (error) {
    console.error('Failed to load stats:', error);
    stats = null;
  }

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
              className="text-blue-600 border-b-2 border-blue-600 pb-4 font-medium"
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
              className="text-gray-600 hover:text-gray-900 pb-4 font-medium"
            >
              Hotspots
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project Introduction */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            About CarbonLens
          </h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-700 mb-4">
              CarbonLens is an urban emission hotspot mapping platform designed
              to identify, visualize, and analyze carbon emission hotspots in
              Bhubaneswar. The platform helps city planners, environmental
              agencies, and citizens understand emission patterns and take
              preventive measures.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Note:</strong> This application currently uses mock data
              for demonstration purposes. In production, it would integrate with
              real-time sensors, CSV data from environmental agencies, and
              machine learning models for predictive analysis.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">
                  🗺️ Interactive Mapping
                </h3>
                <p className="text-sm text-blue-700">
                  Visualize emission hotspots on an interactive map with
                  color-coded risk levels
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">
                  📊 Data Analysis
                </h3>
                <p className="text-sm text-green-700">
                  Analyze emission patterns, risk levels, and source types
                  across the city
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">
                  🛡️ Preventive Measures
                </h3>
                <p className="text-sm text-purple-700">
                  Access recommended preventive measures for each hotspot
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Panel */}
        {stats && (
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Key Statistics
            </h2>
            <StatsPanel stats={stats} />
          </section>
        )}

        {/* Quick Actions */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Explore the Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/map"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                View Interactive Map
              </h3>
              <p className="text-gray-600">
                Explore emission hotspots on an interactive map centered on
                Bhubaneswar. Click on markers to view detailed information.
              </p>
            </Link>
            <Link
              href="/hotspots"
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Browse Hotspots
              </h3>
              <p className="text-gray-600">
                View all emission hotspots in a list format. Filter by risk
                level and explore preventive measures.
              </p>
            </Link>
          </div>
        </section>
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

