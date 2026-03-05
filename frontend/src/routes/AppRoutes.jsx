import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import PrivateRoute from './PrivateRoute';
import RoleProtectedRoute from '../components/common/RoleProtectedRoute';
// Auth Pages
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import Unauthorized from '../pages/auth/Unauthorized';
// Student Pages
import StudentDashboard from '../pages/student/StudentDashboard';
import SkillProgress from '../pages/student/SkillProgress';
import StudentProfile from '../pages/student/StudentProfile';
// Coordinator Pages
import CoordinatorDashboard from '../pages/coordinator/CoordinatorDashboard';
import UploadData from '../pages/coordinator/UploadData';
import SkillGapAnalysis from '../pages/coordinator/SkillGapAnalysis';
import DepartmentReports from '../pages/coordinator/DepartmentReports';
// Admin Pages
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageUsers from '../pages/admin/ManageUsers';
import ManageDepartments from '../pages/admin/ManageDepartments';
// Common
import Home from '../pages/Home';
const AppRoutes = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }
  const getDefaultRoute = () => {
    if (!isAuthenticated) return '/login';
    switch (user?.role) {
      case 'student':
        return '/student/dashboard';
      case 'coordinator':
        return '/coordinator/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/login';
    }
  };
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      {/* Student Routes */}
      <Route path="/student/dashboard" element={
        <PrivateRoute>
          <RoleProtectedRoute requiredRole="student">
            <StudentDashboard />
          </RoleProtectedRoute>
        </PrivateRoute>
      } />
      <Route path="/student/skill-progress" element={
        <PrivateRoute>
          <RoleProtectedRoute requiredRole="student">
            <SkillProgress />
          </RoleProtectedRoute>
        </PrivateRoute>
      } />
      <Route path="/student/profile" element={
        <PrivateRoute>
          <RoleProtectedRoute requiredRole="student">
            <StudentProfile />
          </RoleProtectedRoute>
        </PrivateRoute>
      } />
      {/* Coordinator Routes */}
      <Route path="/coordinator/dashboard" element={
        <PrivateRoute>
          <RoleProtectedRoute requiredRole="coordinator">
            <CoordinatorDashboard />
          </RoleProtectedRoute>
        </PrivateRoute>
      } />
      <Route path="/coordinator/upload-data" element={
        <PrivateRoute>
          <RoleProtectedRoute requiredRole="coordinator">
            <UploadData />
          </RoleProtectedRoute>
        </PrivateRoute>
      } />
      <Route path="/coordinator/skill-gap-analysis" element={
        <PrivateRoute>
          <RoleProtectedRoute requiredRole="coordinator">
            <SkillGapAnalysis />
          </RoleProtectedRoute>
        </PrivateRoute>
      } />
      <Route path="/coordinator/department-reports" element={
        <PrivateRoute>
          <RoleProtectedRoute requiredRole="coordinator">
            <DepartmentReports />
          </RoleProtectedRoute>
        </PrivateRoute>
      } />
      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={
        <PrivateRoute>
          <RoleProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </RoleProtectedRoute>
        </PrivateRoute>
      } />
      <Route path="/admin/manage-users" element={
        <PrivateRoute>
          <RoleProtectedRoute requiredRole="admin">
            <ManageUsers />
          </RoleProtectedRoute>
        </PrivateRoute>
      } />
      <Route path="/admin/manage-departments" element={
        <PrivateRoute>
          <RoleProtectedRoute requiredRole="admin">
            <ManageDepartments />
          </RoleProtectedRoute>
        </PrivateRoute>
      } />
      {/* Catch all route */}
      <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
    </Routes>
  );
};
export default AppRoutes;