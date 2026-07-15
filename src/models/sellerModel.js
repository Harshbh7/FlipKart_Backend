import mongoose from 'mongoose';

const bankDetailsSchema = new mongoose.Schema({
  accountNo: { type: String, required: true },
  ifsc: { type: String, required: true },
  bankName: { type: String, required: true },
}, { _id: false });

const sellerAddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
}, { _id: false });

const sellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    businessName: {
      type: String,
      required: [true, 'Business Name is required'],
      trim: true,
    },
    gstin: {
      type: String,
      required: [true, 'GSTIN is required'],
      unique: true,
      trim: true,
    },
    address: {
      type: sellerAddressSchema,
      required: true,
    },
    bankDetails: {
      type: bankDetailsSchema,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    documentUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Seller = mongoose.model('Seller', sellerSchema);
export default Seller;
