import { motion } from 'framer-motion';

const PageHeader = ({ eyebrow, title, description, action }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
  >
    <div>
      {eyebrow && <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">{eyebrow}</p>}
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{title}</h1>
      {description && <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-300">{description}</p>}
    </div>
    {action}
  </motion.div>
);

export default PageHeader;
