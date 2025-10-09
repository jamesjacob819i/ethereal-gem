const express = require('express');
const {
  validateCart,
  calculateCart,
  checkProductAvailability
} = require('../controllers/cartController');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/calculate', calculateCart);
router.get('/check/:productId', checkProductAvailability);

// Protected routes (optional auth allows both authenticated and guest users)
router.post('/validate', optionalAuth, validateCart);

module.exports = router;