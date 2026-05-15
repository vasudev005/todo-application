const User = require('../models/User');
const { signToken } = require('../utils/jwt');
const { createDefaultWorkspace } = require('../seed/defaultData');

const safeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  avatarUrl: user.avatarUrl,
  theme: user.theme,
  productivityGoal: user.productivityGoal,
  preferences: user.preferences
});

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: 'Email already in use' });
  }

  const user = await User.create({ name, email, password });
  await createDefaultWorkspace(user._id);
  const token = signToken(user._id);

  res.status(201).json({ token, user: safeUser(user) });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = signToken(user._id);
  res.json({ token, user: safeUser(user) });
};

const getMe = async (req, res) => {
  res.json({ user: safeUser(req.user) });
};

module.exports = { register, login, getMe };
