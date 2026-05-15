import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, CalendarDays, KanbanSquare, ShieldCheck, Sparkles } from 'lucide-react';

const features = [
  { icon: BrainCircuit, title: 'AI daily summaries', description: 'Turn raw task data into smart prioritization, motivation, and tomorrow planning.' },
  { icon: KanbanSquare, title: 'Drag-and-drop execution', description: 'Plan with smooth board transitions for Todo, In Progress, and Completed workflows.' },
  { icon: CalendarDays, title: 'Calendar and reminders', description: 'Track dates, upcoming deadlines, and browser notifications without extra setup.' },
  { icon: ShieldCheck, title: 'JWT secured workspace', description: 'Built for production deployment with protected routes, role-ready auth, and clean APIs.' }
];

const LandingPage = () => (
  <div className="min-h-screen px-4 py-6 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <header className="glass-card mb-8 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-orange-200 via-brand-200 to-sky-200 p-3 text-brand-700">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">AI powered Todo</p>
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">Peak Productivity is now possible</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/login" className="btn-secondary">Login</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-card overflow-hidden p-8 lg:p-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 text-sm font-medium text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
            <Sparkles className="h-4 w-4" /> SaaS-inspired design system
          </div>
          <h2 className="mt-6 text-5xl font-black leading-tight text-slate-900 dark:text-white">
            Organize tasks like Todoist.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Streamline your workflow with AI-powered insights.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link to="/register" className="btn-primary gap-2">Launch your workspace <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/login" className="btn-secondary">Preview app</Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ['82%', 'Productivity score'],
              ['15+', 'Connected app views'],
              ['AI', 'Smart daily insights']
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-white/40 bg-white/75 p-4 dark:border-white/10 dark:bg-slate-900/75">
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{value}</p>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card p-6">
          <div className="rounded-[2rem] bg-gradient-to-br from-orange-100 via-white to-sky-100 p-5 dark:from-brand-500/10 dark:via-slate-900 dark:to-sky-500/10">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">Live workflow preview</p>
            <div className="mt-4 space-y-4">
              {[
                ['Today focus', 'Finish Vite dashboard polish and AI insights API'],
                ['Upcoming', 'Prepare analytics visuals and notification pass'],
                ['AI coach', 'You completed 9 tasks today. Prioritize frontend blockers tomorrow.']
              ].map(([title, text], index) => (
                <div key={title} className="rounded-3xl border border-white/40 bg-white/80 p-4 shadow-soft dark:border-white/10 dark:bg-slate-900/80">
                  <div className="mb-2 text-sm font-semibold text-slate-900 dark:text-white">{title}</div>
                  <p className="text-sm text-slate-500 dark:text-slate-300">{text}</p>
                  <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-sky-400" style={{ width: `${65 + index * 12}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div key={feature.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * index }} className="glass-panel p-6">
              <div className="mb-4 inline-flex rounded-2xl bg-brand-50 p-3 text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-7 text-slate-500 dark:text-slate-300">{feature.description}</p>
            </motion.div>
          );
        })}
      </section>
    </div>
  </div>
);

export default LandingPage;
