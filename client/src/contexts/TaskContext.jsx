import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { maybeFireReminderNotifications } from '../utils/notifications';

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const loadTasks = useCallback(async (params = {}) => {
    const { data } = await api.get('/tasks', { params });
    setTasks(data.tasks);
    return data.tasks;
  }, []);

  const loadCategories = useCallback(async () => {
    const { data } = await api.get('/categories');
    setCategories(data.categories);
    return data.categories;
  }, []);

  const loadNotifications = useCallback(async () => {
    const { data } = await api.get('/notifications');
    setNotifications(data.notifications);
  }, []);

  const loadAnalytics = useCallback(async () => {
    const { data } = await api.get('/analytics/overview');
    setAnalytics(data.analytics);
  }, []);

  const loadSummary = useCallback(async () => {
    const { data } = await api.get('/ai/summary');
    setSummary(data.summary);
  }, []);

  const refreshAll = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      await Promise.all([loadTasks(), loadCategories(), loadNotifications(), loadAnalytics(), loadSummary()]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to load workspace');
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, loadAnalytics, loadCategories, loadNotifications, loadSummary, loadTasks]);

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);

  useEffect(() => {
    maybeFireReminderNotifications(tasks);
  }, [tasks]);

  const createTask = async (payload) => {
    const { data } = await api.post('/tasks', payload);
    setTasks((prev) => [data.task, ...prev]);
    toast.success('Task added');
    await Promise.all([loadAnalytics(), loadNotifications()]);
    return data.task;
  };

  const updateTask = async (taskId, payload, options = {}) => {
    const { data } = await api.put(`/tasks/${taskId}`, payload);
    setTasks((prev) => prev.map((task) => (task._id === taskId ? data.task : task)));
    if (!options.silent) toast.success('Task updated');
    await Promise.all([loadAnalytics(), loadSummary()]);
    return data.task;
  };

  const deleteTask = async (taskId) => {
    await api.delete(`/tasks/${taskId}`);
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
    toast.success('Task moved to trash');
    await Promise.all([loadNotifications(), loadAnalytics()]);
  };

  const loadTrash = async () => {
    const { data } = await api.get('/tasks/trash');
    return data.tasks;
  };

  const restoreTask = async (taskId) => {
    const { data } = await api.patch(`/tasks/${taskId}/restore`);
    setTasks((prev) => [data.task, ...prev]);
    toast.success('Task restored');
    await loadAnalytics();
  };

  const permanentlyDeleteTask = async (taskId) => {
    await api.delete(`/tasks/${taskId}/permanent`);
    toast.success('Task permanently deleted');
  };

  const reorderTasks = async (items, optimisticTasks) => {
    if (optimisticTasks) setTasks(optimisticTasks);
    await api.patch('/tasks/reorder', { items });
    await Promise.all([loadTasks(), loadAnalytics()]);
  };

  const createAiReminder = async () => {
    await api.post('/notifications/ai-reminder');
    toast.success('AI reminder created');
    await loadNotifications();
  };

  const markNotificationRead = async (notificationId) => {
    await api.patch(`/notifications/${notificationId}/read`);
    setNotifications((prev) => prev.map((item) => (item._id === notificationId ? { ...item, read: true } : item)));
  };

  const createCategory = async (payload) => {
    const { data } = await api.post('/categories', payload);
    setCategories((prev) => [...prev, data.category]);
    toast.success('Category created');
  };

  const filteredTasks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return tasks;
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(term) ||
        task.description?.toLowerCase().includes(term) ||
        task.labels?.some((label) => label.toLowerCase().includes(term))
    );
  }, [searchTerm, tasks]);

  const value = useMemo(
    () => ({
      tasks,
      filteredTasks,
      categories,
      notifications,
      analytics,
      summary,
      loading,
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
      createCategory
    }),
    [tasks, filteredTasks, categories, notifications, analytics, summary, loading, searchTerm, loadTasks, loadTrash, refreshAll]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
};
