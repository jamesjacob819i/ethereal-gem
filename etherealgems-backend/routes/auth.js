const express = require('express');
const {
  register,
  login,
  getProfile,
  updateProfile,
  updatePassword,
  forgotPassword,
  resetPassword,
  logout,
  toggleWishlist
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

// Protected routes
router.use(protect); // All routes after this middleware are protected

router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/updatepassword', updatePassword);
router.post('/logout', logout);
router.post('/wishlist/:productId', toggleWishlist);

module.exports = router;