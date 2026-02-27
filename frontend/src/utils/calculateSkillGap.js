import { PERFORMANCE_LEVELS } from './constants';

/**
 * Calculate skill gap between required and current skill levels
 * @param {number} required - Required skill level (0-100)
 * @param {number} current - Current skill level (0-100)
 * @returns {Object} Gap analysis result
 */
export const calculateSkillGap = (required, current) => {
  const gap = Math.max(0, required - current);
  const gapPercentage = (gap / required) * 100;
  
  let priority = 'low';
  if (gapPercentage >= 30) {
    priority = 'high';
  } else if (gapPercentage >= 15) {
    priority = 'medium';
  }

  return {
    required,
    current,
    gap,
    gapPercentage: Math.round(gapPercentage),
    priority,
    status: getGapStatus(gapPercentage),
  };
};

/**
 * Get gap status based on percentage
 * @param {number} gapPercentage - Gap percentage
 * @returns {string} Gap status
 */
const getGapStatus = (gapPercentage) => {
  if (gapPercentage >= 30) return 'critical';
  if (gapPercentage >= 20) return 'high';
  if (gapPercentage >= 10) return 'medium';
  if (gapPercentage >= 5) return 'low';
  return 'minimal';
};

/**
 * Calculate overall skill gap for multiple skills
 * @param {Array} skills - Array of skill objects with required and current values
 * @returns {Object} Overall gap analysis
 */
export const calculateOverallSkillGap = (skills) => {
  if (!skills || skills.length === 0) {
    return {
      averageGap: 0,
      criticalGaps: 0,
      highGaps: 0,
      mediumGaps: 0,
      lowGaps: 0,
      totalSkills: 0,
      improvementPotential: 0,
    };
  }

  const gaps = skills.map(skill => calculateSkillGap(skill.required, skill.current));
  
  const averageGap = gaps.reduce((sum, gap) => sum + gap.gapPercentage, 0) / gaps.length;
  
  const criticalGaps = gaps.filter(gap => gap.priority === 'high' && gap.gapPercentage >= 30).length;
  const highGaps = gaps.filter(gap => gap.priority === 'high' && gap.gapPercentage >= 20).length;
  const mediumGaps = gaps.filter(gap => gap.priority === 'medium').length;
  const lowGaps = gaps.filter(gap => gap.priority === 'low').length;

  const improvementPotential = Math.round(100 - averageGap);

  return {
    averageGap: Math.round(averageGap),
    criticalGaps,
    highGaps,
    mediumGaps,
    lowGaps,
    totalSkills: skills.length,
    improvementPotential,
    skillGaps: gaps,
  };
};

/**
 * Get skill improvement recommendations
 * @param {Object} gapAnalysis - Result from calculateOverallSkillGap
 * @returns {Array} Array of recommendations
 */
export const getSkillRecommendations = (gapAnalysis) => {
  const recommendations = [];
  
  if (gapAnalysis.criticalGaps > 0) {
    recommendations.push({
      type: 'critical',
      title: 'Address Critical Skill Gaps',
      description: `Focus on ${gapAnalysis.criticalGaps} critical skill areas that need immediate attention.`,
      priority: 'high',
      estimatedImprovement: 25,
      timeframe: '4-6 weeks',
    });
  }

  if (gapAnalysis.averageGap > 20) {
    recommendations.push({
      type: 'comprehensive',
      title: 'Comprehensive Training Program',
      description: 'Implement a structured training program to address multiple skill gaps.',
      priority: 'high',
      estimatedImprovement: 30,
      timeframe: '8-10 weeks',
    });
  }

  if (gapAnalysis.mediumGaps > gapAnalysis.lowGaps) {
    recommendations.push({
      type: 'targeted',
      title: 'Targeted Skill Workshops',
      description: `Conduct focused workshops for ${gapAnalysis.mediumGaps} medium-priority skill areas.`,
      priority: 'medium',
      estimatedImprovement: 15,
      timeframe: '3-4 weeks',
    });
  }

  if (gapAnalysis.improvementPotential > 70) {
    recommendations.push({
      type: 'potential',
      title: 'High Improvement Potential',
      description: 'With focused training, significant improvement is achievable.',
      priority: 'medium',
      estimatedImprovement: gapAnalysis.improvementPotential - 50,
      timeframe: '6-8 weeks',
    });
  }

  return recommendations;
};

