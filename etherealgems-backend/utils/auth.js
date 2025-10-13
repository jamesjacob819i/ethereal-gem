const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  // Fallback JWT secret for production deployment (Render free tier limitation)
  const jwtSecret = process.env.JWT_SECRET || '5fbd2e72846d88b44583bda538436c2af1e6028dad1b1f965129cce43e930dccff45dbb9ee6a4f872a74d2630c77a5bf09d88defa09e727f030b3b55c7642aa6';
  
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// Send token response
const sendTokenResponse = (user, statusCode, res, message = 'Success') => {
  // Create token
  const token = generateToken(user._id);

  // Cookie options
  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  };

  // Remove password from output
  user.password = undefined;

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      message,
      token,
      user
    });
};

module.exports = {
  generateToken,
  sendTokenResponse
};