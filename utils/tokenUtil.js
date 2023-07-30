const jwt = require('jsonwebtoken');

// Generate JWT token
function generateToken(userEmail) {
  const token = jwt.sign({ user_email: userEmail }, 'your_secret_key');
  return token;
}

// Verify JWT token
function verifyToken(token) {
  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    return decoded;
  } catch (err) {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
