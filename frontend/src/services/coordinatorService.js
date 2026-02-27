import api from './authService';

export const coordinatorService = {
  // Get coordinator dashboard data
  getDashboardData: async () => {
    const response = await api.get('/coordinator/dashboard');
    return response.data;
  },

  // Upload student data file
  uploadStudentData: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/coordinator/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get uploaded files history
  getUploadedFiles: async () => {
    const response = await api.get('/coordinator/files');
    return response.data;
  },

  // Get skill gap analysis
  getSkillGapAnalysis: async () => {
    const response = await api.get('/coordinator/skill-gap-analysis');
    return response.data;
  },

  // Generate skill gap report
  generateSkillGapReport: async (filters = {}) => {
    const response = await api.post('/coordinator/reports/skill-gap', filters);
    return response.data;
  },

  // Get department reports
  getDepartmentReports: async () => {
    const response = await api.get('/coordinator/reports/department');
    return response.data;
  },

  // Generate custom report
  generateCustomReport: async (reportConfig) => {
    const response = await api.post('/coordinator/reports/custom', reportConfig);
    return response.data;
  },

  // Get department students
  getDepartmentStudents: async (filters = {}) => {
    const response = await api.get('/coordinator/students', { params: filters });
    return response.data;
  },

  // Get student performance details
  getStudentPerformance: async (studentId) => {
    const response = await api.get(`/coordinator/students/${studentId}/performance`);
    return response.data;
  },

  // Get department analytics
  getDepartmentAnalytics: async () => {
    const response = await api.get('/coordinator/analytics');
    return response.data;
  },

  // Get top performers
  getTopPerformers: async (limit = 10) => {
    const response = await api.get('/coordinator/top-performers', {
      params: { limit },
    });
    return response.data;
  },

  // Get weak performers
  getWeakPerformers: async (limit = 10) => {
    const response = await api.get('/coordinator/weak-performers', {
      params: { limit },
    });
    return response.data;
  },

  // Get skill distribution
  getSkillDistribution: async () => {
    const response = await api.get('/coordinator/skill-distribution');
    return response.data;
  },

  // Get performance trends
  getPerformanceTrends: async (period = '6months') => {
    const response = await api.get('/coordinator/performance-trends', {
      params: { period },
    });
    return response.data;
  },

  // Get department comparison
  getDepartmentComparison: async () => {
    const response = await api.get('/coordinator/department-comparison');
    return response.data;
  },

  // Export student data
  exportStudentData: async (format = 'csv') => {
    const response = await api.get('/coordinator/export/students', {
      params: { format },
      responseType: 'blob',
    });
    return response.data;
  },

  // Get recent activities
  getRecentActivities: async () => {
    const response = await api.get('/coordinator/activities');
    return response.data;
  },

  // Get system alerts
  getSystemAlerts: async () => {
    const response = await api.get('/coordinator/alerts');
    return response.data;
  },

  // Delete uploaded file
  deleteFile: async (fileId) => {
    const response = await api.delete(`/coordinator/files/${fileId}`);
    return response.data;
  },

  // Process uploaded data
  processUploadedData: async (fileId) => {
    const response = await api.post(`/coordinator/files/${fileId}/process`);
    return response.data;
  },
};

export default coordinatorService;
