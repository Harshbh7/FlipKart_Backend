import express from 'express';
import {
  getProducts,
  getProductDetails,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProductDetails);

// Seller/Admin restricted routes
router.post(
  '/',
  protect,
  authorize('seller', 'admin'),
  upload.array('images', 5), // Allow up to 5 image uploads at once
  createProduct
);

router.put(
  '/:id',
  protect,
  authorize('seller', 'admin'),
  upload.array('images', 5),
  updateProduct
);

router.delete('/:id', protect, authorize('seller', 'admin'), deleteProduct);

export default router;
