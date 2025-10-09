const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

// @desc    Get admin dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin only)
exports.getDashboardStats = async (req, res, next) => {
  try {
    // Get counts
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    
    // Get sales data
    const totalSales = await Order.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$pricing.total' } } }
    ]);

    // Get recent orders
    const recentOrders = await Order.find()
      .populate('user', 'name email')
      .sort('-createdAt')
      .limit(5);

    // Get top products
    const topProducts = await Product.find()
      .sort('-rating')
      .limit(5);

    // Monthly sales (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlySales = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
          paymentStatus: 'paid'
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          sales: { $sum: '$pricing.total' },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalSales: totalSales[0]?.total || 0,
        recentOrders,
        topProducts,
        monthlySales
      }
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching dashboard stats'
    });
  }
};

// @desc    Get all orders for admin
// @route   GET /api/admin/orders
// @access  Private (Admin only)
exports.getAllOrders = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    // Build query
    let query = {};
    
    if (req.query.status) {
      query.orderStatus = req.query.status;
    }
    
    if (req.query.paymentStatus) {
      query.paymentStatus = req.query.paymentStatus;
    }

    // Date filter
    if (req.query.dateFrom || req.query.dateTo) {
      query.createdAt = {};
      if (req.query.dateFrom) {
        query.createdAt.$gte = new Date(req.query.dateFrom);
      }
      if (req.query.dateTo) {
        query.createdAt.$lte = new Date(req.query.dateTo);
      }
    }

    const total = await Order.countDocuments(query);
    
    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('items.product', 'name images')
      .sort('-createdAt')
      .skip(startIndex)
      .limit(limit);

    // Pagination
    const pagination = {};
    const endIndex = page * limit;

    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }

    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      total,
      pagination,
      orders
    });
  } catch (error) {
    console.error('Get all orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching orders'
    });
  }
};

// @desc    Get all users for admin
// @route   GET /api/admin/users
// @access  Private (Admin only)
exports.getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const startIndex = (page - 1) * limit;

    let query = {};
    
    if (req.query.role) {
      query.role = req.query.role;
    }

    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { email: { $regex: req.query.search, $options: 'i' } }
      ];
    }

    const total = await User.countDocuments(query);
    
    const users = await User.find(query)
      .select('-password')
      .sort('-createdAt')
      .skip(startIndex)
      .limit(limit);

    // Pagination
    const pagination = {};
    const endIndex = page * limit;

    if (endIndex < total) {
      pagination.next = { page: page + 1, limit };
    }

    if (startIndex > 0) {
      pagination.prev = { page: page - 1, limit };
    }

    res.status(200).json({
      success: true,
      count: users.length,
      total,
      pagination,
      users
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error fetching users'
    });
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private (Admin only)
exports.updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid role'
      });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'User role updated successfully',
      user
    });
  } catch (error) {
    console.error('Update user role error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error updating user role'
    });
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Don't allow admin to delete themselves
    if (user._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You cannot delete your own account'
      });
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting user'
    });
  }
};

// @desc    Get sales reports
// @route   GET /api/admin/reports
// @access  Private (Admin only)
exports.getSalesReports = async (req, res, next) => {
  try {
    const { period = 'month', year, month } = req.query;
    
    let matchCondition = { paymentStatus: 'paid' };
    let groupBy = {};
    
    // Set date range based on period
    if (period === 'year' && year) {
      matchCondition.createdAt = {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${parseInt(year) + 1}-01-01`)
      };
      groupBy = {
        year: { $year: '$createdAt' },
        month: { $month: '$createdAt' }
      };
    } else if (period === 'month' && year && month) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0);
      matchCondition.createdAt = {
        $gte: startDate,
        $lte: endDate
      };
      groupBy = {
        year: { $year: '$createdAt' },
        month: { $month: '$createdAt' },
        day: { $dayOfMonth: '$createdAt' }
      };
    } else {
      // Default: current month
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      matchCondition.createdAt = {
        $gte: startOfMonth,
        $lte: endOfMonth
      };
      groupBy = {
        year: { $year: '$createdAt' },
        month: { $month: '$createdAt' },
        day: { $dayOfMonth: '$createdAt' }
      };
    }

    const salesData = await Order.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: groupBy,
          totalSales: { $sum: '$pricing.total' },
          totalOrders: { $sum: 1 },
          averageOrderValue: { $avg: '$pricing.total' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } }
    ]);

    // Category-wise sales
    const categorySales = await Order.aggregate([
      { $match: matchCondition },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'products',
          localField: 'items.product',
          foreignField: '_id',
          as: 'productInfo'
        }
      },
      { $unwind: '$productInfo' },
      {
        $group: {
          _id: '$productInfo.category',
          totalSales: { $sum: { $multiply: ['$items.price', '$items.quantity'] } },
          totalQuantity: { $sum: '$items.quantity' }
        }
      },
      { $sort: { totalSales: -1 } }
    ]);

    res.status(200).json({
      success: true,
      reports: {
        salesData,
        categorySales,
        period,
        dateRange: matchCondition.createdAt
      }
    });
  } catch (error) {
    console.error('Sales reports error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error generating sales reports'
    });
  }
};