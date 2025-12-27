/**
 * MapView Component
 * 
 * Interactive Leaflet map displaying emission hotspots.
 * 
 * In production, this would:
 * - Add marker clustering for performance
 * - Include heatmap layer
 * - Add custom icons for different source types
 * - Support time-based filtering
 */

'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Hotspot } from '../lib/api';
import RiskBadge from './RiskBadge';

// Fix for default marker icons in Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

interface MapViewProps {
  hotspots: Hotspot[];
}

// Bhubaneswar coordinates (center of the map)
const BHUBANESWAR_CENTER: [number, number] = [20.2961, 85.8245];

// Get marker color based on risk level
function getMarkerColor(riskLevel: string): string {
  switch (riskLevel) {
    case 'High':
      return '#ef4444'; // red
    case 'Medium':
      return '#f59e0b'; // amber
    case 'Low':
      return '#10b981'; // green
    default:
      return '#6b7280'; // gray
  }
}

// Create custom icon for markers
function createCustomIcon(riskLevel: string) {
  const color = getMarkerColor(riskLevel);
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
}

export default function MapView({ hotspots }: MapViewProps) {
  return (
    <MapContainer
      center={BHUBANESWAR_CENTER}
      zoom={12}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hotspots.map((hotspot) => (
        <Marker
          key={hotspot.zone_id}
          position={[hotspot.latitude, hotspot.longitude]}
          icon={createCustomIcon(hotspot.risk_level)}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-semibold text-gray-900 mb-2">{hotspot.name}</h3>
              <div className="mb-2">
                <RiskBadge riskLevel={hotspot.risk_level} />
              </div>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  <strong>Zone ID:</strong> {hotspot.zone_id}
                </p>
                <p>
                  <strong>Source:</strong> {hotspot.source_type}
                </p>
                <p>
                  <strong>PM2.5:</strong> {hotspot.pm25} μg/m³
                </p>
                <p>
                  <strong>CO₂:</strong> {hotspot.co2} ppm
                </p>
                <p>
                  <strong>Last Updated:</strong>{' '}
                  {new Date(hotspot.last_updated).toLocaleDateString()}
                </p>
              </div>
              {hotspot.preventive_measures.length > 0 && (
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs font-semibold text-gray-700 mb-1">
                    Preventive Measures:
                  </p>
                  <ul className="text-xs text-gray-600 list-disc list-inside">
                    {hotspot.preventive_measures.slice(0, 3).map((measure, idx) => (
                      <li key={idx}>{measure}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

