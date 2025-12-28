/**
 * Database Seeding Script
 * 
 * This script populates the MongoDB database with mock hotspot data.
 * 
 * Usage: npm run seed
 * 
 * In production, this would:
 * - Read from processed CSV files
 * - Import data from Python model outputs
 * - Validate data before insertion
 * - Handle updates to existing records
 */

import mongoose from 'mongoose';
import connectDB from '../lib/mongodb';
import Hotspot from '../models/Hotspot';
import * as fs from 'fs';
import * as path from 'path';

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed...');

    // Connect to MongoDB
    await connectDB();

    // Read mock data file
    const mockDataPath = path.join(process.cwd(), 'data', 'mock_hotspots.json');
    const mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'));

    // Clear existing data (optional - comment out if you want to keep existing data)
    await Hotspot.deleteMany({});
    console.log('Cleared existing hotspots');

    // Insert mock data
    const hotspots = await Hotspot.insertMany(mockData);
    console.log(`Inserted ${hotspots.length} hotspots into database`);

    // Display summary
    const stats = {
      total: await Hotspot.countDocuments(),
      high: await Hotspot.countDocuments({ risk_level: 'High' }),
      medium: await Hotspot.countDocuments({ risk_level: 'Medium' }),
      low: await Hotspot.countDocuments({ risk_level: 'Low' }),
    };

    console.log('\nDatabase Summary:');
    console.log(`   Total hotspots: ${stats.total}`);
    console.log(`   High risk: ${stats.high}`);
    console.log(`   Medium risk: ${stats.medium}`);
    console.log(`   Low risk: ${stats.low}`);

    console.log('\nSeeding completed successfully!');
    process.exit(0);
  } catch (error: any) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();

