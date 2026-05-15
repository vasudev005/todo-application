const Notification = require('../models/Notification');

const listNotifications = async (req, res) => {
  const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(50);
  res.json({ notifications });
};

const markNotificationRead = async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { read: true },
    { new: true }
  );

  if (!notification) {
    return res.status(404).json({ message: 'Notification not found' });
  }

  res.json({ notification });
};

const seedAiReminder = async (req, res) => {
  const notification = await Notification.create({
    user: req.user._id,
    title: 'AI productivity nudge',
    message: 'Take one high-priority task and break it into a 25-minute sprint right now.',
    type: 'ai'
  });

  res.status(201).json({ notification });
};

module.exports = { listNotifications, markNotificationRead, seedAiReminder };
