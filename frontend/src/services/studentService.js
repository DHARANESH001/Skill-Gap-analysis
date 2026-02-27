import api from './authService';

export const studentService = {
  // Get student dashboard data
  getDashboardData: async () => {
    const response = await api.get('/student/dashboard');
    return response.data;
  },

  // Get student skill progress
  getSkillProgress: async () => {
    const response = await api.get('/student/skills/progress');
    return response.data;
  },

  // Get student profile
  getProfile: async () => {
    const response = await api.get('/student/profile');
    return response.data;
  },

  // Update student profile
  updateProfile: async (profileData) => {
    const response = await api.put('/student/profile', profileData);
    return response.data;
  },

  // Get student performance history
  getPerformanceHistory: async () => {
    const response = await api.get('/student/performance/history');
    return response.data;
  },

  // Get student achievements
  getAchievements: async () => {
    const response = await api.get('/student/achievements');
    return response.data;
  },

  // Get learning recommendations
  getRecommendations: async () => {
    const response = await api.get('/student/recommendations');
    return response.data;
  },

  // Submit coding problem solution
  submitSolution: async (problemId, solution) => {
    const response = await api.post('/student/problems/submit', {
      problemId,
      solution,
    });
    return response.data;
  },

  // Get practice problems
  getPracticeProblems: async (filters = {}) => {
    const response = await api.get('/student/problems', { params: filters });
    return response.data;
  },

  // Get problem details
  getProblemDetails: async (problemId) => {
    const response = await api.get(`/student/problems/${problemId}`);
    return response.data;
  },

  // Get course materials
  getCourseMaterials: async () => {
    const response = await api.get('/student/materials');
    return response.data;
  },

  // Track study session
  trackStudySession: async (sessionData) => {
    const response = await api.post('/student/study-sessions', sessionData);
    return response.data;
  },

  // Get study statistics
  getStudyStats: async () => {
    const response = await api.get('/student/study-stats');
    return response.data;
  },
};

export default studentService;
