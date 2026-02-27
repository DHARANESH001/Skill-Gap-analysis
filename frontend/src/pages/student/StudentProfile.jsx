import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/common/StatCard';
import ProgressBar from '../../components/common/ProgressBar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Award, 
  Target, 
  TrendingUp,
  BookOpen,
  Code,
  Zap,
  Trophy,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';

const StudentProfile = () => {
  const { user } = useAuth();
  
  const [profileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 234 567 8900',
    department: 'Computer Science',
    year: '3rd Year',
    rollNumber: 'CS2021001',
    joinDate: 'September 2021',
    location: 'New York, USA',
  });

  const [academicStats] = useState({
    gpa: 3.8,
    attendance: 92,
    assignments: 45,
    projects: 8,
  });

  const [codingStats] = useState({
    totalSubmissions: 342,
    successRate: 78,
    currentStreak: 12,
    longestStreak: 28,
    rank: 12,
    totalProblems: 450,
  });

  const [achievements] = useState([
    {
      title: 'Problem Solver',
      description: 'Solved 100+ problems',
      icon: Trophy,
      date: 'March 2024',
      color: 'warning',
    },
    {
      title: 'Consistent Learner',
      description: '30-day streak',
      icon: Zap,
      date: 'February 2024',
      color: 'success',
    },
    {
      title: 'Top Performer',
      description: 'Top 10% in department',
      icon: Star,
      date: 'January 2024',
      color: 'primary',
    },
  ]);

  const [skills] = useState([
    { name: 'JavaScript', level: 85, category: 'Programming' },
    { name: 'Python', level: 78, category: 'Programming' },
    { name: 'React', level: 80, category: 'Web Development' },
    { name: 'Node.js', level: 72, category: 'Web Development' },
    { name: 'SQL', level: 68, category: 'Database' },
    { name: 'MongoDB', level: 65, category: 'Database' },
  ]);

  const [recentActivity] = useState([
    {
      type: 'submission',
      title: 'Solved Binary Search Problem',
      time: '2 hours ago',
      status: 'success',
    },
    {
      type: 'course',
      title: 'Completed Advanced React Module',
      time: '1 day ago',
      status: 'success',
    },
    {
      type: 'submission',
      title: 'Attempted Dynamic Programming',
      time: '2 days ago',
      status: 'failed',
    },
    {
      type: 'achievement',
      title: 'Earned "Problem Solver" Badge',
      time: '3 days ago',
      status: 'success',
    },
  ]);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'submission': return Code;
      case 'course': return BookOpen;
      case 'achievement': return Award;
      default: return CheckCircle;
    }
  };

  const getStatusColor = (status) => {
    return status === 'success' ? 'text-success-600' : 'text-danger-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Student Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal information and track your progress
          </p>
        </div>

        {/* Profile Card */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {profileData.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {profileData.joinDate}</span>
                </div>
              </div>
            </div>
            <button className="btn btn-primary">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Academic Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Academic Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Department</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{profileData.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Year</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{profileData.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Roll Number</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{profileData.rollNumber}</span>
              </div>
              <hr className="border-gray-200 dark:border-gray-700" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">GPA</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{academicStats.gpa}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Attendance</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{academicStats.attendance}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Assignments</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{academicStats.assignments}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Projects</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{academicStats.projects}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coding Statistics */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Coding Statistics
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Submissions</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{codingStats.totalSubmissions}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Success Rate</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{codingStats.successRate}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Streak</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{codingStats.currentStreak} days</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Department Rank</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">#{codingStats.rank}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Overall Progress</span>
                  <span className="text-gray-900 dark:text-white">
                    {Math.round((codingStats.totalSubmissions / codingStats.totalProblems) * 100)}%
                  </span>
                </div>
                <ProgressBar
                  value={(codingStats.totalSubmissions / codingStats.totalProblems) * 100}
                  color="success"
                  showLabel={false}
                />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600 dark:text-gray-400">Success Rate</span>
                  <span className="text-gray-900 dark:text-white">{codingStats.successRate}%</span>
                </div>
                <ProgressBar
                  value={codingStats.successRate}
                  color="primary"
                  showLabel={false}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Skills Overview */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Skills Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {skill.name}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      {skill.category}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {skill.level}%
                  </span>
                </div>
                <ProgressBar
                  value={skill.level}
                  color={skill.level >= 80 ? 'success' : skill.level >= 60 ? 'warning' : 'danger'}
                  showLabel={false}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Achievements */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Achievements
            </h3>
            <div className="space-y-3">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className={`p-2 rounded-lg bg-${achievement.color}-100 dark:bg-${achievement.color}-900/20`}>
                      <Icon className={`w-5 h-5 text-${achievement.color}-600 dark:text-${achievement.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {achievement.description} • {achievement.date}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => {
                const Icon = getActivityIcon(activity.type);
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon className={`w-5 h-5 mt-0.5 ${getStatusColor(activity.status)}`} />
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

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Learning Hours"
            value="248"
            icon={Clock}
            color="primary"
            description="This month"
          />
          <StatCard
            title="Completed Courses"
            value="12"
            icon={BookOpen}
            color="success"
            description="Total courses"
          />
          <StatCard
            title="Certificates"
            value="5"
            icon={Award}
            color="warning"
            description="Earned certificates"
          />
          <StatCard
            title="Study Streak"
            value={`${codingStats.currentStreak} days`}
            icon={TrendingUp}
            color="success"
            description="Current streak"
          />
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
