import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/common/StatCard';
import BarChartComponent from '../../components/charts/BarChartComponent';
import PieChartComponent from '../../components/charts/PieChartComponent';
import LineChartComponent from '../../components/charts/LineChartComponent';
import HeatMapGrid from '../../components/charts/HeatMapGrid';
import { 
  Users, 
  TrendingUp, 
  Target, 
  AlertTriangle,
  BookOpen,
  Code,
  Database,
  Globe,
  Brain,
  Award,
  Clock,
  CheckCircle
} from 'lucide-react';

const CoordinatorDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [statisticsData, setStatisticsData] = useState(null);
  
  // State for all dashboard data
  const [departmentStats, setDepartmentStats] = useState({
    totalStudents: 0,
    averageSkillScore: 0,
    strongestSkill: '',
    weakestSkill: '',
  });

  const [performanceData, setPerformanceData] = useState([]);
  const [skillDistribution, setSkillDistribution] = useState([]);
  const [departmentComparison, setDepartmentComparison] = useState([]);
  const [roleStats, setRoleStats] = useState([]);

  // Fetch statistics data from backend
  const fetchStatisticsData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        console.error('No authentication token found');
        alert('Please login to access the dashboard');
        return;
      }

      console.log('Coordinator Dashboard - Fetching user statistics...');
      const response = await fetch('http://localhost:8081/api/users/statistics', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 401) {
        console.error('Coordinator Dashboard - Authentication failed');
        localStorage.removeItem('token');
        alert('Your session has expired. Please login again.');
        window.location.href = '/login';
        return;
      }

      if (!response.ok) {
        console.error('Coordinator Dashboard - Failed to fetch statistics:', response.status);
        throw new Error('Failed to fetch statistics data');
      }

      const data = await response.json();
      console.log('Coordinator Dashboard - Statistics data received:', data);
      setStatisticsData(data);

      // Update department stats
      setDepartmentStats({
        totalStudents: data.totalStudents,
        averageSkillScore: Math.round(data.averageSkillScore || 0),
        strongestSkill: data.strongestSkill || 'N/A',
        weakestSkill: data.weakestSkill || 'N/A',
      });

      // Update role statistics
      if (data.roleStats) {
        setRoleStats(data.roleStats);
      }

      // Update department comparison data
      if (data.departmentStats) {
        const deptData = data.departmentStats.map(dept => ({
          department: dept.department,
          avgScore: Math.round(dept.averageScore || 0),
          students: dept.studentCount || 0,
        }));
        setDepartmentComparison(deptData);
      }

      // Generate mock performance data based on real statistics
      const monthlyData = [
        { month: 'Jan', avgScore: (data.averageSkillScore || 70) - 7, students: Math.max(0, (data.totalStudents || 0) - 5) },
        { month: 'Feb', avgScore: (data.averageSkillScore || 70) - 5, students: Math.max(0, (data.totalStudents || 0) - 3) },
        { month: 'Mar', avgScore: (data.averageSkillScore || 70) - 3, students: Math.max(0, (data.totalStudents || 0) - 2) },
        { month: 'Apr', avgScore: (data.averageSkillScore || 70) - 1, students: Math.max(0, (data.totalStudents || 0) - 1) },
        { month: 'May', avgScore: (data.averageSkillScore || 70) + 2, students: data.totalStudents || 0 },
        { month: 'Jun', avgScore: (data.averageSkillScore || 70) + 4, students: data.totalStudents || 0 },
      ];
      setPerformanceData(monthlyData);

      // Generate skill distribution based on department data
      if (data.departmentStats && data.departmentStats.length > 0) {
        const avgScores = data.departmentStats.map(dept => dept.averageScore || 70);
        const skills = ['DSA', 'DBMS', 'Web Dev', 'Algorithms', 'System Design'];
        const skillData = skills.map((skill, index) => ({
          name: skill,
          value: Math.round(avgScores[index % avgScores.length] + (Math.random() * 10 - 5))
        }));
        setSkillDistribution(skillData);
      } else {
        // Fallback skill distribution
        setSkillDistribution([
          { name: 'DSA', value: 75 },
          { name: 'DBMS', value: 68 },
          { name: 'Web Dev', value: 82 },
          { name: 'Algorithms', value: 70 },
          { name: 'System Design', value: 65 },
        ]);
      }

    } catch (error) {
      console.error('Error fetching statistics data:', error);
      // Set fallback data to ensure page renders
      setDepartmentStats({
        totalStudents: 0,
        averageSkillScore: 0,
        strongestSkill: 'N/A',
        weakestSkill: 'N/A',
      });
      setPerformanceData([]);
      setSkillDistribution([]);
      setDepartmentComparison([]);
      setRoleStats([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatisticsData();
  }, []);

  const [studentSkillMatrix] = useState([
    [85, 72, 78, 68, 65],
    [78, 85, 72, 75, 70],
    [72, 68, 85, 70, 68],
    [68, 75, 70, 82, 72],
    [75, 70, 68, 72, 78],
    [82, 78, 75, 68, 65],
    [70, 72, 82, 75, 70],
    [68, 65, 70, 78, 75],
    [78, 82, 68, 70, 82],
    [72, 70, 75, 82, 68],
  ]);

  const [topPerformers] = useState([
    { name: 'Alice Johnson', score: 92, rank: 1, trend: 'up' },
    { name: 'Bob Smith', score: 88, rank: 2, trend: 'up' },
    { name: 'Carol Williams', score: 85, rank: 3, trend: 'same' },
    { name: 'David Brown', score: 82, rank: 4, trend: 'down' },
    { name: 'Eva Davis', score: 80, rank: 5, trend: 'up' },
  ]);

  const [recentActivities] = useState([
    {
      type: 'upload',
      title: 'Uploaded student performance data',
      time: '2 hours ago',
      status: 'success',
    },
    {
      type: 'analysis',
      title: 'Generated skill gap analysis report',
      time: '1 day ago',
      status: 'success',
    },
    {
      type: 'student',
      title: 'Added 5 new students to the system',
      time: '2 days ago',
      status: 'success',
    },
    {
      type: 'report',
      title: 'Monthly department report generated',
      time: '3 days ago',
      status: 'success',
    },
  ]);

  const [alerts] = useState([
    {
      type: 'warning',
      title: 'Low performance in System Design',
      description: 'Average score below 70%',
      count: 45,
    },
    {
      type: 'info',
      title: 'New students onboarded',
      description: '10 students added this week',
      count: 10,
    },
    {
      type: 'success',
      title: 'Improvement in Web Development',
      description: 'Average score increased by 5%',
      count: 0,
    },
  ]);

  const skills = ['DSA', 'DBMS', 'Web Dev', 'Algorithms', 'System Design'];
  const students = ['Student 1', 'Student 2', 'Student 3', 'Student 4', 'Student 5', 'Student 6', 'Student 7', 'Student 8', 'Student 9', 'Student 10'];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'upload': return Database;
      case 'analysis': return Brain;
      case 'student': return Users;
      case 'report': return BookOpen;
      default: return CheckCircle;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'warning': return 'warning';
      case 'info': return 'primary';
      case 'success': return 'success';
      default: return 'primary';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Coordinator Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Department overview and student performance analytics
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <span className="ml-4 text-gray-600 dark:text-gray-400">Loading statistics...</span>
          </div>
        )}

        {/* Stats Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Students"
              value={departmentStats.totalStudents}
              icon={Users}
              color="primary"
              trend="active students"
              trendValue={roleStats.find(r => r.role === 'STUDENT') ? `${roleStats.find(r => r.role === 'STUDENT').count} enrolled` : '0 enrolled'}
            />
            <StatCard
              title="Average Skill Score"
              value={`${departmentStats.averageSkillScore}%`}
              icon={TrendingUp}
              color="success"
              trend="department average"
              trendValue="+3% improvement"
            />
            <StatCard
              title="Strongest Skill"
              value={departmentStats.strongestSkill}
              icon={Award}
              color="success"
              description="Best performing area"
            />
            <StatCard
              title="Needs Improvement"
              value={departmentStats.weakestSkill}
              icon={AlertTriangle}
              color="warning"
              description="Focus area"
            />
          </div>
        )}

        {/* Performance Trends */}
        {!loading && performanceData.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Monthly Performance Trends
              </h3>
              <LineChartComponent
                data={performanceData}
                lines={[
                  { dataKey: 'avgScore', name: 'Average Score' },
                  { dataKey: 'students', name: 'Active Students' },
                ]}
                height={250}
                curved={true}
              />
            </div>

            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Skill Distribution
              </h3>
              <PieChartComponent
                data={skillDistribution}
                height={250}
                label={true}
              />
            </div>
          </div>
        )}

        {/* Department Comparison */}
        {!loading && departmentComparison.length > 0 && (
          <div className="card mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Department Comparison
            </h3>
            <BarChartComponent
              data={departmentComparison}
              bars={[
                { dataKey: 'avgScore', name: 'Average Score' },
                { dataKey: 'students', name: 'Number of Students' },
              ]}
              height={300}
            />
          </div>
        )}

        {/* Role Statistics */}
        {!loading && roleStats.length > 0 && (
          <div className="card mb-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              User Role Distribution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {roleStats.map((role, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {role.role}
                    </span>
                    <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                      {role.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Student Skill Matrix */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Student-Skill Performance Matrix
          </h3>
          <HeatMapGrid
            data={studentSkillMatrix}
            xAxisLabels={skills}
            yAxisLabels={students}
            height={400}
            cellSize={35}
          />
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
                        Rank #{student.rank}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {student.score}%
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {student.trend === 'up' ? '↗️' : student.trend === 'down' ? '↘️' : '→'} 
                      {student.trend === 'up' ? ' Improving' : student.trend === 'down' ? ' Declining' : ' Stable'}
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
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Alerts and Notifications */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Alerts & Notifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 rounded-lg border border-${getAlertColor(alert.type)}-200 dark:border-${getAlertColor(alert.type)}-800 bg-${getAlertColor(alert.type)}-50 dark:bg-${getAlertColor(alert.type)}-900/20`}>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className={`w-5 h-5 text-${getAlertColor(alert.type)}-600 dark:text-${getAlertColor(alert.type)}-400 mt-0.5`} />
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      {alert.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {alert.description}
                    </p>
                    {alert.count > 0 && (
                      <span className={`inline-block mt-2 text-xs px-2 py-1 rounded-full bg-${getAlertColor(alert.type)}-100 text-${getAlertColor(alert.type)}-600 dark:bg-${getAlertColor(alert.type)}-900/20 dark:text-${getAlertColor(alert.type)}-400`}>
                        {alert.count} {alert.count === 1 ? 'item' : 'items'}
                      </span>
                    )}
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
              <Database className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Upload Data</p>
            </button>
            <button className="p-4 bg-success-50 dark:bg-success-900/20 rounded-lg hover:bg-success-100 dark:hover:bg-success-900/30 transition-colors duration-200">
              <Brain className="w-6 h-6 text-success-600 dark:text-success-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Skill Analysis</p>
            </button>
            <button className="p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg hover:bg-warning-100 dark:hover:bg-warning-900/30 transition-colors duration-200">
              <BookOpen className="w-6 h-6 text-warning-600 dark:text-warning-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Generate Reports</p>
            </button>
            <button className="p-4 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-900/30 transition-colors duration-200">
              <Users className="w-6 h-6 text-secondary-600 dark:text-secondary-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Manage Students</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoordinatorDashboard;
