# EtherealGems - Next.js Version

A premium jewelry e-commerce website built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Stack**: Next.js 14, TypeScript, Tailwind CSS
- **State Management**: Zustand for client-side state
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **E-commerce Features**: Product catalog, shopping cart, user authentication
- **SEO Optimized**: Next.js built-in SEO features with proper meta tags
- **Static Export**: Optimized for static hosting platforms

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Build Tool**: Next.js built-in

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🌐 Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=https://etherealgems-backend.onrender.com
```

## 📁 Project Structure

```
etherealgems-nextjs/
├── components/          # React components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Navbar.tsx      # Navigation component
│   ├── Footer.tsx      # Footer component
│   ├── Hero.tsx        # Hero section
│   ├── ProductCard.tsx # Product display card
│   └── ...
├── pages/              # Next.js pages
│   ├── _app.tsx       # App wrapper
│   ├── index.tsx      # Homepage
│   ├── shop.tsx       # Shop page
│   ├── about.tsx      # About page
│   └── contact.tsx    # Contact page
├── stores/             # Zustand stores
│   ├── useProductStore.ts  # Product state
│   ├── useAuthStore.ts     # Authentication state
│   └── useCartStore.ts     # Shopping cart state
├── styles/             # Global styles
│   └── globals.css    # Tailwind CSS imports
└── public/            # Static assets
```

## 🎨 Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Colors**: Primary color scheme for brand consistency
- **Responsive Design**: Mobile-first breakpoints
- **Component-based**: Modular and reusable styles

## 🔄 State Management

### Zustand Stores

1. **Product Store** (`useProductStore`)
   - Manages product data and loading states
   - Handles API calls for product fetching

2. **Authentication Store** (`useAuthStore`)
   - User authentication state
   - Login/logout functionality
   - Persistent storage

3. **Cart Store** (`useCartStore`)
   - Shopping cart items
   - Add/remove/update cart items
   - Calculate totals

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build static export
npm run build

# Deploy the 'out' directory to any static hosting
```

## 🔗 API Integration

The application connects to the EtherealGems backend API:

- **Base URL**: `https://etherealgems-backend.onrender.com`
- **Endpoints**: Products, Authentication, Cart, Orders
- **Error Handling**: Graceful fallbacks for API failures

## 📱 Pages

- **Homepage** (`/`): Hero section, featured products, newsletter
- **Shop** (`/shop`): Product catalog with filtering
- **About** (`/about`): Company information and values
- **Contact** (`/contact`): Contact form and information
- **Product Details** (`/product/[id]`): Individual product page

## 🎯 Performance

- **Static Generation**: Pre-rendered pages for fast loading
- **Code Splitting**: Automatic code splitting by Next.js
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Optimized JavaScript bundles

## 🔧 Development

```bash
# Start development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build
```

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**EtherealGems** - Premium Jewelry E-commerce Platform