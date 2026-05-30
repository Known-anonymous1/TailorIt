import { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('tailorit_user');
    const savedToken = localStorage.getItem('tailorit_token');

    if (savedToken) {
      setToken(savedToken);
      api.defaults.headers.common.Authorization = `Bearer ${savedToken}`;
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      api
        .get('/auth/me')
        .then((response) => {
          setUser(response.data.user);
          localStorage.setItem('tailorit_user', JSON.stringify(response.data.user));
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
  }, [token]);

  const login = (userData, accessToken) => {
    setUser(userData);
    setToken(accessToken);
    localStorage.setItem('tailorit_user', JSON.stringify(userData));
    localStorage.setItem('tailorit_token', accessToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('tailorit_user');
    localStorage.removeItem('tailorit_token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
