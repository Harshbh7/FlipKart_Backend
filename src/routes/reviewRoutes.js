import express from 'express';
import {
  createProductReview,
  deleteReview,
  getProductReviews,
} from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Publicly fetch reviews
router.get('/:productId', getProductReviews);

// Private customer review actions
router.post('/:productId', protect, createProductReview);
router.delete('/:productId', protect, deleteReview);

export default router;
