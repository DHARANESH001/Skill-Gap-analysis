import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard,
  BookOpen,
  TrendingUp,
  Upload,
  FileText,
  Users,
  Building,
  Settings,
  HelpCircle,
  BarChart3,
  Target,
  Award,
  UserCheck
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const studentMenuItems = [
    {
      title: 'Dashboard',
      path: '/student/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Skill Progress',
      path: '/student/skill-progress',
      icon: TrendingUp,
    },
    {
      title: 'Profile',
      path: '/student/profile',
      icon: UserCheck,
    },
  ];

  const coordinatorMenuItems = [
    {
      title: 'Dashboard',
      path: '/coordinator/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Upload Data',
      path: '/coordinator/upload-data',
      icon: Upload,
    },
    {
      title: 'Skill Gap Analysis',
      path: '/coordinator/skill-gap-analysis',
      icon: Target,
    },
    {
      title: 'Department Reports',
      path: '/coordinator/department-reports',
      icon: FileText,
    },
  ];

  const adminMenuItems = [
    {
      title: 'Dashboard',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      title: 'Manage Users',
      path: '/admin/manage-users',
      icon: Users,
    },
    {
      title: 'Manage Departments',
      path: '/admin/manage-departments',
      icon: Building,
    },
    {
      title: 'System Analytics',
      path: '/admin/analytics',
      icon: BarChart3,
    },
  ];

  const getMenuItems = () => {
    switch (user?.role) {
      case 'student':
        return studentMenuItems;
      case 'coordinator':
        return coordinatorMenuItems;
      case 'admin':
        return adminMenuItems;
      default:
        return [];
    }
  };

  const commonMenuItems = [
    {
      title: 'Help',
      path: '/help',
      icon: HelpCircle,
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: Settings,
    },
  ];

  const menuItems = [...getMenuItems(), ...commonMenuItems];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Skill Analysis
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {user?.role && user.role.charAt(0).toUpperCase() + user.role.slice(1)} Portal
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              ×
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={`
                    sidebar-item flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200
                    ${isActive 
                      ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </NavLink>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="bg-gradient-primary rounded-lg p-4 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <Award className="w-5 h-5" />
                <span className="font-semibold">Pro Tip</span>
              </div>
              <p className="text-xs opacity-90">
                Regular practice and consistent learning are key to improving your skills!
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
