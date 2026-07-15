import Return from '../models/returnModel.js';
import Order from '../models/orderModel.js';
import sendEmail from '../services/emailService.js';
import { uploadToCloudinary } from '../services/cloudinaryService.js';

// @desc    Submit a return request
// @route   POST /api/orders/:id/return
// @access  Private (customer)
export const submitReturn = async (req, res, next) => {
  let { reason, description, products } = req.body;
  if (typeof products === 'string') {
    products = JSON.parse(products);
  }

  try {
    const order = await Order.findById(req.params.id).populate('customer', 'name email');

    if (!order) {
      res.status(404);
      return next(new Error('Order not found'));
    }

    if (order.customer._id.toString() !== req.user.id) {
      res.status(403);
      return next(new Error('Not authorized'));
    }

    if (order.orderStatus !== 'Delivered') {
      res.status(400);
      return next(new Error('Return can only be requested for delivered orders'));
    }

    if (!req.file) {
      res.status(400);
      return next(new Error('Please upload an image of the product to request a return'));
    }

    const uploadResult = await uploadToCloudinary(req.file.buffer);
    const imageUrl = uploadResult.secure_url;

    const returnRequest = await Return.create({
      order: order._id,
      customer: req.user.id,
      products: products || order.products,
      reason,
      description,
      image: imageUrl,
      refundAmount: order.totalAmount,
    });

    // Update order status
    order.orderStatus = 'Return Requested';
    order.returnRequest = { reason, description, image: imageUrl };
    order.trackingHistory.push({ status: 'Return Requested', note: `Reason: ${reason}` });
    await order.save();

    // Email the customer
    await sendEmail({
      email: order.customer.email,
      subject: 'Return Request Received — Flipkart',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #2874f0; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-style: italic;">Flipkart</h1>
          </div>
          <div style="padding: 30px; background: #f9f9f9;">
            <h2 style="color: #333;">Return Request Submitted ↩️</h2>
            <p>Hi <strong>${order.customer.name}</strong>,</p>
            <p>We've received your return request for Order <strong>#${order._id.toString().slice(-8).toUpperCase()}</strong>.</p>
            <div style="background: white; border-radius: 8px; padding: 20px; margin: 20px 0; border-left: 4px solid #2874f0;">
              <p><strong>Reason:</strong> ${reason}</p>
              <p><strong>Refund Amount:</strong> ₹${order.totalAmount.toLocaleString('en-IN')}</p>
            </div>
            <p>Our team will review your request within <strong>2-3 business days</strong>.</p>
          </div>
        </div>
      `,
    });

    res.status(201).json({ success: true, returnRequest });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin — Get all return requests
// @route   GET /api/admin/returns
// @access  Admin
export const getAllReturns = async (req, res, next) => {
  try {
    const returns = await Return.find()
      .populate('customer', 'name email')
      .populate('order', 'totalAmount orderStatus')
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: returns.length, returns });
  } catch (error) {
    next(error);
  }
};

// @desc    Admin — Update return status
// @route   PUT /api/admin/returns/:id
// @access  Admin
export const updateReturnStatus = async (req, res, next) => {
  const { status, adminNote } = req.body;
  try {
    const returnReq = await Return.findById(req.params.id).populate('customer', 'name email');
    if (!returnReq) {
      res.status(404);
      return next(new Error('Return request not found'));
    }

    returnReq.status = status;
    if (adminNote) returnReq.adminNote = adminNote;
    if (status === 'Refunded') returnReq.processedAt = new Date();
    await returnReq.save();

    // Update order status accordingly
    const order = await Order.findById(returnReq.order);
    if (order) {
      if (status === 'Approved') order.orderStatus = 'Return Requested';
      if (status === 'Refunded') {
        order.orderStatus = 'Returned';
        order.paymentInfo.status = 'Refunded';
        order.trackingHistory.push({ status: 'Returned', note: 'Refund processed' });
      }
      await order.save();
    }

    res.status(200).json({ success: true, returnRequest: returnReq });
  } catch (error) {
    next(error);
  }
};
