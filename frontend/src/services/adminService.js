import api from './authService';

export const adminService = {
  // Get admin dashboard data
  getDashboardData: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },

  // User Management
  getUsers: async (filters = {}) => {
    const response = await api.get('/admin/users', { params: filters });
    return response.data;
  },

  // Create new user
  createUser: async (userData) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },

  // Update user
  updateUser: async (userId, userData) => {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  },

  // Delete user
  deleteUser: async (userId) => {
    const response = await api.delete(`/admin/users/${userId}`);
    return response.data;
  },

  // Get user details
  getUserDetails: async (userId) => {
    const response = await api.get(`/admin/users/${userId}`);
    return response.data;
  },

  // Department Management
  getDepartments: async () => {
    const response = await api.get('/admin/departments');
    return response.data;
  },

  // Create department
  createDepartment: async (departmentData) => {
    const response = await api.post('/admin/departments', departmentData);
    return response.data;
  },

  // Update department
  updateDepartment: async (deptId, departmentData) => {
    const response = await api.put(`/admin/departments/${deptId}`, departmentData);
    return response.data;
  },

  // Delete department
  deleteDepartment: async (deptId) => {
    const response = await api.delete(`/admin/departments/${deptId}`);
    return response.data;
  },

  // Assign coordinator to department
  assignCoordinator: async (deptId, coordinatorId) => {
    const response = await api.post(`/admin/departments/${deptId}/coordinators`, {
      coordinatorId,
    });
    return response.data;
  },

  // System Analytics
  getSystemAnalytics: async () => {
    const response = await api.get('/admin/analytics');
    return response.data;
  },

  // Get user statistics
  getUserStats: async () => {
    const response = await api.get('/admin/stats/users');
    return response.data;
  },

  // Get department statistics
  getDepartmentStats: async () => {
    const response = await api.get('/admin/stats/departments');
    return response.data;
  },

  // Get system health
  getSystemHealth: async () => {
    const response = await api.get('/admin/system/health');
    return response.data;
  },

  // Get usage statistics
  getUsageStats: async (period = 'month') => {
    const response = await api.get('/admin/stats/usage', {
      params: { period },
    });
    return response.data;
  },

  // Reports
  generateSystemReport: async (reportConfig) => {
    const response = await api.post('/admin/reports/system', reportConfig);
    return response.data;
  },

  // Export users
  exportUsers: async (format = 'csv') => {
    const response = await api.get('/admin/export/users', {
      params: { format },
      responseType: 'blob',
    });
    return response.data;
  },

  // Export departments
  exportDepartments: async (format = 'csv') => {
    const response = await api.get('/admin/export/departments', {
      params: { format },
      responseType: 'blob',
    });
    return response.data;
  },

  // System Management
  getSystemLogs: async (filters = {}) => {
    const response = await api.get('/admin/logs', { params: filters });
    return response.data;
  },

  // Get system settings
  getSystemSettings: async () => {
    const response = await api.get('/admin/settings');
    return response.data;
  },

  // Update system settings
  updateSystemSettings: async (settings) => {
    const response = await api.put('/admin/settings', settings);
    return response.data;
  },

  // Backup system
  backupSystem: async () => {
    const response = await api.post('/admin/backup');
    return response.data;
  },

  // Restore system
  restoreSystem: async (backupFile) => {
    const formData = new FormData();
    formData.append('backup', backupFile);
    
    const response = await api.post('/admin/restore', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Notifications
  sendNotification: async (notificationData) => {
    const response = await api.post('/admin/notifications', notificationData);
    return response.data;
  },

  // Get notifications
  getNotifications: async () => {
    const response = await api.get('/admin/notifications');
    return response.data;
  },

  // Security
  getSecurityLogs: async (filters = {}) => {
    const response = await api.get('/admin/security/logs', { params: filters });
    return response.data;
  },

  // Get active sessions
  getActiveSessions: async () => {
    const response = await api.get('/admin/security/sessions');
    return response.data;
  },

  // Terminate session
  terminateSession: async (sessionId) => {
    const response = await api.delete(`/admin/security/sessions/${sessionId}`);
    return response.data;
  },

  // Performance monitoring
  getPerformanceMetrics: async () => {
    const response = await api.get('/admin/performance');
    return response.data;
  },

  // Get database stats
  getDatabaseStats: async () => {
    const response = await api.get('/admin/database/stats');
    return response.data;
  },
};

export default adminService;