/**
 * Calculate skill trend based on historical data
 * @param {Array} historicalData - Array of historical skill data
 * @returns {Object} Trend analysis
 */
export const calculateSkillTrend = (historicalData) => {
  if (!historicalData || historicalData.length < 2) {
    return {
      trend: 'stable',
      change: 0,
      direction: 'neutral',
    };
  }

  const latest = historicalData[historicalData.length - 1];
  const previous = historicalData[historicalData.length - 2];
  
  const change = latest.score - previous.score;
  const changePercentage = (change / previous.score) * 100;
  
  let trend = 'stable';
  let direction = 'neutral';
  
  if (changePercentage > 5) {
    trend = 'improving';
    direction = 'up';
  } else if (changePercentage < -5) {
    trend = 'declining';
    direction = 'down';
  }

  return {
    trend,
    change: Math.round(changePercentage),
    direction,
    absoluteChange: change,
  };
};

/**
 * Get performance level based on score
 * @param {number} score - Performance score (0-100)
 * @returns {Object} Performance level info
 */
export const getPerformanceLevel = (score) => {
  for (const [level, config] of Object.entries(PERFORMANCE_LEVELS)) {
    if (score >= config.min && score <= config.max) {
      return {
        level: level.toLowerCase(),
        color: config.color,
        min: config.min,
        max: config.max,
      };
    }
  }
  
  return {
    level: 'poor',
    color: 'danger',
    min: 0,
    max: 39,
  };
};

/**
 * Calculate skill mastery percentage
 * @param {Array} skills - Array of skill objects
 * @returns {number} Mastery percentage
 */
export const calculateSkillMastery = (skills) => {
  if (!skills || skills.length === 0) return 0;
  
  const totalScore = skills.reduce((sum, skill) => sum + skill.current, 0);
  const maxPossibleScore = skills.reduce((sum, skill) => sum + skill.required, 0);
  
  return Math.round((totalScore / maxPossibleScore) * 100);
};

/**
 * Get skill improvement suggestions
 * @param {Object} skillGap - Individual skill gap analysis
 * @returns {Array} Array of suggestions
 */
export const getSkillImprovementSuggestions = (skillGap) => {
  const suggestions = [];
  
  if (skillGap.gapPercentage >= 30) {
    suggestions.push({
      type: 'intensive',
      title: 'Intensive Training Required',
      description: 'This skill requires focused and intensive training to bridge the significant gap.',
      resources: ['Expert mentorship', 'Hands-on projects', 'Regular assessments'],
    });
  }

  if (skillGap.gapPercentage >= 15) {
    suggestions.push({
      type: 'practice',
      title: 'Increase Practice Frequency',
      description: 'Regular practice and application of concepts will help improve this skill.',
      resources: ['Daily exercises', 'Peer learning groups', 'Online tutorials'],
    });
  }

  if (skillGap.current < 50) {
    suggestions.push({
      type: 'foundation',
      title: 'Focus on Fundamentals',
      description: 'Start with basic concepts and gradually build up to advanced topics.',
      resources: ['Beginner courses', 'Textbook study', 'Video tutorials'],
    });
  }

  return suggestions;
};

export default {
  calculateSkillGap,
  calculateOverallSkillGap,
  getSkillRecommendations,
  calculateSkillTrend,
  getPerformanceLevel,
  calculateSkillMastery,
  getSkillImprovementSuggestions,
};
