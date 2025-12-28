/**
 * StatsPanel Component
 * 
 * Displays aggregate statistics about emission hotspots.
 * 
 * In production, this would:
 * - Include charts and visualizations
 * - Show trends over time
 * - Add interactive filters
 */

import { Stats } from '../lib/api';

interface StatsPanelProps {
  stats: Stats;
}

export default function StatsPanel({ stats }: StatsPanelProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Hotspots */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Total Hotspots</h3>
        <p className="text-3xl font-bold text-gray-900">{stats.totalHotspots}</p>
      </div>

      {/* Risk Level Breakdown */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-600 mb-2">High Risk</h3>
        <p className="text-3xl font-bold text-red-600">{stats.riskLevels.high}</p>
        <p className="text-xs text-gray-500 mt-1">
          {stats.totalHotspots > 0
            ? Math.round((stats.riskLevels.high / stats.totalHotspots) * 100)
            : 0}
          % of total
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Medium Risk</h3>
        <p className="text-3xl font-bold text-amber-600">{stats.riskLevels.medium}</p>
        <p className="text-xs text-gray-500 mt-1">
          {stats.totalHotspots > 0
            ? Math.round((stats.riskLevels.medium / stats.totalHotspots) * 100)
            : 0}
          % of total
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-sm font-medium text-gray-600 mb-2">Low Risk</h3>
        <p className="text-3xl font-bold text-green-600">{stats.riskLevels.low}</p>
        <p className="text-xs text-gray-500 mt-1">
          {stats.totalHotspots > 0
            ? Math.round((stats.riskLevels.low / stats.totalHotspots) * 100)
            : 0}
          % of total
        </p>
      </div>

      {/* Average Emissions */}
      <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Average Emissions</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">PM2.5</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.averages.pm25} μg/m³
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">CO₂</p>
            <p className="text-2xl font-bold text-gray-900">
              {stats.averages.co2} ppm
            </p>
          </div>
        </div>
      </div>

      {/* Source Type Breakdown */}
      <div className="bg-white rounded-lg shadow p-6 md:col-span-2">
        <h3 className="text-sm font-medium text-gray-600 mb-4">Source Types</h3>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Traffic</p>
            <p className="text-xl font-bold text-gray-900">{stats.sourceTypes.traffic}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Industry</p>
            <p className="text-xl font-bold text-gray-900">{stats.sourceTypes.industry}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Residential</p>
            <p className="text-xl font-bold text-gray-900">
              {stats.sourceTypes.residential}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

