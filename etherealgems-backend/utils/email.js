const nodemailer = require('nodemailer');

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });
};

// Send email function
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html || options.text,
      text: options.text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending error:', error);
    throw new Error('Email could not be sent');
  }
};

// Email templates
const emailTemplates = {
  // Welcome email
  welcome: (name) => ({
    subject: 'Welcome to EtherealGems!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Welcome to EtherealGems</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Hi ${name}!</h2>
          <p>Thank you for joining EtherealGems! We're excited to have you as part of our jewelry-loving community.</p>
          <p>Explore our beautiful collection of handcrafted jewelry and find pieces that make you feel extraordinary.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/shop" style="background-color: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Start Shopping</a>
          </div>
          <p>If you have any questions, feel free to contact our support team.</p>
          <p>Best regards,<br>The EtherealGems Team</p>
        </div>
      </div>
    `
  }),

  // Order confirmation
  orderConfirmation: (order) => ({
    subject: `Order Confirmation - ${order.formattedOrderNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Order Confirmed!</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Thank you for your order!</h2>
          <p>Your order ${order.formattedOrderNumber} has been confirmed and is being processed.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Order Details:</h3>
            <p><strong>Order Number:</strong> ${order.formattedOrderNumber}</p>
            <p><strong>Order Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
            <p><strong>Total Amount:</strong> ₹${order.pricing.total.toLocaleString()}</p>
          </div>

          <div style="margin: 20px 0;">
            <h3>Items Ordered:</h3>
            ${order.items.map(item => `
              <div style="border-bottom: 1px solid #eee; padding: 10px 0;">
                <p><strong>${item.name}</strong></p>
                <p>Quantity: ${item.quantity} | Price: ₹${item.price.toLocaleString()}</p>
              </div>
            `).join('')}
          </div>

          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Shipping Address:</h3>
            <p>${order.shippingAddress.firstName} ${order.shippingAddress.lastName}</p>
            <p>${order.shippingAddress.street}</p>
            <p>${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.pincode}</p>
          </div>

          <p>We'll send you another email with tracking information once your order ships.</p>
          <p>Thank you for choosing EtherealGems!</p>
          <p>Best regards,<br>The EtherealGems Team</p>
        </div>
      </div>
    `
  }),

  // Password reset
  passwordReset: (resetURL) => ({
    subject: 'Password Reset Request - EtherealGems',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">Password Reset</h1>
        </div>
        <div style="padding: 20px;">
          <h2>Reset Your Password</h2>
          <p>You requested a password reset for your EtherealGems account.</p>
          <p>Click the button below to reset your password. This link will expire in 10 minutes.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetURL}" style="background-color: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Reset Password</a>
          </div>
          <p>If you didn't request this password reset, please ignore this email.</p>
          <p>Best regards,<br>The EtherealGems Team</p>
        </div>
      </div>
    `
  })
};

module.exports = {
  sendEmail,
  emailTemplates
};