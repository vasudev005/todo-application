import { useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import TaskModal from '../components/tasks/TaskModal';
import TaskCollection from '../components/tasks/TaskCollection';
import { useTasks } from '../contexts/TaskContext';
import { isToday } from '../utils/format';

const TodayPage = () => {
  const { filteredTasks, categories, createTask, updateTask, deleteTask } = useTasks();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const tasks = useMemo(() => filteredTasks.filter((task) => isToday(task.dueDate)), [filteredTasks]);

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
      <PageHeader title="Today tasks" description="Zero in on the tasks that matter right now, with reminders, subtasks, and clean focus." action={<button className="btn-primary gap-2" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add task</button>} />
      <TaskCollection
        tasks={tasks}
        onEdit={(task) => { setEditing(task); setOpen(true); }}
        onDelete={(task) => deleteTask(task._id)}
        onToggleComplete={(task) => updateTask(task._id, { status: task.status === 'completed' ? 'todo' : 'completed' }, { silent: true })}
        emptyTitle="Nothing due today"
        emptyDescription="Either you're ahead of schedule or today's plan still needs a few tasks."
        action={<button className="btn-primary" onClick={() => setOpen(true)}>Plan today</button>}
      />
      <TaskModal open={open} onClose={() => { setOpen(false); setEditing(null); }} onSubmit={handleSubmit} categories={categories} initialTask={editing} />
    </div>
  );
};

export default TodayPage;
