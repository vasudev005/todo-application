import { useState } from 'react';

import {
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';

import toast from 'react-hot-toast';

import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {

  const { register } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  // SELECTED PLAN FROM PRICING PAGE
  const selectedPlan =
    location.state?.selectedPlan ||
    'Basic';
    const paymentSuccess =
  location.state?.paymentSuccess;

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    event
  ) => {

    event.preventDefault();

    setLoading(true);

    try {

      await register({
        ...form,
        plan: selectedPlan,
      });

      toast.success(
        `${selectedPlan} plan selected`
      );

      navigate('/payment', {
  state: {
    selectedPlan,
    userData: form,
  },
});

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
          'Registration failed'
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center

        px-4
        py-10
      "
    >

      <div
        className="
          glass-card
          grid
          w-full
          max-w-5xl
          overflow-hidden

          lg:grid-cols-[1fr,1.05fr]
        "
      >

        {/* LEFT SIDE */}

        <div
          className="
            hidden

            bg-gradient-to-br
            from-orange-100
            via-white
            to-sky-100

            p-10

            lg:block

            dark:from-brand-500/10
            dark:via-slate-950
            dark:to-sky-500/10
          "
        >

          <p
            className="
              text-sm
              font-semibold
              uppercase
              tracking-[0.25em]
              text-brand-600
            "
          >
            Create your workspace
          </p>

          <h1
            className="
              mt-6
              text-3xl
              font-black
              leading-tight
              text-slate-900

              dark:text-white
            "
          >
            Build a calm,
            intelligent place for
            every priority.
          </h1>

          <p
            className="
              mt-4
              text-base
              leading-8
              text-slate-600

              dark:text-slate-300
            "
          >
            A seeded workspace is
            created automatically
            with personal, work,
            learning, and fitness
            categories plus sample
            tasks.
          </p>

          {/* PLAN CARD */}

          <div
            className="
              mt-10

              rounded-3xl
              border
              border-white/40

              bg-white/70

              p-6

              shadow-soft

              dark:border-white/10
              dark:bg-slate-900/70
            "
          >

            <p
              className="
                text-sm
                font-semibold
                uppercase
                tracking-[0.2em]
                text-brand-600
              "
            >
              Selected Plan
            </p>

            <h2
              className="
                mt-3
                text-3xl
                font-black
                text-slate-900

                dark:text-white
              "
            >
              {selectedPlan}
            </h2>

            <p
              className="
                mt-3
                text-sm
                leading-7
                text-slate-500

                dark:text-slate-300
              "
            >
              Your selected plan will
              be activated once your
              account is created.
            </p>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="p-8 lg:p-12">

          <Link
            to="/"
            className="
              mb-4
              inline-block

              text-sm
              font-semibold
              text-brand-600
            "
          >
            ← Back to Home
          </Link>

          <h2
            className="
              text-3xl
              font-bold
              text-slate-900

              dark:text-white
            "
          >
            Register
          </h2>

          <p
            className="
              mt-2
              text-sm
              text-slate-500

              dark:text-slate-300
            "
          >
            Set up your account and
            start planning in minutes.
          </p>

          {/* MOBILE PLAN */}

          <div
            className="
              mt-6

              rounded-2xl
              bg-brand-50

              p-4

              lg:hidden

              dark:bg-brand-500/10
            "
          >

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-[0.2em]
                text-brand-600
              "
            >
              Selected Plan
            </p>

            <h3
              className="
                mt-2
                text-xl
                font-bold
                text-slate-900

                dark:text-white
              "
            >
              {selectedPlan}
            </h3>

          </div>

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4"
          >

            <input
              className="input-primary"
              placeholder="Full name"
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  name: event.target.value,
                }))
              }
              required
            />

            <input
              className="input-primary"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
              required
            />

            <input
              className="input-primary"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              required
            />

            <button
              className="
                btn-primary
                w-full
              "
              disabled={loading}
            >
              {loading
                ? 'Creating...'
                : `Create ${selectedPlan} Account`}
            </button>

          </form>

          <p
            className="
              mt-6
              text-sm
              text-slate-500

              dark:text-slate-300
            "
          >
            Already have an account?{' '}

            <Link
              className="
                font-semibold
                text-brand-600
              "
              to="/login"
            >
              Sign in
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default RegisterPage;