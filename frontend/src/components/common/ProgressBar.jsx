import React from 'react';

const ProgressBar = ({ 
  value, 
  max = 100, 
  color = 'primary', 
  size = 'medium', 
  showLabel = true, 
  animated = true 
}) => {
  const percentage = Math.min((value / max) * 100, 100);

  const colorClasses = {
    primary: 'bg-primary-500',
    success: 'bg-success-500',
    warning: 'bg-warning-500',
    danger: 'bg-danger-500',
  };

  const sizeClasses = {
    small: 'h-1',
    medium: 'h-2',
    large: 'h-3',
  };

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {value} / {max}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {percentage.toFixed(1)}%
          </span>
        </div>
      )}
      <div className={`progress-bar ${sizeClasses[size]}`}>
        <div
          className={`progress-fill ${colorClasses[color]} ${animated ? 'transition-all duration-500 ease-out' : ''}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
