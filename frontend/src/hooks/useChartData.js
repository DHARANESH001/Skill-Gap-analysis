import { useState, useEffect, useMemo } from 'react';
import { formatPercentage } from '../utils/formatPercentage';

/**
 * Custom hook for chart data processing and formatting
 * @param {Array} rawData - Raw data array
 * @param {Object} options - Chart configuration options
 * @returns {Object} Processed chart data and utilities
 */
export const useChartData = (rawData, options = {}) => {
  const {
    chartType = 'line',
    xAxisKey = 'name',
    yAxisKey = 'value',
    sortBy = null,
    sortOrder = 'asc',
    limit = null,
    colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
    showPercentage = false,
    groupBy = null,
  } = options;

  const [processedData, setProcessedData] = useState([]);

  // Process data based on options
  const processed = useMemo(() => {
    if (!rawData || !Array.isArray(rawData)) {
      return [];
    }

    let data = [...rawData];

    // Sort data if specified
    if (sortBy) {
      data.sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        
        if (sortOrder === 'desc') {
          return bVal > aVal ? 1 : bVal < aVal ? -1 : 0;
        }
        return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
      });
    }

    // Limit data if specified
    if (limit && limit > 0) {
      data = data.slice(0, limit);
    }

    // Group data if specified
    if (groupBy) {
      const grouped = data.reduce((acc, item) => {
        const key = item[groupBy];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});

      return Object.entries(grouped).map(([key, items]) => ({
        [groupBy]: key,
        items,
        total: items.reduce((sum, item) => sum + (item[yAxisKey] || 0), 0),
        average: items.reduce((sum, item) => sum + (item[yAxisKey] || 0), 0) / items.length,
      }));
    }

    // Format values as percentage if specified
    if (showPercentage) {
      data = data.map(item => ({
        ...item,
        [yAxisKey]: formatPercentage(item[yAxisKey] || 0),
      }));
    }

    return data;
  }, [rawData, xAxisKey, yAxisKey, sortBy, sortOrder, limit, showPercentage, groupBy]);

  useEffect(() => {
    setProcessedData(processed);
  }, [processed]);

  // Get chart-specific data formats
  const getLineChartData = () => {
    return processedData.map(item => ({
      x: item[xAxisKey],
      y: item[yAxisKey],
      ...item,
    }));
  };

  const getBarChartData = () => {
    return processedData.map(item => ({
      name: item[xAxisKey],
      value: item[yAxisKey],
      fill: colors[processedData.indexOf(item) % colors.length],
      ...item,
    }));
  };

  const getPieChartData = () => {
    return processedData.map(item => ({
      name: item[xAxisKey],
      value: item[yAxisKey],
      ...item,
    }));
  };

  const getRadarChartData = () => {
    return processedData.map(item => ({
      subject: item[xAxisKey],
      value: item[yAxisKey],
      fullMark: 100,
      ...item,
    }));
  };

  // Get appropriate data based on chart type
  const getChartData = () => {
    switch (chartType) {
      case 'line':
        return getLineChartData();
      case 'bar':
        return getBarChartData();
      case 'pie':
        return getPieChartData();
      case 'radar':
        return getRadarChartData();
      default:
        return processedData;
    }
  };

  // Calculate statistics
  const statistics = useMemo(() => {
    if (processedData.length === 0) {
      return {
        total: 0,
        average: 0,
        min: 0,
        max: 0,
        median: 0,
      };
    }

    const values = processedData.map(item => Number(item[yAxisKey]) || 0);
    const total = values.reduce((sum, val) => sum + val, 0);
    const average = total / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    
    const sortedValues = [...values].sort((a, b) => a - b);
    const median = sortedValues.length % 2 === 0
      ? (sortedValues[sortedValues.length / 2 - 1] + sortedValues[sortedValues.length / 2]) / 2
      : sortedValues[Math.floor(sortedValues.length / 2)];

    return {
      total,
      average,
      min,
      max,
      median,
    };
  }, [processedData, yAxisKey]);

  // Get trend analysis
  const trend = useMemo(() => {
    if (processedData.length < 2) {
      return { direction: 'stable', change: 0, changePercentage: 0 };
    }

    const values = processedData.map(item => Number(item[yAxisKey]) || 0);
    const firstValue = values[0];
    const lastValue = values[values.length - 1];
    const change = lastValue - firstValue;
    const changePercentage = firstValue !== 0 ? (change / firstValue) * 100 : 0;

    let direction = 'stable';
    if (changePercentage > 5) {
      direction = 'up';
    } else if (changePercentage < -5) {
      direction = 'down';
    }

    return {
      direction,
      change,
      changePercentage: Math.round(changePercentage * 100) / 100,
    };
  }, [processedData, yAxisKey]);

  return {
    data: processedData,
    chartData: getChartData(),
    statistics,
    trend,
    colors,
    getLineChartData,
    getBarChartData,
    getPieChartData,
    getRadarChartData,
  };
};

