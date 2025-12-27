/**
 * Database Seeding Script (JavaScript version for Node.js)
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

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Define Hotspot schema for seed script
const hotspotSchema = new mongoose.Schema({
  zone_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  pm25: { type: Number, required: true },
  co2: { type: Number, required: true },
  risk_level: { type: String, enum: ['Low', 'Medium', 'High'], required: true },
  source_type: { type: String, enum: ['Traffic', 'Industry', 'Residential'], required: true },
  preventive_measures: { type: [String], required: true },
  last_updated: { type: Date, required: true },
}, { timestamps: true });

const Hotspot = mongoose.models.Hotspot || mongoose.model('Hotspot', hotspotSchema);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable inside .env');
  process.exit(1);
}

async function seedDatabase() {
  try {
    console.log('Starting database seed...');

    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');

    // Read mock data file
    const mockDataPath = path.join(process.cwd(), 'data', 'mock_hotspots.json');
    const mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf-8'));

    // Convert last_updated strings to Date objects
    const processedData = mockData.map(hotspot => ({
      ...hotspot,
      last_updated: new Date(hotspot.last_updated),
    }));

    // Clear existing data (optional - comment out if you want to keep existing data)
    await Hotspot.deleteMany({});
    console.log('Cleared existing hotspots');

    // Insert mock data
    const hotspots = await Hotspot.insertMany(processedData);
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
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
