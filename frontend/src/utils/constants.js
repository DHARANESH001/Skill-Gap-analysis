// API Constants
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
  },
  STUDENT: {
    DASHBOARD: '/student/dashboard',
    PROFILE: '/student/profile',
    SKILLS: '/student/skills',
    PROBLEMS: '/student/problems',
    ACHIEVEMENTS: '/student/achievements',
    RECOMMENDATIONS: '/student/recommendations',
  },
  COORDINATOR: {
    DASHBOARD: '/coordinator/dashboard',
    UPLOAD: '/coordinator/upload',
    FILES: '/coordinator/files',
    STUDENTS: '/coordinator/students',
    REPORTS: '/coordinator/reports',
    ANALYTICS: '/coordinator/analytics',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    USERS: '/admin/users',
    DEPARTMENTS: '/admin/departments',
    SETTINGS: '/admin/settings',
    LOGS: '/admin/logs',
  },
};

// User Roles
export const USER_ROLES = {
  STUDENT: 'student',
  COORDINATOR: 'coordinator',
  ADMIN: 'admin',
};

// Status Constants
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
};

// Department Codes
export const DEPARTMENT_CODES = {
  COMPUTER_SCIENCE: 'CS',
  INFORMATION_TECHNOLOGY: 'IT',
  ELECTRONICS: 'EE',
  MECHANICAL: 'ME',
  CIVIL: 'CE',
};

// Skill Categories
export const SKILL_CATEGORIES = {
  DSA: 'DSA',
  DBMS: 'DBMS',
  WEB_DEVELOPMENT: 'Web Development',
  ALGORITHMS: 'Algorithms',
  SYSTEM_DESIGN: 'System Design',
  CLOUD_COMPUTING: 'Cloud Computing',
  MACHINE_LEARNING: 'Machine Learning',
};

// Performance Levels
export const PERFORMANCE_LEVELS = {
  EXCELLENT: { min: 80, max: 100, color: 'success' },
  GOOD: { min: 60, max: 79, color: 'primary' },
  AVERAGE: { min: 40, max: 59, color: 'warning' },
  POOR: { min: 0, max: 39, color: 'danger' },
};

// Chart Colors
export const CHART_COLORS = {
  PRIMARY: '#3b82f6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  SECONDARY: '#6b7280',
  INFO: '#06b6d4',
};

// File Formats
export const SUPPORTED_FILE_FORMATS = {
  CSV: '.csv',
  EXCEL: ['.xlsx', '.xls'],
  PDF: '.pdf',
  IMAGE: ['.jpg', '.jpeg', '.png', '.gif'],
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  PAGE_SIZES: [10, 25, 50, 100],
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  INPUT: 'YYYY-MM-DD',
  DATETIME: 'MMM DD, YYYY HH:mm',
};

// Toast Messages
export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGIN_ERROR: 'Login failed. Please check your credentials.',
  SAVE_SUCCESS: 'Data saved successfully!',
  SAVE_ERROR: 'Failed to save data. Please try again.',
  DELETE_SUCCESS: 'Item deleted successfully!',
  DELETE_ERROR: 'Failed to delete item. Please try again.',
  UPLOAD_SUCCESS: 'File uploaded successfully!',
  UPLOAD_ERROR: 'Failed to upload file. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
};

// Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 6,
  PHONE: /^[+]?[\d\s\-\(\)]+$/,
  ROLL_NUMBER: /^[A-Z]{2}\d{4}$/,
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  LANGUAGE: 'language',
  SIDEBAR_STATE: 'sidebarState',
};

// Route Paths
export const ROUTES = {
  LOGIN: '/login',
  UNAUTHORIZED: '/unauthorized',
  STUDENT: {
    DASHBOARD: '/student/dashboard',
    SKILL_PROGRESS: '/student/skill-progress',
    PROFILE: '/student/profile',
  },
  COORDINATOR: {
    DASHBOARD: '/coordinator/dashboard',
    UPLOAD_DATA: '/coordinator/upload-data',
    SKILL_GAP_ANALYSIS: '/coordinator/skill-gap-analysis',
    DEPARTMENT_REPORTS: '/coordinator/department-reports',
  },
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    MANAGE_USERS: '/admin/manage-users',
    MANAGE_DEPARTMENTS: '/admin/manage-departments',
  },
};

// Animation Durations
export const ANIMATIONS = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
};

// Breakpoints
export const BREAKPOINTS = {
  SM: '640px',
  MD: '768px',
  LG: '1024px',
  XL: '1280px',
  '2XL': '1536px',
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  FORBIDDEN: 'You do not have permission to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size exceeds the maximum allowed limit.',
  INVALID_FILE_FORMAT: 'Invalid file format. Please upload a supported file type.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  USER_CREATED: 'User created successfully!',
  USER_UPDATED: 'User updated successfully!',
  USER_DELETED: 'User deleted successfully!',
  DEPARTMENT_CREATED: 'Department created successfully!',
  DEPARTMENT_UPDATED: 'Department updated successfully!',
  DEPARTMENT_DELETED: 'Department deleted successfully!',
  DATA_IMPORTED: 'Data imported successfully!',
  DATA_EXPORTED: 'Data exported successfully!',
};

// Loading Messages
export const LOADING_MESSAGES = {
  AUTHENTICATING: 'Authenticating...',
  LOADING_DATA: 'Loading data...',
  SAVING_DATA: 'Saving data...',
  UPLOADING_FILE: 'Uploading file...',
  PROCESSING_DATA: 'Processing data...',
  GENERATING_REPORT: 'Generating report...',
};

export default {
  API_ENDPOINTS,
  USER_ROLES,
  USER_STATUS,
  DEPARTMENT_CODES,
  SKILL_CATEGORIES,
  PERFORMANCE_LEVELS,
  CHART_COLORS,
  SUPPORTED_FILE_FORMATS,
  PAGINATION,
  DATE_FORMATS,
  TOAST_MESSAGES,
  VALIDATION_RULES,
  STORAGE_KEYS,
  ROUTES,
  ANIMATIONS,
  BREAKPOINTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  LOADING_MESSAGES,
};
