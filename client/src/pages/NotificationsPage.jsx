import { BellRing } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import { useTasks } from '../contexts/TaskContext';
import { formatDateTime } from '../utils/format';

const NotificationsPage = () => {
  const { notifications, markNotificationRead } = useTasks();

  return (
    <div>
      <PageHeader title="Notifications" description="Reminder nudges, deadline alerts, and AI prompts live here for easy triage." />
      {notifications.length ? (
        <div className="grid gap-4">
          {notifications.map((notification) => (
            <div key={notification._id} className="glass-panel flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${notification.read ? 'bg-slate-300' : 'bg-brand-500'}`} />
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">{notification.type}</p>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">{notification.title}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{notification.message}</p>
                <p className="mt-3 text-xs text-slate-400">{formatDateTime(notification.createdAt)}</p>
              </div>
              {!notification.read ? <button className="btn-secondary" onClick={() => markNotificationRead(notification._id)}>Mark as read</button> : null}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="All caught up" description="No notifications are waiting. New reminders and AI nudges will appear here." icon={BellRing} />
      )}
    </div>
  );
};

export default NotificationsPage;
