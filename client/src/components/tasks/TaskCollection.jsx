import {
  ClipboardList,
} from 'lucide-react';

import EmptyState from '../common/EmptyState';

import TaskCard from './TaskCard';

const TaskCollection = ({
  tasks,
  onEdit,
  onDelete,
  onToggleComplete,
  emptyTitle,
  emptyDescription,
  action,
}) => {

  // EMPTY STATE

  if (!tasks.length) {

    return (

      <div
        className="
          flex

          min-h-[400px]

          items-center
          justify-center
        "
      >

        <EmptyState
          title={emptyTitle}
          description={emptyDescription}
          action={action}
          icon={ClipboardList}
        />

      </div>

    );
  }

  return (

    <div
      className="
        flex
        flex-col

        gap-4

        min-h-full
      "
    >

      {tasks.map((task) => (

        <TaskCard
          key={task._id}

          task={task}

          onEdit={() =>
            onEdit(task)
          }

          onDelete={() =>
            onDelete(task)
          }

          onToggleComplete={() =>
            onToggleComplete(task)
          }
        />

      ))}

    </div>

  );
};

export default TaskCollection;