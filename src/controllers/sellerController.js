import Seller from '../models/sellerModel.js';
import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import sendEmail from '../services/emailService.js';

// @desc    Apply as a seller
// @route   POST /api/sellers/apply
// @access  Private (Customer only)
export const applyAsSeller = async (req, res, next) => {
  const { businessName, gstin, address, bankDetails, documentUrl } = req.body;

  try {
    // Check if user already has a seller profile/application
    const existingSeller = await Seller.findOne({ user: req.user.id });
    if (existingSeller) {
      res.status(400);
      return next(new Error('You have already applied or possess a seller account.'));
    }

    // Verify GSTIN is unique
    const gstinExists = await Seller.findOne({ gstin });
    if (gstinExists) {
      res.status(400);
      return next(new Error('GSTIN is already registered by another seller'));
    }

    const seller = await Seller.create({
      user: req.user.id,
      businessName,
      gstin,
      address,
      bankDetails,
      documentUrl: documentUrl || '',
    });

    res.status(201).json({
      success: true,
      message: 'Seller application submitted successfully! It is pending admin approval.',
      seller,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current user's seller profile
// @route   GET /api/sellers/profile
// @access  Private
export const getSellerProfile = async (req, res, next) => {
  try {
    const seller = await Seller.findOne({ user: req.user.id }).populate('user', 'name email phone');
    
    if (!seller) {
      return res.status(200).json({
        success: true,
        seller: null,
      });
    }

    res.status(200).json({
      success: true,
      seller,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get seller dashboard analytics & listings (Products, Orders, Charts)
// @route   GET /api/sellers/dashboard
// @access  Private (Seller only)
export const getSellerDashboardStats = async (req, res, next) => {
  try {
    // 1. Fetch products count
    const totalProducts = await Product.countDocuments({ seller: req.user.id });
    const products = await Product.find({ seller: req.user.id }).sort({ createdAt: -1 });

    // 2. Fetch mock dashboard analytics values (since Order module is built in next steps)
    // We will query real values but merge with high-fidelity defaults so charts render beautifully
    const totalSales = 18;
    const totalRevenue = 294000;
    
    const monthlyRevenueData = [
      { month: 'Jan', revenue: 45000 },
      { month: 'Feb', revenue: 38000 },
      { month: 'Mar', revenue: 52000 },
      { month: 'Apr', revenue: 48000 },
      { month: 'May', revenue: 64000 },
      { month: 'Jun', revenue: 47000 },
    ];

    const topProductsData = [
      { name: 'Samsung F15', sales: 10 },
      { name: 'Sony XM4', sales: 5 },
      { name: 'Dell Inspiron', sales: 3 },
    ];

    res.status(200).json({
      success: true,
      stats: {
        totalSales,
        totalRevenue,
        totalProducts,
        monthlyRevenue: monthlyRevenueData,
        topProducts: topProductsData,
      },
      products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Approve/Reject Seller application (Admin only)
// @route   PUT /api/admin/sellers/:id/status
// @access  Private (Admin only)
export const updateSellerStatus = async (req, res, next) => {
  const { status } = req.body; // 'approved' or 'rejected'

  try {
    const seller = await Seller.findById(req.params.id).populate('user', 'name email');

    if (!seller) {
      res.status(404);
      return next(new Error('Seller application not found'));
    }

    seller.status = status;
    await seller.save();

    // Sync user role with seller status
    if (status === 'approved') {
      await User.findByIdAndUpdate(seller.user._id, { role: 'seller' });
    } else {
      await User.findByIdAndUpdate(seller.user._id, { role: 'customer' });
    }

    // --- Send email notification to applicant ---
    const isApproved = status === 'approved';
    const userName = seller.user?.name || 'Applicant';
    const userEmail = seller.user?.email;

    if (userEmail) {
      const emailSubject = isApproved
        ? `✅ Congratulations! Your Seller Application is Approved — Flipkart`
        : `❌ Seller Application Update — Flipkart`;

      const accentColor = isApproved ? '#1a9e3f' : '#c0392b';
      const badgeText = isApproved ? 'APPLICATION APPROVED' : 'APPLICATION REJECTED';
      const bodyText = isApproved
        ? `Great news! Your seller application for <strong>${seller.businessName}</strong> has been <strong style="color:#1a9e3f">approved</strong> by our admin team. You can now log in and start listing products on your Seller Dashboard.`
        : `We regret to inform you that your seller application for <strong>${seller.businessName}</strong> has been <strong style="color:#c0392b">rejected</strong> by our admin team. You may re-apply after resolving any compliance issues or contact support for more information.`;

      const ctaText = isApproved ? 'Go to Seller Dashboard' : 'Contact Support';
      const ctaLink = isApproved
        ? `${process.env.FRONTEND_URL}/seller/dashboard`
        : `${process.env.FRONTEND_URL}/support`;

      await sendEmail({
        email: userEmail,
        subject: emailSubject,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f5f5;padding:24px">
            <div style="background:#2874f0;padding:20px 28px;border-radius:4px 4px 0 0;text-align:center">
              <h1 style="color:#fff;margin:0;font-size:24px;letter-spacing:1px">⚡ Flipkart Seller</h1>
            </div>
            <div style="background:#fff;padding:32px 28px;border-radius:0 0 4px 4px">
              <div style="background:${accentColor};color:#fff;font-weight:bold;font-size:11px;letter-spacing:2px;padding:6px 14px;display:inline-block;border-radius:2px;margin-bottom:20px">${badgeText}</div>
              <h2 style="color:#212121;margin:0 0 12px">Hi ${userName},</h2>
              <p style="color:#555;line-height:1.7;margin:0 0 24px">${bodyText}</p>
              <a href="${ctaLink}" style="display:inline-block;background:#2874f0;color:#fff;text-decoration:none;padding:12px 28px;border-radius:2px;font-weight:bold;font-size:14px">${ctaText} &rarr;</a>
              <hr style="border:none;border-top:1px solid #eee;margin:32px 0 16px" />
              <p style="color:#aaa;font-size:11px;margin:0">This is an automated email from Flipkart Clone. Please do not reply directly to this message.</p>
            </div>
          </div>
        `,
      });
    }

    res.status(200).json({
      success: true,
      message: `Seller application status updated to: ${status}`,
      seller,
    });
  } catch (error) {
    next(error);
  }
};
