import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import {
  ArrowRight,
  BrainCircuit,
  CalendarDays,
  KanbanSquare,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

const features = [
  {
    icon: BrainCircuit,
    title: 'AI daily summaries',
    description:
      'Turn raw task data into smart prioritization, motivation, and tomorrow planning.',
  },

  {
    icon: KanbanSquare,
    title: 'Drag-and-drop execution',
    description:
      'Plan with smooth board transitions for Todo, In Progress, and Completed workflows.',
  },

  {
    icon: CalendarDays,
    title: 'Calendar and reminders',
    description:
      'Track dates, upcoming deadlines, and browser notifications without extra setup.',
  },

  {
    icon: ShieldCheck,
    title: 'JWT secured workspace',
    description:
      'Built for production deployment with protected routes, role-ready auth, and clean APIs.',
  },
];

const scrollToSection = (id) => {
  const section = document.getElementById(id);

  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

const LandingPage = () => {
  return (
    <div
  className="
    min-h-screen

    px-4
    py-6

    lg:px-8
  "
>
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <header
          className="
            glass-card
            mb-8

            flex
            flex-col
            gap-5

            px-6
            py-4

            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >

          {/* LEFT */}

          <div className="flex items-center gap-3">

            <div
              className="
                rounded-2xl
                bg-gradient-to-br
                from-orange-200
                via-brand-200
                to-sky-200

                p-3
                text-brand-700
              "
            >
              <Sparkles className="h-5 w-5" />
            </div>

            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-brand-600
                "
              >
                AI Powered Todo
              </p>

              <h1
                className="
                  text-lg
                  font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                Peak Productivity is now possible
              </h1>
            </div>

          </div>

          {/* RIGHT */}

          <div className="flex items-center gap-6">

            {/* NAVIGATION */}

            <div className="hidden md:flex items-center gap-6">

              <button
                onClick={() =>
                  scrollToSection('about')
                }
                className="
                  text-sm
                  font-semibold
                  text-slate-600
                  transition
                  hover:text-brand-600
                "
              >
                About Us
              </button>

              <button
                onClick={() =>
                  scrollToSection('pricing')
                }
                className="
                  text-sm
                  font-semibold
                  text-slate-600
                  transition
                  hover:text-brand-600
                "
              >
                Pricing
              </button>

              <button
                onClick={() =>
                  scrollToSection('contact')
                }
                className="
                  text-sm
                  font-semibold
                  text-slate-600
                  transition
                  hover:text-brand-600
                "
              >
                Contact
              </button>

            </div>

            {/* AUTH BUTTONS */}

            <Link
              to="/login"
              className="btn-secondary"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn-primary"
            >
              Sign Up
            </Link>

          </div>

        </header>

        {/* HERO SECTION */}

        <section
          className="
            grid
            gap-6

            lg:grid-cols-[1.2fr,0.8fr]
          "
        >

          {/* LEFT HERO */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              glass-card
              overflow-hidden
              p-8

              lg:p-12
            "
          >

            <div
              className="
                inline-flex
                items-center
                gap-2

                rounded-full
                bg-brand-50

                px-4
                py-2

                text-sm
                font-medium
                text-brand-600

                dark:bg-brand-500/15
                dark:text-brand-300
              "
            >
              <Sparkles className="h-4 w-4" />
              AI Workspace....
            </div>

            <h2
              className="
                mt-6
                text-5xl
                font-black
                leading-tight
                text-slate-900

                dark:text-white
              "
            >
              Organize tasks like Todoist.
            </h2>

            <p
              className="
                mt-3
                max-w-2xl
                text-lg
                leading-8
                text-slate-600

                dark:text-slate-300
              "
            >
              Streamline your workflow with
              AI-powered insights, smart task
              organization, reminders,
              analytics, and seamless
              productivity management.
            </p>

            <div
              className="
                mt-8
                flex
                flex-wrap
                items-center
                gap-4
              "
            >

              <Link
                to="/register"
                className="
                  btn-primary
                  flex
                  items-center
                  gap-2
                "
              >
                Launch your workspace
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/login"
                className="btn-secondary"
              >
                Preview App
              </Link>

            </div>

            {/* STATS */}

            <div
              className="
                mt-10
                grid
                gap-4

                md:grid-cols-3
              "
            >

              {[
                [
                  '82%',
                  ' Increase in Productivity ',
                ],

                [
                  '15+',
                  'Connected app views',
                ],

                [
                  'AI',
                  'Smart daily insights',
                ],
              ].map(([value, label]) => (

                <div
                  key={label}
                  className="
                    rounded-3xl
                    border
                    border-white/40

                    bg-white/75

                    p-4

                    dark:border-white/10
                    dark:bg-slate-900/75
                  "
                >

                  <p
                    className="
                      text-3xl
                      font-bold
                      text-slate-900

                      dark:text-white
                    "
                  >
                    {value}
                  </p>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-slate-500

                      dark:text-slate-300
                    "
                  >
                    {label}
                  </p>

                </div>
              ))}

            </div>

          </motion.div>

          {/* RIGHT HERO */}

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: 0.1,
            }}
            className="glass-card p-6"
          >

            <div
              className="
                rounded-[2rem]
                bg-gradient-to-br
                from-orange-100
                via-white
                to-sky-100

                p-5

                dark:from-brand-500/10
                dark:via-slate-900
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
                Live Workflow Preview
              </p>

              <div className="mt-4 space-y-4">

                {[
                  [
                    'Today Focus',
                    'Finish Vite dashboard polish and AI insights API',
                  ],

                  [
                    'Upcoming',
                    'Prepare analytics visuals and notification pass',
                  ],

                  [
                    'AI Coach',
                    'You completed 9 tasks today. Prioritize frontend blockers tomorrow.',
                  ],
                ].map(
                  ([title, text], index) => (

                    <div
                      key={title}
                      className="
                        rounded-3xl
                        border
                        border-white/40

                        bg-white/80

                        p-4

                        shadow-soft

                        dark:border-white/10
                        dark:bg-slate-900/80
                      "
                    >

                      <div
                        className="
                          mb-2
                          text-sm
                          font-semibold
                          text-slate-900

                          dark:text-white
                        "
                      >
                        {title}
                      </div>

                      <p
                        className="
                          text-sm
                          text-slate-500

                          dark:text-slate-300
                        "
                      >
                        {text}
                      </p>

                      <div
                        className="
                          mt-3
                          h-2
                          rounded-full
                          bg-slate-100

                          dark:bg-slate-800
                        "
                      >

                        <div
                          className="
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            from-brand-500
                            to-sky-400
                          "
                          style={{
                            width: `${
                              65 + index * 12
                            }%`,
                          }}
                        />

                      </div>

                    </div>
                  )
                )}

              </div>

            </div>

          </motion.div>

        </section>

        {/* FEATURES */}

        <section
          className="
            mt-8
            grid
            gap-5

            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          {features.map(
            (feature, index) => {

              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{
                    opacity: 0,
                    y: 18,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.05 * index,
                  }}
                  className="
                    glass-panel
                    p-6
                  "
                >

                  <div
                    className="
                      mb-4
                      inline-flex
                      rounded-2xl
                      bg-brand-50

                      p-3
                      text-brand-600

                      dark:bg-brand-500/15
                      dark:text-brand-300
                    "
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <h3
                    className="
                      text-lg
                      font-semibold
                      text-slate-900

                      dark:text-white
                    "
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-7
                      text-slate-500

                      dark:text-slate-300
                    "
                  >
                    {feature.description}
                  </p>

                </motion.div>
              );
            }
          )}

        </section>

        {/* ABOUT */}

        <section
          id="about"
          className="
            mt-16
            glass-card
            p-8
          "
        >

          <h2
            className="
              text-3xl
              font-bold
              text-slate-900

              dark:text-white
            "
          >
            About Us
          </h2>

          <p
            className="
              mt-4
              leading-8
              text-slate-600

              dark:text-slate-300
            "
          >
           Our AI Todo Workspace is a modern productivity and task management platform designed to help individuals and teams organize work smarter and faster. The application combines intelligent task management, drag-and-drop kanban workflows, AI-powered insights, reminders, analytics, and productivity tracking into one seamless experience.

Built with a clean and responsive interface, the platform allows users to manage daily goals, track upcoming deadlines, organize tasks by categories, and improve workflow efficiency through interactive dashboards and smart automation features.

The application focuses on delivering a professional SaaS-style productivity experience inspired by modern workflow tools while integrating powerful AI assistance for smarter planning and decision-making.
          </p>

        </section>
{/* PRICING */}

<section
  id="pricing"
  className="mt-16"
>

  <h2
    className="
      text-center
      text-3xl
      font-bold
      text-slate-900

      dark:text-white
    "
  >
    Pricing - Get Started Today
  </h2>

  <p
    className="
      mt-3
      text-center
      text-slate-500

      dark:text-slate-300
    "
  >
    Start with a 7-day free trial.
    Cancel anytime.
  </p>

  <div
    className="
      mt-10
      grid
      gap-6

      md:grid-cols-3
    "
  >

    {[
  {
    title: 'Basic',
    price: '₹499',
    text:
      'Includes core task management features.',
    trial: true,
  },

  {
    title: 'Premium',
    price: '₹999',
    text:
      'Includes AI-powered insights and analytics.',
  },

  {
    title: 'Enterprise',
    price: '₹1999',
    text:
      'Includes custom AI solutions and dedicated support.',
  },
].map((plan) => (
      <div
        key={plan.title}
        className={`
          glass-card
          relative
          overflow-hidden
          p-6
          text-center

          ${
            plan.popular
              ? 'ring-2 ring-brand-500'
              : ''
          }
        `}
      >

        {/* POPULAR BADGE */}

        {plan.popular && (

          <div
            className="
              absolute
              right-4
              top-4

              rounded-full
              bg-brand-600

              px-3
              py-1

              text-xs
              font-semibold
              text-white
            "
          >
            Most Popular
          </div>

        )}

        {/* TRIAL BADGE */}

{plan.trial ? (

  <div
    className="
      inline-flex
      items-center

      rounded-full
      bg-green-100

      px-2
      py-2

      text-xs
      font-bold
      uppercase
      tracking-[0.15em]

      text-green-700
    "
  >
    7-Day Free Trial
  </div>

) : (

  <div className="h-[32px]" />

)}

        {/* TITLE */}

        <h3
          className="
            mt-6
            text-2xl
            font-bold
            text-slate-900

            dark:text-white
          "
        >
          {plan.title}
        </h3>

        {/* PRICE */}

        <div className="mt-5">

          <span
            className="
              text-5xl
              font-black
              text-slate-900

              dark:text-white
            "
          >
            {plan.price}
          </span>

          <p
            className="
              mt-2
              text-sm
              text-slate-500
            "
          >
           {plan.trial
  ? 'Per Month after trial'
  : 'Per Month'}
          </p>

        </div>

        {/* DESCRIPTION */}

        <p
          className="
            mt-6
            text-sm
            leading-7
            text-slate-500

            dark:text-slate-300
          "
        >
          {plan.text}
        </p>

        {/* FEATURES */}

<div className="mt-8 space-y-3 text-left">

  {(plan.title === 'Basic'
    ? [
        '7-Day Free Trial',
        'Task Management',
        'Kanban Board',
        'Calendar & Reminders',
        'Basic AI Insights',
      ]

    : plan.title === 'Premium'

    ? [
        'Advanced AI Productivity',
        'Analytics Dashboard',
        'Unlimited Boards',
        'Priority Support',
        'Smart Notifications',
        
      ]

    : [
        'Unlimited Team Members',
        'Dedicated Account Manager',
        'Advanced Security',
        'Custom Integrations',
        '24/7 Priority Support',
      ]
  ).map((feature) => (

    <div
      key={feature}
      className="
        flex
        items-center
        gap-3
      "
    >

      <div
        className="
          h-2
          w-2
          rounded-full
          bg-brand-500
        "
      />

      <span
        className="
          text-sm
          text-slate-600

          dark:text-slate-300
        "
      >
        {feature}
      </span>

    </div>
  ))}

</div>

        {/* BUTTON */}

        <Link
          to="/register"
          state={{
            selectedPlan: plan.title,
            freeTrial: true,
          }}
          className="
            btn-primary
            mt-10

            inline-flex
            w-full
            items-center
            justify-center
          "
        >
          {plan.trial
  ? 'Start Free Trial'
  : 'Get Started'}
        </Link>

      </div>
    ))}

  </div>

</section>

        {/* CONTACT */}

        <section
          id="contact"
          className="
            mt-16
            mb-10
            glass-card
            p-8
          "
        >

          <h2
            className="
              text-3xl
              font-bold
              text-slate-900

              dark:text-white
            "
          >
            Contact Us
          </h2>

          <div className="mt-6 space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="
                w-full
                rounded-xl
                border
                p-3
              "
            />

            <input
              type="email"
              placeholder="Your Email"
              className="
                w-full
                rounded-xl
                border
                p-3
              "
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="
                w-full
                rounded-xl
                border
                p-3
              "
            />

            <button className="btn-primary">
              Send Message
            </button>

          </div>

        </section>
       {/* FOOTER */}

<footer
  className="
    mt-16

    glass-card

    overflow-hidden
  "
>

  {/* TOP */}

  <div
    className="
      grid
      gap-10

      px-8
      py-10

      md:grid-cols-2
      lg:grid-cols-4
    "
  >

    {/* BRAND */}

    <div>

      <div
        className="
          flex
          items-center
          gap-3
        "
      >

        <div
          className="
            flex
            h-12
            w-12

            items-center
            justify-center

            rounded-2xl

            bg-gradient-to-br

            from-orange-200
            via-brand-200
            to-sky-200

            text-brand-700
          "
        >

          <Sparkles className="h-5 w-5" />

        </div>

        <div>

          <h3
            className="
              text-lg
              font-bold

              text-slate-900
              dark:text-white
            "
          >

            Todo Suite

          </h3>

          <p
            className="
              text-sm

              text-slate-500
              dark:text-slate-300
            "
          >

            AI Productivity Platform

          </p>

        </div>

      </div>

      <p
        className="
          mt-5

          text-sm
          leading-7

          text-slate-500
          dark:text-slate-300
        "
      >

        Organize your work,
        boost productivity,
        and manage tasks
        intelligently with
        AI-powered workflows
        and reminders.

      </p>

    </div>

    {/* PRODUCT */}

    <div>

      <h4
        className="
          text-sm
          font-semibold
          uppercase

          tracking-[0.2em]

          text-slate-900
          dark:text-white
        "
      >

        Product

      </h4>

      <div
        className="
          mt-5

          space-y-3
        "
      >

        <button
          onClick={() =>
            document
              .getElementById('about')
              ?.scrollIntoView({
                behavior: 'smooth',
              })
          }

          className="
            block

            text-sm

            text-slate-500

            transition

            hover:text-brand-600
          "
        >

          About Us

        </button>

        <button
          onClick={() =>
            document
              .getElementById('pricing')
              ?.scrollIntoView({
                behavior: 'smooth',
              })
          }

          className="
            block

            text-sm

            text-slate-500

            transition

            hover:text-brand-600
          "
        >

          Pricing

        </button>

        <button
          onClick={() =>
            document
              .getElementById('contact')
              ?.scrollIntoView({
                behavior: 'smooth',
              })
          }

          className="
            block

            text-sm

            text-slate-500

            transition

            hover:text-brand-600
          "
        >

          Contact

        </button>

      </div>

    </div>

    {/* FEATURES */}

    <div>

      <h4
        className="
          text-sm
          font-semibold
          uppercase

          tracking-[0.2em]

          text-slate-900
          dark:text-white
        "
      >

        Features

      </h4>

      <div
        className="
          mt-5

          space-y-3

          text-sm

          text-slate-500
          dark:text-slate-300
        "
      >

        <p>AI Task Summaries</p>

        <p>Kanban Workflow</p>

        <p>Browser Notifications</p>

        <p>Analytics Dashboard</p>

        <p>Smart Productivity Tracking</p>

      </div>

    </div>

    {/* NEWSLETTER */}

    <div>

      <h4
        className="
          text-sm
          font-semibold
          uppercase

          tracking-[0.2em]

          text-slate-900
          dark:text-white
        "
      >

        Stay Updated

      </h4>

      <p
        className="
          mt-5

          text-sm
          leading-7

          text-slate-500
          dark:text-slate-300
        "
      >

        Get updates about
        new features,
        AI improvements,
        and productivity tips.

      </p>

      <div
        className="
          mt-5

          flex
          gap-2
        "
      >

        <input
          type="email"

          placeholder="Email address"

          className="
            input-primary
          "
        />

        <button
          className="
            btn-primary
          "
        >

          Join

        </button>

      </div>

    </div>

  </div>

  {/* BOTTOM */}

  <div
    className="
      border-t
      border-white/20

      px-8
      py-5

      text-center

      text-sm

      text-slate-500
      dark:border-white/10
      dark:text-slate-400
    "
  >

    © 2026 Todo Suite.
    All rights reserved.

  </div>

</footer>
      </div>
    </div>
  );
};

export default LandingPage;