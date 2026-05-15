import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="flex min-h-screen items-center justify-center px-4">
    <div className="glass-card max-w-xl p-10 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">404</p>
      <h1 className="mt-4 text-4xl font-black text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">The page you requested does not exist or the route has not been deployed yet.</p>
      <Link to="/" className="btn-primary mt-8">Back home</Link>
    </div>
  </div>
);

export default NotFoundPage;
