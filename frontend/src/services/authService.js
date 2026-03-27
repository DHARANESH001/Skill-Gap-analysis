import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';
// Mock data for development
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'student@example.com',
    username: 'student',
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
    username: 'coordinator',
    password: 'password',
    role: 'coordinator',
    department: 'Computer Science',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    username: 'admin',
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
// Attach token to request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
// Handle unauthorized response
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
    try {
      const loginData = {
        username: credentials.email.split('@')[0],
        password: credentials.password,
      };
      console.log('Sending login data:', loginData);
      const response = await api.post('/auth/signin', loginData);
      console.log('Backend response:', response.data);
      const user = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        username: response.data.username,
        role: response.data.role,
        department: response.data.department,
        year: response.data.year,
        rollNumber: response.data.rollNumber,
      };
      return {
        user,
        token: response.data.token,
      };
    } catch (error) {
      console.error('Login API error:', error);
      // Fallback to mock (development only)
      const user = mockUsers.find(
        (u) =>
          u.username === credentials.email.split('@')[0] &&
          u.password === credentials.password
      );
      if (user) {
        const token = btoa(JSON.stringify({ user, timestamp: Date.now() }));
        return {
          user,
          token,
        };
      }
      throw new Error(error.response?.data?.message || 'Invalid credentials');
    }
  },
  signup: async (userData) => {
    try {
      const signupData = {
        name: userData.name,
        email: userData.email,
        username: userData.email.split('@')[0],
        password: userData.password,
        role: userData.role,
        department: userData.department || '',
        year: userData.year || '',
        rollNumber: userData.rollNumber || '',
      };
      console.log('Sending signup data:', signupData);
      const response = await api.post('/auth/signup', signupData);
      return response.data;
    } catch (error) {
      console.error('Signup API error:', error);
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  },
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      // fallback using token
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = JSON.parse(atob(token));
          return decoded.user;
        } catch {
          throw new Error('Invalid token');
        }
      }
      throw new Error('No user found');
    }
  },
  logout: async () => {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.warn('Logout API failed (ignored)');
    }
    localStorage.removeItem('token');
  },
  refreshToken: async () => {
    const response = await api.post('/auth/refresh');
    return response.data;
  },
};
export default api;