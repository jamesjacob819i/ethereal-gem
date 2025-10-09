const express = require('express');
const {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
  processPayment
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All routes are protected (require authentication)
router.use(protect);

router.post('/', createOrder);
router.get('/myorders', getMyOrders);
router.get('/:id', getOrder);
router.put('/:id/cancel', cancelOrder);
router.post('/:id/payment', processPayment);

// Admin only routes
router.put('/:id/status', authorize('admin'), updateOrderStatus);

module.exports = router;