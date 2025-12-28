/**
 * Hotspot Model (Mongoose Schema)
 * 
 * This schema defines the structure for emission hotspots in the database.
 * 
 * In production, this data would come from:
 * - Real-time sensor data
 * - Processed CSV files from environmental agencies
 * - Python ML model predictions
 * 
 * Currently uses mock data seeded from data/mock_hotspots.json
 */

import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IHotspot extends Document {
  zone_id: string;
  name: string;
  latitude: number;
  longitude: number;
  pm25: number; // Particulate Matter 2.5 (μg/m³)
  co2: number; // Carbon Dioxide (ppm)
  risk_level: 'Low' | 'Medium' | 'High';
  source_type: 'Traffic' | 'Industry' | 'Residential';
  preventive_measures: string[];
  last_updated: Date;
}

const HotspotSchema: Schema = new Schema<IHotspot>(
  {
    zone_id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    longitude: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
    pm25: {
      type: Number,
      required: true,
      min: 0,
    },
    co2: {
      type: Number,
      required: true,
      min: 0,
    },
    risk_level: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      required: true,
      index: true,
    },
    source_type: {
      type: String,
      enum: ['Traffic', 'Industry', 'Residential'],
      required: true,
    },
    preventive_measures: {
      type: [String],
      required: true,
      default: [],
    },
    last_updated: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Create indexes for common queries
HotspotSchema.index({ latitude: 1, longitude: 1 });
HotspotSchema.index({ risk_level: 1 });
HotspotSchema.index({ source_type: 1 });

// Export the model
// Use existing model if available (for Next.js hot reloading)
const Hotspot: Model<IHotspot> =
  mongoose.models.Hotspot || mongoose.model<IHotspot>('Hotspot', HotspotSchema);

export default Hotspot;

