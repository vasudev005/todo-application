const Task = require('../models/Task');
const Notification = require('../models/Notification');

const normalizePosition = async (userId) => {
  const tasks = await Task.find({ user: userId, isDeleted: false }).sort({ position: 1, createdAt: 1 });
  await Promise.all(
    tasks.map((task, index) => Task.findByIdAndUpdate(task._id, { position: index + 1 }))
  );
};

const listTasks = async (req, res) => {
  const { search = '', status, category, due } = req.query;
  const query = {
    user: req.user._id,
    isDeleted: false,
    title: { $regex: search, $options: 'i' }
  };

  if (status) query.status = status;
  if (category) query.categorySlug = category;
  if (due === 'today') {
    const now = new Date();
    const start = new Date(now.setHours(0, 0, 0, 0));
    const end = new Date(now.setHours(23, 59, 59, 999));
    query.dueDate = { $gte: start, $lte: end };
  }

  const tasks = await Task.find(query).sort({ position: 1, dueDate: 1, createdAt: -1 });
  res.json({ tasks });
};

const createTask = async (req, res) => {
  const count = await Task.countDocuments({ user: req.user._id, isDeleted: false });
  const task = await Task.create({
    ...req.body,
    user: req.user._id,
    position: count + 1
  });

  if (task.reminderAt) {
    await Notification.create({
      user: req.user._id,
      title: 'Task reminder scheduled',
      message: `Reminder set for ${task.title}`,
      type: 'reminder',
      taskId: task._id
    });
  }

  res.status(201).json({ task });
};

const updateTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  Object.assign(task, req.body);
  if (task.status === 'completed' && !task.completedAt) {
    task.completedAt = new Date();
  }
  if (task.status !== 'completed') {
    task.completedAt = null;
  }
  await task.save();
  res.json({ task });
};

const deleteTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }

  task.isDeleted = true;
  task.deletedAt = new Date();
  await task.save();
  await normalizePosition(req.user._id);
  res.json({ message: 'Task moved to trash' });
};

const getTrash = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id, isDeleted: true }).sort({ deletedAt: -1 });
  res.json({ tasks });
};

const restoreTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id, isDeleted: true });
  if (!task) {
    return res.status(404).json({ message: 'Task not found in trash' });
  }

  task.isDeleted = false;
  task.deletedAt = null;
  await task.save();
  await normalizePosition(req.user._id);
  res.json({ task });
};

const deletePermanently = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id, isDeleted: true });
  if (!task) {
    return res.status(404).json({ message: 'Task not found in trash' });
  }

  res.json({ message: 'Task permanently deleted' });
};

const reorderTasks = async (req, res) => {
  const { items } = req.body;
  await Promise.all(
    items.map((item, index) =>
      Task.findOneAndUpdate(
        { _id: item.id, user: req.user._id },
        { position: index + 1, status: item.status }
      )
    )
  );

  const tasks = await Task.find({ user: req.user._id, isDeleted: false }).sort({ position: 1 });
  res.json({ tasks });
};

module.exports = {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
  getTrash,
  restoreTask,
  deletePermanently,
  reorderTasks
};
