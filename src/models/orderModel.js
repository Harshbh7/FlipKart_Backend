import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { _id: false });

const shippingAddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, default: 'India' },
}, { _id: false });

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [orderItemSchema],
    shippingAddress: {
      type: shippingAddressSchema,
      required: true,
    },
    paymentInfo: {
      id: { type: String, default: '' },
      status: {
        type: String,
        enum: ['Pending', 'Paid', 'Refunded'],
        default: 'Pending',
      },
    },
    paymentMethod: {
      type: String,
      enum: ['COD', 'Razorpay'],
      default: 'COD',
    },
    orderStatus: {
      type: String,
      enum: ['Placed', 'Processing', 'Packed', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled', 'Return Requested', 'Returned'],
      default: 'Placed',
    },
    trackingHistory: [
      {
        status: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        note: { type: String, default: '' },
      }
    ],
    returnRequest: {
      reason: { type: String },
      description: { type: String },
      image: { type: String },
    },
    couponCode: { type: String, default: null },
    couponDiscount: { type: Number, default: 0 },
    totalAmount: {
      type: Number,
      required: true,
    },
    deliveredAt: Date,
    // --- OTP-based Delivery Verification ---
    deliveryOtp: {
      type: String,
      default: null,
    },
    deliveryOtpDisplay: {
      type: String,       // plain OTP shown to customer (masked partially in UI)
      default: null,
    },
    deliveryOtpExpiry: {
      type: Date,
      default: null,
    },
    isOtpVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
