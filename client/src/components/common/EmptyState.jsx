import { motion } from 'framer-motion';

const EmptyState = ({ title, description, action, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 14 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-panel flex flex-col items-center justify-center gap-4 px-8 py-14 text-center"
  >
    {Icon ? <Icon className="h-12 w-12 text-brand-500" /> : null}
    <div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-slate-500 dark:text-slate-300">{description}</p>
    </div>
    {action}
  </motion.div>
);

export default EmptyState;
