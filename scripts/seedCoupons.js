import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Coupon from '../src/models/couponModel.js';

dotenv.config();

const seedCoupons = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected');

    await Coupon.deleteMany({});
    
    const coupons = [
      {
        code: 'FLAT200',
        discountType: 'flat',
        value: 200,
        minOrderAmount: 1000,
        maxUses: null,
        description: 'Flat ₹200 off on orders above ₹1000',
      },
      {
        code: 'NEWUSER10',
        discountType: 'percent',
        value: 10,
        minOrderAmount: 500,
        maxDiscount: 500,
        maxUses: 1000,
        description: '10% off up to ₹500 for new users',
      },
      {
        code: 'FESTIVAL50',
        discountType: 'flat',
        value: 50,
        minOrderAmount: 0,
        description: 'Flat ₹50 off (No minimum)',
      },
    ];

    await Coupon.insertMany(coupons);
    console.log('Coupons seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedCoupons();
