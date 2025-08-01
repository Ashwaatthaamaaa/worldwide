import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import dotenv from 'dotenv';
import { connectToMongoDB, closeMongoDB } from './database.js';
import cityService from './services/cityService.js';

// Load environment variables
dotenv.config();

const app = new Hono();

// CORS middleware
app.use('/*', cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'], // Add your frontend URLs
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// Health check endpoint
app.get('/health', (c) => {
  return c.json({ 
    status: 'OK', 
    message: 'Worldwide API is running',
    timestamp: new Date().toISOString()
  });
});

// Get all cities
app.get('/cities', async (c) => {
  try {
    const cities = await cityService.getAllCities();
    return c.json(cities);
  } catch (error) {
    console.error('GET /cities error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Get city by ID
app.get('/cities/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const city = await cityService.getCityById(id);
    return c.json(city);
  } catch (error) {
    console.error('GET /cities/:id error:', error);
    
    if (error.message === 'City not found') {
      return c.json({ error: 'City not found' }, 404);
    }
    
    return c.json({ error: error.message }, 500);
  }
});

// Create new city
app.post('/cities', async (c) => {
  try {
    const cityData = await c.req.json();
    
    // Basic validation
    if (!cityData.cityName || !cityData.country || !cityData.position) {
      return c.json({ 
        error: 'Missing required fields: cityName, country, position' 
      }, 400);
    }

    const newCity = await cityService.createCity(cityData);
    return c.json(newCity, 201);
  } catch (error) {
    console.error('POST /cities error:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Update city
app.put('/cities/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const updateData = await c.req.json();
    
    const updatedCity = await cityService.updateCity(id, updateData);
    return c.json(updatedCity);
  } catch (error) {
    console.error('PUT /cities/:id error:', error);
    
    if (error.message === 'City not found') {
      return c.json({ error: 'City not found' }, 404);
    }
    
    return c.json({ error: error.message }, 500);
  }
});

// Delete city
app.delete('/cities/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await cityService.deleteCity(id);
    return c.json({ message: 'City deleted successfully' });
  } catch (error) {
    console.error('DELETE /cities/:id error:', error);
    
    if (error.message === 'City not found') {
      return c.json({ error: 'City not found' }, 404);
    }
    
    return c.json({ error: error.message }, 500);
  }
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Endpoint not found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({ error: 'Internal server error' }, 500);
});

// Start server
const port = parseInt(process.env.PORT) || 8000;

async function startServer() {
  try {
    // Connect to MongoDB
    await connectToMongoDB();
    
    // Start the server
    console.log(`🚀 Server starting on port ${port}`);
    serve({
      fetch: app.fetch,
      port
    });
    
    console.log(`✅ Server running at http://localhost:${port}`);
    console.log(`📊 Health check: http://localhost:${port}/health`);
    console.log(`🏙️  Cities API: http://localhost:${port}/cities`);
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server...');
  await closeMongoDB();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Shutting down server...');
  await closeMongoDB();
  process.exit(0);
});

startServer();