const Task = require('../models/Task');

const startOfDay = (date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

const endOfDay = (date) => {
  const copy = new Date(date);
  copy.setHours(23, 59, 59, 999);
  return copy;
};

const getAnalyticsOverview = async (userId) => {
  const tasks = await Task.find({ user: userId, isDeleted: false }).lean();
  const total = tasks.length;
  const completed = tasks.filter((task) => task.status === 'completed').length;
  const pending = tasks.filter((task) => task.status !== 'completed').length;
  const overdue = tasks.filter(
    (task) => task.status !== 'completed' && task.dueDate && new Date(task.dueDate) < new Date()
  ).length;

  const productivityScore = total === 0 ? 0 : Math.round((completed / total) * 100);

  const categoryStats = Object.values(
    tasks.reduce((acc, task) => {
      const key = task.categorySlug || 'uncategorized';
      if (!acc[key]) {
        acc[key] = { name: key, total: 0, completed: 0, pending: 0 };
      }
      acc[key].total += 1;
      if (task.status === 'completed') acc[key].completed += 1;
      else acc[key].pending += 1;
      return acc;
    }, {})
  );

  const weeklyProductivity = Array.from({ length: 7 }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const dayTasks = tasks.filter(
      (task) =>
        task.completedAt &&
        new Date(task.completedAt) >= startOfDay(date) &&
        new Date(task.completedAt) <= endOfDay(date)
    );

    return {
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      completed: dayTasks.length,
      created: tasks.filter(
        (task) => new Date(task.createdAt) >= startOfDay(date) && new Date(task.createdAt) <= endOfDay(date)
      ).length
    };
  });

  return {
    totals: { total, completed, pending, overdue },
    productivityScore,
    categoryStats,
    weeklyProductivity
  };
};

module.exports = { getAnalyticsOverview };
