import { useAuth } from './useAuth';
import { USER_ROLES } from '../utils/constants';

/**
 * Custom hook to check user roles and permissions
 * @returns {Object} Role checking utilities
 */
export const useRole = () => {
  const { user } = useAuth();

  /**
   * Check if user has a specific role
   * @param {string} role - Role to check
   * @returns {boolean} True if user has the role
   */
  const hasRole = (role) => {
    return user?.role === role;
  };

  /**
   * Check if user has any of the specified roles
   * @param {Array} roles - Array of roles to check
   * @returns {boolean} True if user has any of the roles
   */
  const hasAnyRole = (roles) => {
    if (!Array.isArray(roles)) return false;
    return roles.includes(user?.role);
  };

  /**
   * Check if user is an admin
   * @returns {boolean} True if user is admin
   */
  const isAdmin = () => {
    return hasRole(USER_ROLES.ADMIN);
  };

  /**
   * Check if user is a coordinator
   * @returns {boolean} True if user is coordinator
   */
  const isCoordinator = () => {
    return hasRole(USER_ROLES.COORDINATOR);
  };

  /**
   * Check if user is a student
   * @returns {boolean} True if user is student
   */
  const isStudent = () => {
    return hasRole(USER_ROLES.STUDENT);
  };

  /**
   * Check if user can access admin routes
   * @returns {boolean} True if user can access admin routes
   */
  const canAccessAdmin = () => {
    return isAdmin();
  };

  /**
   * Check if user can access coordinator routes
   * @returns {boolean} True if user can access coordinator routes
   */
  const canAccessCoordinator = () => {
    return isAdmin() || isCoordinator();
  };

  /**
   * Check if user can access student routes
   * @returns {boolean} True if user can access student routes
   */
  const canAccessStudent = () => {
    return isAdmin() || isCoordinator() || isStudent();
  };

  /**
   * Get user role display name
   * @returns {string} Formatted role name
   */
  const getRoleDisplayName = () => {
    const roleNames = {
      [USER_ROLES.ADMIN]: 'Administrator',
      [USER_ROLES.COORDINATOR]: 'Coordinator',
      [USER_ROLES.STUDENT]: 'Student',
    };
    
    return roleNames[user?.role] || 'Unknown';
  };

  /**
   * Get role-based permissions
   * @returns {Object} Permissions object
   */
  const getPermissions = () => {
    const permissions = {
      [USER_ROLES.ADMIN]: {
        canManageUsers: true,
        canManageDepartments: true,
        canViewAllData: true,
        canExportData: true,
        canManageSettings: true,
        canViewReports: true,
        canUploadData: true,
        canManageStudents: true,
      },
      [USER_ROLES.COORDINATOR]: {
        canManageUsers: false,
        canManageDepartments: false,
        canViewAllData: false,
        canExportData: true,
        canManageSettings: false,
        canViewReports: true,
        canUploadData: true,
        canManageStudents: true,
      },
      [USER_ROLES.STUDENT]: {
        canManageUsers: false,
        canManageDepartments: false,
        canViewAllData: false,
        canExportData: false,
        canManageSettings: false,
        canViewReports: false,
        canUploadData: false,
        canManageStudents: false,
      },
    };

    return permissions[user?.role] || permissions[USER_ROLES.STUDENT];
  };

  return {
    user,
    role: user?.role,
    hasRole,
    hasAnyRole,
    isAdmin,
    isCoordinator,
    isStudent,
    canAccessAdmin,
    canAccessCoordinator,
    canAccessStudent,
    getRoleDisplayName,
    getPermissions,
  };
};

export default useRole;
