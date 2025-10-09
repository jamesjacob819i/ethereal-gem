const express = require('express');
const {
  getDashboardStats,
  getAllOrders,
  getAllUsers,
  updateUserRole,
  deleteUser,
  getSalesReports
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getDashboardStats);
router.get('/orders', getAllOrders);
router.get('/users', getAllUsers);
router.get('/reports', getSalesReports);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

module.exports = router;