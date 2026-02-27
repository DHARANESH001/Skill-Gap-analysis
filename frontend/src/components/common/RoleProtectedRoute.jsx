import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const RoleProtectedRoute = ({ children, requiredRole }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default RoleProtectedRoute;
