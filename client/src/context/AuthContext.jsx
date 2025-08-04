import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Set axios to send credentials (cookies, headers) with requests if needed
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch current logged-in user info using token
  const fetchUser = useCallback(async () => {
    try {
      // Fixed double slash in URL here
      const response = await axios.get('https://portfolio-ekvt.onrender.com/api/auth/user');
      setUser(response.data.user);
    } catch (error) {
      logout(); // Token invalid or expired, clear auth state
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Set default Authorization header for all axios requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [fetchUser]);

  // Login function: posts credentials, stores token, sets user
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'https://portfolio-ekvt.onrender.com/api/auth/login',
        { email, password }
      );

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(user);
      return { success: true };
    } catch (error) {
      // Added console.error for better debugging
      console.error('Login error response:', error.response?.data);

      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
      };
    }
  };

  // Logout function: clears token and user info
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
