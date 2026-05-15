import { useMemo } from 'react';
import { CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import TaskCollection from '../components/tasks/TaskCollection';
import { useTasks } from '../contexts/TaskContext';

const CompletedPage = () => {
  const { filteredTasks, updateTask, deleteTask } = useTasks();
  const tasks = useMemo(() => filteredTasks.filter((task) => task.status === 'completed'), [filteredTasks]);

  return (
    <div>
      <PageHeader title="Completed tasks" description="Celebrate finished work and reopen anything that needs one more pass." />
      <TaskCollection
        tasks={tasks}
        onEdit={() => {}}
        onDelete={(task) => deleteTask(task._id)}
        onToggleComplete={(task) => updateTask(task._id, { status: 'todo' }, { silent: true })}
        emptyTitle="Nothing completed yet"
        emptyDescription="Once you start closing out work, completed tasks will appear here."
        action={<div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"><CheckCircle2 className="h-4 w-4" /> Keep going</div>}
      />
    </div>
  );
};

export default CompletedPage;
