import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { formatDate, formatNumber } from './formatPercentage';

/**
 * Export data as CSV file
 * @param {Array} data - Array of objects to export
 * @param {string} filename - Name of the file
 * @param {Array} headers - Custom headers (optional)
 */
export const exportToCSV = (data, filename, headers = null) => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  const csvHeaders = headers || Object.keys(data[0]);
  const csvContent = [
    csvHeaders.join(','),
    ...data.map(row => 
      csvHeaders.map(header => {
        const value = row[header];
        // Handle values that might contain commas or quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value || '';
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export data as JSON file
 * @param {Array} data - Array of objects to export
 * @param {string} filename - Name of the file
 */
export const exportToJSON = (data, filename) => {
  if (!data || data.length === 0) {
    console.warn('No data to export');
    return;
  }

  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export HTML element as PDF
 * @param {string} elementId - ID of the element to export
 * @param {string} filename - Name of the file
 * @param {Object} options - PDF generation options
 */
export const exportToPDF = async (elementId, filename, options = {}) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID ${elementId} not found`);
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      ...options
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: options.orientation || 'portrait',
      unit: 'mm',
      format: options.format || 'a4'
    });

    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${filename}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};

/**
 * Generate and download skill gap analysis report
 * @param {Object} reportData - Report data object
 * @param {string} filename - Name of the file
 */
export const generateSkillGapReport = (reportData, filename = 'skill-gap-analysis') => {
  const pdf = new jsPDF();
  let yPosition = 20;

  // Helper function to add new page if needed
  const checkPageBreak = (requiredSpace = 10) => {
    if (yPosition > 270) {
      pdf.addPage();
      yPosition = 20;
    }
  };

  // Title
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Skill Gap Analysis Report', 20, yPosition);
  yPosition += 15;

  // Report metadata
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Generated: ${formatDate(new Date())}`, 20, yPosition);
  yPosition += 10;
  pdf.text(`Department: ${reportData.department || 'All Departments'}`, 20, yPosition);
  yPosition += 10;
  pdf.text(`Period: ${reportData.period || 'Last 6 Months'}`, 20, yPosition);
  yPosition += 20;

  // Executive Summary
  checkPageBreak(30);
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Executive Summary', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  const summary = [
    `Total Skills Analyzed: ${reportData.totalSkills || 0}`,
    `Critical Gaps: ${reportData.criticalGaps || 0}`,
    `Average Skill Gap: ${reportData.averageGap || 0}%`,
    `Improvement Potential: ${reportData.improvementPotential || 0}%`,
  ];

  summary.forEach(line => {
    checkPageBreak();
    pdf.text(line, 20, yPosition);
    yPosition += 7;
  });
  yPosition += 10;

  // Skill Gap Details
  if (reportData.skillGaps && reportData.skillGaps.length > 0) {
    checkPageBreak(40);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Skill Gap Details', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    
    reportData.skillGaps.forEach((skill, index) => {
      checkPageBreak(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${index + 1}. ${skill.skill}`, 20, yPosition);
      yPosition += 7;
      
      pdf.setFont('helvetica', 'normal');
      pdf.text(`   Required: ${skill.required}% | Current: ${skill.current}% | Gap: ${skill.gap}%`, 20, yPosition);
      yPosition += 7;
      pdf.text(`   Priority: ${skill.priority} | Status: ${skill.status}`, 20, yPosition);
      yPosition += 10;
    });
  }

  // Recommendations
  if (reportData.recommendations && reportData.recommendations.length > 0) {
    checkPageBreak(30);
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Recommendations', 20, yPosition);
    yPosition += 10;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    
    reportData.recommendations.forEach((rec, index) => {
      checkPageBreak(25);
      pdf.setFont('helvetica', 'bold');
      pdf.text(`${index + 1}. ${rec.title}`, 20, yPosition);
      yPosition += 7;
      
      pdf.setFont('helvetica', 'normal');
      const lines = pdf.splitTextToSize(rec.description, 170);
      lines.forEach(line => {
        checkPageBreak();
        pdf.text(`   ${line}`, 20, yPosition);
        yPosition += 5;
      });
      yPosition += 5;
    });
  }

  // Footer
  const pageCount = pdf.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    pdf.setPage(i);
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'italic');
    pdf.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
  }

  pdf.save(`${filename}.pdf`);
};

/**
 * Generate and download student performance report
 * @param {Object} studentData - Student data object
 * @param {string} filename - Name of the file
 */
export const generateStudentReport = (studentData, filename = 'student-performance') => {
  const pdf = new jsPDF();
  let yPosition = 20;

  // Title
  pdf.setFontSize(20);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Student Performance Report', 20, yPosition);
  yPosition += 15;

  // Student Information
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Student Name: ${studentData.name || 'N/A'}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Student ID: ${studentData.id || 'N/A'}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Department: ${studentData.department || 'N/A'}`, 20, yPosition);
  yPosition += 7;
  pdf.text(`Report Date: ${formatDate(new Date())}`, 20, yPosition);
  yPosition += 15;

  // Performance Summary
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Performance Summary', 20, yPosition);
  yPosition += 10;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  const performance = [
    `Total Problems Solved: ${formatNumber(studentData.totalProblems || 0)}`,
    `Skill Score: ${studentData.skillScore || 0}%`,
    `Department Rank: #${studentData.departmentRank || 'N/A'}`,
    `Performance Status: ${studentData.performanceStatus || 'N/A'}`,
  ];

  performance.forEach(line => {
    pdf.text(line, 20, yPosition);
    yPosition += 7;
  });

  // Save the PDF
  pdf.save(`${filename}.pdf`);
};

/**
 * Print HTML element
 * @param {string} elementId - ID of the element to print
 */
export const printElement = (elementId) => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with ID ${elementId} not found`);
    return;
  }

  const printWindow = window.open('', '_blank');
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print Report</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          table { border-collapse: collapse; width: 100%; margin: 20px 0; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          .no-print { display: none; }
        </style>
      </head>
      <body>
        ${element.innerHTML}
      </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.print();
  printWindow.close();
};

/**
 * Export chart as image
 * @param {string} chartId - ID of the chart element
 * @param {string} filename - Name of the file
 * @param {string} format - Image format ('png' or 'jpeg')
 */
export const exportChartAsImage = async (chartId, filename, format = 'png') => {
  const element = document.getElementById(chartId);
  if (!element) {
    console.error(`Chart element with ID ${chartId} not found`);
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      backgroundColor: '#ffffff',
      scale: 2,
    });

    const link = document.createElement('a');
    link.download = `${filename}.${format}`;
    link.href = canvas.toDataURL(`image/${format}`);
    link.click();
  } catch (error) {
    console.error('Error exporting chart:', error);
  }
};

export default {
  exportToCSV,
  exportToJSON,
  exportToPDF,
  generateSkillGapReport,
  generateStudentReport,
  printElement,
  exportChartAsImage,
};
