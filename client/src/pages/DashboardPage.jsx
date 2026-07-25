import {
  useMemo,
  useState,
  useEffect,
  useRef,
} from 'react';

import {
  Activity,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  Plus,
  TimerReset,
  Trophy,
} from 'lucide-react';

import PageHeader from '../components/common/PageHeader';

import StatCard from '../components/common/StatCard';

import TaskCollection from '../components/tasks/TaskCollection';

import TaskModal from '../components/tasks/TaskModal';

import SkeletonCard from '../components/common/SkeletonCard';

import { useTasks } from '../contexts/TaskContext';

import { useOutletContext } from 'react-router-dom';

const DashboardPage = () => {

  const {
    tasks,
    filteredTasks,
    categories,
    analytics,
    loading,
    createTask,
    updateTask,
    deleteTask,
    loadTasks,
    page,
    setPage,
    hasMore,
  } = useTasks();

  const {
    rightPanelOpen,
    setRightPanelOpen,
  } = useOutletContext();

  const [open, setOpen] =
    useState(false);

  const [editing, setEditing] =
    useState(null);

  const taskContainerRef =
    useRef(null);

  const shownNotifications =
    useRef(new Set());

  // NOTIFICATION PERMISSION

  useEffect(() => {

    const requestPermission =
      async () => {

        if (
          Notification.permission !==
          'granted'
        ) {

          await Notification.requestPermission();

        }
      };

    requestPermission();

  }, []);

  // REMINDERS

  useEffect(() => {

    if (!tasks?.length)
      return;

    const interval =
      setInterval(() => {

        const now =
          new Date();

        tasks.forEach((task) => {

          if (
            !task.reminderAt
          )
            return;

          const reminderTime =
            new Date(
              task.reminderAt
            );

          const diff =
            reminderTime.getTime() -
            now.getTime();

          const notificationKey =
            `${task._id}-${task.reminderAt}`;

          if (
            diff > 0 &&
            diff <= 60000 &&
            !shownNotifications.current.has(
              notificationKey
            )
          ) {

            new Notification(
              'Task Reminder',
              {
                body: `Reminder for: ${task.title}`,
                icon: '/favicon.ico',
              }
            );

            shownNotifications.current.add(
              notificationKey
            );
          }

        });

      }, 5000);

    return () =>
      clearInterval(interval);

  }, [tasks]);

  // INITIAL LOAD

  useEffect(() => {

    if (
      tasks.length === 0
    ) {

      loadTasks(
        1,
        10,
        false
      );

      setPage(1);

    }

  }, []);

  // INFINITE SCROLL

  useEffect(() => {

    const container =
      taskContainerRef.current;

    if (!container)
      return;

    const handleScroll =
      async () => {

        if (
          container.scrollTop +
            container.clientHeight +
            100 >=
          container.scrollHeight
        ) {

          if (
            !loading &&
            hasMore
          ) {

            const nextPage =
              page + 1;

            setPage(nextPage);

            await loadTasks(
              nextPage,
              10,
              true
            );

          }

        }

      };

    container.addEventListener(
      'scroll',
      handleScroll
    );

    return () =>
      container.removeEventListener(
        'scroll',
        handleScroll
      );

  }, [
    page,
    loading,
    hasMore,
    loadTasks,
    setPage,
  ]);

  // TASKS

  const topTasks =
    useMemo(

      () =>
        filteredTasks || tasks,

      [
        filteredTasks,
        tasks,
      ]
    );

  // SUBMIT

  const handleSubmit =
    async (payload) => {

      if (editing) {

        await updateTask(
          editing._id,
          payload
        );

        setEditing(null);

        return;
      }

      await createTask(
        payload
      );

      await loadTasks(
        1,
        10,
        false
      );

    };

  return (

    <div
      className="
        flex
        flex-1

        min-h-0
        h-full

        flex-col

        overflow-hidden
      "
    >

      {/* HEADER */}

      <div
        className="
          flex-shrink-0

          space-y-1.5
        "
      >

        {/* PAGE HEADER */}

        <PageHeader
          title="Dashboard"

          description="
            A premium overview
            of productivity,
            active priorities,
            and AI-assisted
            momentum across
            your workspace.
          "

          action={

            <div className="flex items-center gap-3">

              {/* NEW TASK */}

              <button
                className="
                  btn-primary
                  gap-2
                "

                onClick={() =>
                  setOpen(true)
                }
              >

                <Plus className="h-4 w-4" />

                New task

              </button>

              {/* RIGHT PANEL BUTTON */}

              <button
                onClick={() =>
                  setRightPanelOpen(
                    (prev) => !prev
                  )
                }

                className="
                  flex
                  h-11
                  w-11

                  items-center
                  justify-center

                  rounded-full

                  bg-white/90

                  shadow-lg

                  transition

                  hover:scale-105

                  dark:bg-slate-800
                "
              >

                {rightPanelOpen

                  ? (
                    <ChevronRight className="h-5 w-5" />
                  )

                  : (
                    <ChevronLeft className="h-5 w-5" />
                  )}

              </button>

            </div>

          }
        />

        {/* STATS */}

        <div
          className="
            grid
            gap-2

            md:grid-cols-2
            xl:grid-cols-4
          "
        >

          <StatCard
            icon={Trophy}
            label="Productivity"
            value={`${analytics?.productivityScore ?? 0}%`}
          />

          <StatCard
            icon={Activity}
            label="Total tasks"
            value={
              analytics?.totals?.total ?? 0
            }

            tone="
              from-sky-500/15
              to-cyan-500/15
            "
          />

          <StatCard
            icon={TimerReset}
            label="Pending"
            value={
              analytics?.totals?.pending ?? 0
            }

            tone="
              from-amber-500/15
              to-orange-500/15
            "
          />

          <StatCard
            icon={BrainCircuit}
            label="Overdue"
            value={
              analytics?.totals?.overdue ?? 0
            }

            tone="
              from-rose-500/15
              to-pink-500/15
            "
          />

        </div>

      </div>

      {/* TASK AREA */}

      <div
        ref={taskContainerRef}

        className="
          flex-1

          min-h-0
          h-full

          overflow-y-auto
          overflow-x-hidden

          no-scrollbar

          scroll-smooth

          pt-4
          pr-1
        "
      >

        {loading &&
        tasks.length === 0 ? (

          <div
            className="
              grid
              gap-3

              md:grid-cols-2
            "
          >

            <SkeletonCard className="h-40" />

            <SkeletonCard className="h-40" />

          </div>

        ) : (

          <TaskCollection
            tasks={topTasks}

            onEdit={(task) => {

              setEditing(task);

              setOpen(true);

            }}

            onDelete={(task) =>
              deleteTask(task._id)
            }

            onToggleComplete={(task) =>

              updateTask(
                task._id,
                {
                  status:
                    task.status ===
                    'completed'

                      ? 'todo'

                      : 'completed',
                },
                {
                  silent: true,
                }
              )
            }

            emptyTitle="No tasks yet"

            emptyDescription="
              Create your first
              task to populate
              the workspace.
            "

            action={

              <button
                className="
                  btn-primary
                "

                onClick={() =>
                  setOpen(true)
                }
              >

                Create first task

              </button>

            }
          />

        )}

        {/* LOADING */}

        {loading &&
        tasks.length > 0 && (

          <p
            className="
              mt-4

              text-center
              text-sm

              text-slate-500
            "
          >

            Loading more tasks...

          </p>

        )}

        {/* END */}

        {!hasMore &&
          tasks.length > 0 && (

            <p
              className="
                mt-4

                text-center
                text-sm

                text-slate-500
              "
            >

              No more tasks

            </p>

          )}

      </div>

      {/* MODAL */}

      <TaskModal
        open={open}

        onClose={() => {

          setOpen(false);

          setEditing(null);

        }}

        onSubmit={handleSubmit}

        categories={categories}

        initialTask={editing}
      />

    </div>
  );
};

export default DashboardPage;