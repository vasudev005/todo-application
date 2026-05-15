import { motion } from 'framer-motion';
import { CalendarClock, CheckCircle2, Pencil, Tag, Trash2 } from 'lucide-react';
import { formatDate, priorityTone } from '../../utils/format';

const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }) => (
  <motion.div layout whileHover={{ y: -3 }} className="glass-panel p-4">
    <div className="flex items-start justify-between gap-3">
      <button onClick={() => onToggleComplete(task)} className={`mt-1 rounded-full transition ${task.status === 'completed' ? 'text-emerald-500' : 'text-slate-300 hover:text-emerald-500'}`}>
        <CheckCircle2 className="h-5 w-5" />
      </button>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className={`text-base font-semibold ${task.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-900 dark:text-white'}`}>{task.title}</h3>
          <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${priorityTone[task.priority]}`}>{task.priority}</span>
        </div>
        {task.description ? <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{task.description}</p> : null}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-300">
          <span className="inline-flex items-center gap-1"><CalendarClock className="h-3.5 w-3.5" /> {formatDate(task.dueDate)}</span>
          <span className="inline-flex items-center gap-1"><Tag className="h-3.5 w-3.5" /> {task.categorySlug}</span>
          {task.labels?.length ? <span>{task.labels.join(' • ')}</span> : null}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white" onClick={() => onEdit(task)}>
          <Pencil className="h-4 w-4" />
        </button>
        <button className="rounded-xl p-2 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10" onClick={() => onDelete(task)}>
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>

    {task.subtasks?.length ? (
      <div className="mt-4 rounded-2xl bg-slate-50/90 p-3 dark:bg-slate-950/60">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-400">Subtasks</p>
        <div className="space-y-2">
          {task.subtasks.map((subtask) => (
            <div key={subtask._id || subtask.title} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
              <span className={`h-2.5 w-2.5 rounded-full ${subtask.completed ? 'bg-emerald-500' : 'bg-slate-300'}`} />
              <span>{subtask.title}</span>
            </div>
          ))}
        </div>
      </div>
    ) : null}
  </motion.div>
);

export default TaskCard;
