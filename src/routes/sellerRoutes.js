import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  applyAsSeller,
  getSellerProfile,
  getSellerDashboardStats,
} from '../controllers/sellerController.js';
import { bulkUploadProducts } from '../controllers/productBulkController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Multer config for CSV uploads
const upload = multer({
  dest: 'uploads/', // Temp storage
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Only CSV files are allowed!'), false);
    }
  }
});

router.post('/apply', protect, applyAsSeller);
router.get('/profile', protect, getSellerProfile);
router.get('/dashboard', protect, authorize('seller', 'admin'), getSellerDashboardStats);
router.post('/bulk-upload', protect, authorize('seller', 'admin'), upload.single('file'), bulkUploadProducts);

export default router;
