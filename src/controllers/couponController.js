import Coupon from '../models/couponModel.js';

// @desc    Apply a coupon code — validate and return discount amount
// @route   POST /api/coupons/apply
// @access  Private
export const applyCoupon = async (req, res, next) => {
  const { code, orderAmount } = req.body;

  try {
    if (!code) {
      res.status(400);
      return next(new Error('Coupon code is required'));
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

    if (!coupon) {
      res.status(404);
      return next(new Error('Invalid or expired coupon code'));
    }

    // Check expiry
    if (coupon.expiresAt && new Date() > new Date(coupon.expiresAt)) {
      res.status(400);
      return next(new Error('This coupon has expired'));
    }

    // Check max uses
    if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
      res.status(400);
      return next(new Error('This coupon has reached its usage limit'));
    }

    // Check per-user use
    if (coupon.usedBy.includes(req.user.id)) {
      res.status(400);
      return next(new Error('You have already used this coupon'));
    }

    // Check minimum order amount
    if (orderAmount < coupon.minOrderAmount) {
      res.status(400);
      return next(new Error(`Minimum order amount for this coupon is ₹${coupon.minOrderAmount}`));
    }

    // Calculate discount
    let discountAmount = 0;
    if (coupon.discountType === 'flat') {
      discountAmount = coupon.value;
    } else {
      discountAmount = Math.round((orderAmount * coupon.value) / 100);
      if (coupon.maxDiscount) {
        discountAmount = Math.min(discountAmount, coupon.maxDiscount);
      }
    }

    // Cap discount to order amount
    discountAmount = Math.min(discountAmount, orderAmount);

    res.status(200).json({
      success: true,
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        value: coupon.value,
        description: coupon.description,
      },
      discountAmount,
      finalAmount: orderAmount - discountAmount,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin — Get all coupons
// @route   GET /api/admin/coupons
// @access  Admin
export const getAllCoupons = async (req, res, next) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: coupons.length, coupons });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin — Create a coupon
// @route   POST /api/admin/coupons
// @access  Admin
export const createCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.create(req.body);
    res.status(201).json({ success: true, coupon });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin — Delete a coupon
// @route   DELETE /api/admin/coupons/:id
// @access  Admin
export const deleteCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id);
    if (!coupon) {
      res.status(404);
      return next(new Error('Coupon not found'));
    }
    res.status(200).json({ success: true, message: 'Coupon deleted' });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin — Toggle coupon active status
// @route   PATCH /api/admin/coupons/:id/toggle
// @access  Admin
export const toggleCoupon = async (req, res, next) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    if (!coupon) {
      res.status(404);
      return next(new Error('Coupon not found'));
    }
    coupon.isActive = !coupon.isActive;
    await coupon.save();
    res.status(200).json({ success: true, coupon });
  } catch (error) {
    next(error);
  }
};

// Internal: Mark coupon as used (called from order controller after order placed)
export const markCouponUsed = async (code, userId) => {
  try {
    await Coupon.findOneAndUpdate(
      { code: code.toUpperCase() },
      { $inc: { usedCount: 1 }, $addToSet: { usedBy: userId } }
    );
  } catch (err) {
    console.error('Failed to mark coupon as used:', err.message);
  }
};
