import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCheck, Sparkles } from 'lucide-react';
import { primaryNav, workspaceNav } from '../../lib/navigation';
import { useAuth } from '../../contexts/AuthContext';

const navBase =
  'group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition duration-200';

const SidebarLink = ({ item, onClick }) => {
  const { logout } = useAuth();
  const Icon = item.icon;

  if (item.action === 'logout') {
    return (
      <button
        onClick={() => {
          logout();
          onClick?.();
        }}
        className={`${navBase} w-full text-slate-500 hover:bg-white/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900/80 dark:hover:text-white`}
      >
        <Icon className="h-4 w-4" />
        <span>{item.label}</span>
      </button>
    );
  }

  return (
    <NavLink
      to={item.to}
      onClick={onClick}
      className={({ isActive }) =>
        `${navBase} ${
          isActive
            ? 'bg-white text-slate-900 shadow-soft dark:bg-slate-900 dark:text-white'
            : 'text-slate-500 hover:bg-white/70 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900/80 dark:hover:text-white'
        }`
      }
    >
      <Icon className="h-4 w-4" />
      <span>{item.label}</span>
    </NavLink>
  );
};

const Sidebar = ({ mobile = false, onClose }) => (
  <aside className={`flex h-full flex-col ${mobile ? 'w-full' : 'w-[290px]'}`}>
    <div className="mb-6 flex items-center gap-3 px-2">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-200 via-brand-200 to-sky-200 text-brand-700 shadow-soft">
        <CheckCheck className="h-6 w-6" />
      </div>
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">AI Workspace</p>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Todo Suite</h2>
      </div>
    </div>

    <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="glass-card flex-1 p-4">
      <div className="mb-6 rounded-3xl bg-gradient-to-br from-orange-100 via-white to-sky-100 p-4 dark:from-brand-500/10 dark:via-slate-900 dark:to-sky-500/10">
        <div className="mb-3 inline-flex rounded-2xl bg-white/80 p-2 text-brand-600 dark:bg-slate-900/80">
          <Sparkles className="h-5 w-5" />
        </div>
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Premium productivity flow</h3>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
          
        </p>
      </div>

      <div className="space-y-2">
        <p className="px-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Main</p>
        {primaryNav.map((item) => (
          <SidebarLink key={item.label} item={item} onClick={onClose} />
        ))}
      </div>

      <div className="mt-6 space-y-2">
        <p className="px-3 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Workspace</p>
        {workspaceNav.map((item) => (
          <SidebarLink key={item.label} item={item} onClick={onClose} />
        ))}
      </div>
    </motion.div>
  </aside>
);

export default Sidebar;
