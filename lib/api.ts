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

// Use relative URLs for Next.js API routes
// In server components, we can use absolute URLs, but for client components we use relative paths

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
 * Get API base URL - works in both server and client components
 */
function getApiUrl(): string {
  if (typeof window !== 'undefined') {
    // Client-side: use relative URL
    return '';
  }
  // Server-side: use absolute URL
  return process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
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

  const baseUrl = getApiUrl();
  const url = `${baseUrl}/api/hotspots${params.toString() ? `?${params.toString()}` : ''}`;
  
  const response = await fetch(url, { 
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch hotspots: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || [];
}

/**
 * Fetch a single hotspot by zone_id
 */
export async function getHotspot(id: string): Promise<Hotspot> {
  const baseUrl = getApiUrl();
  const response = await fetch(`${baseUrl}/api/hotspots/${id}`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch hotspot: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data;
}

/**
 * Fetch aggregate statistics
 */
export async function getStats(): Promise<Stats> {
  const baseUrl = getApiUrl();
  const response = await fetch(`${baseUrl}/api/stats`, {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch stats: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data;
}