/**
 * Custom hook for multi-series chart data
 * @param {Array} rawData - Raw data array
 * @param {Object} options - Chart configuration options
 * @returns {Object} Multi-series chart data
 */
export const useMultiSeriesChartData = (rawData, options = {}) => {
  const {
    seriesKeys = [],
    xAxisKey = 'name',
    colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'],
    stackData = false,
  } = options;

  const [seriesData, setSeriesData] = useState([]);

  const processed = useMemo(() => {
    if (!rawData || !Array.isArray(rawData) || seriesKeys.length === 0) {
      return [];
    }

    return rawData.map(item => {
      const series = {};
      seriesKeys.forEach((key, index) => {
        series[key] = {
          value: item[key] || 0,
          color: colors[index % colors.length],
        };
      });

      return {
        [xAxisKey]: item[xAxisKey],
        ...series,
        ...item,
      };
    });
  }, [rawData, seriesKeys, xAxisKey, colors]);

  useEffect(() => {
    setSeriesData(processed);
  }, [processed]);

  // Get data for Recharts
  const getRechartsData = () => {
    return processed.map(item => {
      const chartItem = { [xAxisKey]: item[xAxisKey] };
      seriesKeys.forEach(key => {
        chartItem[key] = item[key]?.value || 0;
      });
      return chartItem;
    });
  };

  // Get series configuration for Recharts
  const getSeriesConfig = () => {
    return seriesKeys.map((key, index) => ({
      dataKey: key,
      name: key,
      fill: colors[index % colors.length],
      stroke: colors[index % colors.length],
      stackId: stackData ? 'stack' : undefined,
    }));
  };

  return {
    data: seriesData,
    rechartsData: getRechartsData(),
    seriesConfig: getSeriesConfig(),
    colors,
  };
};

/**
 * Custom hook for real-time chart data updates
 * @param {Function} dataFetcher - Function to fetch data
 * @param {number} interval - Update interval in milliseconds
 * @param {Object} options - Chart options
 * @returns {Object} Real-time chart data and controls
 */
export const useRealTimeChartData = (dataFetcher, interval = 5000, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLive, setIsLive] = useState(true);

  const chartData = useChartData(data, options);

  const fetchData = async () => {
    if (!isLive) return;

    setLoading(true);
    setError(null);

    try {
      const result = await dataFetcher();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLive) return;

    fetchData();

    const intervalId = setInterval(fetchData, interval);
    return () => clearInterval(intervalId);
  }, [interval, isLive, dataFetcher]);

  const toggleLive = () => {
    setIsLive(!isLive);
  };

  const refresh = () => {
    fetchData();
  };

  return {
    ...chartData,
    loading,
    error,
    isLive,
    toggleLive,
    refresh,
  };
};

export default {
  useChartData,
  useMultiSeriesChartData,
  useRealTimeChartData,
};
