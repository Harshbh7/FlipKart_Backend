import express from 'express';
import {
  getAdminStats,
  getAllUsers,
  getAllSellers,
  deleteUser,
} from '../controllers/adminController.js';
import { updateSellerStatus } from '../controllers/sellerController.js';
import { getAllCoupons, createCoupon, deleteCoupon, toggleCoupon } from '../controllers/couponController.js';
import { getAllReturns, updateReturnStatus } from '../controllers/returnController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Enforce admin authorization globally across all endpoints in this file
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getAdminStats);
router.get('/users', getAllUsers);
router.get('/sellers', getAllSellers);
router.delete('/users/:id', deleteUser);
router.put('/sellers/:id/status', updateSellerStatus);

// Coupon management
router.get('/coupons', getAllCoupons);
router.post('/coupons', createCoupon);
router.delete('/coupons/:id', deleteCoupon);
router.patch('/coupons/:id/toggle', toggleCoupon);

// Return/Refund management
router.get('/returns', getAllReturns);
router.put('/returns/:id', updateReturnStatus);

export default router;
