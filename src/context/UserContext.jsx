import axios from 'axios';
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('access_token');
    return storedToken ? storedToken : null;
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get(`${API_URL}/auth/me`, { withCredentials: true })
        if (response.status == 200) {
          const user_data = response.data
          setUser({ id: user_data.id, login: user_data.login, username: user_data.username });
        }
      } catch (error) {
        // console.error('Auth check failed:', error);
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`,
        new URLSearchParams({
          username: credentials.username,
          password: credentials.password
        }),
        { withCredentials: true }
      )

      localStorage.setItem('access_token', response.data.access_token);

      const user_data = {
        id: response.data.login,
        login: response.data.login,
        username: response.data.username,
      };
      setUser(user_data);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`,
        {
          login: credentials.username,
          username: credentials.username,
          password: credentials.password,
        }
      )
      return { success: true }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message
      };
    }
  }

  const logout = async () => {
    const response = await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true })
    localStorage.removeItem('access_token');
    setUser(null);
  };

  // Значение контекста
  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    register,
    token,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

// Хук для использования контекста
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
