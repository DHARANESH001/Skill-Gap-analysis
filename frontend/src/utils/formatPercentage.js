/**
 * Format number as percentage
 * @param {number} value - Value to format
 * @param {number} decimals - Number of decimal places (default: 0)
 * @returns {string} Formatted percentage string
 */
export const formatPercentage = (value, decimals = 0) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0%';
  }
  
  const formattedValue = value.toFixed(decimals);
  return `${formattedValue}%`;
};

/**
 * Format number with commas
 * @param {number} value - Value to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (value) => {
  if (typeof value !== 'number' || isNaN(value)) {
    return '0';
  }
  
  return value.toLocaleString();
};

/**
 * Format currency
 * @param {number} value - Value to format
 * @param {string} currency - Currency symbol (default: '$')
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = '$') => {
  if (typeof value !== 'number' || isNaN(value)) {
    return `${currency}0`;
  }
  
  const formattedValue = value.toFixed(2);
  return `${currency}${formatNumber(parseFloat(formattedValue))}`;
};

/**
 * Format file size
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted file size string
 */
export const formatFileSize = (bytes) => {
  if (typeof bytes !== 'number' || isNaN(bytes)) {
    return '0 B';
  }
  
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;
  
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  
  return `${size.toFixed(1)} ${units[unitIndex]}`;
};

/**
 * Format date
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type ('short', 'medium', 'long', 'full')
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'medium') => {
  const dateObj = new Date(date);
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  const options = {
    short: { month: 'short', day: 'numeric', year: 'numeric' },
    medium: { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' },
    long: { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' },
    full: { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' },
  };
  
  return dateObj.toLocaleDateString('en-US', options[format] || options.medium);
};

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {Date|string} date - Date to format
 * @returns {string} Relative time string
 */
export const formatRelativeTime = (date) => {
  const dateObj = new Date(date);
  const now = new Date();
  const diffMs = now - dateObj;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);
  
  if (diffSeconds < 60) {
    return 'just now';
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
  } else if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffDays < 7) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  } else if (diffWeeks < 4) {
    return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
  } else if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  } else {
    return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
  }
};

/**
 * Format duration in seconds to human readable format
 * @param {number} seconds - Duration in seconds
 * @returns {string} Formatted duration string
 */
export const formatDuration = (seconds) => {
  if (typeof seconds !== 'number' || isNaN(seconds)) {
    return '0s';
  }
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  const parts = [];
  
  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`);
  }
  if (remainingSeconds > 0 || parts.length === 0) {
    parts.push(`${remainingSeconds}s`);
  }
  
  return parts.join(' ');
};

/**
 * Format score with color indicator
 * @param {number} score - Score value (0-100)
 * @returns {Object} Score with color information
 */
export const formatScore = (score) => {
  if (typeof score !== 'number' || isNaN(score)) {
    return { value: '0', color: 'gray', percentage: 0 };
  }
  
  const clampedScore = Math.max(0, Math.min(100, score));
  let color = 'gray';
  
  if (clampedScore >= 80) {
    color = 'green';
  } else if (clampedScore >= 60) {
    color = 'blue';
  } else if (clampedScore >= 40) {
    color = 'yellow';
  } else {
    color = 'red';
  }
  
  return {
    value: clampedScore.toString(),
    color,
    percentage: clampedScore,
  };
};

/**
 * Format phone number
 * @param {string} phone - Phone number string
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  if (!phone || typeof phone !== 'string') {
    return '';
  }
  
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid phone number
  if (cleaned.length < 10) {
    return phone;
  }
  
  // Format as (XXX) XXX-XXXX for US numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  // Format with country code for longer numbers
  if (cleaned.length > 10) {
    const countryCode = cleaned.slice(0, cleaned.length - 10);
    const mainNumber = cleaned.slice(-10);
    return `+${countryCode} (${mainNumber.slice(0, 3)}) ${mainNumber.slice(3, 6)}-${mainNumber.slice(6)}`;
  }
  
  return phone;
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
  if (!text || typeof text !== 'string') {
    return '';
  }
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return text.slice(0, maxLength - 3) + '...';
};

/**
 * Format array as comma-separated string
 * @param {Array} array - Array to format
 * @param {number} maxItems - Maximum items to show
 * @returns {string} Formatted string
 */
export const formatArray = (array, maxItems = 3) => {
  if (!Array.isArray(array) || array.length === 0) {
    return '';
  }
  
  if (array.length <= maxItems) {
    return array.join(', ');
  }
  
  const shown = array.slice(0, maxItems);
  const remaining = array.length - maxItems;
  return `${shown.join(', ')} and ${remaining} more`;
};

/**
 * Format change with direction indicator
 * @param {number} change - Change value
 * @param {boolean} showPercentage - Show as percentage
 * @returns {Object} Formatted change with direction
 */
export const formatChange = (change, showPercentage = false) => {
  if (typeof change !== 'number' || isNaN(change)) {
    return { value: '0', direction: 'neutral', color: 'gray' };
  }
  
  const isPositive = change > 0;
  const isNegative = change < 0;
  const absoluteValue = Math.abs(change);
  
  let direction = 'neutral';
  let color = 'gray';
  
  if (isPositive) {
    direction = 'up';
    color = 'green';
  } else if (isNegative) {
    direction = 'down';
    color = 'red';
  }
  
  const formattedValue = showPercentage 
    ? formatPercentage(absoluteValue)
    : formatNumber(absoluteValue);
  
  return {
    value: formattedValue,
    direction,
    color,
    isPositive,
    isNegative,
    rawValue: change,
  };
};

export default {
  formatPercentage,
  formatNumber,
  formatCurrency,
  formatFileSize,
  formatDate,
  formatRelativeTime,
  formatDuration,
  formatScore,
  formatPhoneNumber,
  truncateText,
  formatArray,
  formatChange,
};
