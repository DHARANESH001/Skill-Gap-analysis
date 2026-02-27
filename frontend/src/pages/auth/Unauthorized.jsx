import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldX, ArrowLeft, Home } from 'lucide-react';

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-danger-50 to-warning-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 bg-danger-100 dark:bg-danger-900/20 rounded-full mb-6">
          <ShieldX className="w-10 h-10 text-danger-600 dark:text-danger-400" />
        </div>

        {/* Title and Description */}
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Access Denied
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          You don't have permission to access this page. Please contact your administrator if you think this is a mistake.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="btn btn-primary flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Go Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-secondary flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            Need Help?
          </h2>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p>
              <strong>Students:</strong> Access your dashboard and learning materials.
            </p>
            <p>
              <strong>Coordinators:</strong> Manage department analytics and student progress.
            </p>
            <p>
              <strong>Administrators:</strong> Full system access and user management.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
