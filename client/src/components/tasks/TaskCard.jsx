import { motion } from 'framer-motion';

import {
  AlarmClock,
  CalendarClock,
  CheckCircle2,
  Pencil,
  Tag,
  Trash2,
} from 'lucide-react';

import {
  formatDate,
  priorityTone,
} from '../../utils/format';

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
}) => (

  <motion.div

    layout

    whileHover={{
      y: -2,
    }}

    transition={{
      duration: 0.18,
    }}

    className="
      glass-panel

      p-4

      transition-all

      hover:shadow-md
    "
  >

    <div
      className="
        flex
        items-start
        justify-between

        gap-3
      "
    >

      {/* COMPLETE */}

      <button
        onClick={() =>
          onToggleComplete(task)
        }

        className={`
          mt-0.5

          rounded-full

          transition

          ${
            task.status ===
            'completed'

              ? 'text-emerald-500'

              : `
                text-slate-300

                hover:text-emerald-500
              `
          }
        `}
      >

        <CheckCircle2 className="h-5 w-5" />

      </button>

      {/* CONTENT */}

      <div
        className="
          min-w-0
          flex-1
        "
      >

        {/* TITLE */}

        <div
          className="
            flex
            flex-wrap
            items-center

            gap-2
          "
        >

          <h3
            className={`
              text-base
              font-semibold

              break-words

              ${
                task.status ===
                'completed'

                  ? `
                    text-slate-400
                    line-through
                  `

                  : `
                    text-slate-900
                    dark:text-white
                  `
              }
            `}
          >

            {task.title}

          </h3>

          {/* PRIORITY */}

          <span
            className={`
              rounded-full

              px-2
              py-0.5

              text-[11px]
              font-medium

              ${priorityTone[task.priority]}
            `}
          >

            {task.priority}

          </span>

        </div>

        {/* DESCRIPTION */}

        {task.description ? (

          <p
            className="
              mt-1.5

              text-base
              leading-6

              text-slate-500
              dark:text-slate-300
            "
          >

            {task.description}

          </p>

        ) : null}

        {/* META */}

        <div
          className="
            mt-3

            flex
            flex-wrap
            items-center

            gap-2

            text-xs

            text-slate-500
            dark:text-slate-300
          "
        >

          {/* DATE */}

          <span
            className="
              inline-flex
              items-center
              gap-1
            "
          >

            <CalendarClock className="h-3.5 w-3.5" />

            {formatDate(task.dueDate)}

          </span>

          {/* CATEGORY */}

          <span
            className="
              inline-flex
              items-center
              gap-1
            "
          >

            <Tag className="h-3.5 w-3.5" />

            {task.categorySlug}

          </span>

          {/* REMINDER */}

          {task.reminderAt ? (

            <span
              className="
                inline-flex
                items-center
                gap-1

                rounded-full

                bg-brand-500/10

                px-2
                py-0.5

                text-brand-600
              "
            >

              <AlarmClock className="h-3.5 w-3.5" />

              Reminder

            </span>

          ) : null}

          {/* LABELS */}

          {task.labels?.length ? (

            <span>

              {task.labels.join(' • ')}

            </span>

          ) : null}

        </div>

      </div>

      {/* ACTIONS */}

      <div
        className="
          flex
          items-center
          gap-1
        "
      >

        {/* EDIT */}

        <button
          className="
            rounded-lg

            p-1.5

            text-slate-400

            transition

            hover:bg-slate-100
            hover:text-slate-700

            dark:hover:bg-slate-800
            dark:hover:text-white
          "

          onClick={() =>
            onEdit(task)
          }
        >

          <Pencil className="h-4 w-4" />

        </button>

        {/* DELETE */}

        <button
          className="
            rounded-lg

            p-1.5

            text-slate-400

            transition

            hover:bg-rose-50
            hover:text-rose-600

            dark:hover:bg-rose-500/10
          "

          onClick={() =>
            onDelete(task)
          }
        >

          <Trash2 className="h-4 w-4" />

        </button>

      </div>

    </div>

    {/* SUBTASKS */}

    {task.subtasks?.length ? (

      <div
        className="
          mt-3

          rounded-2xl

          bg-slate-50/90

          p-2.5

          dark:bg-slate-950/60
        "
      >

        <p
          className="
            mb-2

            text-[10px]
            font-semibold
            uppercase

            tracking-[0.2em]

            text-slate-400
          "
        >

          Subtasks

        </p>

        <div className="space-y-1.5">

          {task.subtasks.map(
            (subtask) => (

              <div
                key={
                  subtask._id ||
                  subtask.title
                }

                className="
                  flex
                  items-center
                  gap-2

                  text-base

                  text-slate-600
                  dark:text-slate-300
                "
              >

                <span
                  className={`
                    h-2
                    w-2

                    rounded-full

                    ${
                      subtask.completed

                        ? 'bg-emerald-500'

                        : 'bg-slate-300'
                    }
                  `}
                />

                <span>

                  {subtask.title}

                </span>

              </div>

            )
          )}

        </div>

      </div>

    ) : null}

  </motion.div>
);

export default TaskCard;