import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import TaskModal from '../components/tasks/TaskModal';
import TaskCollection from '../components/tasks/TaskCollection';
import { useTasks } from '../contexts/TaskContext';
import { isUpcoming } from '../utils/format';

const UpcomingPage = () => {
  const { filteredTasks, categories, createTask, updateTask, deleteTask } = useTasks();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const tasks = useMemo(() => filteredTasks.filter((task) => task.status !== 'completed' && isUpcoming(task.dueDate)), [filteredTasks]);

  const handleSubmit = async (payload) => {
    if (editing) {
      await updateTask(editing._id, payload);
      setEditing(null);
    } else {
      await createTask(payload);
    }
  };

  return (
    <div>
      <PageHeader title="Upcoming tasks" description="See the next seven days at a glance and smooth out workload spikes before they happen." action={<button className="btn-primary gap-2" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add task</button>} />
      <TaskCollection
        tasks={tasks}
        onEdit={(task) => { setEditing(task); setOpen(true); }}
        onDelete={(task) => deleteTask(task._id)}
        onToggleComplete={(task) => updateTask(task._id, { status: task.status === 'completed' ? 'todo' : 'completed' }, { silent: true })}
        emptyTitle="No upcoming tasks"
        emptyDescription="Your next week is wide open. Add priorities before commitments begin to stack up."
        action={<button className="btn-primary" onClick={() => setOpen(true)}>Schedule something</button>}
      />
      <TaskModal open={open} onClose={() => { setOpen(false); setEditing(null); }} onSubmit={handleSubmit} categories={categories} initialTask={editing} />
    </div>
  );
};

export default UpcomingPage;
