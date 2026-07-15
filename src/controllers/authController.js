import crypto from 'crypto';
import User from '../models/userModel.js';
import sendEmail from '../services/emailService.js';
import { sendTokens, generateAccessToken } from '../utils/generateToken.js';
import jwt from 'jsonwebtoken';
import { verifyFirebaseToken } from '../services/firebaseAdminService.js';

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res, next) => {
  const { name, email, password, phone } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      return next(new Error('User already exists'));
    }

    // Generate random 6-digit verification code
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    // Create user (role defaults to 'customer')
    const user = await User.create({
      name,
      email,
      password,
      phone,
      verificationToken,
    });

    // Send verification email
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #2874f0; text-align: center;">Welcome to Flipkart Clone!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for registering. Please use the following 6-digit verification code to complete your signup process:</p>
        <div style="background-color: #f0f5ff; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #2874f0; border-radius: 4px; margin: 20px 0;">
          ${verificationToken}
        </div>
        <p>This code will expire shortly. If you did not sign up for this account, you can safely ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #878787; text-align: center;">This is an automated system email. Please do not reply.</p>
      </div>
    `;

    await sendEmail({
      email: user.email,
      subject: 'Verify your email address - Flipkart Clone',
      html: emailHtml,
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful! Please check your email for the verification code.',
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify email address
// @route   POST /api/auth/verify-email
// @access  Public
export const verifyEmail = async (req, res, next) => {
  const { email, code } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }

    if (user.isVerified) {
      res.status(400);
      return next(new Error('Email is already verified'));
    }

    if (user.verificationToken !== code) {
      res.status(400);
      return next(new Error('Invalid verification code'));
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Login user immediately after verification
    sendTokens(res, user, 200);
  } catch (error) {
    next(error);
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check for user email, explicitly selecting password field
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      res.status(401);
      return next(new Error('Invalid email or password'));
    }

    // Match password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      res.status(401);
      return next(new Error('Invalid email or password'));
    }

    // Ensure email is verified
    if (!user.isVerified) {
      res.status(403);
      return next(new Error('Please verify your email before logging in.'));
    }

    // Send tokens
    sendTokens(res, user, 200);
  } catch (error) {
    next(error);
  }
};

// @desc    Google Login
// @route   POST /api/auth/google
// @access  Public
export const googleLogin = async (req, res, next) => {
  const { idToken } = req.body;

  if (!idToken) {
    res.status(400);
    return next(new Error('Firebase ID token is required'));
  }

  try {
    const decodedToken = await verifyFirebaseToken(idToken);
    const { email, name, picture } = decodedToken;

    let user = await User.findOne({ email });

    if (!user) {
      // Create a strong random password for Google-authenticated users
      const randomPassword = crypto.randomBytes(16).toString('hex') + 'G$1a';
      
      user = await User.create({
        name: name || 'Google User',
        email,
        password: randomPassword,
        avatar: picture || '',
        isVerified: true, // Google accounts are pre-verified
      });
    } else {
      // Optionally update the avatar if it's not set
      if (!user.avatar && picture) {
        user.avatar = picture;
        await user.save();
      }
    }

    // Send standard JWT tokens
    sendTokens(res, user, 200);
  } catch (error) {
    res.status(401);
    next(new Error('Invalid Google Authentication Token'));
  }
};

// @desc    Log user out / clear cookie
// @route   POST /api/auth/logout
// @access  Public
export const logoutUser = async (req, res, next) => {
  try {
    res.cookie('refreshToken', '', {
      httpOnly: true,
      expires: new Date(0),
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
export const refreshToken = async (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    res.status(401);
    return next(new Error('Not authorized, refresh token not found'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401);
      return next(new Error('Not authorized, user not found'));
    }

    const accessToken = generateAccessToken(user);

    res.status(200).json({
      success: true,
      token: accessToken,
    });
  } catch (error) {
    res.status(401);
    return next(new Error('Not authorized, refresh token expired or invalid'));
  }
};

// @desc    Save User FCM Token for Push Notifications
// @route   POST /api/auth/fcm-token
// @access  Private
export const saveFcmToken = async (req, res, next) => {
  const { fcmToken } = req.body;
  if (!fcmToken) {
    res.status(400);
    return next(new Error('FCM token is required'));
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }

    user.fcmToken = fcmToken;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'FCM token saved successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404);
      return next(new Error('User not found with this email'));
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to field
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expiration to 10 mins
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save();

    // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #2874f0; text-align: center;">Reset your Password</h2>
        <p>Hi ${user.name},</p>
        <p>You requested to reset your password. Please click the button below to choose a new password:</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #fb641b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all; color: #2874f0;">${resetUrl}</p>
        <p>This link will expire in 10 minutes. If you did not make this request, you can ignore this email.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #878787; text-align: center;">This is an automated system email. Please do not reply.</p>
      </div>
    `;

    const emailSent = await sendEmail({
      email: user.email,
      subject: 'Password Reset Request - Flipkart Clone',
      html: emailHtml,
    });

    if (emailSent) {
      res.status(200).json({
        success: true,
        message: 'Password reset link sent to your email.',
      });
    } else {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      res.status(500);
      return next(new Error('Email could not be sent'));
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Reset Password
// @route   POST /api/auth/reset-password/:token
// @access  Public
export const resetPassword = async (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Get hashed token
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400);
      return next(new Error('Invalid or expired password reset token'));
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful! You can now log in.',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile details
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfileController = async (req, res, next) => {
  const { name, phone, address } = req.body;

  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(404);
      return next(new Error('User not found'));
    }

    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (address) {
      user.address = {
        street: address.street !== undefined ? address.street : user.address.street,
        city: address.city !== undefined ? address.city : user.address.city,
        state: address.state !== undefined ? address.state : user.address.state,
        zipCode: address.zipCode !== undefined ? address.zipCode : user.address.zipCode,
        country: address.country !== undefined ? address.country : user.address.country,
      };
    }

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        avatar: updatedUser.avatar,
        address: updatedUser.address,
        isVerified: updatedUser.isVerified,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};
