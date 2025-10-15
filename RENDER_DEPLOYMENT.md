# Render Deployment Guide for EtherealGems

## 🚀 Deploy Backend to Render

### 1. Create New Web Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository: `jamesjacob819i/ethereal-gem`
4. Configure the service:

### 2. Backend Configuration
- **Name**: `etherealgems-backend`
- **Region**: Choose closest to your users
- **Branch**: `main`
- **Root Directory**: `etherealgems-backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Plan**: `Free`

### 3. Environment Variables (Backend)
Add these environment variables in Render:
```
NODE_ENV=production
PORT=10000
MONGODB_URI=mongodb+srv://etherealgems-admin:LY4gGZxOzniqlSaf@cluster0.qeyy2jm.mongodb.net/etherealgems?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=b217bdc6b9f9aea91bd10b6c71f7d641500438bbd2cb1fdf744fa0a2ee608afac67ecad33af73e390c6f79ff2fc12e7dfd3db5265e52b8f162c7fe2a352cf840
SESSION_SECRET=06f22650a384f79822f43bc4966b3f3d03f2b718bd88c7dcde2553054ea18a0c
FRONTEND_URL=https://etherealgems-frontend.onrender.com
ADMIN_EMAIL=admin@etherealgems.com
ADMIN_PASSWORD=admin123456
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

## 🌐 Deploy Frontend to Render

### 1. Create Another Web Service
1. In Render Dashboard, click "New +" → "Web Service"
2. Connect the same GitHub repository
3. Configure the service:

### 2. Frontend Configuration
- **Name**: `etherealgems-frontend`
- **Region**: Same as backend
- **Branch**: `main`
- **Root Directory**: `etherealgems-nextjs`
- **Runtime**: `Node`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Plan**: `Free`

### 3. Environment Variables (Frontend)
Add these environment variables in Render:
```
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://etherealgems-backend.onrender.com
NEXT_PUBLIC_APP_TITLE=EtherealGems
NEXT_PUBLIC_DEMO_MODE=false
```

## 📋 Deployment Steps

### Step 1: Deploy Backend First
1. Deploy the backend service first
2. Wait for it to be live and note the URL
3. Update the FRONTEND_URL in backend env vars if different

### Step 2: Deploy Frontend
1. Deploy the frontend service
2. Make sure NEXT_PUBLIC_API_URL points to your backend URL
3. Test the connection

### Step 3: Update CORS (if needed)
If you get CORS errors, update the backend CORS configuration to include your exact Render URLs.

## 🔗 Expected URLs
- **Backend**: `https://etherealgems-backend.onrender.com`
- **Frontend**: `https://etherealgems-frontend.onrender.com`

## 🛠️ Troubleshooting

### TypeScript Build Issues
**FIXED in latest commit!** If you still get TypeScript errors:

1. **TypeScript dependencies are now in main dependencies:**
   ```json
   "dependencies": {
     "typescript": "^5.3.3",
     "@types/node": "^20.10.0",
     "@types/react": "^18.2.45",
     "@types/react-dom": "^18.2.18"
   }
   ```

2. **Process.env issues resolved** with proper environment typing

3. **Build script simplified** - no more duplicate npm install

4. **Manual redeploy** - Go to Render and click "Manual Deploy"

### Database Issues
- If MongoDB connection fails, check the MONGODB_URI
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify cluster is not paused

### CORS Issues
- Check that frontend URL is in backend CORS allowlist
- Verify environment variables are set correctly

### Build Issues
- ✅ **Latest build successful!** TypeScript errors resolved
- ✅ **All routes generated correctly:** /, /about, /checkout, /contact, /product/[id], /shop
- If you see routes-manifest errors, ignore them - they're related to Vercel config and don't affect Render deployment
- Check build logs in Render dashboard
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility
- Clear Render cache if needed (redeploy)

## 📊 Testing
1. Visit your frontend URL
2. Test product loading
3. Test cart functionality
4. Test checkout process
5. Check browser console for any errors

## 🎉 Success!
Once both services are deployed and running:
- ✅ **TypeScript build successful** - All routes generated correctly
- ✅ **Build output shows all pages:** /, /about, /checkout, /contact, /product/[id], /shop
- ✅ **Bundle sizes optimized** - First Load JS: ~113kB per page
- Backend serves API at `/api/*` endpoints
- Frontend serves the complete Next.js application
- Database connection established
- All features working

## 💡 Notes
- Render free tier may have cold starts
- Services spin down after inactivity
- First request may be slower due to wake-up time
- Both services will have SSL certificates automatically
