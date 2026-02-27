import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

const RadarChartComponent = ({ 
  data, 
  radars = [], 
  height = 300,
  colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  angleAxisKey = 'subject',
  radiusAxisDomain = [0, 100]
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
        <RadarChart data={data}>
          {showGrid && (
            <PolarGrid 
              stroke="#e5e7eb" 
              className="dark:stroke-gray-600"
            />
          )}
          <PolarAngleAxis 
            dataKey={angleAxisKey}
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <PolarRadiusAxis
            domain={radiusAxisDomain}
            tick={{ fill: '#6b7280', fontSize: 10 }}
            axisLine={false}
          />
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          {showLegend && (
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
          )}
          {radars.map((radar, index) => (
            <Radar
              key={radar.dataKey}
              name={radar.name}
              dataKey={radar.dataKey}
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              fillOpacity={0.3}
              strokeWidth={2}
              {...radar.props}
            />
          ))}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChartComponent;
