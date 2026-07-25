import { useMemo } from 'react';

import {
  DragDropContext,
  Draggable,
  Droppable,
} from '@hello-pangea/dnd';

import { formatDate } from '../../utils/format';

const columns = [
  {
    id: 'todo',
    title: 'Todo',
  },

  {
    id: 'in-progress',
    title: 'In Progress',
  },

  {
    id: 'completed',
    title: 'Completed',
  },
];

const reorderBoard = (
  tasks,
  source,
  destination
) => {

  const board = {

    todo: tasks.filter(
      (task) =>
        task.status === 'todo'
    ),

    'in-progress': tasks.filter(
      (task) =>
        task.status ===
        'in-progress'
    ),

    completed: tasks.filter(
      (task) =>
        task.status ===
        'completed'
    ),
  };

  const sourceColumn = [
    ...board[source.droppableId],
  ];

  const [moved] =
    sourceColumn.splice(
      source.index,
      1
    );

  moved.status = String(
    destination.droppableId
  );

  const destinationColumn =
    source.droppableId ===
    destination.droppableId
      ? sourceColumn
      : [
          ...board[
            destination
              .droppableId
          ],
        ];

  destinationColumn.splice(
    destination.index,
    0,
    moved
  );

  board[source.droppableId] =
    sourceColumn;

  board[destination.droppableId] =
    destinationColumn;

  return columns
    .flatMap(
      (column) =>
        board[column.id]
    )
    .map((task, index) => ({
      ...task,
      position: index + 1,
    }));
};

const KanbanBoard = ({
  tasks,
  onReorder,
}) => {

  const grouped = useMemo(
    () => ({

      todo: tasks.filter(
        (task) =>
          task.status === 'todo'
      ),

      'in-progress':
        tasks.filter(
          (task) =>
            task.status ===
            'in-progress'
        ),

      completed: tasks.filter(
        (task) =>
          task.status ===
          'completed'
      ),
    }),

    [tasks]
  );

  const handleDragEnd = (
    result
  ) => {

    if (!result.destination)
      return;

    if (
      result.destination
        .droppableId ===
        result.source
          .droppableId &&

      result.destination.index ===
        result.source.index
    ) {
      return;
    }

    const next =
      reorderBoard(
        tasks,
        result.source,
        result.destination
      );

    onReorder(
      next.map((task) => ({
        id: String(task._id),
        status: task.status,
      })),
      next
    );
  };

  return (

    <div
      className="
        flex
        flex-1

        min-h-0
        h-full

        overflow-x-auto
        overflow-y-hidden

        no-scrollbar
      "
    >

      <DragDropContext
        onDragEnd={
          handleDragEnd
        }
      >

        <div
          className="
            flex-1

            h-full
            min-h-0

            overflow-x-auto
            overflow-y-hidden

            no-scrollbar
          "
        >

          <div
            className="
              grid

              h-full
              min-h-0

              gap-4

              min-w-[980px]

              xl:grid-cols-3
            "
          >

            {columns.map(
              (column) => (

                <Droppable
                  droppableId={
                    column.id
                  }
                  key={column.id}
                >

                  {(
                    provided,
                    snapshot
                  ) => (

                    <div
                      ref={
                        provided.innerRef
                      }

                      {...provided.droppableProps}

                      className={`
                        glass-panel

                        flex
                        flex-col

                        h-full
                        min-h-0

                        rounded-3xl

                        overflow-hidden

                        p-2.5

                        transition-all
                        duration-200

                        ${
                          snapshot.isDraggingOver
                            ? `
                              ring-2
                              ring-brand-400/40

                              bg-brand-50/30
                            `
                            : ''
                        }
                      `}
                    >

                      {/* HEADER */}

                      <div
                        className="
                          sticky
                          top-0
                          z-10

                          mb-3

                          flex
                          items-center
                          justify-between

                          rounded-2xl

                          bg-white/80

                          px-2
                          py-2

                          backdrop-blur-xl

                          dark:bg-slate-900/80
                        "
                      >

                        <h3
                          className="
                            text-sm
                            font-semibold

                            text-slate-900
                            dark:text-white
                          "
                        >

                          {column.title}

                        </h3>

                        <span
                          className="
                            rounded-full

                            bg-slate-100

                            px-2.5
                            py-1

                            text-[11px]
                            font-medium

                            text-slate-600

                            dark:bg-slate-800
                            dark:text-slate-200
                          "
                        >

                          {
                            grouped[
                              column.id
                            ].length
                          }

                        </span>

                      </div>

                      {/* TASK LIST */}

                      <div
                        className="
                          flex-1

                          min-h-0

                          overflow-y-auto
                          overflow-x-hidden

                          scroll-smooth
                          no-scrollbar

                          space-y-2.5

                          pr-1
                        "
                      >

                        {grouped[
                          column.id
                        ].map(
                          (
                            task,
                            index
                          ) => (

                            <Draggable
                              key={String(
                                task._id
                              )}

                              draggableId={String(
                                task._id
                              )}

                              index={index}
                            >

                              {(
                                dragProvided,
                                dragSnapshot
                              ) => (

                                <div
                                  ref={
                                    dragProvided.innerRef
                                  }

                                  {...dragProvided.draggableProps}

                                  {...dragProvided.dragHandleProps}

                                  style={{
                                    ...dragProvided
                                      .draggableProps
                                      .style,
                                  }}

                                  className={`
                                    rounded-2xl

                                    border
                                    border-white/40

                                    bg-white/90

                                    p-2.5

                                    shadow-soft

                                    transition-all
                                    duration-200

                                    hover:-translate-y-0.5
                                    hover:shadow-lg

                                    dark:border-white/10
                                    dark:bg-slate-900/90

                                    ${
                                      dragSnapshot.isDragging
                                        ? `
                                          rotate-1
                                          scale-[1.02]

                                          shadow-2xl
                                        `
                                        : ''
                                    }
                                  `}
                                >

                                  <div
                                    className="
                                      flex
                                      items-start
                                      justify-between

                                      gap-3
                                    "
                                  >

                                    <div>

                                      <h4
                                        className="
                                          text-sm
                                          font-semibold

                                          text-slate-900
                                          dark:text-white
                                        "
                                      >

                                        {task.title}

                                      </h4>

                                      <p
                                        className="
                                          mt-1

                                          text-xs

                                          text-slate-500
                                          dark:text-slate-300
                                        "
                                      >

                                        {
                                          task.description ||

                                          'No extra notes yet.'
                                        }

                                      </p>

                                    </div>

                                    <span
                                      className="
                                        rounded-full

                                        bg-brand-50

                                        px-2
                                        py-1

                                        text-[10px]
                                        font-semibold

                                        text-brand-600

                                        dark:bg-brand-500/15
                                        dark:text-brand-300
                                      "
                                    >

                                      {task.priority}

                                    </span>

                                  </div>

                                  <div
                                    className="
                                      mt-2.5

                                      text-[10px]

                                      text-slate-500
                                      dark:text-slate-300
                                    "
                                  >

                                    Due{' '}

                                    {formatDate(
                                      task.dueDate
                                    )}

                                  </div>

                                </div>

                              )}

                            </Draggable>

                          )
                        )}

                        {provided.placeholder}

                      </div>

                    </div>

                  )}

                </Droppable>

              )
            )}

          </div>

        </div>

      </DragDropContext>

    </div>
  );
};

export default KanbanBoard;