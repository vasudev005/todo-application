import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await register(form);
      navigate('/app/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-10">
      <div className="glass-card grid w-full max-w-5xl overflow-hidden lg:grid-cols-[1fr,1.05fr]">
        <div className="hidden bg-gradient-to-br from-orange-100 via-white to-sky-100 p-10 lg:block dark:from-brand-500/10 dark:via-slate-950 dark:to-sky-500/10">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">Create your workspace</p>
          <h1 className="mt-6 text-4xl font-black leading-tight text-slate-900 dark:text-white">Build a calm, intelligent place for every priority.</h1>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-300">A seeded workspace is created automatically with personal, work, learning, and fitness categories plus sample tasks.</p>
        </div>
        <div className="p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Register</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Set up your account and start planning in minutes.</p>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input className="input-primary" placeholder="Full name" value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} required />
            <input className="input-primary" type="email" placeholder="Email" value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} required />
            <input className="input-primary" type="password" placeholder="Password" value={form.password} onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))} required />
            <button className="btn-primary w-full" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
          </form>
          <p className="mt-6 text-sm text-slate-500 dark:text-slate-300">Already have an account? <Link className="font-semibold text-brand-600" to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
