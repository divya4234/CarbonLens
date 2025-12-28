/**
 * HotspotCard Component
 * 
 * Card component displaying information about a single emission hotspot.
 * 
 * In production, this would:
 * - Include charts showing trends
 * - Add links to detailed analysis
 * - Show real-time updates
 */

import { Hotspot } from '../lib/api';
import RiskBadge from './RiskBadge';

interface HotspotCardProps {
  hotspot: Hotspot;
}

export default function HotspotCard({ hotspot }: HotspotCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {hotspot.name}
          </h3>
          <p className="text-sm text-gray-500">Zone: {hotspot.zone_id}</p>
        </div>
        <RiskBadge riskLevel={hotspot.risk_level} />
      </div>

      <div className="mb-4 space-y-2">
        <div className="flex items-center text-sm">
          <span className="text-gray-600 w-24">Source Type:</span>
          <span className="text-gray-900 font-medium">{hotspot.source_type}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-600 w-24">PM2.5:</span>
          <span className="text-gray-900 font-medium">{hotspot.pm25} μg/m³</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-600 w-24">CO₂:</span>
          <span className="text-gray-900 font-medium">{hotspot.co2} ppm</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-gray-600 w-24">Location:</span>
          <span className="text-gray-900 font-medium text-xs">
            {hotspot.latitude.toFixed(4)}, {hotspot.longitude.toFixed(4)}
          </span>
        </div>
      </div>

      {hotspot.preventive_measures.length > 0 && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Preventive Measures:
          </p>
          <ul className="text-sm text-gray-600 space-y-1">
            {hotspot.preventive_measures.map((measure, idx) => (
              <li key={idx} className="flex items-start">
                <span className="mr-2">•</span>
                <span>{measure}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4 pt-4 border-t">
        <p className="text-xs text-gray-500">
          Last Updated: {new Date(hotspot.last_updated).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

