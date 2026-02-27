import React from 'react';

const HeatMapGrid = ({ 
  data, 
  xAxisLabels = [], 
  yAxisLabels = [], 
  height = 300,
  colors = {
    low: '#dcfce7',
    medium: '#fef3c7', 
    high: '#fecaca',
    veryHigh: '#ef4444'
  },
  showLabels = true,
  cellSize = 40
}) => {
  const getColor = (value) => {
    if (value >= 80) return colors.veryHigh;
    if (value >= 60) return colors.high;
    if (value >= 40) return colors.medium;
    return colors.low;
  };

  const getTextColor = (value) => {
    return value >= 60 ? 'text-white' : 'text-gray-900';
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-block min-w-full">
        <div className="flex">
          {/* Empty corner cell */}
          <div className={`flex items-center justify-center`} style={{ width: cellSize, height: cellSize }}>
            {showLabels && (
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400"></span>
            )}
          </div>
          
          {/* X-axis labels */}
          {xAxisLabels.map((label, index) => (
            <div 
              key={`x-${index}`}
              className="flex items-center justify-center"
              style={{ width: cellSize, height: cellSize }}
            >
              {showLabels && (
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 text-center">
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>
        
        {/* Grid rows */}
        {data.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex">
            {/* Y-axis label */}
            <div 
              className="flex items-center justify-center"
              style={{ width: cellSize, height: cellSize }}
            >
              {showLabels && (
                <span className="text-xs font-medium text-gray-600 dark:text-gray-400 text-center">
                  {yAxisLabels[rowIndex] || rowIndex + 1}
                </span>
              )}
            </div>
            
            {/* Data cells */}
            {row.map((value, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className="flex items-center justify-center border border-gray-200 dark:border-gray-600 transition-all duration-200 hover:scale-110 hover:z-10 hover:shadow-lg cursor-pointer"
                style={{ 
                  width: cellSize, 
                  height: cellSize,
                  backgroundColor: getColor(value)
                }}
                title={`${yAxisLabels[rowIndex] || rowIndex + 1} - ${xAxisLabels[colIndex] || colIndex + 1}: ${value}%`}
              >
                <span className={`text-xs font-medium ${getTextColor(value)}`}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center mt-4 space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.low }}></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Low (0-39%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.medium }}></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Medium (40-59%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.high }}></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">High (60-79%)</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.veryHigh }}></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Very High (80-100%)</span>
        </div>
      </div>
    </div>
  );
};

export default HeatMapGrid;
