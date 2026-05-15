import { useMemo } from 'react';
import PageHeader from '../components/common/PageHeader';
import { useTasks } from '../contexts/TaskContext';

const CalendarPage = () => {
  const { filteredTasks } = useTasks();
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const monthLabel = now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const days = useMemo(() => {
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    const result = [];
    for (let day = 1; day <= end.getDate(); day += 1) {
      const current = new Date(year, month, day);
      result.push({
        date: current,
        tasks: filteredTasks.filter((task) => task.dueDate && new Date(task.dueDate).toDateString() === current.toDateString())
      });
    }
    const leading = Array.from({ length: start.getDay() }).map((_, index) => ({ id: `empty-${index}` }));
    return [...leading, ...result];
  }, [filteredTasks, month, year]);

  return (
    <div>
      <PageHeader title="Calendar" description="Scan your monthly schedule and keep due dates visually balanced across the month." />
      <div className="glass-card p-6">
        <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">{monthLabel}</h2>
        <div className="mb-4 grid grid-cols-7 gap-3 text-center text-sm font-semibold text-slate-400">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => <div key={day}>{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-3">
          {days.map((entry, index) => (
            <div key={entry.id || entry.date?.toISOString() || index} className="min-h-[120px] rounded-3xl border border-white/40 bg-white/70 p-3 dark:border-white/10 dark:bg-slate-900/70">
              {entry.date ? (
                <>
                  <div className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">{entry.date.getDate()}</div>
                  <div className="space-y-2">
                    {entry.tasks.slice(0, 3).map((task) => (
                      <div key={task._id} className="rounded-2xl bg-brand-50 px-2 py-1 text-xs text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                        {task.title}
                      </div>
                    ))}
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
