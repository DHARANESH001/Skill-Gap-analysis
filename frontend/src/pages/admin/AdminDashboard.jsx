import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/common/StatCard';
import BarChartComponent from '../../components/charts/BarChartComponent';
import LineChartComponent from '../../components/charts/LineChartComponent';
import PieChartComponent from '../../components/charts/PieChartComponent';
import { 
  Users, 
  Building, 
  TrendingUp, 
  Activity,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  BookOpen,
  Database,
  Globe,
  Brain,
  Target
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  
  const [systemStats] = useState({
    totalDepartments: 5,
    totalCoordinators: 12,
    totalStudents: 450,
    systemUsage: 78,
  });

  const [growthData] = useState([
    { month: 'Jan', departments: 3, coordinators: 8, students: 320 },
    { month: 'Feb', departments: 3, coordinators: 9, students: 340 },
    { month: 'Mar', departments: 4, coordinators: 10, students: 380 },
    { month: 'Apr', departments: 4, coordinators: 11, students: 410 },
    { month: 'May', departments: 5, coordinators: 12, students: 440 },
    { month: 'Jun', departments: 5, coordinators: 12, students: 450 },
  ]);

  const [departmentPerformance] = useState([
    { department: 'Computer Science', avgScore: 76, students: 150, growth: 12 },
    { department: 'Information Technology', avgScore: 72, students: 120, growth: 8 },
    { department: 'Electronics', avgScore: 68, students: 100, growth: 5 },
    { department: 'Mechanical', avgScore: 65, students: 110, growth: 3 },
    { department: 'Civil', avgScore: 70, students: 90, growth: 7 },
  ]);

  const [userDistribution] = useState([
    { name: 'Students', value: 450, color: '#3b82f6' },
    { name: 'Coordinators', value: 12, color: '#10b981' },
    { name: 'Admins', value: 3, color: '#f59e0b' },
  ]);

  const [recentActivities] = useState([
    {
      type: 'user',
      title: 'New coordinator added',
      description: 'Sarah Johnson joined as IT coordinator',
      time: '2 hours ago',
      status: 'success',
    },
    {
      type: 'department',
      title: 'Department created',
      description: 'Mechanical Engineering department added',
      time: '5 hours ago',
      status: 'success',
    },
    {
      type: 'system',
      title: 'System maintenance',
      description: 'Scheduled maintenance completed successfully',
      time: '1 day ago',
      status: 'success',
    },
    {
      type: 'alert',
      title: 'High server load',
      description: 'Server CPU usage exceeded 80%',
      time: '2 days ago',
      status: 'warning',
    },
  ]);

  const [topPerformers] = useState([
    { name: 'Alice Johnson', department: 'Computer Science', score: 92, rank: 1 },
    { name: 'Bob Smith', department: 'Information Technology', score: 88, rank: 2 },
    { name: 'Carol Williams', department: 'Computer Science', score: 85, rank: 3 },
    { name: 'David Brown', department: 'Electronics', score: 82, rank: 4 },
    { name: 'Eva Davis', department: 'Computer Science', score: 80, rank: 5 },
  ]);

  const [systemAlerts] = useState([
    {
      type: 'warning',
      title: 'Low storage space',
      description: 'Server storage at 85% capacity',
      count: 1,
      priority: 'high',
    },
    {
      type: 'info',
      title: 'New user registrations',
      description: '25 new students this week',
      count: 25,
      priority: 'medium',
    },
    {
      type: 'success',
      title: 'System performance',
      description: 'All systems operating normally',
      count: 0,
      priority: 'low',
    },
  ]);

  const [quickStats] = useState([
    { label: 'Active Users', value: '89%', icon: Users, color: 'success' },
    { label: 'Server Uptime', value: '99.9%', icon: Activity, color: 'success' },
    { label: 'Response Time', value: '120ms', icon: Clock, color: 'primary' },
    { label: 'Data Processed', value: '2.3TB', icon: Database, color: 'warning' },
  ]);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'user': return Users;
      case 'department': return Building;
      case 'system': return Activity;
      case 'alert': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning': return 'warning';
      case 'info': return 'primary';
      case 'success': return 'success';
      case 'danger': return 'danger';
      default: return 'primary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'danger';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'primary';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            System overview and administrative controls
          </p>
        </div>

        {/* System Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Departments"
            value={systemStats.totalDepartments}
            icon={Building}
            color="primary"
            trend="active departments"
            trendValue="+2 this quarter"
          />
          <StatCard
            title="Total Coordinators"
            value={systemStats.totalCoordinators}
            icon={Users}
            color="success"
            trend="faculty members"
            trendValue="+4 new hires"
          />
          <StatCard
            title="Total Students"
            value={systemStats.totalStudents}
            icon={Award}
            color="warning"
            trend="enrolled students"
            trendValue="+50 this month"
          />
          <StatCard
            title="System Usage"
            value={`${systemStats.systemUsage}%`}
            icon={Activity}
            color="primary"
            trend="daily active users"
            trendValue="+5% increase"
          />
        </div>

        {/* Growth Trends */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            System Growth Trends
          </h3>
          <LineChartComponent
            data={growthData}
            lines={[
              { dataKey: 'departments', name: 'Departments' },
              { dataKey: 'coordinators', name: 'Coordinators' },
              { dataKey: 'students', name: 'Students' },
            ]}
            height={300}
            curved={true}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Department Performance */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Department Performance
            </h3>
            <BarChartComponent
              data={departmentPerformance}
              bars={[
                { dataKey: 'avgScore', name: 'Average Score' },
                { dataKey: 'growth', name: 'Growth %' },
              ]}
              height={300}
            />
          </div>

          {/* User Distribution */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              User Distribution
            </h3>
            <PieChartComponent
              data={userDistribution}
              height={300}
              label={true}
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="stat-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                    <Icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Top Performers */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Top Performers
            </h3>
            <div className="space-y-3">
              {topPerformers.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                        {student.rank}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {student.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {student.department}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {student.score}%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Rank #{student.rank}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activities
            </h3>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {activity.description}
                      </p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            System Alerts
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {systemAlerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border border-${getAlertColor(alert.type)}-200 dark:border-${getAlertColor(alert.type)}-800 bg-${getAlertColor(alert.type)}-50 dark:bg-${getAlertColor(alert.type)}-900/20`}>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className={`w-5 h-5 text-${getAlertColor(alert.type)}-600 dark:text-${getAlertColor(alert.type)}-400 mt-0.5`} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {alert.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center justify-between">
                      {alert.count > 0 && (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${getPriorityColor(alert.priority)}-100 text-${getPriorityColor(alert.priority)}-600 dark:bg-${getPriorityColor(alert.priority)}-900/20 dark:text-${getPriorityColor(alert.priority)}-400`}>
                          {alert.count} {alert.count === 1 ? 'item' : 'items'}
                        </span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full bg-${getPriorityColor(alert.priority)}-100 text-${getPriorityColor(alert.priority)}-600 dark:bg-${getPriorityColor(alert.priority)}-900/20 dark:text-${getPriorityColor(alert.priority)}-400`}>
                        {alert.priority}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200">
              <Users className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Manage Users</p>
            </button>
            <button className="p-4 bg-success-50 dark:bg-success-900/20 rounded-lg hover:bg-success-100 dark:hover:bg-success-900/30 transition-colors duration-200">
              <Building className="w-6 h-6 text-success-600 dark:text-success-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Departments</p>
            </button>
            <button className="p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg hover:bg-warning-100 dark:hover:bg-warning-900/30 transition-colors duration-200">
              <Activity className="w-6 h-6 text-warning-600 dark:text-warning-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">System Health</p>
            </button>
            <button className="p-4 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-900/30 transition-colors duration-200">
              <Database className="w-6 h-6 text-secondary-600 dark:text-secondary-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Data Backup</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
