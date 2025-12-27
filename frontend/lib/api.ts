/**
 * API Helper Functions
 * 
 * Centralized functions for making API calls to the backend.
 * 
 * In production, this would:
 * - Include error handling and retry logic
 * - Add request caching
 * - Include authentication headers
 * - Support pagination
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export interface Hotspot {
  _id?: string;
  zone_id: string;
  name: string;
  latitude: number;
  longitude: number;
  pm25: number;
  co2: number;
  risk_level: 'Low' | 'Medium' | 'High';
  source_type: 'Traffic' | 'Industry' | 'Residential';
  preventive_measures: string[];
  last_updated: string;
}

export interface Stats {
  totalHotspots: number;
  riskLevels: {
    high: number;
    medium: number;
    low: number;
  };
  sourceTypes: {
    traffic: number;
    industry: number;
    residential: number;
  };
  averages: {
    pm25: number;
    co2: number;
  };
}

/**
 * Fetch all hotspots with optional filters
 */
export async function getHotspots(
  riskLevel?: string,
  sourceType?: string
): Promise<Hotspot[]> {
  const params = new URLSearchParams();
  if (riskLevel) params.append('risk_level', riskLevel);
  if (sourceType) params.append('source_type', sourceType);

  const url = `${API_BASE_URL}/api/hotspots${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch hotspots');
  }

  const data = await response.json();
  return data.data || [];
}

/**
 * Fetch a single hotspot by zone_id
 */
export async function getHotspot(id: string): Promise<Hotspot> {
  const response = await fetch(`${API_BASE_URL}/api/hotspots/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch hotspot');
  }

  const data = await response.json();
  return data.data;
}

/**
 * Fetch aggregate statistics
 */
export async function getStats(): Promise<Stats> {
  const response = await fetch(`${API_BASE_URL}/api/stats`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch stats');
  }

  const data = await response.json();
  return data.data;
}

