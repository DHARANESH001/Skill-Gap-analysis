import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/common/StatCard';
import ProgressBar from '../../components/common/ProgressBar';
import BarChartComponent from '../../components/charts/BarChartComponent';
import RadarChartComponent from '../../components/charts/RadarChartComponent';
import { 
  Target, 
  TrendingUp, 
  AlertTriangle, 
  Download,
  Brain,
  BookOpen,
  Code,
  Database,
  Globe,
  FileText,
  CheckCircle,
  X
} from 'lucide-react';
import toast from 'react-hot-toast';

const SkillGapAnalysis = () => {
  const { user } = useAuth();
  
  const [gapAnalysis] = useState({
    totalSkills: 5,
    criticalGaps: 2,
    averageGap: 28,
    improvementPotential: 72,
  });

  const [skillGaps] = useState([
    {
      skill: 'System Design',
      required: 85,
      current: 65,
      gap: 20,
      priority: 'High',
      affectedStudents: 45,
      trend: 'improving',
    },
    {
      skill: 'Dynamic Programming',
      required: 80,
      current: 55,
      gap: 25,
      priority: 'High',
      affectedStudents: 38,
      trend: 'stable',
    },
    {
      skill: 'Database Optimization',
      required: 75,
      current: 60,
      gap: 15,
      priority: 'Medium',
      affectedStudents: 32,
      trend: 'declining',
    },
    {
      skill: 'Cloud Computing',
      required: 70,
      current: 50,
      gap: 20,
      priority: 'Medium',
      affectedStudents: 28,
      trend: 'improving',
    },
    {
      skill: 'Machine Learning',
      required: 75,
      current: 58,
      gap: 17,
      priority: 'Low',
      affectedStudents: 22,
      trend: 'stable',
    },
  ]);

  const [departmentComparison] = useState([
    {
      department: 'Computer Science',
      systemDesign: { required: 85, current: 65, gap: 20 },
      dynamicProgramming: { required: 80, current: 55, gap: 25 },
      databaseOptimization: { required: 75, current: 60, gap: 15 },
      averageGap: 20,
    },
    {
      department: 'Information Technology',
      systemDesign: { required: 80, current: 70, gap: 10 },
      dynamicProgramming: { required: 75, current: 60, gap: 15 },
      databaseOptimization: { required: 70, current: 65, gap: 5 },
      averageGap: 10,
    },
    {
      department: 'Electronics',
      systemDesign: { required: 75, current: 55, gap: 20 },
      dynamicProgramming: { required: 70, current: 50, gap: 20 },
      databaseOptimization: { required: 65, current: 55, gap: 10 },
      averageGap: 17,
    },
  ]);

  const [improvementRecommendations] = useState([
    {
      skill: 'System Design',
      recommendation: 'Conduct weekly system design workshops and case study sessions',
      priority: 'High',
      estimatedImprovement: 15,
      timeframe: '8 weeks',
      resources: 'Workshop materials, industry expert sessions',
    },
    {
      skill: 'Dynamic Programming',
      recommendation: 'Implement progressive difficulty problem sets and peer learning groups',
      priority: 'High',
      estimatedImprovement: 20,
      timeframe: '6 weeks',
      resources: 'Online coding platforms, practice problems',
    },
    {
      skill: 'Database Optimization',
      recommendation: 'Hands-on database projects and query optimization exercises',
      priority: 'Medium',
      estimatedImprovement: 12,
      timeframe: '4 weeks',
      resources: 'Database servers, sample datasets',
    },
  ]);

  const [radarData] = useState([
    { skill: 'System Design', required: 85, current: 65, gap: 20 },
    { skill: 'Dynamic Programming', required: 80, current: 55, gap: 25 },
    { skill: 'Database Optimization', required: 75, current: 60, gap: 15 },
    { skill: 'Cloud Computing', required: 70, current: 50, gap: 20 },
    { skill: 'Machine Learning', required: 75, current: 58, gap: 17 },
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'danger';
      case 'Medium': return 'warning';
      case 'Low': return 'success';
      default: return 'primary';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return '📈';
      case 'declining': return '📉';
      default: return '➡️';
    }
  };

  const generateReport = () => {
    // Simulate report generation
    toast.success('Skill gap analysis report generated successfully!');
    
    // Create a simple text report
    const reportContent = `
SKILL GAP ANALYSIS REPORT
Generated: ${new Date().toLocaleDateString()}

EXECUTIVE SUMMARY:
- Total Skills Analyzed: ${gapAnalysis.totalSkills}
- Critical Gaps Identified: ${gapAnalysis.criticalGaps}
- Average Skill Gap: ${gapAnalysis.averageGap}%
- Improvement Potential: ${gapAnalysis.improvementPotential}%

DETAILED ANALYSIS:
${skillGaps.map(skill => `
${skill.skill}:
  Required Level: ${skill.required}%
  Current Level: ${skill.current}%
  Gap: ${skill.gap}%
  Priority: ${skill.priority}
  Affected Students: ${skill.affectedStudents}
  Trend: ${skill.trend}
`).join('\n')}

RECOMMENDATIONS:
${improvementRecommendations.map(rec => `
${rec.skill}:
  ${rec.recommendation}
  Priority: ${rec.priority}
  Estimated Improvement: ${rec.estimatedImprovement}%
  Timeframe: ${rec.timeframe}
`).join('\n')}
    `;

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'skill_gap_analysis_report.txt';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Skill Gap Analysis
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Identify and address skill gaps in your department
              </p>
            </div>
            <button
              onClick={generateReport}
              className="btn btn-primary flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Generate Report</span>
            </button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Skills Analyzed"
            value={gapAnalysis.totalSkills}
            icon={Target}
            color="primary"
          />
          <StatCard
            title="Critical Gaps"
            value={gapAnalysis.criticalGaps}
            icon={AlertTriangle}
            color="danger"
            description="Need immediate attention"
          />
          <StatCard
            title="Average Gap"
            value={`${gapAnalysis.averageGap}%`}
            icon={TrendingUp}
            color="warning"
            description="Across all skills"
          />
          <StatCard
            title="Improvement Potential"
            value={`${gapAnalysis.improvementPotential}%`}
            icon={Brain}
            color="success"
            description="With focused training"
          />
        </div>

        {/* Skill Gap Details */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Detailed Skill Gap Analysis
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Skill
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Required
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Current
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Gap
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Priority
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Affected Students
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Trend
                  </th>
                </tr>
              </thead>
              <tbody>
                {skillGaps.map((skill, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        {skill.skill.includes('System') && <Globe className="w-4 h-4 text-gray-500" />}
                        {skill.skill.includes('Dynamic') && <Code className="w-4 h-4 text-gray-500" />}
                        {skill.skill.includes('Database') && <Database className="w-4 h-4 text-gray-500" />}
                        {skill.skill.includes('Cloud') && <Brain className="w-4 h-4 text-gray-500" />}
                        {skill.skill.includes('Machine') && <BookOpen className="w-4 h-4 text-gray-500" />}
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {skill.skill}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {skill.required}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {skill.current}%
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <ProgressBar
                          value={skill.gap}
                          max={100}
                          color={skill.gap >= 20 ? 'danger' : skill.gap >= 10 ? 'warning' : 'success'}
                          showLabel={false}
                          size="small"
                        />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {skill.gap}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${getPriorityColor(skill.priority)}-100 text-${getPriorityColor(skill.priority)}-600 dark:bg-${getPriorityColor(skill.priority)}-900/20 dark:text-${getPriorityColor(skill.priority)}-400`}>
                        {skill.priority}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {skill.affectedStudents}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm">
                        {getTrendIcon(skill.trend)} {skill.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Radar Chart */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Skill Gap Visualization
            </h3>
            <RadarChartComponent
              data={radarData}
              radars={[
                { dataKey: 'required', name: 'Required Level' },
                { dataKey: 'current', name: 'Current Level' },
              ]}
              height={350}
            />
          </div>

          {/* Department Comparison */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Department Comparison
            </h3>
            <BarChartComponent
              data={departmentComparison}
              bars={[
                { dataKey: 'averageGap', name: 'Average Gap %' },
              ]}
              height={350}
              colors={['#ef4444']}
            />
          </div>
        </div>

        {/* Improvement Recommendations */}
        <div className="card mb-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Improvement Recommendations
          </h3>
          <div className="space-y-4">
            {improvementRecommendations.map((rec, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      {rec.skill}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {rec.recommendation}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${getPriorityColor(rec.priority)}-100 text-${getPriorityColor(rec.priority)}-600 dark:bg-${getPriorityColor(rec.priority)}-900/20 dark:text-${getPriorityColor(rec.priority)}-400`}>
                    {rec.priority} Priority
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Estimated Improvement:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {rec.estimatedImprovement}%
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Timeframe:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {rec.timeframe}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Resources:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">
                      {rec.resources}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Items */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Immediate Action Items
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-danger-600 dark:text-danger-400" />
                <h4 className="font-medium text-danger-900 dark:text-danger-100">
                  Critical Skills
                </h4>
              </div>
              <p className="text-sm text-danger-800 dark:text-danger-200 mb-3">
                System Design and Dynamic Programming need immediate attention
              </p>
              <button className="btn btn-danger btn-sm">
                Schedule Workshops
              </button>
            </div>
            
            <div className="p-4 bg-warning-50 dark:bg-warning-900/20 border border-warning-200 dark:border-warning-800 rounded-lg">
              <div className="flex items-center space-x-3 mb-2">
                <TrendingUp className="w-5 h-5 text-warning-600 dark:text-warning-400" />
                <h4 className="font-medium text-warning-900 dark:text-warning-100">
                  Monitor Progress
                </h4>
              </div>
              <p className="text-sm text-warning-800 dark:text-warning-200 mb-3">
                Set up weekly progress tracking for identified gaps
              </p>
              <button className="btn btn-warning btn-sm">
                Set Up Monitoring
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalysis;
