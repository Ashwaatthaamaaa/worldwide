import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import { connectToMongoDB, getDB, closeMongoDB } from './database.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function migrateData() {
  try {
    console.log('🚀 Starting data migration to MongoDB Atlas...');
    
    // Connect to MongoDB
    await connectToMongoDB();
    const db = getDB();
    const collection = db.collection('cities');
    
    // Read existing cities data
    const citiesPath = join(__dirname, '../../data/cities.json');
    const citiesData = JSON.parse(readFileSync(citiesPath, 'utf-8'));
    
    console.log(`📁 Found ${citiesData.cities.length} cities in JSON file`);
    
    // Check if data already exists
    const existingCount = await collection.countDocuments();
    if (existingCount > 0) {
      console.log(`⚠️  Database already contains ${existingCount} cities`);
      const answer = await askQuestion('Do you want to clear existing data and re-import? (y/N): ');
      
      if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        await collection.deleteMany({});
        console.log('🗑️  Cleared existing cities');
      } else {
        console.log('❌ Migration cancelled');
        await closeMongoDB();
        return;
      }
    }
    
    // Insert cities data
    let successCount = 0;
    for (const city of citiesData.cities) {
      try {
        await collection.insertOne({
          cityName: city.cityName,
          country: city.country,
          emoji: city.emoji,
          date: city.date,
          notes: city.notes || '',
          position: {
            lat: city.position.lat,
            lng: city.position.lng
          },
          createdAt: new Date(),
          updatedAt: new Date()
        });
        
        successCount++;
        console.log(`✅ Migrated: ${city.cityName}, ${city.country}`);
      } catch (error) {
        console.error(`❌ Failed to migrate ${city.cityName}:`, error.message);
      }
    }
    
    console.log(`🎉 Migration completed! Successfully migrated ${successCount}/${citiesData.cities.length} cities`);
    
    // Verify migration
    const finalCount = await collection.countDocuments();
    console.log(`📊 Total cities in database: ${finalCount}`);
    
  } catch (error) {
    console.error('💥 Migration failed:', error.message);
  } finally {
    await closeMongoDB();
  }
}

// Simple question helper for terminal input
function askQuestion(query) {
  return new Promise((resolve) => {
    const rl = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    rl.question(query, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

// Run migration if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrateData();
}