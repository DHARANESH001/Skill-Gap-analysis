import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/common/StatCard';
import BarChartComponent from '../../components/charts/BarChartComponent';
import LineChartComponent from '../../components/charts/LineChartComponent';
import PieChartComponent from '../../components/charts/PieChartComponent';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  Users,
  Calendar,
  Filter,
  Eye,
  CheckCircle,
  AlertTriangle,
  Award
} from 'lucide-react';
import toast from 'react-hot-toast';

const DepartmentReports = () => {
  const { user } = useAuth();
  
  const [reportStats] = useState({
    totalReports: 12,
    monthlyReports: 4,
    customReports: 8,
    downloads: 45,
  });

  const [availableReports] = useState([
    {
      id: 1,
      name: 'Monthly Performance Report',
      type: 'Monthly',
      generatedDate: '2024-06-15',
      size: '2.3 MB',
      format: 'PDF',
      description: 'Comprehensive monthly analysis of student performance',
      status: 'completed',
    },
    {
      id: 2,
      name: 'Skill Gap Analysis',
      type: 'Analysis',
      generatedDate: '2024-06-10',
      size: '1.8 MB',
      format: 'PDF',
      description: 'Detailed skill gap analysis with recommendations',
      status: 'completed',
    },
    {
      id: 3,
      name: 'Department Comparison Report',
      type: 'Comparison',
      generatedDate: '2024-06-05',
      size: '1.5 MB',
      format: 'Excel',
      description: 'Comparative analysis across different departments',
      status: 'completed',
    },
    {
      id: 4,
      name: 'Student Progress Summary',
      type: 'Summary',
      generatedDate: '2024-05-28',
      size: '3.1 MB',
      format: 'PDF',
      description: 'Individual student progress tracking report',
      status: 'completed',
    },
  ]);

  const [performanceTrends] = useState([
    { month: 'Jan', avgScore: 68, improvement: 2 },
    { month: 'Feb', avgScore: 70, improvement: 3 },
    { month: 'Mar', avgScore: 72, improvement: 4 },
    { month: 'Apr', avgScore: 71, improvement: 1 },
    { month: 'May', avgScore: 74, improvement: 5 },
    { month: 'Jun', avgScore: 76, improvement: 6 },
  ]);

  const [skillPerformance] = useState([
    { skill: 'DSA', excellent: 25, good: 45, average: 20, poor: 10 },
    { skill: 'DBMS', excellent: 20, good: 40, average: 25, poor: 15 },
    { skill: 'Web Dev', excellent: 30, good: 50, average: 15, poor: 5 },
    { skill: 'Algorithms', excellent: 18, good: 42, average: 25, poor: 15 },
    { skill: 'System Design', excellent: 15, good: 35, average: 30, poor: 20 },
  ]);

  const [departmentMetrics] = useState([
    { metric: 'Average Score', value: 76, target: 80, status: 'good' },
    { metric: 'Pass Rate', value: 85, target: 90, status: 'good' },
    { metric: 'Attendance', value: 92, target: 95, status: 'excellent' },
    { metric: 'Assignment Completion', value: 88, target: 85, status: 'excellent' },
  ]);

  const [selectedReportType, setSelectedReportType] = useState('all');
  const [dateRange, setDateRange] = useState('month');

  const downloadReport = (reportId) => {
    const report = availableReports.find(r => r.id === reportId);
    toast.success(`Downloading ${report.name}...`);
    
    // Simulate download
    setTimeout(() => {
      toast.success(`${report.name} downloaded successfully!`);
    }, 2000);
  };

  const generateCustomReport = () => {
    toast.success('Custom report generation started...');
    
    // Simulate report generation
    setTimeout(() => {
      toast.success('Custom report generated successfully!');
    }, 3000);
  };

  const viewReport = (reportId) => {
    const report = availableReports.find(r => r.id === reportId);
    toast.success(`Opening ${report.name} for preview...`);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'processing': return AlertTriangle;
      default: return FileText;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success-600';
      case 'processing': return 'text-warning-600';
      default: return 'text-gray-600';
    }
  };

  const getMetricStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'success';
      case 'good': return 'primary';
      case 'average': return 'warning';
      case 'poor': return 'danger';
      default: return 'primary';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Department Reports
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Generate and download comprehensive department reports
              </p>
            </div>
            <button
              onClick={generateCustomReport}
              className="btn btn-primary flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>Generate Custom Report</span>
            </button>
          </div>
        </div>

        {/* Report Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Reports"
            value={reportStats.totalReports}
            icon={FileText}
            color="primary"
          />
          <StatCard
            title="Monthly Reports"
            value={reportStats.monthlyReports}
            icon={Calendar}
            color="success"
          />
          <StatCard
            title="Custom Reports"
            value={reportStats.customReports}
            icon={Filter}
            color="warning"
          />
          <StatCard
            title="Downloads"
            value={reportStats.downloads}
            icon={Download}
            color="primary"
            description="This month"
          />
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Report Type
                </label>
                <select
                  value={selectedReportType}
                  onChange={(e) => setSelectedReportType(e.target.value)}
                  className="input"
                >
                  <option value="all">All Reports</option>
                  <option value="monthly">Monthly</option>
                  <option value="analysis">Analysis</option>
                  <option value="comparison">Comparison</option>
                  <option value="summary">Summary</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="input"
                >
                  <option value="week">Last Week</option>
                  <option value="month">Last Month</option>
                  <option value="quarter">Last Quarter</option>
                  <option value="year">Last Year</option>
                </select>
              </div>
            </div>
            <button className="btn btn-secondary">
              Apply Filters
            </button>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Performance Trends
            </h3>
            <LineChartComponent
              data={performanceTrends}
              lines={[
                { dataKey: 'avgScore', name: 'Average Score' },
                { dataKey: 'improvement', name: 'Improvement Rate' },
              ]}
              height={250}
              curved={true}
            />
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Skill Performance Distribution
            </h3>
            <div className="space-y-4">
              {skillPerformance.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {skill.skill}
                    </span>
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="text-success-600">Excellent: {skill.excellent}</span>
                      <span className="text-primary-600">Good: {skill.good}</span>
                      <span className="text-warning-600">Average: {skill.average}</span>
                      <span className="text-danger-600">Poor: {skill.poor}</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div className="flex h-full">
                      <div 
                        className="bg-success-500" 
                        style={{ width: `${(skill.excellent / 100) * 100}%` }}
                      />
                      <div 
                        className="bg-primary-500" 
                        style={{ width: `${(skill.good / 100) * 100}%` }}
                      />
                      <div 
                        className="bg-warning-500" 
                        style={{ width: `${(skill.average / 100) * 100}%` }}
                      />
                      <div 
                        className="bg-danger-500" 
                        style={{ width: `${(skill.poor / 100) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department Metrics */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Department Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {departmentMetrics.map((metric, index) => (
              <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {metric.metric}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${getMetricStatusColor(metric.status)}-100 text-${getMetricStatusColor(metric.status)}-600 dark:bg-${getMetricStatusColor(metric.status)}-900/20 dark:text-${getMetricStatusColor(metric.status)}-400`}>
                    {metric.status}
                  </span>
                </div>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {metric.value}%
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Target: {metric.target}%
                  </span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className={`bg-${getMetricStatusColor(metric.status)}-500 h-2 rounded-full`}
                      style={{ width: `${metric.value}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Available Reports */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Available Reports
          </h3>
          
          {availableReports.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Report Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Generated Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Size
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Format
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {availableReports.map((report) => {
                    const StatusIcon = getStatusIcon(report.status);
                    return (
                      <tr key={report.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="py-3 px-4">
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                              {report.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              {report.description}
                            </p>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400">
                            {report.type}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {report.generatedDate}
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                          {report.size}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-600 dark:bg-secondary-900/20 dark:text-secondary-400">
                            {report.format}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <StatusIcon className={`w-4 h-4 ${getStatusColor(report.status)}`} />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {report.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => viewReport(report.id)}
                              className="p-1 text-gray-500 hover:text-primary-600 transition-colors"
                              title="View Report"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => downloadReport(report.id)}
                              className="p-1 text-gray-500 hover:text-success-600 transition-colors"
                              title="Download Report"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No reports available. Generate your first report to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentReports;
