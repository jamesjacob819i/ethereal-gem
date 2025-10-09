const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');

// Load env vars
dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/etherealgems');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Sample users data
const users = [
  {
    name: 'Admin User',
    email: process.env.ADMIN_EMAIL || 'admin@etherealgems.com',
    password: process.env.ADMIN_PASSWORD || 'admin123456',
    phone: '9876543210',
    role: 'admin',
    address: {
      street: '123 Admin Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400001',
      country: 'India'
    },
    isVerified: true
  },
  {
    name: 'Priya Sharma',
    email: 'priya@example.com',
    password: 'password123',
    phone: '9876543211',
    role: 'user',
    address: {
      street: '456 User Lane',
      city: 'Delhi',
      state: 'Delhi',
      pincode: '110001',
      country: 'India'
    },
    isVerified: true
  },
  {
    name: 'Anjali Patel',
    email: 'anjali@example.com',
    password: 'password123',
    phone: '9876543212',
    role: 'user',
    address: {
      street: '789 Customer Road',
      city: 'Bangalore',
      state: 'Karnataka',
      pincode: '560001',
      country: 'India'
    },
    isVerified: true
  }
];

// Sample products data
const products = [
  {
    name: 'Elegant Diamond Necklace',
    description: 'A stunning diamond necklace perfect for special occasions. This exquisite piece features carefully selected diamonds set in a classic design that radiates elegance and sophistication.',
    price: 15999,
    originalPrice: 18999,
    category: 'Necklaces',
    subcategory: 'Diamond',
    images: [
      {
        public_id: 'diamond_necklace_1',
        url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    material: 'White Gold with Diamonds',
    weight: '25g',
    inStock: true,
    stockQuantity: 15,
    featured: true,
    onSale: true,
    tags: ['diamond', 'luxury', 'occasion', 'elegant'],
    colors: ['White Gold'],
    careInstructions: 'Clean with soft cloth and store in provided jewelry box',
    warranty: '2 year warranty against manufacturing defects',
    rating: 4.8,
    reviewCount: 24,
    seo: {
      metaTitle: 'Elegant Diamond Necklace - EtherealGems',
      metaDescription: 'Beautiful diamond necklace for special occasions',
      keywords: ['diamond necklace', 'luxury jewelry', 'white gold']
    }
  },
  {
    name: 'Gold Plated Bangles Set',
    description: 'Beautiful set of 4 gold plated bangles with intricate traditional designs. Perfect for festive occasions and daily wear.',
    price: 2999,
    category: 'Bangles',
    subcategory: 'Traditional',
    images: [
      {
        public_id: 'gold_bangles_1',
        url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    material: 'Gold Plated Brass',
    weight: '40g (set of 4)',
    inStock: true,
    stockQuantity: 25,
    featured: true,
    tags: ['traditional', 'festive', 'gold', 'set'],
    colors: ['Gold'],
    rating: 4.6,
    reviewCount: 18
  },
  {
    name: 'Pearl Drop Earrings',
    description: 'Classic pearl drop earrings for elegant occasions. These timeless pieces feature genuine freshwater pearls suspended from delicate gold settings.',
    price: 1899,
    category: 'Earrings',
    subcategory: 'Pearl',
    images: [
      {
        public_id: 'pearl_earrings_1',
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    material: 'Gold Plated with Freshwater Pearls',
    weight: '8g',
    inStock: true,
    stockQuantity: 30,
    featured: true,
    tags: ['pearl', 'classic', 'elegant', 'formal'],
    colors: ['Gold', 'White Pearl'],
    rating: 4.7,
    reviewCount: 15
  },
  {
    name: 'Royal Bridal Set',
    description: 'Complete bridal jewelry set with necklace, earrings, and maang tikka. Crafted with precision for your special day.',
    price: 45999,
    originalPrice: 52999,
    category: 'Bridal Sets',
    subcategory: 'Complete Set',
    images: [
      {
        public_id: 'bridal_set_1',
        url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    material: 'Gold Plated with Kundan and Pearls',
    weight: '150g (complete set)',
    inStock: true,
    stockQuantity: 8,
    featured: true,
    onSale: true,
    tags: ['bridal', 'wedding', 'complete set', 'luxury', 'kundan'],
    colors: ['Gold', 'Red', 'Green'],
    rating: 4.9,
    reviewCount: 12
  },
  {
    name: 'Silver Chain Necklace',
    description: 'Delicate silver chain perfect for everyday wear. Minimalist design that complements any outfit.',
    price: 899,
    category: 'Necklaces',
    subcategory: 'Chain',
    images: [
      {
        public_id: 'silver_chain_1',
        url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    material: 'Sterling Silver',
    weight: '12g',
    inStock: true,
    stockQuantity: 40,
    featured: false,
    tags: ['silver', 'minimalist', 'daily wear', 'chain'],
    colors: ['Silver'],
    rating: 4.4,
    reviewCount: 28
  },
  {
    name: 'Kundan Earrings',
    description: 'Traditional Kundan earrings with intricate designs. Perfect for festivals and special occasions.',
    price: 3499,
    category: 'Earrings',
    subcategory: 'Kundan',
    images: [
      {
        public_id: 'kundan_earrings_1',
        url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    material: 'Gold Plated with Kundan Stones',
    weight: '18g',
    inStock: true,
    stockQuantity: 20,
    featured: false,
    tags: ['kundan', 'traditional', 'festive', 'heavy'],
    colors: ['Gold', 'Multi-color'],
    rating: 4.5,
    reviewCount: 22
  },
  {
    name: 'Rose Gold Ring',
    description: 'Elegant rose gold ring with a contemporary design. Perfect for engagements or as a fashion statement.',
    price: 5999,
    category: 'Rings',
    subcategory: 'Fashion',
    images: [
      {
        public_id: 'rose_gold_ring_1',
        url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    material: 'Rose Gold Plated',
    weight: '6g',
    inStock: true,
    stockQuantity: 18,
    featured: false,
    tags: ['rose gold', 'modern', 'ring', 'fashion'],
    colors: ['Rose Gold'],
    sizes: ['6', '7', '8', '9'],
    rating: 4.3,
    reviewCount: 10
  },
  {
    name: 'Temple Jewelry Set',
    description: 'Traditional temple jewelry set inspired by South Indian designs. Features intricate carvings and antique finish.',
    price: 12999,
    category: 'Bridal Sets',
    subcategory: 'Temple',
    images: [
      {
        public_id: 'temple_set_1',
        url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
      }
    ],
    material: 'Antique Gold Plated',
    weight: '85g',
    inStock: true,
    stockQuantity: 12,
    featured: true,
    tags: ['temple', 'traditional', 'south indian', 'antique'],
    colors: ['Antique Gold'],
    rating: 4.7,
    reviewCount: 16
  }
];

// Import data into DB
const importData = async () => {
  try {
    await connectDB();

    // Delete all data
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log('Data Destroyed...');

    // Create users
    const createdUsers = await User.create(users);
    console.log('Users imported...');

    // Add createdBy field to products (assign to admin user)
    const adminUser = createdUsers.find(user => user.role === 'admin');
    const productsWithCreator = products.map(product => ({
      ...product,
      createdBy: adminUser._id
    }));

    // Create products
    await Product.create(productsWithCreator);
    console.log('Products imported...');

    console.log('Data Imported Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error importing data:', error);
    process.exit(1);
  }
};

// Delete data
const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error('Error destroying data:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}