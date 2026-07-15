import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

// Create a reusable transporter using default SMTP transport
const createTransporter = async () => {
  // If user provided real credentials in .env
  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    return nodemailer.createTransport({
      service: 'gmail', // Or any other service you use
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  // Fallback to Ethereal Email for testing
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });
};

export const sendOrderConfirmationEmail = async (userEmail, orderData, userName) => {
  try {
    const transporter = await createTransporter();

    // Format products for email body
    const productListHtml = orderData.products.map(p => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">
          <img src="${p.image}" alt="${p.name}" style="width: 50px; height: 50px; object-fit: contain;" />
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd;">
          <strong>${p.name}</strong><br/>
          Qty: ${p.quantity}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #ddd; text-align: right;">
          ₹${p.price * p.quantity}
        </td>
      </tr>
    `).join('');

    const mailOptions = {
      from: '"Flipkart Clone Support" <no-reply@flipkartclone.com>',
      to: userEmail,
      subject: `Order Confirmation - Your Order #${orderData._id.toString().slice(-8).toUpperCase()} has been placed!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <h1 style="color: #2874f0; margin: 0;">Flipkart Clone</h1>
            <p style="color: #666;">Order Placed Successfully!</p>
          </div>
          
          <h2 style="color: #333;">Hi ${userName},</h2>
          <p style="color: #555;">Thank you for your order! We've received your order and are getting it ready to be shipped.</p>
          
          <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Order Summary (Order #${orderData._id.toString().slice(-8).toUpperCase()})</h3>
            <table style="width: 100%; border-collapse: collapse;">
              ${productListHtml}
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total Amount:</td>
                <td style="padding: 10px; text-align: right; font-weight: bold; color: #2874f0;">
                  ₹${orderData.totalAmount}
                </td>
              </tr>
            </table>
          </div>
          
          <div style="margin-top: 20px;">
            <h4 style="color: #333; margin-bottom: 5px;">Delivery Address:</h4>
            <p style="color: #666; margin: 0;">
              ${orderData.shippingAddress.street},<br/>
              ${orderData.shippingAddress.city}, ${orderData.shippingAddress.state} - ${orderData.shippingAddress.zipCode}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #999; font-size: 12px;">This is an automated email from Flipkart Clone, please do not reply.</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('-----------------------------------------');
    console.log('📧 Order Confirmation Email Sent!');
    console.log(`✉️  Message ID: ${info.messageId}`);
    if (!process.env.EMAIL_USER) {
      console.log(`🌐 Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
      console.log('(Click the link above to view the fake email sent by Ethereal)');
    }
    console.log('-----------------------------------------');

  } catch (error) {
    console.error('Error sending order confirmation email:', error);
  }
};
