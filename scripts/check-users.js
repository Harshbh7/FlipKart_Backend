import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/userModel.js';
import Seller from '../src/models/sellerModel.js';

dotenv.config();

const checkUsers = async () => {
  try {
    const dbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/flipkart_clone';
    await mongoose.connect(dbUri);
    console.log('Connected to MongoDB.');

    const users = await User.find({}, 'name email role isVerified');
    console.log('\n--- Registered Users ---');
    console.log(users);
    console.log('------------------------\n');

    const sellers = await Seller.find({});
    console.log('\n--- Registered Sellers ---');
    console.log(sellers);
    console.log('------------------------\n');
  } catch (err) {
    console.error('Error querying users:', err.message);
  } finally {
    await mongoose.disconnect();
  }
};

checkUsers();
