import Razorpay from 'razorpay';
import crypto from 'crypto';
import Order from '../models/orderModel.js';

// Determine if we should mock payment operations due to placeholder configurations
const isMockPayment =
  !process.env.RAZORPAY_KEY_ID ||
  process.env.RAZORPAY_KEY_ID.startsWith('your_') ||
  process.env.RAZORPAY_KEY_SECRET === 'your_razorpay_key_secret';

let razorpay = null;

if (!isMockPayment) {
  try {
    razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    console.log('💳 Razorpay SDK initialized successfully in LIVE/TEST mode.');
  } catch (err) {
    console.error('Failed to initialize Razorpay SDK:', err.message);
  }
} else {
  console.log('💳 Razorpay initialized in DEVELOPER MOCK PAYMENT mode.');
}

// @desc    Create a payment order (Razorpay)
// @route   POST /api/payments/create-order
// @access  Private
export const createPaymentOrder = async (req, res, next) => {
  const { amount } = req.body; // Amount in INR

  try {
    if (!amount) {
      res.status(400);
      return next(new Error('Amount is required to create payment order'));
    }

    if (isMockPayment) {
      console.log('💳 [MOCK] Creating Razorpay payment order for amount: ', amount);
      return res.status(200).json({
        success: true,
        order: {
          id: `order_mock_${Date.now()}`,
          entity: 'order',
          amount: amount * 100, // paise
          amount_paid: 0,
          amount_due: amount * 100,
          currency: 'INR',
          receipt: `receipt_mock_${Date.now()}`,
          status: 'created',
          attempts: 0,
          notes: [],
          created_at: Math.floor(Date.now() / 1000),
          isMock: true,
        },
      });
    }

    const options = {
      amount: Math.round(amount * 100), // convert to paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      key_id: process.env.RAZORPAY_KEY_ID,
      order: razorpayOrder,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Verify payment signature
// @route   POST /api/payments/verify
// @access  Private
export const verifyPaymentSignature = async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

  try {
    if (!orderId) {
      res.status(400);
      return next(new Error('Mongoose Order ID is required'));
    }

    // Verify mock payments directly
    if (isMockPayment || razorpay_order_id?.startsWith('order_mock_')) {
      console.log('💳 [MOCK] Verifying payment for Mongoose order ID:', orderId);
      const dbOrder = await Order.findById(orderId);
      if (!dbOrder) {
        res.status(404);
        return next(new Error('Order not found'));
      }

      dbOrder.paymentInfo.id = razorpay_payment_id || `pay_mock_${Date.now()}`;
      dbOrder.paymentInfo.status = 'Paid';
      await dbOrder.save();

      // Real-time notification: Emit payment success to customer
      req.io.to(dbOrder.customer.toString()).emit('payment_success', {
        orderId: dbOrder._id,
        amount: dbOrder.totalAmount,
      });

      return res.status(200).json({
        success: true,
        message: 'Payment verified and captured successfully (Mock Mode)',
      });
    }

    // Verify real signature
    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (expectedSign === razorpay_signature) {
      const dbOrder = await Order.findById(orderId);
      if (!dbOrder) {
        res.status(404);
        return next(new Error('Order not found'));
      }

      dbOrder.paymentInfo.id = razorpay_payment_id;
      dbOrder.paymentInfo.status = 'Paid';
      await dbOrder.save();

      // Real-time notification: Emit payment success to customer
      req.io.to(dbOrder.customer.toString()).emit('payment_success', {
        orderId: dbOrder._id,
        amount: dbOrder.totalAmount,
      });

      res.status(200).json({
        success: true,
        message: 'Payment verified and captured successfully',
      });
    } else {
      res.status(400);
      return next(new Error('Payment verification failed. Invalid signature.'));
    }
  } catch (error) {
    next(error);
  }
};
