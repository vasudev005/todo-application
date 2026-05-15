const SkeletonCard = ({ className = '' }) => (
  <div className={`animate-pulse rounded-3xl border border-white/40 bg-white/70 p-5 dark:border-white/10 dark:bg-slate-900/70 ${className}`}>
    <div className="h-4 w-1/3 rounded-full bg-slate-200 dark:bg-slate-700" />
    <div className="mt-4 h-6 w-2/3 rounded-full bg-slate-200 dark:bg-slate-700" />
    <div className="mt-3 h-4 w-full rounded-full bg-slate-200 dark:bg-slate-700" />
    <div className="mt-2 h-4 w-5/6 rounded-full bg-slate-200 dark:bg-slate-700" />
  </div>
);

export default SkeletonCard;
