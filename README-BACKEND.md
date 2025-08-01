# Worldwide Backend Setup

## 🚀 Quick Start

### 1. Install Backend Dependencies
```bash
cd backend
npm install
```

### 2. Setup Environment Variables
Create `backend/.env` file with your MongoDB Atlas connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/worldwide?retryWrites=true&w=majority
PORT=8000
NODE_ENV=development
```

### 3. Migrate Your Data (One-time only)
```bash
npm run backend:migrate
```

### 4. Start the Backend
```bash
npm run backend
```

Your API will be available at: http://localhost:8000

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/cities` | Get all cities |
| GET | `/cities/:id` | Get city by ID |
| POST | `/cities` | Create new city |
| PUT | `/cities/:id` | Update city |
| DELETE | `/cities/:id` | Delete city |

## 🏗️ Tech Stack

- **Hono.js** - Ultra-fast web framework
- **MongoDB Atlas** - Cloud database
- **Node.js** - Runtime environment

## 🚢 Deployment

This backend can be deployed to:
- Railway
- Render
- Vercel
- Cloudflare Workers
- Any Node.js hosting service

## 🔧 Development vs Production

- **Development**: Uses json-server for local testing
- **Production**: Uses MongoDB Atlas backend

Switch by updating the frontend environment variables.