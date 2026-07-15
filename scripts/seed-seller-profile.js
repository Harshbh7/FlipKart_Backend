import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/userModel.js';
import Seller from '../src/models/sellerModel.js';

dotenv.config();

const seedSellerProfile = async () => {
  try {
    const dbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/flipkart_clone';
    await mongoose.connect(dbUri);
    console.log('✅ Connected to MongoDB.');

    // Find the retailer user
    const retailerUser = await User.findOne({ email: 'retailer@flipkart.com' });
    if (!retailerUser) {
      console.log('❌ Retailer user not found. Please seed first.');
      process.exit(1);
    }

    // Check if seller profile already exists
    const existing = await Seller.findOne({ user: retailerUser._id });
    if (existing) {
      console.log('ℹ️  Seller profile already exists:', existing.businessName);
      await mongoose.disconnect();
      return;
    }

    // Create seller profile
    const sellerProfile = await Seller.create({
      user: retailerUser._id,
      businessName: 'Flipkart Wholesale Hub',
      gstin: '29ABCDE1234F1ZK',
      address: {
        street: '12, MG Road',
        city: 'Bengaluru',
        state: 'Karnataka',
        zipCode: '560001',
      },
      bankDetails: {
        accountNo: '9876543210001234',
        ifsc: 'HDFC0001234',
        bankName: 'HDFC Bank',
      },
      status: 'approved',
    });

    console.log(`\n🎉 SUCCESS: Seller profile created for "${retailerUser.email}"`);
    console.log('   Business:', sellerProfile.businessName);
    console.log('   GSTIN:   ', sellerProfile.gstin);
    console.log('   Status:  ', sellerProfile.status);
  } catch (err) {
    console.error('❌ Error seeding seller profile:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
  }
};

seedSellerProfile();
