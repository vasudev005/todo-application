import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { fileToDataUrl } from '../../utils/file';

const emptyState = {
  title: '',
  description: '',
  priority: 'medium',
  status: 'todo',
  dueDate: '',
  reminderAt: '',
  categorySlug: 'personal',
  labels: '',
  subtasks: '',
  attachments: []
};

const TaskModal = ({ open, onClose, onSubmit, categories = [], initialTask = null }) => {
  const [form, setForm] = useState(emptyState);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initialTask) {
      setForm({
        title: initialTask.title || '',
        description: initialTask.description || '',
        priority: initialTask.priority || 'medium',
        status: initialTask.status || 'todo',
        dueDate: initialTask.dueDate ? new Date(initialTask.dueDate).toISOString().slice(0, 16) : '',
        reminderAt: initialTask.reminderAt ? new Date(initialTask.reminderAt).toISOString().slice(0, 16) : '',
        categorySlug: initialTask.categorySlug || 'personal',
        labels: initialTask.labels?.join(', ') || '',
        subtasks: initialTask.subtasks?.map((item) => item.title).join('\n') || '',
        attachments: initialTask.attachments || []
      });
      return;
    }
    setForm(emptyState);
  }, [initialTask, open]);

  if (!open) return null;

  const handleFiles = async (event) => {
    const selectedFiles = Array.from(event.target.files || []);
    const attachments = await Promise.all(selectedFiles.map(fileToDataUrl));
    setForm((prev) => ({ ...prev, attachments: [...prev.attachments, ...attachments] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      await onSubmit({
        title: form.title,
        description: form.description,
        priority: form.priority,
        status: form.status,
        dueDate: form.dueDate || null,
        reminderAt: form.reminderAt || null,
        categorySlug: form.categorySlug,
        labels: form.labels.split(',').map((item) => item.trim()).filter(Boolean),
        subtasks: form.subtasks
          .split('\n')
          .map((item) => item.trim())
          .filter(Boolean)
          .map((title) => ({ title, completed: false })),
        attachments: form.attachments
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4">
      <div className="glass-card max-h-[92vh] w-full max-w-3xl overflow-y-auto p-6">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{initialTask ? 'Edit task' : 'Create task'}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Capture priorities, reminders, labels, and attachments in one place.</p>
          </div>
          <button onClick={onClose} className="rounded-2xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <input className="input-primary" placeholder="Task title" value={form.title} onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))} required />
          </div>
          <div className="md:col-span-2">
            <textarea className="input-primary min-h-[110px]" placeholder="Task description" value={form.description} onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))} />
          </div>
          <select className="input-primary" value={form.priority} onChange={(event) => setForm((prev) => ({ ...prev, priority: event.target.value }))}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
          <select className="input-primary" value={form.status} onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <input className="input-primary" type="datetime-local" value={form.dueDate} onChange={(event) => setForm((prev) => ({ ...prev, dueDate: event.target.value }))} />
          <input className="input-primary" type="datetime-local" value={form.reminderAt} onChange={(event) => setForm((prev) => ({ ...prev, reminderAt: event.target.value }))} />
          <select className="input-primary" value={form.categorySlug} onChange={(event) => setForm((prev) => ({ ...prev, categorySlug: event.target.value }))}>
            {(categories.length ? categories : [{ slug: 'personal', name: 'Personal' }]).map((category) => (
              <option key={category.slug} value={category.slug}>{category.name || category.slug}</option>
            ))}
          </select>
          <input className="input-primary" placeholder="Labels separated by commas" value={form.labels} onChange={(event) => setForm((prev) => ({ ...prev, labels: event.target.value }))} />
          <div className="md:col-span-2">
            <textarea className="input-primary min-h-[120px]" placeholder="One subtask per line" value={form.subtasks} onChange={(event) => setForm((prev) => ({ ...prev, subtasks: event.target.value }))} />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-600 dark:text-slate-300">File attachments</label>
            <input className="input-primary" type="file" multiple onChange={handleFiles} />
            {form.attachments.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.attachments.map((item) => (
                  <span key={`${item.name}-${item.size}`} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-200">
                    {item.name}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <div className="md:col-span-2 flex items-center justify-end gap-3 pt-2">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>{saving ? 'Saving...' : initialTask ? 'Update task' : 'Create task'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
