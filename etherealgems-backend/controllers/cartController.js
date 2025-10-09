// Cart functionality is primarily handled on the frontend with Pinia
// These routes provide server-side cart operations if needed

const Product = require('../models/Product');

// @desc    Validate cart items
// @route   POST /api/cart/validate
// @access  Private
exports.validateCart = async (req, res, next) => {
  try {
    const { items } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No cart items provided'
      });
    }

    const productIds = items.map(item => item.id);
    const products = await Product.find({ _id: { $in: productIds } });

    const validatedItems = [];
    const errors = [];

    for (const item of items) {
      const product = products.find(p => p._id.toString() === item.id);
      
      if (!product) {
        errors.push(`Product ${item.name} not found`);
        continue;
      }

      if (!product.inStock) {
        errors.push(`${product.name} is out of stock`);
        continue;
      }

      if (product.stockQuantity < item.quantity) {
        errors.push(`Only ${product.stockQuantity} items available for ${product.name}`);
        continue;
      }

      if (product.price !== item.price) {
        validatedItems.push({
          ...item,
          price: product.price,
          priceChanged: true,
          oldPrice: item.price
        });
      } else {
        validatedItems.push({
          ...item,
          priceChanged: false
        });
      }
    }

    res.status(200).json({
      success: true,
      validatedItems,
      errors,
      hasErrors: errors.length > 0
    });
  } catch (error) {
    console.error('Cart validation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error validating cart'
    });
  }
};

// @desc    Calculate cart totals
// @route   POST /api/cart/calculate
// @access  Public
exports.calculateCart = async (req, res, next) => {
  try {
    const { items, promoCode } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No cart items provided'
      });
    }

    let subtotal = 0;
    let itemCount = 0;

    // Calculate subtotal
    for (const item of items) {
      subtotal += item.price * item.quantity;
      itemCount += item.quantity;
    }

    // Calculate tax (18% GST)
    const tax = Math.round(subtotal * 0.18);

    // Calculate shipping
    const shippingCharges = subtotal > 500 ? 0 : 50; // Free shipping above ₹500

    // Apply promo code discount
    let discount = 0;
    let promoCodeStatus = null;

    if (promoCode) {
      // Simple promo code logic
      switch (promoCode.toUpperCase()) {
        case 'WELCOME10':
          discount = Math.round(subtotal * 0.1); // 10% discount
          promoCodeStatus = {
            valid: true,
            discount: 10,
            message: '10% discount applied'
          };
          break;
        case 'SAVE50':
          discount = 50;
          promoCodeStatus = {
            valid: true,
            discount: 50,
            message: '₹50 discount applied'
          };
          break;
        default:
          promoCodeStatus = {
            valid: false,
            message: 'Invalid promo code'
          };
      }
    }

    const total = subtotal + tax + shippingCharges - discount;

    res.status(200).json({
      success: true,
      cart: {
        itemCount,
        subtotal,
        tax,
        shippingCharges,
        discount,
        total,
        promoCodeStatus
      }
    });
  } catch (error) {
    console.error('Cart calculation error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error calculating cart'
    });
  }
};

// @desc    Check product availability
// @route   GET /api/cart/check/:productId
// @access  Public
exports.checkProductAvailability = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const quantity = parseInt(req.query.quantity) || 1;

    const available = product.inStock && product.stockQuantity >= quantity;

    res.status(200).json({
      success: true,
      product: {
        id: product._id,
        name: product.name,
        price: product.price,
        inStock: product.inStock,
        stockQuantity: product.stockQuantity,
        available,
        maxQuantity: product.stockQuantity
      }
    });
  } catch (error) {
    console.error('Product availability check error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error checking product availability'
    });
  }
};