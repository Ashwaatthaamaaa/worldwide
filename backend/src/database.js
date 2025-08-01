import { MongoClient, ObjectId } from 'mongodb';

let client;
let db;

export async function connectToMongoDB() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    db = client.db('worldwide');
    console.log('✅ Connected to MongoDB Atlas');
  }
  return db;
}

export function getDB() {
  if (!db) {
    throw new Error('Database not connected. Call connectToMongoDB first.');
  }
  return db;
}

export { ObjectId };

export async function closeMongoDB() {
  if (client) {
    await client.close();
    console.log('❌ MongoDB connection closed');
  }
}