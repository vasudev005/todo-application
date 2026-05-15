const User = require('../models/User');

const updateProfile = async (req, res) => {
  const updates = ['name', 'avatarUrl', 'theme', 'productivityGoal', 'preferences'];
  updates.forEach((key) => {
    if (req.body[key] !== undefined) req.user[key] = req.body[key];
  });

  await req.user.save();

  res.json({
    user: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatarUrl: req.user.avatarUrl,
      theme: req.user.theme,
      productivityGoal: req.user.productivityGoal,
      preferences: req.user.preferences
    }
  });
};

module.exports = { updateProfile };
