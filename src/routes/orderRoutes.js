import express from 'express';
import {
  createOrder,
  getMyOrders,
  getSellerOrders,
  updateOrderStatus,
  generateDeliveryOtp,
  verifyDeliveryOtp,
} from '../controllers/orderController.js';
import { submitReturn } from '../controllers/returnController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Private customer routes
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.post('/:id/return', protect, upload.single('image'), submitReturn);  // Return request

// Private seller/admin routes
router.get('/seller', protect, authorize('seller', 'admin'), getSellerOrders);
router.put('/:id/status', protect, authorize('seller', 'admin'), updateOrderStatus);

// OTP-based delivery verification routes
router.post('/:id/delivery-otp', protect, authorize('seller', 'admin'), generateDeliveryOtp);
router.post('/:id/verify-otp', protect, authorize('seller', 'admin'), verifyDeliveryOtp);

export default router;
