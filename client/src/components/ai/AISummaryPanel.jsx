import { motion } from 'framer-motion';
import { BrainCircuit, Sparkles, Target } from 'lucide-react';

const AISummaryPanel = ({ summary }) => {
  if (!summary) {
    return (
      <div className="glass-panel p-6 text-sm text-slate-500 dark:text-slate-300">
        Your AI summary will appear here after the first workspace sync.
      </div>
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1.35fr,0.9fr]">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-6">
        <div className="mb-4 inline-flex rounded-2xl bg-brand-50 p-3 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
          <BrainCircuit className="h-6 w-6" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Daily productivity narrative</h3>
        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">{summary.content}</p>
        <div className="mt-6 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
          Productivity score: {summary.productivityScore}%
        </div>
      </motion.div>

      <div className="space-y-5">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-5">
          <div className="mb-3 flex items-center gap-3"><Sparkles className="h-5 w-5 text-brand-600" /><h4 className="font-semibold text-slate-900 dark:text-white">Insights</h4></div>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {summary.insights?.map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="glass-panel p-5">
          <div className="mb-3 flex items-center gap-3"><Target className="h-5 w-5 text-brand-600" /><h4 className="font-semibold text-slate-900 dark:text-white">Suggestions for tomorrow</h4></div>
          <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
            {summary.suggestions?.map((item) => <li key={item}>• {item}</li>)}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default AISummaryPanel;
