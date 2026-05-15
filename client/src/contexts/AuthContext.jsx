import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('ai_todo_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('ai_todo_token'));
  const [loading, setLoading] = useState(Boolean(localStorage.getItem('ai_todo_token')));

  const persistSession = useCallback((payloadToken, payloadUser) => {
    setToken(payloadToken);
    setUser(payloadUser);
    localStorage.setItem('ai_todo_token', payloadToken);
    localStorage.setItem('ai_todo_user', JSON.stringify(payloadUser));
  }, []);

  const clearSession = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('ai_todo_token');
    localStorage.removeItem('ai_todo_user');
  }, []);

  const hydrateUser = useCallback(async () => {
    if (!localStorage.getItem('ai_todo_token')) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get('/auth/me');
      setUser(data.user);
      localStorage.setItem('ai_todo_user', JSON.stringify(data.user));
    } catch (error) {
      clearSession();
    } finally {
      setLoading(false);
    }
  }, [clearSession]);

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);

  const login = async (payload) => {
    const { data } = await api.post('/auth/login', payload);
    persistSession(data.token, data.user);
    toast.success(`Welcome back, ${data.user.name.split(' ')[0]}!`);
    return data.user;
  };

  const register = async (payload) => {
    const { data } = await api.post('/auth/register', payload);
    persistSession(data.token, data.user);
    toast.success('Workspace created successfully');
    return data.user;
  };

  const logout = () => {
    clearSession();
    toast.success('Logged out');
  };

  const updateCurrentUser = (nextUser) => {
    setUser(nextUser);
    localStorage.setItem('ai_todo_user', JSON.stringify(nextUser));
  };

  const value = useMemo(
    () => ({ user, token, loading, isAuthenticated: Boolean(token), login, register, logout, updateCurrentUser }),
    [user, token, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
