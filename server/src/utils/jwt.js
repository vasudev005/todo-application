const jwt = require('jsonwebtoken');

console.log("JWT =>", process.env.JWT_SECRET);

const signToken = (userId) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error('JWT_SECRET is missing');

  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
};

module.exports = { signToken };