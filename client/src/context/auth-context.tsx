import { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import apiClient from '../config/api-client';
import type { User } from '../types';

// auth context - stores the current user and login/logout functions
const AuthContext = createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // check if user is logged in on page load
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setIsLoading(false);
      return;
    }
    apiClient.get('/users/me')
      .then((res) => {
        setUser(res.data);
        setIsAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem('accessToken');
      })
      .finally(() => setIsLoading(false));
  }, []);

  const login = async (email: string, password: string) => {
    const { data } = await apiClient.post('/auth/login', { email, password });
    localStorage.setItem('accessToken', data.accessToken);
    setUser(data.user);
    setIsAuthenticated(true);
  };

  const register = async (email: string, password: string, displayName: string) => {
    const { data } = await apiClient.post('/auth/register', { email, password, displayName });
    localStorage.setItem('accessToken', data.accessToken);
    setUser(data.user);
    setIsAuthenticated(true);
  };

  const loginAnonymous = async () => {
    const { data } = await apiClient.post('/auth/anonymous');
    localStorage.setItem('accessToken', data.accessToken);
    if (data.anonymousToken) localStorage.setItem('anonymousToken', data.anonymousToken);
    setUser(data.user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('anonymousToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, register, loginAnonymous, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
