const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    unique: true,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    image: String
  }],
  shippingAddress: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    pincode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      default: 'India'
    }
  },
  paymentInfo: {
    paymentMethod: {
      type: String,
      required: true,
      enum: ['upi', 'card', 'cod', 'netbanking']
    },
    paymentId: String,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String
  },
  pricing: {
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    tax: {
      type: Number,
      default: 0,
      min: 0
    },
    shippingCharges: {
      type: Number,
      default: 0,
      min: 0
    },
    discount: {
      type: Number,
      default: 0,
      min: 0
    },
    total: {
      type: Number,
      required: true,
      min: 0
    }
  },
  orderStatus: {
    type: String,
    enum: [
      'pending',
      'confirmed',
      'processing',
      'shipped',
      'delivered',
      'cancelled',
      'refunded'
    ],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  trackingInfo: {
    trackingNumber: String,
    carrier: String,
    estimatedDelivery: Date,
    shippedAt: Date,
    deliveredAt: Date
  },
  notes: String,
  promoCode: {
    code: String,
    discount: Number
  },
  orderHistory: [{
    status: String,
    message: String,
    timestamp: {
      type: Date,
      default: Date.now
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  cancelReason: String,
  refundAmount: Number,
  refundDate: Date,
  isGiftOrder: {
    type: Boolean,
    default: false
  },
  giftMessage: String,
  expectedDeliveryDate: Date
}, {
  timestamps: true
});

// Create indexes
orderSchema.index({ user: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });

// Generate order number
orderSchema.pre('save', async function(next) {
  if (this.isNew && !this.orderNumber) {
    const timestamp = Date.now().toString();
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    this.orderNumber = `EG${timestamp.slice(-6)}${random}`;
  }
  next();
});

// Calculate totals
orderSchema.methods.calculateTotals = function() {
  this.pricing.subtotal = this.items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
  
  // Calculate tax (18% GST)
  this.pricing.tax = Math.round(this.pricing.subtotal * 0.18);
  
  // Apply discount if any
  const discountAmount = this.pricing.discount || 0;
  
  // Calculate total
  this.pricing.total = this.pricing.subtotal + this.pricing.tax + this.pricing.shippingCharges - discountAmount;
  
  return this.pricing.total;
};

// Update order status
orderSchema.methods.updateStatus = function(status, message, updatedBy) {
  this.orderStatus = status;
  
  this.orderHistory.push({
    status,
    message,
    updatedBy,
    timestamp: new Date()
  });
  
  // Update specific timestamps
  if (status === 'shipped' && !this.trackingInfo.shippedAt) {
    this.trackingInfo.shippedAt = new Date();
  }
  
  if (status === 'delivered' && !this.trackingInfo.deliveredAt) {
    this.trackingInfo.deliveredAt = new Date();
  }
};

// Check if order can be cancelled
orderSchema.methods.canBeCancelled = function() {
  const nonCancellableStatuses = ['shipped', 'delivered', 'cancelled', 'refunded'];
  return !nonCancellableStatuses.includes(this.orderStatus);
};

// Virtual for order age in days
orderSchema.virtual('orderAge').get(function() {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

// Virtual for formatted order number
orderSchema.virtual('formattedOrderNumber').get(function() {
  return `#${this.orderNumber}`;
});

// Ensure virtual fields are serialized
orderSchema.set('toJSON', { virtuals: true });
orderSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Order', orderSchema);