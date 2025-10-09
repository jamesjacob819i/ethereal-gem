# EtherealGems - Full-Stack Jewelry E-commerce Platform

A stunning, full-stack jewelry e-commerce website built with modern technologies. Inspired by luxury jewelry boutiques but designed to be student-budget friendly and educational.

## 🌟 Features

### Frontend (Vue.js)
- **Modern UI/UX**: Elegant design with Tailwind CSS and custom purple theme
- **Responsive Design**: Mobile-first approach with smooth animations
- **Product Catalog**: Grid/list view with advanced filtering and search
- **Shopping Cart**: Real-time cart management with Pinia state management
- **User Authentication**: JWT-based login/register system
- **Product Details**: Comprehensive product pages with image galleries
- **Checkout Flow**: Complete checkout process with payment integration ready
- **Pages**: Home, Shop, Product Details, Cart, Checkout, About, Contact

### Backend (Node.js + Express)
- **RESTful API**: Well-structured API endpoints
- **Authentication**: JWT-based auth with bcrypt password hashing
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet, rate limiting, CORS protection
- **File Upload**: Multer + Cloudinary integration ready
- **Email System**: Nodemailer with Gmail integration
- **Payment Gateway**: Razorpay UPI integration structure
- **Admin Panel**: Admin routes for managing products, orders, and users

### Database Schema
- **Users**: Authentication, profiles, addresses, wishlist
- **Products**: Comprehensive product information, reviews, inventory
- **Orders**: Complete order management with status tracking

## 🚀 Tech Stack

### Frontend
- **Framework**: Vue 3 with Composition API
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **Styling**: Tailwind CSS
- **Fonts**: Poppins & Inter (Google Fonts)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Security**: Helmet, CORS, express-rate-limit
- **Email**: Nodemailer
- **Payment**: Razorpay (structure ready)
- **File Upload**: Multer + Cloudinary (ready)

## 📁 Project Structure

```
ethereal gem/
├── etherealgems-frontend/          # Vue.js Frontend
│   ├── src/
│   │   ├── components/             # Reusable Vue components
│   │   │   ├── cart/              # Cart-related components
│   │   │   ├── layout/            # Layout components (Navbar, Footer)
│   │   │   └── product/           # Product-related components
│   │   ├── views/                 # Page components
│   │   ├── stores/                # Pinia state management
│   │   ├── router/                # Vue Router configuration
│   │   └── assets/                # Static assets
│   ├── public/                    # Public assets
│   └── package.json               # Frontend dependencies
│
└── etherealgems-backend/           # Node.js Backend
    ├── controllers/               # Route controllers
    ├── models/                    # Mongoose models
    ├── routes/                    # API routes
    ├── middleware/                # Custom middleware
    ├── utils/                     # Utility functions
    ├── uploads/                   # File upload directory
    ├── .env                       # Environment variables
    ├── server.js                  # Main server file
    ├── seeder.js                  # Database seeder
    └── package.json               # Backend dependencies
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd "ethereal gem"
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd etherealgems-backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configurations
# Update MongoDB URI, JWT secret, email credentials, etc.

# Seed the database (optional)
npm run seed

# Start development server
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (open new terminal)
cd etherealgems-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000 (shows available endpoints)

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgotpassword` - Forgot password
- `PUT /api/auth/resetpassword/:token` - Reset password

