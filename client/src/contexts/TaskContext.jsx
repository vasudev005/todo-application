import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import toast from 'react-hot-toast';

import api from '../services/api';

import { useAuth } from './AuthContext';

import {
  maybeFireReminderNotifications,
} from '../utils/notifications';

const TaskContext =
  createContext(null);

const TaskProvider = ({
  children,
}) => {

  const {
    isAuthenticated,
  } = useAuth();

  // STATES

  const [tasks, setTasks] =
    useState([]);

  const [
    categories,
    setCategories,
  ] = useState([]);

  const [
    notifications,
    setNotifications,
  ] = useState([]);

  const [
    analytics,
    setAnalytics,
  ] = useState(null);

  const [summary, setSummary] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [
    searchTerm,
    setSearchTerm,
  ] = useState('');

  const [page, setPage] =
    useState(1);

  const [hasMore, setHasMore] =
    useState(true);

  // LOAD TASKS

  const loadTasks =
    useCallback(

      async (
        pageNumber = 1,
        limit = 10,
        append = false,
        params = {}
      ) => {

        try {

          setLoading(true);

          const { data } =
            await api.get(
              '/tasks',
              {
                params: {
                  page:
                    pageNumber,
                  limit,
                  ...params,
                },
              }
            );

          const incomingTasks =
            data.tasks || [];

          if (append) {

            setTasks((prev) => {

              const merged = [
                ...prev,
                ...incomingTasks,
              ];

              // REMOVE DUPLICATES

              const unique =
                merged.filter(
                  (
                    task,
                    index,
                    self
                  ) =>

                    index ===
                    self.findIndex(
                      (t) =>
                        t._id ===
                        task._id
                    )
                );

              return unique;
            });

          } else {

            setTasks(
              incomingTasks
            );
          }

          setHasMore(
            data.hasMore
          );

          return incomingTasks;

        } catch (error) {

          toast.error(

            error.response?.data
              ?.message ||

              'Unable to load tasks'
          );

        } finally {

          setLoading(false);

        }
      },

      []
    );

  // LOAD CATEGORIES

  const loadCategories =
    useCallback(
      async () => {

        const { data } =
          await api.get(
            '/categories'
          );

        setCategories(
          data.categories ||
            []
        );

        return data.categories;
      },

      []
    );

  // LOAD NOTIFICATIONS

  const loadNotifications =
    useCallback(
      async () => {

        const { data } =
          await api.get(
            '/notifications'
          );

        setNotifications(
          data.notifications ||
            []
        );
      },

      []
    );

  // LOAD ANALYTICS

  const loadAnalytics =
    useCallback(
      async () => {

        const { data } =
          await api.get(
            '/analytics/overview'
          );

        setAnalytics(
          data.analytics
        );
      },

      []
    );

  // LOAD AI SUMMARY

  const loadSummary =
    useCallback(
      async () => {

        const { data } =
          await api.get(
            '/ai/summary'
          );

        setSummary(
          data.summary
        );
      },

      []
    );

  // REFRESH ALL

  const refreshAll =
    useCallback(
      async () => {

        if (
          !isAuthenticated
        )
          return;

        try {

          setLoading(true);

          await Promise.all([

            loadTasks(
              1,
              10,
              false
            ),

            loadCategories(),

            loadNotifications(),

            loadAnalytics(),

            loadSummary(),

          ]);

        } catch (error) {

          toast.error(

            error.response?.data
              ?.message ||

              'Unable to load workspace'
          );

        } finally {

          setLoading(false);

        }
      },

      [
        isAuthenticated,
        loadAnalytics,
        loadCategories,
        loadNotifications,
        loadSummary,
        loadTasks,
      ]
    );

  // INITIAL LOAD

  useEffect(() => {

    if (
      isAuthenticated
    ) {

      refreshAll();

    } else {

      // RESET STATE

      setTasks([]);

      setCategories([]);

      setNotifications([]);

      setAnalytics(null);

      setSummary(null);

    }

  }, [
    isAuthenticated,
    refreshAll,
  ]);

  // REMINDERS

  useEffect(() => {

    if (
      tasks?.length
    ) {

      maybeFireReminderNotifications(
        tasks
      );

    }

  }, [tasks]);

  // CREATE TASK

  const createTask =
    async (payload) => {

      const { data } =
        await api.post(
          '/tasks',
          payload
        );

      setTasks((prev) => [

        data.task,

        ...prev,
      ]);

      toast.success(
        'Task added'
      );

      await Promise.all([

        loadAnalytics(),

        loadNotifications(),

      ]);

      return data.task;
    };

  // UPDATE TASK

  const updateTask =
    async (
      taskId,
      payload,
      options = {}
    ) => {

      const { data } =
        await api.put(
          `/tasks/${taskId}`,
          payload
        );

      setTasks((prev) =>

        prev.map((task) =>

          task._id ===
          taskId

            ? data.task

            : task
        )
      );

      if (
        !options.silent
      ) {

        toast.success(
          'Task updated'
        );
      }

      await Promise.all([

        loadAnalytics(),

        loadSummary(),

      ]);

      return data.task;
    };

  // DELETE TASK

  const deleteTask =
    async (taskId) => {

      await api.delete(
        `/tasks/${taskId}`
      );

      setTasks((prev) =>

        prev.filter(
          (task) =>
            task._id !==
            taskId
        )
      );

      toast.success(
        'Task moved to trash'
      );

      await Promise.all([

        loadNotifications(),

        loadAnalytics(),

      ]);
    };

  // LOAD TRASH

  const loadTrash =
    async (
      pageNumber = 1,
      limit = 10
    ) => {

      const { data } =
        await api.get(
          '/tasks/trash',
          {
            params: {
              page:
                pageNumber,
              limit,
            },
          }
        );

      return data.tasks;
    };

  // RESTORE TASK

  const restoreTask =
    async (taskId) => {

      const { data } =
        await api.patch(
          `/tasks/${taskId}/restore`
        );

      setTasks((prev) => [

        data.task,

        ...prev,
      ]);

      toast.success(
        'Task restored'
      );

      await loadAnalytics();
    };

  // DELETE PERMANENTLY

  const permanentlyDeleteTask =
    async (taskId) => {

      await api.delete(
        `/tasks/${taskId}/permanent`
      );

      toast.success(
        'Task permanently deleted'
      );
    };

  // REORDER TASKS

  const reorderTasks =
    async (
      items,
      optimisticTasks
    ) => {

      // OPTIMISTIC UPDATE

      if (
        optimisticTasks
      ) {

        setTasks(
          optimisticTasks
        );
      }

      try {

        await api.patch(
          '/tasks/reorder',
          { items }
        );

        await Promise.all([

          loadAnalytics(),

          loadSummary(),

        ]);

      } catch (error) {

        toast.error(
          'Unable to reorder tasks'
        );

        await loadTasks();
      }
    };

  // AI REMINDER

  const createAiReminder =
    async () => {

      await api.post(
        '/notifications/ai-reminder'
      );

      toast.success(
        'AI reminder created'
      );

      await loadNotifications();
    };

  // MARK READ

  const markNotificationRead =
    async (
      notificationId
    ) => {

      await api.patch(
        `/notifications/${notificationId}/read`
      );

      setNotifications((prev) =>

        prev.map((item) =>

          item._id ===
          notificationId

            ? {
                ...item,
                read: true,
              }

            : item
        )
      );
    };

  // CREATE CATEGORY

  const createCategory =
    async (payload) => {

      const { data } =
        await api.post(
          '/categories',
          payload
        );

      setCategories((prev) => [

        ...prev,

        data.category,
      ]);

      toast.success(
        'Category created'
      );
    };

  // SEARCH FILTER

  const filteredTasks =
    useMemo(() => {

      const term =
        searchTerm
          .trim()
          .toLowerCase();

      if (!term)
        return tasks;

      return tasks.filter(
        (task) =>

          task.title
            ?.toLowerCase()
            .includes(term) ||

          task.description
            ?.toLowerCase()
            .includes(term) ||

          task.priority
            ?.toLowerCase()
            .includes(term) ||

          task.status
            ?.toLowerCase()
            .includes(term) ||

          task.categorySlug
            ?.toLowerCase()
            .includes(term)
      );

    }, [
      tasks,
      searchTerm,
    ]);

  // CONTEXT VALUE

  const value = useMemo(

    () => ({

      tasks,

      filteredTasks,

      categories,

      notifications,

      analytics,

      summary,

      loading,

      page,

      setPage,

      hasMore,

      searchTerm,

      setSearchTerm,

      loadTasks,

      loadTrash,

      refreshAll,

      createTask,

      updateTask,

      deleteTask,

      restoreTask,

      permanentlyDeleteTask,

      reorderTasks,

      loadSummary,

      loadAnalytics,

      createAiReminder,

      markNotificationRead,

      createCategory,

    }),

    [
      tasks,
      filteredTasks,
      categories,
      notifications,
      analytics,
      summary,
      loading,
      page,
      hasMore,
      searchTerm,
      loadTasks,
      loadTrash,
      refreshAll,
    ]
  );

  return (

    <TaskContext.Provider
      value={value}
    >

      {children}

    </TaskContext.Provider>
  );
};

const useTasks = () => {

  const context =
    useContext(
      TaskContext
    );

  if (!context) {

    throw new Error(
      'useTasks must be used within TaskProvider'
    );
  }

  return context;
};

export {
  TaskProvider,
  useTasks,
};