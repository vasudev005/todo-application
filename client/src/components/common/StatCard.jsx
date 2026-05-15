import { motion } from 'framer-motion';

const StatCard = ({ icon: Icon, label, value, hint, tone = 'from-brand-500/15 to-sky-500/15' }) => (
  <motion.div
    whileHover={{ y: -4 }}
    className={`glass-panel bg-gradient-to-br ${tone} p-5`}
  >
    <div className="mb-4 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-300">{label}</p>
        <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
      {Icon ? <Icon className="h-10 w-10 rounded-2xl bg-white/70 p-2 text-brand-600 dark:bg-slate-900/80" /> : null}
    </div>
    {hint && <p className="text-sm text-slate-500 dark:text-slate-400">{hint}</p>}
  </motion.div>
);

export default StatCard;
