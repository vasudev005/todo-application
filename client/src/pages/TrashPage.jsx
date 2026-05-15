import { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import { useTasks } from '../contexts/TaskContext';
import { formatDateTime } from '../utils/format';

const TrashPage = () => {
  const { loadTrash, restoreTask, permanentlyDeleteTask } = useTasks();
  const [trash, setTrash] = useState([]);

  const refresh = async () => {
    const data = await loadTrash();
    setTrash(data);
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div>
      <PageHeader title="Trash" description="Recover deleted tasks or clear them permanently when they are no longer needed." />
      {trash.length ? (
        <div className="grid gap-4">
          {trash.map((task) => (
            <div key={task._id} className="glass-panel flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{task.title}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Deleted {formatDateTime(task.deletedAt)}</p>
              </div>
              <div className="flex gap-3">
                <button className="btn-secondary" onClick={async () => { await restoreTask(task._id); await refresh(); }}>Restore</button>
                <button className="rounded-2xl bg-rose-500 px-4 py-2.5 font-medium text-white transition hover:bg-rose-600" onClick={async () => { await permanentlyDeleteTask(task._id); await refresh(); }}>Delete forever</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="Trash is empty" description="Deleted tasks will appear here until you restore or remove them forever." icon={Trash2} />
      )}
    </div>
  );
};

export default TrashPage;
