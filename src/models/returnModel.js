import mongoose from 'mongoose';

const returnSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        quantity: Number,
        price: Number,
        image: String,
      }
    ],
    reason: {
      type: String,
      enum: [
        'Defective product',
        'Wrong item received',
        'Product not as described',
        'Size/fit issue',
        'Changed my mind',
        'Other',
      ],
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Requested', 'Approved', 'Rejected', 'Picked Up', 'Refunded'],
      default: 'Requested',
    },
    refundAmount: {
      type: Number,
      default: 0,
    },
    adminNote: {
      type: String,
      default: '',
    },
    processedAt: Date,
  },
  { timestamps: true }
);

const Return = mongoose.model('Return', returnSchema);
export default Return;
