const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addProductReview,
  getCategories,
  getFeaturedProducts
} = require('../controllers/productController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/categories', getCategories);
router.get('/featured', getFeaturedProducts);
router.get('/', getProducts);
router.get('/:id', getProduct);

// Protected routes
router.post('/:id/reviews', protect, addProductReview);

// Admin only routes
router.post('/', protect, authorize('admin'), createProduct);
router.put('/:id', protect, authorize('admin'), updateProduct);
router.delete('/:id', protect, authorize('admin'), deleteProduct);

module.exports = router;