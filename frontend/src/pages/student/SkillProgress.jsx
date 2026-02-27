import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/common/StatCard';
import ProgressBar from '../../components/common/ProgressBar';
import RadarChartComponent from '../../components/charts/RadarChartComponent';
import LineChartComponent from '../../components/charts/LineChartComponent';
import { 
  TrendingUp, 
  Target, 
  Clock, 
  Award, 
  BookOpen,
  Code,
  Database,
  Globe,
  Brain,
  Zap,
  CheckCircle
} from 'lucide-react';

const SkillProgress = () => {
  const { user } = useAuth();
  
  const [skillStats] = useState({
    totalSkills: 12,
    masteredSkills: 5,
    inProgressSkills: 4,
    needsImprovement: 3,
  });

  const [skillCategories] = useState([
    { category: 'Programming Languages', progress: 85, skills: 15 },
    { category: 'Data Structures', progress: 78, skills: 12 },
    { category: 'Algorithms', progress: 72, skills: 18 },
    { category: 'Databases', progress: 68, skills: 8 },
    { category: 'Web Development', progress: 80, skills: 10 },
    { category: 'System Design', progress: 65, skills: 6 },
  ]);

  const [radarData] = useState([
    { subject: 'Problem Solving', current: 85, target: 90 },
    { subject: 'Code Quality', current: 78, target: 85 },
    { subject: 'Efficiency', current: 72, target: 80 },
    { subject: 'Documentation', current: 68, target: 75 },
    { subject: 'Testing', current: 75, target: 85 },
    { subject: 'Debugging', current: 82, target: 90 },
  ]);

  const [progressHistory] = useState([
    { week: 'Week 1', overall: 65, practical: 70, theoretical: 60 },
    { week: 'Week 2', overall: 68, practical: 72, theoretical: 64 },
    { week: 'Week 3', overall: 70, practical: 75, theoretical: 65 },
    { week: 'Week 4', overall: 73, practical: 78, theoretical: 68 },
    { week: 'Week 5', overall: 75, practical: 80, theoretical: 70 },
    { week: 'Week 6', overall: 78, practical: 82, theoretical: 74 },
  ]);

  const [detailedSkills] = useState([
    {
      name: 'JavaScript',
      category: 'Programming Languages',
      level: 'Advanced',
      progress: 85,
      timeSpent: 120,
      problemsSolved: 145,
      lastPracticed: '2 days ago',
      icon: Globe,
      color: 'warning',
    },
    {
      name: 'Python',
      category: 'Programming Languages',
      level: 'Intermediate',
      progress: 72,
      timeSpent: 95,
      problemsSolved: 98,
      lastPracticed: '1 day ago',
      icon: Code,
      color: 'primary',
    },
    {
      name: 'SQL',
      category: 'Databases',
      level: 'Intermediate',
      progress: 68,
      timeSpent: 80,
      problemsSolved: 76,
      lastPracticed: '3 days ago',
      icon: Database,
      color: 'success',
    },
    {
      name: 'React',
      category: 'Web Development',
      level: 'Advanced',
      progress: 80,
      timeSpent: 110,
      problemsSolved: 89,
      lastPracticed: 'Today',
      icon: Globe,
      color: 'primary',
    },
    {
      name: 'Data Structures',
      category: 'Algorithms',
      level: 'Intermediate',
      progress: 75,
      timeSpent: 140,
      problemsSolved: 167,
      lastPracticed: 'Yesterday',
      icon: Brain,
      color: 'warning',
    },
  ]);

  const [learningGoals] = useState([
    {
      title: 'Master Advanced Algorithms',
      description: 'Complete advanced algorithm course',
      progress: 65,
      deadline: '2 weeks',
      priority: 'High',
    },
    {
      title: 'Build Full-Stack Project',
      description: 'Create a complete web application',
      progress: 40,
      deadline: '1 month',
      priority: 'Medium',
    },
    {
      title: 'System Design Preparation',
      description: 'Study system design patterns',
      progress: 25,
      deadline: '6 weeks',
      priority: 'Low',
    },
  ]);

  const getLevelColor = (level) => {
    switch (level) {
      case 'Advanced': return 'success';
      case 'Intermediate': return 'warning';
      case 'Beginner': return 'primary';
      default: return 'primary';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'primary';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Skill Progress
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your learning journey and skill development
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Skills"
            value={skillStats.totalSkills}
            icon={Target}
            color="primary"
          />
          <StatCard
            title="Mastered"
            value={skillStats.masteredSkills}
            icon={Award}
            color="success"
            trend="of total skills"
            trendValue={`${Math.round((skillStats.masteredSkills / skillStats.totalSkills) * 100)}%`}
          />
          <StatCard
            title="In Progress"
            value={skillStats.inProgressSkills}
            icon={TrendingUp}
            color="warning"
          />
          <StatCard
            title="Needs Improvement"
            value={skillStats.needsImprovement}
            icon={Clock}
            color="danger"
          />
        </div>

        {/* Skill Categories Progress */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Skill Categories Progress
          </h3>
          <div className="space-y-4">
            {skillCategories.map((category, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {category.category}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                      ({category.skills} skills)
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {category.progress}%
                  </span>
                </div>
                <ProgressBar
                  value={category.progress}
                  color={category.progress >= 80 ? 'success' : category.progress >= 60 ? 'warning' : 'danger'}
                  showLabel={false}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Skills Radar Chart */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Skills Overview
            </h3>
            <RadarChartComponent
              data={radarData}
              radars={[
                { dataKey: 'current', name: 'Current Level' },
                { dataKey: 'target', name: 'Target Level' },
              ]}
              height={300}
            />
          </div>

          {/* Progress History */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Progress History
            </h3>
            <LineChartComponent
              data={progressHistory}
              lines={[
                { dataKey: 'overall', name: 'Overall' },
                { dataKey: 'practical', name: 'Practical' },
                { dataKey: 'theoretical', name: 'Theoretical' },
              ]}
              height={300}
              curved={true}
            />
          </div>
        </div>

        {/* Detailed Skills */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Detailed Skills Breakdown
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Skill
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Level
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Progress
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Time Spent
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Problems
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Last Practice
                  </th>
                </tr>
              </thead>
              <tbody>
                {detailedSkills.map((skill, index) => {
                  const Icon = skill.icon;
                  return (
                    <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Icon className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {skill.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {skill.category}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-1 rounded-full bg-${getLevelColor(skill.level)}-100 text-${getLevelColor(skill.level)}-600 dark:bg-${getLevelColor(skill.level)}-900/20 dark:text-${getLevelColor(skill.level)}-400`}>
                          {skill.level}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <ProgressBar
                            value={skill.progress}
                            color={skill.color}
                            showLabel={false}
                            size="small"
                          />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {skill.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {skill.timeSpent}h
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {skill.problemsSolved}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {skill.lastPracticed}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Learning Goals */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Learning Goals
          </h3>
          <div className="space-y-4">
            {learningGoals.map((goal, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {goal.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {goal.description}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full bg-${getPriorityColor(goal.priority)}-100 text-${getPriorityColor(goal.priority)}-600 dark:bg-${getPriorityColor(goal.priority)}-900/20 dark:text-${getPriorityColor(goal.priority)}-400`}>
                    {goal.priority}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex-1">
                    <ProgressBar
                      value={goal.progress}
                      color="primary"
                      showLabel={false}
                    />
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>{goal.progress}%</span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{goal.deadline}</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillProgress;
