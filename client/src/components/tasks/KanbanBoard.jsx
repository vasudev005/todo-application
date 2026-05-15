import { useMemo } from 'react';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { formatDate } from '../../utils/format';

const columns = [
  { id: 'todo', title: 'Todo' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'completed', title: 'Completed' }
];

const reorderBoard = (tasks, source, destination) => {
  const board = {
    todo: tasks.filter((task) => task.status === 'todo'),
    'in-progress': tasks.filter((task) => task.status === 'in-progress'),
    completed: tasks.filter((task) => task.status === 'completed')
  };

  const sourceColumn = [...board[source.droppableId]];
  const [moved] = sourceColumn.splice(source.index, 1);
  moved.status = destination.droppableId;

  const destinationColumn = source.droppableId === destination.droppableId ? sourceColumn : [...board[destination.droppableId]];
  destinationColumn.splice(destination.index, 0, moved);

  board[source.droppableId] = sourceColumn;
  board[destination.droppableId] = destinationColumn;

  return columns.flatMap((column) => board[column.id]).map((task, index) => ({ ...task, position: index + 1 }));
};

const KanbanBoard = ({ tasks, onReorder }) => {
  const grouped = useMemo(
    () => ({
      todo: tasks.filter((task) => task.status === 'todo'),
      'in-progress': tasks.filter((task) => task.status === 'in-progress'),
      completed: tasks.filter((task) => task.status === 'completed')
    }),
    [tasks]
  );

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const next = reorderBoard(tasks, result.source, result.destination);
    onReorder(
      next.map((task) => ({ id: task._id, status: task.status })),
      next
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid gap-4 xl:grid-cols-3">
        {columns.map((column) => (
          <Droppable droppableId={column.id} key={column.id}>
            {(provided, snapshot) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className={`glass-panel min-h-[420px] p-4 ${snapshot.isDraggingOver ? 'ring-2 ring-brand-400/50' : ''}`}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{column.title}</h3>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                    {grouped[column.id].length}
                  </span>
                </div>
                <div className="space-y-3">
                  {grouped[column.id].map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(dragProvided, dragSnapshot) => (
                        <motion.div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          className={`rounded-3xl border border-white/40 bg-white/80 p-4 shadow-soft dark:border-white/10 dark:bg-slate-900/80 ${dragSnapshot.isDragging ? 'rotate-1 shadow-2xl' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h4 className="font-semibold text-slate-900 dark:text-white">{task.title}</h4>
                              <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{task.description || 'No extra notes yet.'}</p>
                            </div>
                            <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                              {task.priority}
                            </span>
                          </div>
                          <div className="mt-4 text-xs text-slate-500 dark:text-slate-300">Due {formatDate(task.dueDate)}</div>
                        </motion.div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
