import express from 'express';
import { seedProductsToChroma, chatWithAI, getProductReviewSummary, visualSearchProducts } from '../controllers/aiController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/seed', seedProductsToChroma);
router.post('/chat', chatWithAI);
router.get('/review-summary/:productId', getProductReviewSummary);
router.post('/visual-search', upload.single('image'), visualSearchProducts);

export default router;
