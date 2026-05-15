import { useState } from 'react';
import toast from 'react-hot-toast';
import PageHeader from '../components/common/PageHeader';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { requestBrowserNotificationPermission } from '../utils/notifications';

const SettingsPage = () => {
  const { user, updateCurrentUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const [goal, setGoal] = useState(user?.productivityGoal || 5);
  const [dailyDigest, setDailyDigest] = useState(user?.preferences?.dailyDigest ?? true);
  const [motivationalQuotes, setMotivationalQuotes] = useState(user?.preferences?.motivationalQuotes ?? true);
  const [browserNotifications, setBrowserNotifications] = useState(user?.preferences?.browserNotifications ?? true);

  const saveSettings = async () => {
    const { data } = await api.put('/profile', {
      theme,
      productivityGoal: Number(goal),
      preferences: { dailyDigest, motivationalQuotes, browserNotifications }
    });
    updateCurrentUser(data.user);
    toast.success('Settings saved');
  };

  return (
    <div>
      <PageHeader title="Settings" description="Configure theme behavior, goals, and reminder preferences for a calmer workflow." />
      <div className="grid gap-5 xl:grid-cols-2">
        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Workspace preferences</h3>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Theme</span>
              <select className="input-primary" value={theme} onChange={(event) => setTheme(event.target.value)}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">Daily completion goal</span>
              <input className="input-primary" type="number" min="1" max="30" value={goal} onChange={(event) => setGoal(event.target.value)} />
            </label>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Notifications and AI</h3>
          <div className="mt-5 space-y-4 text-sm text-slate-600 dark:text-slate-300">
            {[
              ['Daily digest', dailyDigest, setDailyDigest],
              ['Motivational quotes', motivationalQuotes, setMotivationalQuotes],
              ['Browser notifications', browserNotifications, setBrowserNotifications]
            ].map(([label, value, setter]) => (
              <label key={label} className="flex items-center justify-between rounded-2xl border border-white/40 bg-white/70 px-4 py-3 dark:border-white/10 dark:bg-slate-900/70">
                <span>{label}</span>
                <input type="checkbox" checked={value} onChange={(event) => setter(event.target.checked)} />
              </label>
            ))}
            <button className="btn-secondary" onClick={requestBrowserNotificationPermission}>Enable browser permission</button>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button className="btn-primary" onClick={saveSettings}>Save settings</button>
      </div>
    </div>
  );
};

export default SettingsPage;
