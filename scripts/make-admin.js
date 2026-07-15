import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/userModel.js';

dotenv.config();

const makeAdmin = async () => {
  const email = process.argv[2];
  if (!email) {
    console.log('❌ Please provide the email address. Example: node scripts/make-admin.js your_email@example.com');
    process.exit(1);
  }

  try {
    const dbUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/flipkart_clone';
    await mongoose.connect(dbUri);
    console.log('Connected to MongoDB.');

    const userObj = await User.findOne({ email });
    if (!userObj) {
      console.log(`❌ User account with email "${email}" not found.`);
      await mongoose.disconnect();
      process.exit(1);
    }

    userObj.role = 'admin';
    await userObj.save();

    console.log(`\n🎉 SUCCESS: User "${email}" has been successfully promoted to ADMIN role!`);
  } catch (err) {
    console.error('❌ Error promoting user:', err.message);
  } finally {
    await mongoose.disconnect();
  }
};

makeAdmin();
