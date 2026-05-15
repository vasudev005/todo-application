import { ClipboardList } from 'lucide-react';
import EmptyState from '../common/EmptyState';
import TaskCard from './TaskCard';

const TaskCollection = ({ tasks, onEdit, onDelete, onToggleComplete, emptyTitle, emptyDescription, action }) => {
  if (!tasks.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} action={action} icon={ClipboardList} />;
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} onEdit={onEdit} onDelete={onDelete} onToggleComplete={onToggleComplete} />
      ))}
    </div>
  );
};

export default TaskCollection;
