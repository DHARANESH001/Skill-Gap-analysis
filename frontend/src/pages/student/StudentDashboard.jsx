import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/common/StatCard';
import ProgressBar from '../../components/common/ProgressBar';
import LineChartComponent from '../../components/charts/LineChartComponent';
import PieChartComponent from '../../components/charts/PieChartComponent';
import BarChartComponent from '../../components/charts/BarChartComponent';
import { 
  Target, 
  TrendingUp, 
  Award, 
  AlertTriangle, 
  BookOpen, 
  Code,
  Database,
  Globe,
  Brain,
  Lightbulb
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProblemsSolved: 342,
    skillScore: 78,
    departmentRank: 12,
    performanceStatus: 'Good',
  });

  const [performanceData] = useState([
    { month: 'Jan', score: 65, problems: 45 },
    { month: 'Feb', score: 68, problems: 52 },
    { month: 'Mar', score: 72, problems: 48 },
    { month: 'Apr', score: 75, problems: 61 },
    { month: 'May', score: 78, problems: 58 },
    { month: 'Jun', score: 82, problems: 67 },
  ]);

  const [skillDistribution] = useState([
    { name: 'DSA', value: 85 },
    { name: 'DBMS', value: 72 },
    { name: 'Web Dev', value: 78 },
    { name: 'Algorithms', value: 68 },
    { name: 'System Design', value: 65 },
  ]);

  const [weeklyActivity] = useState([
    { day: 'Mon', problems: 8, hours: 3 },
    { day: 'Tue', problems: 12, hours: 4 },
    { day: 'Wed', problems: 6, hours: 2 },
    { day: 'Thu', problems: 15, hours: 5 },
    { day: 'Fri', problems: 10, hours: 3 },
    { day: 'Sat', problems: 18, hours: 6 },
    { day: 'Sun', problems: 14, hours: 4 },
  ]);

  const [subjectSkills] = useState([
    { subject: 'Data Structures', progress: 85, color: 'success' },
    { subject: 'Algorithms', progress: 68, color: 'warning' },
    { subject: 'Database Management', progress: 72, color: 'primary' },
    { subject: 'Web Development', progress: 78, color: 'success' },
    { subject: 'System Design', progress: 65, color: 'warning' },
  ]);

  const [weakSkills] = useState([
    { skill: 'Dynamic Programming', gap: 32, priority: 'High' },
    { skill: 'Graph Algorithms', gap: 28, priority: 'Medium' },
    { skill: 'Database Optimization', gap: 25, priority: 'Medium' },
  ]);

  const [suggestions] = useState([
    {
      title: 'Focus on Dynamic Programming',
      description: 'Practice more DP problems to improve your algorithmic thinking',
      icon: Brain,
      color: 'warning',
    },
    {
      title: 'Join Study Groups',
      description: 'Collaborate with peers to learn different approaches',
      icon: BookOpen,
      color: 'primary',
    },
    {
      title: 'Regular Practice',
      description: 'Maintain consistency with daily coding challenges',
      icon: Target,
      color: 'success',
    },
  ]);

  const getPerformanceColor = (status) => {
    switch (status) {
      case 'Excellent': return 'success';
      case 'Good': return 'primary';
      case 'Average': return 'warning';
      case 'Poor': return 'danger';
      default: return 'primary';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.name || 'Student'}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's your learning progress and performance overview
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Problems Solved"
            value={stats.totalProblemsSolved}
            icon={Target}
            color="primary"
            trend="vs last month"
            trendValue="+12%"
          />
          <StatCard
            title="Skill Score"
            value={`${stats.skillScore}%`}
            icon={TrendingUp}
            color="success"
            trend="improvement"
            trendValue="+5%"
          />
          <StatCard
            title="Department Rank"
            value={`#${stats.departmentRank}`}
            icon={Award}
            color="warning"
            trend="out of 150 students"
            trendValue="Top 8%"
          />
          <StatCard
            title="Performance Status"
            value={stats.performanceStatus}
            icon={AlertTriangle}
            color={getPerformanceColor(stats.performanceStatus)}
            description="Keep up the good work!"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Performance Trend */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Performance Trend
            </h3>
            <LineChartComponent
              data={performanceData}
              lines={[
                { dataKey: 'score', name: 'Skill Score' },
                { dataKey: 'problems', name: 'Problems Solved' },
              ]}
              height={250}
              curved={true}
            />
          </div>

          {/* Skill Distribution */}
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

        {/* Weekly Activity */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Weekly Activity
          </h3>
          <BarChartComponent
            data={weeklyActivity}
            bars={[
              { dataKey: 'problems', name: 'Problems Solved' },
              { dataKey: 'hours', name: 'Study Hours' },
            ]}
            height={250}
            stacked={false}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Subject-wise Skills */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Subject-wise Skills
            </h3>
            <div className="space-y-4">
              {subjectSkills.map((subject, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {subject.subject}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {subject.progress}%
                    </span>
                  </div>
                  <ProgressBar
                    value={subject.progress}
                    color={subject.color}
                    showLabel={false}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Weak Skills Alert */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Skills to Improve
            </h3>
            <div className="space-y-3">
              {weakSkills.map((skill, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-warning-50 dark:bg-warning-900/20 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-warning-600 dark:text-warning-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {skill.skill}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Gap: {skill.gap}% • Priority: {skill.priority}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-warning-600 dark:text-warning-400">
                    {skill.gap}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Suggestions */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            AI-Powered Suggestions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <div key={index} className="card hover:shadow-medium transition-shadow duration-200">
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg bg-${suggestion.color}-100 dark:bg-${suggestion.color}-900/20`}>
                      <Icon className={`w-5 h-5 text-${suggestion.color}-600 dark:text-${suggestion.color}-400`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                        {suggestion.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {suggestion.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors duration-200">
              <Code className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Practice Coding</p>
            </button>
            <button className="p-4 bg-success-50 dark:bg-success-900/20 rounded-lg hover:bg-success-100 dark:hover:bg-success-900/30 transition-colors duration-200">
              <BookOpen className="w-6 h-6 text-success-600 dark:text-success-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Study Materials</p>
            </button>
            <button className="p-4 bg-warning-50 dark:bg-warning-900/20 rounded-lg hover:bg-warning-100 dark:hover:bg-warning-900/30 transition-colors duration-200">
              <Database className="w-6 h-6 text-warning-600 dark:text-warning-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Mock Tests</p>
            </button>
            <button className="p-4 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg hover:bg-secondary-100 dark:hover:bg-secondary-900/30 transition-colors duration-200">
              <Lightbulb className="w-6 h-6 text-secondary-600 dark:text-secondary-400 mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">Get Help</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
