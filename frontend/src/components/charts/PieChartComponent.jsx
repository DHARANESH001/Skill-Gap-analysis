import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const PieChartComponent = ({ 
  data, 
  dataKey = 'value', 
  nameKey = 'name', 
  height = 300,
  colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'],
  showLegend = true,
  showTooltip = true,
  innerRadius = 0,
  outerRadius = 80,
  paddingAngle = 0,
  label = false
}) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const total = payload.reduce((sum, entry) => sum + entry.value, 0);
      const percentage = ((data.value / total) * 100).toFixed(1);
      
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
            {data.name}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Value: <span className="font-medium text-gray-900 dark:text-white">{data.value}</span>
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Percentage: <span className="font-medium text-gray-900 dark:text-white">{percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={height}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={label ? CustomLabel : false}
            outerRadius={outerRadius}
            innerRadius={innerRadius}
            fill="#8884d8"
            dataKey={dataKey}
            paddingAngle={paddingAngle}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          {showTooltip && <Tooltip content={<CustomTooltip />} />}
          {showLegend && (
            <Legend 
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="circle"
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComponent;
