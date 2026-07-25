import { useMemo, useState } from 'react';

import {
  AnimatePresence,
  motion,
} from 'framer-motion';

import { Outlet } from 'react-router-dom';

import {
  BrainCircuit,
  Clock3,
  Sparkles,
  Target,
} from 'lucide-react';

import Sidebar from './Sidebar';
import Topbar from './Topbar';

import { useTasks } from '../../contexts/TaskContext';

import {
  formatDateTime,
} from '../../utils/format';

const AppLayout = () => {

  const {
    tasks,
    summary,
    analytics,
  } = useTasks();

  const [open, setOpen] =
    useState(false);

  const [
    rightPanelOpen,
    setRightPanelOpen,
  ] = useState(false);

  // FOCUS TASKS

  const focusTasks = useMemo(
    () =>

      tasks
        .filter(
          (task) =>
            task.status !==
            'completed'
        )
        .slice(0, 4),

    [tasks]
  );

  return (

    <div
      className="
        h-screen

        overflow-hidden

        p-3
      "
    >

      {/* MAIN WRAPPER */}

      <div
        className="
          mx-auto

          flex

          h-full

          max-w-[1700px]

          gap-3

          overflow-hidden
        "
      >

        {/* LEFT SIDEBAR */}

        <div
          className="
            hidden

            h-full

            flex-shrink-0

            lg:block
          "
        >

          <Sidebar />

        </div>

        {/* RIGHT SECTION */}

        <div
          className="
            flex
            flex-1

            min-w-0

            h-full

            gap-3

            overflow-hidden
          "
        >

          {/* MAIN CONTENT */}

          <div
            className="
              flex
              flex-1

              min-w-0

              flex-col

              gap-3

              overflow-hidden
            "
          >

            {/* TOPBAR */}

            <div className="flex-shrink-0">

              <div
                className="
                  glass-card

                  rounded-[28px]

                  px-4
                  py-2
                "
              >

                <Topbar
                  onMenuClick={() =>
                    setOpen(true)
                  }
                />

              </div>

            </div>

            {/* PAGE CONTENT */}

            <main
              className="
                flex
                flex-1
                flex-col

                min-w-0
                min-h-0

                overflow-hidden
              "
            >

              <Outlet
                context={{
                  rightPanelOpen,
                  setRightPanelOpen,
                }}
              />

            </main>

          </div>

          {/* RIGHT SIDEBAR */}

          <motion.aside

            animate={{
              width:
                rightPanelOpen
                  ? 300
                  : 56,
            }}

            transition={{
              duration: 0.22,
            }}

            className="
              hidden

              h-full

              flex-shrink-0

              xl:block
            "
          >

            <div
              className="
                glass-card

                flex
                h-full
                flex-col

                overflow-hidden

                rounded-[28px]
              "
            >

              {rightPanelOpen && (

                <div
                  className="
                    flex-1

                    overflow-y-auto
                    overflow-x-hidden

                    no-scrollbar

                    space-y-4

                    p-4
                  "
                >

                  {/* AI SUMMARY */}

                  <div
                    className="
                      rounded-2xl

                      bg-gradient-to-br

                      from-brand-500/10
                      to-sky-500/10

                      p-4
                    "
                  >

                    <div
                      className="
                        mb-2

                        inline-flex

                        rounded-xl

                        bg-white/80

                        p-1.5

                        text-brand-600

                        dark:bg-slate-900/80
                      "
                    >

                      <BrainCircuit className="h-4 w-4" />

                    </div>

                    <h3
                      className="
                        text-base
                        font-semibold

                        text-slate-900
                        dark:text-white
                      "
                    >

                      AI Focus Digest

                    </h3>

                    <p
                      className="
                        mt-4

                        text-sm
                        leading-7

                        text-slate-500
                        dark:text-slate-300
                      "
                    >

                      {summary?.content ||

                        'Generate your AI summary to see smart prioritization insights.'}

                    </p>

                  </div>

                  {/* FOCUS TASKS */}

                  <div className="glass-panel p-3">

                    <div
                      className="
                        mb-3

                        flex
                        items-center

                        gap-2
                      "
                    >

                      <Target className="h-4 w-4 text-brand-600" />

                      <h4
                        className="
                          text-sm
                          font-semibold

                          text-slate-900
                          dark:text-white
                        "
                      >

                        Focus Queue

                      </h4>

                    </div>

                    <div className="space-y-2">

                      {focusTasks.map((task) => (

                        <div
                          key={task._id}

                          className="
                            rounded-2xl

                            border
                            border-white/40

                            bg-white/70

                            p-2.5

                            dark:border-white/10
                            dark:bg-slate-900/70
                          "
                        >

                          <p
                            className="
                              text-base
                              font-medium

                              text-slate-900
                              dark:text-white
                            "
                          >

                            {task.title}

                          </p>

                          <div
                            className="
                              mt-1.5

                              flex
                              items-center
                              justify-between

                              text-sm
                              text-slate-500
                              dark:text-slate-300
                            "
                          >

                            <span className="capitalize">

                              {task.priority}

                            </span>

                            <span>

                              {formatDateTime(
                                task.dueDate
                              )}

                            </span>

                          </div>

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* STATS */}

                  <div className="grid gap-2">

                    <div className="glass-panel p-3">

                      <div
                        className="
                          mb-1.5

                          flex
                          items-center

                          gap-2

                          text-sm

                          text-slate-500
                          dark:text-slate-300
                        "
                      >

                        <Sparkles className="h-3.5 w-3.5 text-brand-600" />

                        Productivity

                      </div>

                      <p
                        className="
                          text-3xl
                          font-bold

                          text-slate-900
                          dark:text-white
                        "
                      >

                        {analytics?.productivityScore ?? 0}%

                      </p>

                    </div>

                    <div className="glass-panel p-3">

                      <div
                        className="
                          mb-1.5

                          flex
                          items-center

                          gap-2

                          text-sm

                          text-slate-500
                          dark:text-slate-300
                        "
                      >

                        <Clock3 className="h-3.5 w-3.5 text-brand-600" />

                        Pending

                      </div>

                      <p
                        className="
                          text-3xl
                          font-bold

                          text-slate-900
                          dark:text-white
                        "
                      >

                        {analytics?.totals?.pending ?? 0}

                      </p>

                    </div>

                  </div>

                </div>

              )}

            </div>

          </motion.aside>

        </div>

        {/* MOBILE SIDEBAR */}

        <AnimatePresence>

          {open ? (

            <motion.div

              initial={{
                opacity: 0,
              }}

              animate={{
                opacity: 1,
              }}

              exit={{
                opacity: 0,
              }}

              className="
                fixed
                inset-0

                z-50

                bg-slate-950/40

                p-4

                lg:hidden
              "
            >

              <motion.div

                initial={{
                  x: -40,
                  opacity: 0,
                }}

                animate={{
                  x: 0,
                  opacity: 1,
                }}

                exit={{
                  x: -40,
                  opacity: 0,
                }}

                className="
                  h-full

                  max-w-sm
                "
              >

                <Sidebar
                  mobile

                  onClose={() =>
                    setOpen(false)
                  }
                />

              </motion.div>

            </motion.div>

          ) : null}

        </AnimatePresence>

      </div>

    </div>
  );
};

export default AppLayout;