# 🚀 Worldwide App Deployment Guide

Your full-stack travel app is ready for production! Here's how to deploy it.

## 📋 Prerequisites

✅ **Backend**: Hono.js + MongoDB Atlas (Ready)  
✅ **Frontend**: React + Vite (Ready)  
✅ **Database**: MongoDB Atlas (Already hosted)  

## 🌐 Backend Deployment

### Option 1: Railway (Recommended)

1. **Go to [Railway.app](https://railway.app/)**
2. **Sign up/Login** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Connect your repo** and select the `backend` folder
5. **Environment Variables**:
   ```env
   MONGODB_URI=mongodb+srv://sarthakk145:xmlzUcsIlPi8wtSI@cluster0.0johnu3.mongodb.net/worldwide?retryWrites=true&w=majority
   PORT=8000
   NODE_ENV=production
   ```
6. **Deploy** - Railway will automatically use `npm start`

### Option 2: Render

1. **Go to [Render.com](https://render.com/)**
2. **New Web Service** → **Connect GitHub**
3. **Select your repo** → **Root Directory**: `backend`
4. **Settings**:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node Version**: 18+
5. **Environment Variables**: Same as above
6. **Deploy**

### Option 3: Vercel

1. **Install Vercel CLI**: `npm i -g vercel`
2. **From backend folder**: `vercel`
3. **Follow prompts** and set environment variables
4. **Deploy**

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Go to [Vercel.com](https://vercel.com/)**
2. **New Project** → **Import from GitHub**
3. **Select your repo** → **Root Directory**: `.` (project root)
4. **Framework**: Vite
5. **Environment Variables**:
   ```env
   VITE_API_URL=https://your-backend-url.railway.app
   ```
6. **Deploy**

### Option 2: Netlify

1. **Go to [Netlify.com](https://netlify.com/)**
2. **New site from Git** → **Connect GitHub**
3. **Settings**:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. **Environment Variables**: Same as above
5. **Deploy**

## ⚙️ Environment Variables Setup

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://sarthakk145:xmlzUcsIlPi8wtSI@cluster0.0johnu3.mongodb.net/worldwide?retryWrites=true&w=majority
PORT=8000
NODE_ENV=production
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend-url.railway.app
```

## 🔧 Update Frontend for Production

After deploying backend, update your frontend:

1. **Create `.env` file** in project root:
   ```env
   VITE_API_URL=https://your-backend-url.railway.app
   ```

2. **Verify `src/contexts/CitiesContext.jsx`** has:
   ```javascript
   const BASE_URL = import.meta.env.PROD 
     ? import.meta.env.VITE_API_URL 
     : "http://localhost:8000";
   ```

3. **Build and redeploy frontend**

## 🧪 Testing Your Live App

1. **Backend Health Check**:
   ```bash
   curl https://your-backend-url.railway.app/health
   ```

2. **Frontend**: Visit your Vercel/Netlify URL

3. **Test Features**:
   - ✅ Cities load from MongoDB Atlas
   - ✅ Add new cities (click map)
   - ✅ Delete cities (❌ button)
   - ✅ Navigate between cities

## 🔒 Security Notes

- ✅ **MongoDB Atlas**: IP whitelist set to `0.0.0.0/0` for global access
- ✅ **Environment Variables**: Stored securely in hosting platforms
- ✅ **CORS**: Configured for your frontend domain
- ✅ **HTTPS**: Automatic with Railway/Vercel

## 📊 Monitoring

### Backend Logs
- **Railway**: Dashboard → Logs
- **Render**: Dashboard → Logs
- **Vercel**: Functions → Logs

### Database
- **MongoDB Atlas**: Monitoring → Performance

## 🚀 Quick Deploy Commands

```bash
# Deploy Backend to Railway
cd backend
npm install
# Push to GitHub, deploy via Railway dashboard

# Deploy Frontend to Vercel
npm run build
npx vercel
```

## 🎯 Final Checklist

- [ ] Backend deployed and responding to `/health`
- [ ] MongoDB Atlas accessible from backend
- [ ] Frontend deployed with correct API URL
- [ ] All CRUD operations working
- [ ] Custom domain set up (optional)

## 🔗 Useful Links

- **Railway**: https://railway.app/
- **Vercel**: https://vercel.com/
- **MongoDB Atlas**: https://cloud.mongodb.com/
- **Your Repo**: [GitHub Link]

---

🎉 **Congratulations!** Your worldwide travel app is now live and accessible globally!

Your users can now:
- 🌍 View your travel cities
- 📍 Add their own cities
- 🗑️ Manage their travel history
- 💾 All data persists in the cloud

**Share your app with the world!** 🚀