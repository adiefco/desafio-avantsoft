import React, { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../api/mockApi';

type AuthContextType = {
  token: string | null;
  login: (u:string,p:string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children:React.ReactNode}> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  useEffect(() => {
    if (token) localStorage.setItem('token', token); else localStorage.removeItem('token');
  }, [token]);

  async function login(username:string, password:string) {
    const res = await api.login(username, password);
    setToken(res.token);
  }
  function logout() {
    setToken(null);
  }

  return <AuthContext.Provider value={{ token, login, logout }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
