# Vercel Deployment Guide for EtherealGems Frontend

## 🚀 Deploy Frontend to Vercel

Since you're using Next.js, Vercel is the perfect hosting platform! Here's how to deploy:

### 1. Quick Deployment Steps

1. **Go to [Vercel](https://vercel.com/)**
2. **Sign in with GitHub**
3. **Import your repository**: `jamesjacob819i/ethereal-gem`
4. **Configure the project:**
   - **Framework Preset**: Next.js
   - **Root Directory**: `etherealgems-nextjs`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

### 2. Environment Variables
Add these in Vercel project settings:

```
NEXT_PUBLIC_API_URL=https://etherealgems-backend.onrender.com
NEXT_PUBLIC_APP_TITLE=EtherealGems
NEXT_PUBLIC_DEMO_MODE=false
```

### 3. Backend CORS Update
Update your backend to allow Vercel domain. In `etherealgems-backend/server.js`:

```javascript
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://etherealgems-frontend.onrender.com',
    'https://your-project-name.vercel.app', // Add your Vercel URL here
    'https://your-project-name-git-main-yourusername.vercel.app'
  ],
  credentials: true
}
```

## 🎯 Expected Vercel URL

Your frontend will be available at:
- **Production**: `https://your-project-name.vercel.app`
- **Preview**: Auto-generated for each PR

## ✅ Advantages of Vercel for Next.js

- **Automatic deployments** on git push
- **Preview deployments** for PRs
- **Edge functions** and optimized performance
- **Built for Next.js** - zero configuration needed
- **Free tier** with generous limits
- **Global CDN** for fast loading

## 🔧 Configuration Files

### Option 1: No Configuration (Recommended)
Vercel auto-detects Next.js projects and uses optimal settings.
**No vercel.json file needed!** Vercel will automatically:
- Detect Next.js framework
- Install dependencies
- Run build command
- Configure environment variables in dashboard

### Option 2: Custom vercel.json (Optional)
Only use if you need custom configuration:
```json
{
  "env": {
    "NEXT_PUBLIC_API_URL": "https://etherealgems-backend.onrender.com",
    "NEXT_PUBLIC_APP_TITLE": "EtherealGems",
    "NEXT_PUBLIC_DEMO_MODE": "false"
  }
}
```

**Recommendation: Skip vercel.json and use Vercel dashboard for environment variables.**

## 🛠️ Troubleshooting

### Build Issues
- ✅ **TypeScript build is working** - All dependencies resolved
- Vercel automatically installs dependencies
- Build logs available in Vercel dashboard

### Environment Variables
- Set in Vercel project dashboard
- Available during build and runtime
- Can be different for preview vs production

### CORS Issues
- Update backend CORS to include Vercel URLs
- Test with your actual Vercel domain

## 🚀 Deployment Architecture

```
Frontend (Vercel)     →     Backend (Render)     →     Database (MongoDB Atlas)
Next.js App                 Node.js/Express            MongoDB
Global CDN                  RESTful API                User Data & Products
```

## 📋 Deployment Checklist

- [ ] Fork/clone repository on GitHub
- [ ] Import project to Vercel
- [ ] Set root directory to `etherealgems-nextjs`
- [ ] Add environment variables
- [ ] Deploy and test
- [ ] Update backend CORS with Vercel URL
- [ ] Test frontend-backend communication

## 🎉 Success!

Once deployed on Vercel:
- ✅ Automatic HTTPS
- ✅ Global CDN distribution  
- ✅ Instant deployments
- ✅ Preview environments
- ✅ Analytics and monitoring

Your EtherealGems frontend will be live and optimized! 🚀