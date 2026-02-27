import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const LineChartComponent = ({ 
  data, 
  lines = [], 
  xAxisKey = 'name', 
  height = 300,
  colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  curved = false,
  strokeWidth = 2
}) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
            {label}
          </p>
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {entry.name}: <span className="font-medium text-gray-900 dark:text-white">{entry.value}</span>
              </span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {showGrid && (
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb" 
              className="dark:stroke-gray-600"
            />
          )}
          <XAxis 
            dataKey={xAxisKey}
            stroke="#6b7280"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            stroke="#6b7280"
            tick={{ fill: '#6b7280', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          {showLegend && (
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
          )}
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type={curved ? 'monotone' : 'linear'}
              dataKey={line.dataKey}
              stroke={colors[index % colors.length]}
              strokeWidth={strokeWidth}
              name={line.name}
              dot={{ r: 4, fill: colors[index % colors.length] }}
              activeDot={{ r: 6 }}
              {...line.props}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;
