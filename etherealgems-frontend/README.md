# EtherealGems Frontend - Deployment Guide

## 🚀 Quick Deploy to Vercel

### Prerequisites
- Node.js 18+ installed
- Vercel account
- GitHub repository

### Deployment Steps

1. **Push to GitHub** (if not already done)
2. **Import to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure as follows:

### Vercel Configuration

**Project Settings:**
- **Framework Preset:** `Vite`
- **Root Directory:** `etherealgems-frontend`
- **Node.js Version:** `18.x`

**Build Settings:**
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `dist` (auto-detected)
- **Install Command:** `npm ci` (auto-detected)

**Environment Variables:**
```
VITE_API_URL = https://your-backend-url.onrender.com
VITE_APP_TITLE = EtherealGems
VITE_APP_DESCRIPTION = Luxury Jewelry E-commerce Platform
VITE_DEMO_MODE = true
```

### Demo Mode

The frontend is configured to work in demo mode when `VITE_DEMO_MODE=true`:
- Shows sample jewelry products
- Allows demo login with: `admin@etherealgems.com` / `admin123456`
- Works without backend connection
- Displays demo banner to inform users

### Backend Integration

To connect to a real backend:
1. Deploy the backend to Render/Railway
2. Update `VITE_API_URL` environment variable
3. Set `VITE_DEMO_MODE=false`
4. Redeploy

### Features in Demo Mode
- ✅ Browse sample products
- ✅ Add to cart functionality
- ✅ Search and filter products
- ✅ Authentication UI (demo login)
- ✅ Responsive design
- ✅ All pages functional

### Troubleshooting

If deployment fails:
1. Check Node.js version is 18+
2. Ensure `dist` folder can be built locally
3. Verify environment variables are set
4. Check build logs in Vercel dashboard

### Local Development

```bash
cd etherealgems-frontend
npm install
npm run dev
```

Open http://localhost:5173

### Build for Production

```bash
npm run build
npm run preview  # Test production build locally
```
