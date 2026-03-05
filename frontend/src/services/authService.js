import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

// Mock data for development
const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'student@example.com',
    username: 'student', // Email prefix
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
    username: 'coordinator', // Email prefix
    password: 'password',
    role: 'coordinator',
    department: 'Computer Science',
  },
  {
    id: '3',
    name: 'Admin User',
    email: 'admin@example.com',
    username: 'admin', // Email prefix
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
    try {
      // Map email to username for backend compatibility
      const loginData = {
        username: credentials.email.split('@')[0], // Use email prefix as username
        password: credentials.password
      };
      console.log('Sending login data:', JSON.stringify(loginData, null, 2));
      const response = await api.post('/auth/signin', loginData);
      console.log('Backend response:', JSON.stringify(response.data, null, 2));
      
      // Create a user object that matches the frontend expectations
      const user = {
        id: response.data.id,
        name: response.data.name,
        email: response.data.email,
        username: response.data.username,
        role: response.data.role,
        department: response.data.department,
        year: response.data.year,
        rollNumber: response.data.rollNumber
      };
      
      return {
        user: user,
        token: response.data.token,
      };
    } catch (error) {
      console.error('Login API error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      // Fallback to mock for development
      const user = mockUsers.find(u => 
        u.username === credentials.username && u.password === credentials.password
      );
      
      if (user) {
        const token = btoa(JSON.stringify({ user, timestamp: Date.now() }));
        return {
          user: {
            ...user,
            name: user.name // Ensure name field is included
          },
          token,
        };
      }
      
      throw new Error(error.response?.data?.message || 'Invalid credentials');
    }
  },

  signup: async (userData) => {
    try {
      // Add username field from email for backend compatibility
      const signupData = {
        name: userData.name,
        email: userData.email,
        username: userData.email.split('@')[0], // Use email prefix as username
        password: userData.password,
        role: userData.role,
        department: userData.department || '',
        year: userData.year || '',
        rollNumber: userData.rollNumber || ''
      };
      console.log('Sending signup data:', JSON.stringify(signupData, null, 2));
      const response = await api.post('/auth/signup', signupData);
      console.log('Backend response:', JSON.stringify(response.data, null, 2));
      return response.data;
    } catch (error) {
      console.error('Signup API error:', error);
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
      throw new Error(error.response?.data?.message || 'Signup failed');
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      console.error('Get current user API error:', error);
      // Fallback to mock for development
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded = JSON.parse(atob(token));
          return decoded.user;
        } catch (decodeError) {
          throw new Error('Invalid token');
        }
      }
      throw new Error('No token found');
    }
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
