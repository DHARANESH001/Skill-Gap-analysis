import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Bell, 
  Settings, 
  LogOut, 
  User,
  ChevronDown 
} from 'lucide-react';

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleLabel = (role) => {
    const roleLabels = {
      admin: 'Administrator',
      coordinator: 'Coordinator',
      student: 'Student',
    };
    return roleLabels[role] || role;
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/student/')) return 'Student Dashboard';
    if (path.includes('/coordinator/')) return 'Coordinator Dashboard';
    if (path.includes('/admin/')) return 'Admin Dashboard';
    return 'Skill Analysis System';
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side */}
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 lg:hidden"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="ml-4 lg:ml-0">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                {getPageTitle()}
              </h1>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {getRoleLabel(user?.role)}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                  <Link
                    to={`/${user?.role}/profile`}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </Link>
                  <Link
                    to={`/${user?.role}/settings`}
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </Link>
                  <hr className="my-1 border-gray-200 dark:border-gray-700" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
