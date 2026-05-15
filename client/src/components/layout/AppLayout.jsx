import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import { BrainCircuit, Clock3, Sparkles, Target } from 'lucide-react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useTasks } from '../../contexts/TaskContext';
import { formatDateTime } from '../../utils/format';

const AppLayout = () => {
  const { tasks, summary, analytics } = useTasks();
  const [open, setOpen] = useState(false);

  const focusTasks = useMemo(
    () => tasks.filter((task) => task.status !== 'completed').slice(0, 4),
    [tasks]
  );

  return (
    <div className="min-h-screen p-4 lg:p-6">
      <div className="mx-auto flex max-w-[1700px] gap-6">
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        <AnimatePresence>
          {open ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-slate-950/35 p-4 lg:hidden">
              <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -40, opacity: 0 }} className="h-full max-w-sm">
                <Sidebar mobile onClose={() => setOpen(false)} />
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <main className="min-w-0 flex-1">
          <Topbar onMenuClick={() => setOpen(true)} />
          <Outlet />
        </main>

        <aside className="hidden w-[320px] xl:block">
          <div className="glass-card sticky top-6 space-y-5 p-5">
            <div className="rounded-3xl bg-gradient-to-br from-brand-500/10 to-sky-500/10 p-5">
              <div className="mb-3 inline-flex rounded-2xl bg-white/80 p-2 text-brand-600 dark:bg-slate-900/80">
                <BrainCircuit className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">AI focus digest</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">
                {summary?.content || 'Generate your daily AI summary to see prioritization tips and tomorrow recommendations.'}
              </p>
            </div>

            <div className="glass-panel p-4">
              <div className="mb-4 flex items-center gap-3">
                <Target className="h-5 w-5 text-brand-600" />
                <h4 className="font-semibold text-slate-900 dark:text-white">Top focus queue</h4>
              </div>
              <div className="space-y-3">
                {focusTasks.length ? (
                  focusTasks.map((task) => (
                    <div key={task._id} className="rounded-2xl border border-white/40 bg-white/70 p-3 dark:border-white/10 dark:bg-slate-900/70">
                      <p className="font-medium text-slate-900 dark:text-white">{task.title}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-300">
                        <span className="capitalize">{task.priority}</span>
                        <span>{formatDateTime(task.dueDate)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500 dark:text-slate-300">No active tasks yet.</p>
                )}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
              <div className="glass-panel p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-500 dark:text-slate-300"><Sparkles className="h-4 w-4 text-brand-600" /> Productivity</div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{analytics?.productivityScore ?? 0}%</p>
              </div>
              <div className="glass-panel p-4">
                <div className="mb-2 flex items-center gap-2 text-slate-500 dark:text-slate-300"><Clock3 className="h-4 w-4 text-brand-600" /> Pending</div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{analytics?.totals?.pending ?? 0}</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AppLayout;
