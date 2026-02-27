import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Mock data for development
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'student@example.com',
    password: 'password',
    role: 'student',
    department: 'Computer Science',
    year: '3rd Year',
    rollNumber: 'CS2021001',
    joinDate: 'September 2021',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'coordinator@example.com',
    password: 'password',
    role: 'coordinator',
    department: 'Computer Science',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password',
    role: 'admin',
    department: 'Administration',
  },
];

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  login: async (credentials) => {
    // Mock login for development
    const user = mockUsers.find(u => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (user) {
      const token = btoa(JSON.stringify({ user, timestamp: Date.now() }));
      return {
        user,
        token,
      };
    }
    
    throw new Error('Invalid credentials');
  },

  getCurrentUser: async () => {
    // Mock current user for development
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token));
        return decoded.user;
      } catch (error) {
        throw new Error('Invalid token');
      }
    }
    throw new Error('No token found');
  },

  logout: async () => {
    try {
      // Mock logout for development
      localStorage.removeItem('token');
    } catch (error) {
      throw new Error('Logout failed');
    }
  },

  refreshToken: async () => {
    // Mock refresh token for development
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = JSON.parse(atob(token));
        const newToken = btoa(JSON.stringify({ 
          user: decoded.user, 
          timestamp: Date.now() 
        }));
        return { token: newToken };
      } catch (error) {
        throw new Error('Token refresh failed');
      }
    }
    throw new Error('No token to refresh');
  },
};

export default api;
