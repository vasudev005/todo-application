import { useMemo, useState } from 'react';
import { Activity, BrainCircuit, Plus, TimerReset, Trophy } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import TaskCollection from '../components/tasks/TaskCollection';
import TaskModal from '../components/tasks/TaskModal';
import SkeletonCard from '../components/common/SkeletonCard';
import { useTasks } from '../contexts/TaskContext';

const DashboardPage = () => {
  const { filteredTasks, categories, analytics, loading, createTask, updateTask, deleteTask } = useTasks();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const topTasks = useMemo(() => filteredTasks.slice(0, 5), [filteredTasks]);

  const handleSubmit = async (payload) => {
    if (editing) {
      await updateTask(editing._id, payload);
      setEditing(null);
      return;
    }
    await createTask(payload);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Command center"
        title="Dashboard"
        description="A premium overview of productivity, active priorities, and AI-assisted momentum across your workspace."
        action={<button className="btn-primary gap-2" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> New task</button>}
      />

      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Trophy} label="Productivity score" value={`${analytics?.productivityScore ?? 0}%`} hint="Calculated from completion rate." />
        <StatCard icon={Activity} label="Total tasks" value={analytics?.totals?.total ?? 0} hint="Across all active categories." tone="from-sky-500/15 to-cyan-500/15" />
        <StatCard icon={TimerReset} label="Pending tasks" value={analytics?.totals?.pending ?? 0} hint="Stay ahead with upcoming reminders." tone="from-amber-500/15 to-orange-500/15" />
        <StatCard icon={BrainCircuit} label="Overdue tasks" value={analytics?.totals?.overdue ?? 0} hint="Use AI summary for smarter triage." tone="from-rose-500/15 to-pink-500/15" />
      </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2">
          <SkeletonCard className="h-44" />
          <SkeletonCard className="h-44" />
        </div>
      ) : (
        <TaskCollection
          tasks={topTasks}
          onEdit={(task) => {
            setEditing(task);
            setOpen(true);
          }}
          onDelete={(task) => deleteTask(task._id)}
          onToggleComplete={(task) => updateTask(task._id, { status: task.status === 'completed' ? 'todo' : 'completed' }, { silent: true })}
          emptyTitle="No tasks yet"
          emptyDescription="Create your first task to populate the dashboard with live progress, analytics, and AI insights."
          action={<button className="btn-primary" onClick={() => setOpen(true)}>Create first task</button>}
        />
      )}

      <TaskModal open={open} onClose={() => { setOpen(false); setEditing(null); }} onSubmit={handleSubmit} categories={categories} initialTask={editing} />
    </div>
  );
};

export default DashboardPage;
