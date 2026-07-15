import User from '../models/userModel.js';
import Seller from '../models/sellerModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

// @desc    Get Admin Dashboard metrics
// @route   GET /api/admin/stats
// @access  Private (Admin only)
export const getAdminStats = async (req, res, next) => {
  try {
    const customersCount = await User.countDocuments({ role: 'customer' });
    const sellersCount = await User.countDocuments({ role: 'seller' });
    const productsCount = await Product.countDocuments();
    const ordersCount = await Order.countDocuments();

    // Sum revenue of paid orders
    const revenueStats = await Order.aggregate([
      { $match: { 'paymentInfo.status': 'Paid' } },
      { $group: { _id: null, totalRevenue: { $sum: '$totalAmount' } } }
    ]);
    const totalRevenue = revenueStats[0]?.totalRevenue || 0;

    // Category distribution for charts
    const categoryStats = await Product.aggregate([
      { $group: { _id: '$category', value: { $sum: 1 } } }
    ]);
    const categoryDistribution = categoryStats.map((item) => ({
      name: item._id,
      value: item.value
    }));

    res.status(200).json({
      success: true,
      stats: {
        customersCount,
        sellersCount,
        productsCount,
        ordersCount,
        totalRevenue,
        categoryDistribution: categoryDistribution.length > 0 ? categoryDistribution : [
          { name: 'Mobiles', value: 12 },
          { name: 'Electronics', value: 8 },
          { name: 'Fashion', value: 15 },
          { name: 'Home', value: 5 }
        ]
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all registered users
// @route   GET /api/admin/users
// @access  Private (Admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all seller applications
// @route   GET /api/admin/sellers
// @access  Private (Admin only)
export const getAllSellers = async (req, res, next) => {
  try {
    const sellers = await Seller.find({}).populate('user', 'name email phone').sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: sellers.length,
      sellers,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a user account
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin only)
export const deleteUser = async (req, res, next) => {
  try {
    const userObj = await User.findById(req.params.id);

    if (!userObj) {
      res.status(404);
      return next(new Error('User not found'));
    }

    if (userObj.role === 'admin') {
      res.status(400);
      return next(new Error('Cannot delete admin user accounts'));
    }

    // Delete associated seller application if exists
    await Seller.deleteOne({ user: userObj._id });
    // Delete user
    await userObj.deleteOne();

    res.status(200).json({
      success: true,
      message: 'User account and associated profiles deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