### Products
- `GET /api/products` - Get all products (with filtering)
- `GET /api/products/:id` - Get single product
- `GET /api/products/categories` - Get product categories
- `GET /api/products/featured` - Get featured products
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)
- `POST /api/products/:id/reviews` - Add product review

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/cancel` - Cancel order
- `POST /api/orders/:id/payment` - Process payment

### Cart
- `POST /api/cart/validate` - Validate cart items
- `POST /api/cart/calculate` - Calculate cart totals
- `GET /api/cart/check/:productId` - Check product availability

### Admin
- `GET /api/admin/stats` - Dashboard statistics
- `GET /api/admin/orders` - All orders management
- `GET /api/admin/users` - User management
- `GET /api/admin/reports` - Sales reports
- `PUT /api/admin/users/:id/role` - Update user role
- `DELETE /api/admin/users/:id` - Delete user

## 🎨 Design Features

### Color Scheme
- **Primary**: Purple gradient (#667eea to #764ba2)
- **Secondary**: Gold accents (#fbbf24)
- **Background**: Clean whites and subtle grays
- **Typography**: Poppins for headings, Inter for body text

### UI Components
- **Responsive Navigation**: Desktop and mobile-friendly
- **Product Cards**: Hover effects and quick actions
- **Shopping Cart**: Slide-out sidebar with real-time updates
- **Image Galleries**: Product image carousels
- **Forms**: Elegant form designs with validation
- **Buttons**: Gradient and solid button variants

## 💳 Payment Integration

The platform is structured for Razorpay UPI integration:

### Frontend Integration
```javascript
// Payment process structure (in Checkout.vue)
const processPayment = async () => {
  // 1. Create order on backend
  // 2. Initialize Razorpay
  // 3. Handle payment success/failure
  // 4. Update order status
}
```

### Backend Structure
```javascript
// Payment verification (in orderController.js)
exports.processPayment = async (req, res) => {
  // 1. Verify Razorpay signature
  // 2. Update payment status
  // 3. Send confirmation email
}
```

## 📧 Email System

Configured with Nodemailer for:
- Welcome emails
- Order confirmations
- Password reset emails
- Payment confirmations

## 🔐 Security Features

- JWT authentication with secure tokens
- Password hashing with bcrypt
- Rate limiting for API endpoints
- CORS protection
- Helmet for security headers
- Input validation and sanitization

## 📱 Mobile Responsiveness

- Mobile-first design approach
- Responsive navigation with hamburger menu
- Touch-friendly cart interactions
- Optimized product grids for all screen sizes
- Mobile-optimized checkout process

## 🧪 Testing

### Sample Users
```
Admin User:
Email: admin@etherealgems.com
Password: admin123456

Regular User:
Email: priya@example.com
Password: password123
```

### Sample Products
- 8 pre-seeded jewelry products
- Multiple categories (Necklaces, Bangles, Earrings, Bridal Sets, Rings)
- Featured and regular products
- Various price ranges

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Configure environment variables

### Backend (Render/Railway)
1. Set up environment variables
2. Configure MongoDB Atlas
3. Deploy repository
4. Run database seeder

### Environment Variables
```bash
# Backend (.env)
NODE_ENV=production
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

## 🔄 Development Workflow

### Adding New Features
1. **Backend**: Create models → controllers → routes → test
2. **Frontend**: Create components → integrate with stores → test UI
3. **Integration**: Connect frontend stores with backend APIs

### Code Structure
- **Controllers**: Handle business logic
- **Models**: Define data structure and validation
- **Middleware**: Handle authentication and validation
- **Stores**: Manage frontend state
- **Components**: Reusable UI elements

## 📊 Features for Enhancement

### Immediate Enhancements
- [ ] Image upload functionality
- [ ] Real payment gateway integration
- [ ] Email service setup
- [ ] Admin dashboard UI
- [ ] Product image optimization

### Advanced Features
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Inventory management
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] Progressive Web App (PWA)
- [ ] Real-time notifications

## 🎯 Learning Outcomes

This project demonstrates:
- Full-stack JavaScript development
- RESTful API design and implementation
- Modern frontend frameworks (Vue 3)
- State management (Pinia)
- Database design and modeling
- Authentication and authorization
- Payment gateway integration
- Responsive web design
- Security best practices
- Deployment strategies

## 📝 License

This project is created for educational purposes. Feel free to use it as a learning resource or starting point for your own e-commerce projects.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support:
- Create an issue in the repository
- Check the API documentation at `/api` endpoint
- Review the code comments for implementation details

---

**EtherealGems** - Making luxury jewelry accessible through elegant technology ✨