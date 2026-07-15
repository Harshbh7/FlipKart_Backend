import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  try {
    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.mailtrap.io',
      port: parseInt(process.env.SMTP_PORT || '2525'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER || 'placeholder',
        pass: process.env.SMTP_PASS || 'placeholder',
      },
    });

    const message = {
      from: `${process.env.EMAIL_FROM || 'noreply@flipkartclone.com'}`,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    // Only attempt real send if credentials are not placeholder
    console.log(`[DEBUG] Attempting to send email. SMTP_USER defined: ${!!process.env.SMTP_USER}, SMTP_PASS defined: ${!!process.env.SMTP_PASS}`);
    
    if (process.env.SMTP_USER && process.env.SMTP_USER !== 'your_smtp_user' && process.env.SMTP_PASS !== 'your_smtp_password') {
      console.log(`[DEBUG] Executing transporter.sendMail to ${options.email}...`);
      const info = await transporter.sendMail(message);
      console.log(`Email sent: ${info.messageId}`);
      return true;
    } else {
      console.log('====================================================');
      console.log(`[DEVELOPER MOCK EMAIL TO: ${options.email}]`);
      console.log(`Subject: ${options.subject}`);
      console.log('Message:');
      console.log(options.html.replace(/<\/?[^>]+(>|$)/g, "")); // HTML strip for console log
      console.log('====================================================');
      return true;
    }
  } catch (error) {
    console.error('Email could not be sent: ', error.message);
    // Print fallback details to console so developer is not blocked
    console.log('====================================================');
    console.log(`[FALLBACK EMAIL NOTIFICATION LOG]`);
    console.log(`To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Body HTML: \n${options.html}`);
    console.log('====================================================');
    return false;
  }
};

export default sendEmail;
