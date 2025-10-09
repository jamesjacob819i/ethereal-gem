# EtherealGems Backend - Deployment Guide

## 🚀 Deploy to Render (Recommended)

### Step 1: Prepare MongoDB Atlas

1. **Create MongoDB Atlas Account:**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create free cluster
   - Get connection string

2. **Setup Database:**
   - Create database user
   - Whitelist IP: `0.0.0.0/0` (for Render)
   - Copy connection string

### Step 2: Deploy to Render

1. **Connect Repository:**
   - Go to [render.com](https://render.com)
   - Connect your GitHub account
   - Select this repository
   - Choose "Web Service"

2. **Configure Service:**
   ```
   Name: etherealgems-backend
   Environment: Node
   Region: Choose closest to your users
   Branch: main
   Root Directory: etherealgems-backend
   Build Command: npm install
   Start Command: npm start
   ```

3. **Environment Variables:**
   ```
   NODE_ENV = production
   PORT = 5000
   MONGODB_URI = your_mongodb_atlas_connection_string
   JWT_SECRET = generate_a_long_random_string_here
   FRONTEND_URL = https://your-frontend-url.vercel.app
   ADMIN_EMAIL = admin@etherealgems.com
   ADMIN_PASSWORD = admin123456
   SESSION_SECRET = another_random_string
   ```

### Step 3: Generate Secrets

**JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Session Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 4: Test Deployment

After deployment, test these endpoints:
- `GET https://your-backend-url.onrender.com/` - Should return API info
- `GET https://your-backend-url.onrender.com/api/products` - Should return products
- `POST https://your-backend-url.onrender.com/api/auth/login` - Should accept login

### Step 5: Seed Database (Optional)

After deployment, you can seed the database:
1. Go to Render dashboard
2. Open your service
3. Go to "Shell" tab
4. Run: `npm run seed`

### Step 6: Update Frontend

Update your frontend environment variables:
```
VITE_API_URL = https://your-backend-url.onrender.com
VITE_DEMO_MODE = false
```

## 🔧 Alternative: Railway Deployment

1. **Connect to Railway:**
   - Go to [railway.app](https://railway.app)
   - Connect GitHub repository
   - Select etherealgems-backend folder

2. **Configure:**
   - Framework: Node.js
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Root Directory: `etherealgems-backend`

3. **Add same environment variables as above**

## 📊 Monitoring

- **Render:** Built-in logging and metrics
- **Railway:** Deployment logs and monitoring
- **Health Check:** Both platforms will monitor `/` endpoint

## 🛠️ Local Development

```bash
cd etherealgems-backend
npm install
npm run dev
```

## 🔍 Troubleshooting

**Common Issues:**
1. **MongoDB Connection:** Check connection string and IP whitelist
2. **CORS Errors:** Verify FRONTEND_URL is set correctly
3. **Environment Variables:** Ensure all required vars are set
4. **Port Issues:** Render automatically assigns PORT, don't override

**Debug Steps:**
1. Check deployment logs
2. Test API endpoints individually
3. Verify environment variables
4. Check MongoDB Atlas connectivity