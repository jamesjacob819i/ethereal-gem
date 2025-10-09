# 🚀 Backend Deployment Checklist

## Quick Deploy Guide

### Option 1: Render.com (Recommended - Free Tier)

1. **📊 Setup MongoDB Atlas (5 minutes)**
   ```
   1. Go to mongodb.com/atlas
   2. Create free account
   3. Create cluster (M0 Free)
   4. Create database user
   5. Set Network Access to 0.0.0.0/0
   6. Get connection string
   ```

2. **🚀 Deploy to Render (3 minutes)**
   ```
   1. Go to render.com
   2. Connect GitHub
   3. New Web Service
   4. Select your repository
   5. Configure:
      - Name: etherealgems-backend
      - Environment: Node
      - Root Directory: etherealgems-backend
      - Build Command: npm install
      - Start Command: npm start
   ```

3. **🔐 Environment Variables**
   Add these in Render dashboard:
   ```
   NODE_ENV=production
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_generated_secret_here
   FRONTEND_URL=https://your-frontend.vercel.app
   ADMIN_EMAIL=admin@etherealgems.com
   ADMIN_PASSWORD=admin123456
   SESSION_SECRET=your_session_secret
   ```

4. **🎯 Test Deployment**
   ```
   GET https://your-app.onrender.com/
   GET https://your-app.onrender.com/api/products
   ```

### Option 2: Railway.app (Alternative)

1. Go to railway.app
2. Connect GitHub repository
3. Deploy etherealgems-backend
4. Add same environment variables

### 🔑 Generate Secrets

**Run these commands to generate secure secrets:**

```bash
# JWT Secret
node -e "console.log('JWT_SECRET=' + require('crypto').randomBytes(64).toString('hex'))"

# Session Secret  
node -e "console.log('SESSION_SECRET=' + require('crypto').randomBytes(32).toString('hex'))"
```

### 🔗 Connect Frontend

After backend is deployed, update frontend:

1. **In Vercel dashboard, update environment variables:**
   ```
   VITE_API_URL=https://your-backend.onrender.com
   VITE_DEMO_MODE=false
   ```

2. **Redeploy frontend**

### 🌱 Seed Database (Optional)

After deployment:
1. Go to Render dashboard
2. Open your service shell
3. Run: `npm run seed`

### ✅ Verification Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Backend deployed to Render
- [ ] Environment variables set
- [ ] API endpoints responding
- [ ] Frontend updated with backend URL
- [ ] Login working
- [ ] Products loading

### 🛠️ Troubleshooting

**Common Issues:**
- **MongoDB connection:** Check Atlas IP whitelist
- **CORS errors:** Verify FRONTEND_URL is correct
- **Build failures:** Check Node.js version
- **API not responding:** Check Render logs

**Debug Steps:**
1. Check Render deployment logs
2. Test individual API endpoints
3. Verify all environment variables
4. Check MongoDB Atlas connectivity

---

**Estimated Time:** 15-20 minutes total
**Cost:** $0 (using free tiers)