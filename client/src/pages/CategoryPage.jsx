import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import TaskModal from '../components/tasks/TaskModal';
import TaskCollection from '../components/tasks/TaskCollection';
import { useTasks } from '../contexts/TaskContext';

const CategoryPage = () => {
  const { slug } = useParams();
  const { filteredTasks, categories, createTask, updateTask, deleteTask } = useTasks();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const tasks = useMemo(() => filteredTasks.filter((task) => task.categorySlug === slug && task.status !== 'completed'), [filteredTasks, slug]);
  const category = categories.find((item) => item.slug === slug);

  const handleSubmit = async (payload) => {
    const nextPayload = { ...payload, categorySlug: slug };
    if (editing) {
      await updateTask(editing._id, nextPayload);
      setEditing(null);
    } else {
      await createTask(nextPayload);
    }
  };

  return (
    <div>
      <PageHeader title={category?.name || slug} description={`Focused workspace for ${category?.name || slug} tasks.`} action={<button className="btn-primary gap-2" onClick={() => setOpen(true)}><Plus className="h-4 w-4" /> Add task</button>} />
      <TaskCollection
        tasks={tasks}
        onEdit={(task) => { setEditing(task); setOpen(true); }}
        onDelete={(task) => deleteTask(task._id)}
        onToggleComplete={(task) => updateTask(task._id, { status: task.status === 'completed' ? 'todo' : 'completed' }, { silent: true })}
        emptyTitle={`No ${slug} tasks`}
        emptyDescription="Add a task and keep this workspace area intentionally organized."
        action={<button className="btn-primary" onClick={() => setOpen(true)}>Add task</button>}
      />
      <TaskModal open={open} onClose={() => { setOpen(false); setEditing(null); }} onSubmit={handleSubmit} categories={categories} initialTask={editing} />
    </div>
  );
};

export default CategoryPage;
