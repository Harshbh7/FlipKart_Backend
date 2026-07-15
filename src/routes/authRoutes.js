import express from 'express';
import {
  registerUser,
  verifyEmail,
  loginUser,
  logoutUser,
  refreshToken,
  forgotPassword,
  resetPassword,
  getProfile,
  updateProfileController,
  saveFcmToken,
  googleLogin,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-email', verifyEmail);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.post('/refresh', refreshToken);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/google', googleLogin);

// Protected routes
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfileController);
router.post('/fcm-token', protect, saveFcmToken);

export default router;
