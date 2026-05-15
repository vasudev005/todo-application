import { useMemo, useState } from 'react';
import { Bell, Menu, Moon, Search, Sun } from 'lucide-react';
import { useTasks } from '../../contexts/TaskContext';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

const Topbar = ({ onMenuClick }) => {
  const { searchTerm, setSearchTerm, notifications } = useTasks();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const unread = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);

  return (
    <div className="glass-panel mb-6 flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <button className="btn-secondary md:hidden" onClick={onMenuClick}>
          <Menu className="h-4 w-4" />
        </button>
        <div className="relative w-full md:w-[420px]">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            className="input-primary pl-11"
            placeholder="Search tasks, labels, priorities..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <button onClick={toggleTheme} className="btn-secondary !px-3">
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
        <div className="relative">
          <button className="btn-secondary !px-3">
            <Bell className="h-4 w-4" />
          </button>
          {unread > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-xs text-white">
              {unread}
            </span>
          ) : null}
        </div>
        <div className="relative">
          <button onClick={() => setOpen((prev) => !prev)} className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/80 px-3 py-2 dark:border-white/10 dark:bg-slate-900/70">
            <img
              src={user?.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'AI User')}&background=ede9fe&color=5b21b6`}
              alt={user?.name}
              className="h-10 w-10 rounded-2xl object-cover"
            />
            <div className="hidden text-left md:block">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{user?.name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-300">Focused member</p>
            </div>
          </button>
          {open ? (
            <div className="absolute right-0 z-20 mt-3 w-56 rounded-2xl border border-white/40 bg-white/95 p-3 shadow-glass dark:border-white/10 dark:bg-slate-900/95">
              <button onClick={logout} className="w-full rounded-2xl px-3 py-2 text-left text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">
                Logout
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
