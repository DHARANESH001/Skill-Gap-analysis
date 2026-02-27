import React from 'react';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color = 'primary', 
  trend, 
  trendValue, 
  description 
}) => {
  const colorClasses = {
    primary: {
      bg: 'bg-primary-100 dark:bg-primary-900',
      text: 'text-primary-600 dark:text-primary-400',
      iconBg: 'bg-primary-500',
    },
    success: {
      bg: 'bg-success-100 dark:bg-success-900',
      text: 'text-success-600 dark:text-success-400',
      iconBg: 'bg-success-500',
    },
    warning: {
      bg: 'bg-warning-100 dark:bg-warning-900',
      text: 'text-warning-600 dark:text-warning-400',
      iconBg: 'bg-warning-500',
    },
    danger: {
      bg: 'bg-danger-100 dark:bg-danger-900',
      text: 'text-danger-600 dark:text-danger-400',
      iconBg: 'bg-danger-500',
    },
  };

  const colors = colorClasses[color];

  return (
    <div className="stat-card group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {value}
          </p>
          {trend && (
            <div className="flex items-center space-x-2">
              <span className={`text-sm font-medium ${colors.text}`}>
                {trendValue}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {trend}
              </span>
            </div>
          )}
          {description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {description}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-full ${colors.bg} group-hover:scale-110 transition-transform duration-200`}>
          {Icon && <Icon className={`w-6 h-6 ${colors.text}`} />}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
