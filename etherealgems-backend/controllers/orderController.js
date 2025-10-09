const Order = require('../models/Order');
const Product = require('../models/Product');
const { sendEmail, emailTemplates } = require('../utils/email');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res, next) => {
  try {
    const {
      items,
      shippingAddress,
      paymentInfo,
      promoCode
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items provided'
      });
    }

    // Verify products exist and are in stock
    const productIds = items.map(item => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    if (products.length !== items.length) {
      return res.status(400).json({
        success: false,
        message: 'One or more products not found'
      });
    }

    // Check stock and prepare order items
    const orderItems = [];
    let subtotal = 0;

    for (const item of items) {
      const product = products.find(p => p._id.toString() === item.product);
      
      if (!product.inStock || product.stockQuantity < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `${product.name} is out of stock`
        });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.images[0]?.url || ''
      });

      subtotal += product.price * item.quantity;
    }

    // Calculate pricing
    const tax = Math.round(subtotal * 0.18); // 18% GST
    const shippingCharges = subtotal > 500 ? 0 : 50; // Free shipping above ₹500
    let discount = 0;

    // Apply promo code if provided
    if (promoCode && promoCode.code) {
      // Simple promo code logic - in production, this would be more sophisticated
      if (promoCode.code === 'WELCOME10') {
        discount = Math.round(subtotal * 0.1); // 10% discount
      }
    }

    const total = subtotal + tax + shippingCharges - discount;

    // Create order
    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      shippingAddress,
      paymentInfo,
      pricing: {
        subtotal,
        tax,
        shippingCharges,
        discount,
        total
      },
      promoCode
    });

    // Update product stock
    for (const item of items) {
      const product = products.find(p => p._id.toString() === item.product);
      product.updateStock(item.quantity);
      await product.save();
    }

    // Send order confirmation email
    try {
      const orderConfirmationEmail = emailTemplates.orderConfirmation(order);
      await sendEmail({
        to: shippingAddress.email,
        ...orderConfirmationEmail
      });
    } catch (emailError) {
      console.error('Order confirmation email failed:', emailError.message);
    }

    const populatedOrder = await Order.findById(order._id)
      .populate('items.product', 'name images')
      .populate('user', 'name email');

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order: populatedOrder
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error creating order'
    });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/myorders
// @access  Private
exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product', 'name images')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (error) {
    console.error('Get my orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching orders'
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
exports.getOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name images')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Make sure user owns this order or is admin
    if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this order'
      });
    }

    res.status(200).json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching order'
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Admin only)
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status, message } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    order.updateStatus(status, message, req.user.id);
    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error updating order status'
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
exports.cancelOrder = async (req, res, next) => {
  try {
    const { reason } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if user owns this order
    if (order.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }

    if (!order.canBeCancelled()) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled in current status'
      });
    }

    order.updateStatus('cancelled', reason || 'Cancelled by user', req.user.id);
    order.cancelReason = reason;

    // Restore product stock
    for (const item of order.items) {
      const product = await Product.findById(item.product);
      if (product) {
        product.stockQuantity += item.quantity;
        product.inStock = true;
        await product.save();
      }
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Order cancelled successfully',
      order
    });
  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error cancelling order'
    });
  }
};

// @desc    Process payment for order
// @route   POST /api/orders/:id/payment
// @access  Private
exports.processPayment = async (req, res, next) => {
  try {
    const { paymentId, razorpayOrderId, razorpaySignature } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Verify payment (in production, verify with Razorpay)
    // For now, we'll just mark as paid
    order.paymentStatus = 'paid';
    order.paymentInfo.razorpayPaymentId = paymentId;
    order.paymentInfo.razorpayOrderId = razorpayOrderId;
    order.paymentInfo.razorpaySignature = razorpaySignature;
    order.updateStatus('confirmed', 'Payment successful', req.user.id);

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Payment processed successfully',
      order
    });
  } catch (error) {
    console.error('Process payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error processing payment'
    });
  }
};