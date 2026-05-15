export const requestBrowserNotificationPermission = async () => {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

export const maybeFireReminderNotifications = (tasks = []) => {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;

  const now = Date.now();
  tasks.forEach((task) => {
    if (!task.reminderAt || task.status === 'completed') return;
    const diff = new Date(task.reminderAt).getTime() - now;
    const key = `notified_${task._id}`;
    if (diff <= 15 * 60 * 1000 && diff >= 0 && !sessionStorage.getItem(key)) {
      new Notification('Task reminder', {
        body: `${task.title} is coming up soon.`,
        icon: '/favicon.ico'
      });
      sessionStorage.setItem(key, 'true');
    }
  });
};
