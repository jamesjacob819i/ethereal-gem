const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Product price is required'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Original price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: {
      values: ['Necklaces', 'Bangles', 'Earrings', 'Bridal Sets', 'Rings', 'Anklets'],
      message: 'Please select a valid category'
    }
  },
  subcategory: {
    type: String,
    trim: true
  },
  images: [{
    public_id: String,
    url: String
  }],
  material: {
    type: String,
    default: 'Gold Plated'
  },
  weight: {
    type: String,
    default: '15g'
  },
  dimensions: {
    length: String,
    width: String,
    height: String
  },
  inStock: {
    type: Boolean,
    default: true
  },
  stockQuantity: {
    type: Number,
    default: 0,
    min: [0, 'Stock quantity cannot be negative']
  },
  featured: {
    type: Boolean,
    default: false
  },
  onSale: {
    type: Boolean,
    default: false
  },
  salePercentage: {
    type: Number,
    min: [0, 'Sale percentage cannot be negative'],
    max: [100, 'Sale percentage cannot exceed 100']
  },
  tags: [String],
  colors: [String],
  sizes: [String],
  careInstructions: {
    type: String,
    default: 'Store in a dry place away from moisture. Clean with a soft cloth.'
  },
  warranty: {
    type: String,
    default: '1 year warranty against manufacturing defects'
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating cannot be negative'],
    max: [5, 'Rating cannot exceed 5']
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    name: String,
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Create indexes for better performance
productSchema.index({ category: 1 });
productSchema.index({ price: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ name: 'text', description: 'text' });

// Calculate average rating
productSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.reviewCount = 0;
  } else {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.rating = Number((totalRating / this.reviews.length).toFixed(1));
    this.reviewCount = this.reviews.length;
  }
};

// Update stock quantity
productSchema.methods.updateStock = function(quantity) {
  this.stockQuantity -= quantity;
  this.inStock = this.stockQuantity > 0;
};

// Check if product is on sale
productSchema.virtual('isOnSale').get(function() {
  return this.originalPrice && this.originalPrice > this.price;
});

// Calculate sale percentage
productSchema.virtual('calculatedSalePercentage').get(function() {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  return 0;
});

// Ensure virtual fields are serialized
productSchema.set('toJSON', { virtuals: true });
productSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Product', productSchema);