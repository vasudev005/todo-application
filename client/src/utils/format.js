export const formatDate = (value, config = { month: 'short', day: 'numeric' }) => {
  if (!value) return 'No date';
  return new Intl.DateTimeFormat('en-US', config).format(new Date(value));
};

export const formatDateTime = (value) => {
  if (!value) return 'No reminder';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(new Date(value));
};

export const isToday = (value) => {
  if (!value) return false;
  const date = new Date(value);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

export const isUpcoming = (value) => {
  if (!value) return false;
  const date = new Date(value);
  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);
  return date >= today && date <= nextWeek;
};

export const priorityTone = {
  low: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300',
  medium: 'bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-300',
  high: 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300',
  urgent: 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300'
};
