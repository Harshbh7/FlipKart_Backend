import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js';
import sendEmail from '../services/emailService.js';
import { sendOrderConfirmationEmail } from '../utils/emailService.js';
import { sendPushNotification } from '../services/firebaseAdminService.js';
import crypto from 'crypto';

// @desc    Create a new order (Checkout)
// @route   POST /api/orders
// @access  Private (Customer only)
export const createOrder = async (req, res, next) => {
  const { products, shippingAddress, paymentMethod, paymentInfo, totalAmount } = req.body;

  try {
    if (!products || products.length === 0) {
      res.status(400);
      return next(new Error('No items in the order'));
    }

    // Verify stock and update product inventory
    for (const item of products) {
      // Bypass database checks for mock items
      if (item.product.toString().startsWith('abcd1234efab')) {
        continue;
      }

      const dbProduct = await Product.findById(item.product);
      if (!dbProduct) {
        res.status(404);
        return next(new Error(`Product ${item.name} not found`));
      }

      if (dbProduct.stock < item.quantity) {
        res.status(400);
        return next(new Error(`Insufficient stock for ${item.name}. Available: ${dbProduct.stock}`));
      }

      // Deduct stock
      dbProduct.stock -= item.quantity;
      await dbProduct.save();
    }

    // Create order
    const order = await Order.create({
      customer: req.user.id,
      products,
      shippingAddress,
      paymentMethod,
      paymentInfo,
      totalAmount,
    });

    // Real-time notification: Emit event to unique sellers in the order
    const uniqueSellers = [...new Set(products.map((item) => item.seller.toString()))];
    uniqueSellers.forEach((sellerId) => {
      req.io.to(sellerId).emit('new_order', {
        orderId: order._id,
        totalAmount: order.totalAmount,
      });
    });

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order,
    });

    // Send push notification to customer (fire and forget)
    const customerUser = await User.findById(req.user.id);
    if (customerUser && customerUser.fcmToken) {
      sendPushNotification(
        customerUser.fcmToken,
        'Order Confirmed! 🎉',
        `Your order for ${totalAmount} has been placed successfully.`,
        { orderId: String(order._id) }
      );
    }

    // Send Email Notification (fire and forget)
    if (customerUser && customerUser.email) {
      sendOrderConfirmationEmail(customerUser.email, order, customerUser.name);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user's orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ customer: req.user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get seller's orders (orders containing seller's products)
// @route   GET /api/orders/seller
// @access  Private (Seller/Admin)
export const getSellerOrders = async (req, res, next) => {
  try {
    // Query orders that contain at least one item from this seller
    const orders = await Order.find({ 'products.seller': req.user.id })
      .populate('customer', 'name email phone')
      .sort({ createdAt: -1 });

    // Filter items inside the orders to only show items belonging to this seller
    const filteredOrders = orders.map((order) => {
      const orderObj = order.toObject();
      orderObj.products = orderObj.products.filter(
        (item) => item.seller.toString() === req.user.id.toString()
      );
      return orderObj;
    });

    res.status(200).json({
      success: true,
      count: filteredOrders.length,
      orders: filteredOrders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order tracking status
// @route   PUT /api/orders/:id/status
// @access  Private (Seller/Admin)
export const updateOrderStatus = async (req, res, next) => {
  const { orderStatus } = req.body; // Placed, Processing, Packed, Shipped, Delivered

  try {
    const order = await Order.findById(req.params.id).populate('customer', 'name email fcmToken');

    if (!order) {
      res.status(404);
      return next(new Error('Order not found'));
    }

    // Verify that the seller owns at least one item in this order (or user is admin)
    const isAuthorizedSeller = order.products.some(
      (item) => item.seller.toString() === req.user.id.toString()
    );

    if (!isAuthorizedSeller && req.user.role !== 'admin') {
      res.status(403);
      return next(new Error('You are not authorized to update this order'));
    }

    // 🛡️ Block "Delivered" if OTP not verified
    if (orderStatus === 'Delivered' && !order.isOtpVerified) {
      res.status(400);
      return next(new Error('Delivery OTP not verified. Please verify OTP before marking as Delivered.'));
    }

    // When moving to "Shipped", auto-generate and send OTP to customer
    if (orderStatus === 'Shipped') {
      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
      const otpExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours expiry

      // Hash the OTP before saving
      const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
      order.deliveryOtp = hashedOtp;
      order.deliveryOtpDisplay = otp;   // Store plain for customer display
      order.deliveryOtpExpiry = otpExpiry;
      order.isOtpVerified = false;

      // Send OTP email to customer
      const customerEmail = order.customer?.email;
      const customerName = order.customer?.name || 'Customer';

      if (customerEmail) {
        const orderId = order._id.toString().slice(-8).toUpperCase();
        const productNames = order.products.map(p => p.name).join(', ');

        await sendEmail({
          email: customerEmail,
          subject: `🚚 Delivery OTP for Order #${orderId} - Flipkart`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 20px; border-radius: 8px;">
              <div style="background: #2874f0; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
                <h1 style="color: white; margin: 0; font-style: italic;">Flipkart</h1>
                <p style="color: #ffe500; margin: 4px 0 0 0; font-weight: bold;">Delivery Verification</p>
              </div>
              <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px;">
                <h2 style="color: #212121; margin-top: 0;">Hi ${customerName}! 👋</h2>
                <p style="color: #555; line-height: 1.6;">Your order is <strong style="color: #2874f0;">Out for Delivery!</strong></p>
                <p style="color: #555;">Your package containing <strong>${productNames}</strong> will be delivered shortly.</p>
                <p style="color: #555; margin-bottom: 5px;">Share this <strong>One-Time Password (OTP)</strong> with the delivery agent at the time of delivery:</p>
                
                <div style="background: #f0f7ff; border: 2px dashed #2874f0; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                  <p style="margin: 0; color: #666; font-size: 13px; letter-spacing: 1px;">DELIVERY OTP</p>
                  <h1 style="margin: 10px 0; color: #2874f0; font-size: 42px; letter-spacing: 8px;">${otp}</h1>
                  <p style="margin: 0; color: #999; font-size: 12px;">Valid for 24 hours | Do NOT share with anyone else</p>
                </div>

                <div style="background: #fff3e0; border-left: 4px solid #fb641b; padding: 12px 16px; border-radius: 4px; margin: 16px 0;">
                  <p style="margin: 0; color: #e65100; font-size: 13px;"><strong>⚠️ Security Notice:</strong> Only share this OTP with the Flipkart delivery agent. Never share with anyone else.</p>
                </div>

                <p style="color: #555;">Order ID: <strong>#${orderId}</strong></p>
                <p style="color: #999; font-size: 12px;">If you did not place this order, please contact Flipkart support immediately.</p>
              </div>
              <p style="text-align: center; color: #999; font-size: 11px; margin-top: 15px;">© Flipkart Clone. All rights reserved.</p>
            </div>
          `,
        });

        console.log(`📧 Delivery OTP [${otp}] sent to ${customerEmail} for Order ${order._id}`);
      }
    }

    order.orderStatus = orderStatus;
    if (orderStatus === 'Delivered') {
      order.deliveredAt = Date.now();
      order.deliveryOtpDisplay = null; // Clear display OTP after delivery
    }

    await order.save();

    // Real-time notification: Emit event to notify the customer
    req.io.to(order.customer._id?.toString() || order.customer.toString()).emit('order_status_update', {
      orderId: order._id,
      orderStatus,
    });

    // Send push notification to customer
    if (order.customer && order.customer.fcmToken) {
      sendPushNotification(
        order.customer.fcmToken,
        `Order ${orderStatus} 📦`,
        `Your order status has been updated to ${orderStatus}.`,
        { orderId: String(order._id), status: orderStatus }
      );
    }

    res.status(200).json({
      success: true,
      message: orderStatus === 'Shipped'
        ? 'Order marked as Shipped. Delivery OTP sent to customer email!'
        : `Order status updated to: ${orderStatus}`,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generate/Resend delivery OTP for an order
// @route   POST /api/orders/:id/delivery-otp
// @access  Private (Seller/Admin)
export const generateDeliveryOtp = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('customer', 'name email');

    if (!order) {
      res.status(404);
      return next(new Error('Order not found'));
    }

    if (order.orderStatus === 'Delivered') {
      res.status(400);
      return next(new Error('Order is already delivered.'));
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24hr expiry
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');

    order.deliveryOtp = hashedOtp;
    order.deliveryOtpDisplay = otp;  // Store plain OTP for customer display
    order.deliveryOtpExpiry = otpExpiry;
    order.isOtpVerified = false;
    await order.save();

    const customerEmail = order.customer?.email;
    const customerName = order.customer?.name || 'Customer';

    if (customerEmail) {
      const orderId = order._id.toString().slice(-8).toUpperCase();
      const productNames = order.products.map(p => p.name).join(', ');

      await sendEmail({
        email: customerEmail,
        subject: `🚚 Delivery OTP for Order #${orderId} - Flipkart`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f5f5f5; padding: 20px; border-radius: 8px;">
            <div style="background: #2874f0; padding: 20px; border-radius: 8px 8px 0 0; text-align: center;">
              <h1 style="color: white; margin: 0; font-style: italic;">Flipkart</h1>
              <p style="color: #ffe500; margin: 4px 0 0 0; font-weight: bold;">Delivery Verification</p>
            </div>
            <div style="background: white; padding: 30px; border-radius: 0 0 8px 8px;">
              <h2 style="color: #212121; margin-top: 0;">Hi ${customerName}! 👋</h2>
              <p style="color: #555; line-height: 1.6;">Your order is <strong style="color: #2874f0;">Out for Delivery!</strong></p>
              <p style="color: #555;">Your package containing <strong>${productNames}</strong> will be delivered shortly.</p>
              <p style="color: #555; margin-bottom: 5px;">Share this <strong>One-Time Password (OTP)</strong> with the delivery agent:</p>
              
              <div style="background: #f0f7ff; border: 2px dashed #2874f0; border-radius: 8px; padding: 20px; text-align: center; margin: 20px 0;">
                <p style="margin: 0; color: #666; font-size: 13px; letter-spacing: 1px;">DELIVERY OTP</p>
                <h1 style="margin: 10px 0; color: #2874f0; font-size: 42px; letter-spacing: 8px;">${otp}</h1>
                <p style="margin: 0; color: #999; font-size: 12px;">Valid for 24 hours | Do NOT share with anyone else</p>
              </div>

              <div style="background: #fff3e0; border-left: 4px solid #fb641b; padding: 12px 16px; border-radius: 4px; margin: 16px 0;">
                <p style="margin: 0; color: #e65100; font-size: 13px;"><strong>⚠️ Security Notice:</strong> Only share this OTP with the Flipkart delivery agent.</p>
              </div>

              <p style="color: #555;">Order ID: <strong>#${orderId}</strong></p>
            </div>
          </div>
        `,
      });
    }

    console.log(`📧 Delivery OTP [${otp}] generated for Order ${order._id}`);

    res.status(200).json({
      success: true,
      message: `Delivery OTP sent to customer email (${customerEmail})`,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify delivery OTP and mark order as Delivered
// @route   POST /api/orders/:id/verify-otp
// @access  Private (Seller/Admin)
export const verifyDeliveryOtp = async (req, res, next) => {
  const { otp } = req.body;

  try {
    if (!otp) {
      res.status(400);
      return next(new Error('Please provide the delivery OTP'));
    }

    const order = await Order.findById(req.params.id).populate('customer', 'name email');

    if (!order) {
      res.status(404);
      return next(new Error('Order not found'));
    }

    if (order.orderStatus === 'Delivered') {
      res.status(400);
      return next(new Error('This order has already been delivered.'));
    }

    if (!order.deliveryOtp) {
      res.status(400);
      return next(new Error('No delivery OTP was generated for this order. Please generate OTP first.'));
    }

    // Check expiry
    if (order.deliveryOtpExpiry && order.deliveryOtpExpiry < Date.now()) {
      res.status(400);
      return next(new Error('Delivery OTP has expired. Please generate a new OTP.'));
    }

    // Hash provided OTP and compare
    const hashedProvidedOtp = crypto.createHash('sha256').update(otp.toString()).digest('hex');
    if (hashedProvidedOtp !== order.deliveryOtp) {
      res.status(401);
      return next(new Error('Invalid OTP. Please check the OTP and try again.'));
    }

    // ✅ OTP matched — mark as Delivered
    order.isOtpVerified = true;
    order.orderStatus = 'Delivered';
    order.deliveredAt = Date.now();
    order.deliveryOtp = null;        // Clear hashed OTP after successful use
    order.deliveryOtpDisplay = null; // Clear plain OTP display after delivery
    order.deliveryOtpExpiry = null;
    await order.save();

    // Real-time notification to customer
    req.io.to(order.customer._id?.toString() || order.customer.toString()).emit('order_status_update', {
      orderId: order._id,
      orderStatus: 'Delivered',
    });

    res.status(200).json({
      success: true,
      message: '✅ OTP verified! Order marked as Delivered successfully.',
      order,
    });
  } catch (error) {
    next(error);
  }
};
