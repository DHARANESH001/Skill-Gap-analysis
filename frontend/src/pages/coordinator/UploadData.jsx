import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import FileUpload from '../../components/coordinator/FileUpload';
import StatCard from '../../components/common/StatCard';
import { 
  Database, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Users,
  FileText,
  Download,
  Eye
} from 'lucide-react';
import toast from 'react-hot-toast';

const UploadData = () => {
  const { user } = useAuth();
  
  const [uploadStats, setUploadStats] = useState({
    totalFiles: 0,
    successfulUploads: 0,
    failedUploads: 0,
    totalRecords: 0,
  });

  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: 'student_performance_june.csv',
      uploadDate: '2024-06-15',
      records: 150,
      status: 'completed',
      size: '2.3 MB',
    },
    {
      id: 2,
      name: 'midterm_results.xlsx',
      uploadDate: '2024-06-10',
      records: 145,
      status: 'completed',
      size: '1.8 MB',
    },
    {
      id: 3,
      name: 'skill_assessment_may.csv',
      uploadDate: '2024-05-28',
      records: 142,
      status: 'completed',
      size: '2.1 MB',
    },
  ]);

  const [dataPreview] = useState([
    {
      id: 'CS001',
      name: 'John Doe',
      email: 'john@example.com',
      department: 'Computer Science',
      semester: '3',
      dsaScore: 85,
      dbmsScore: 72,
      webScore: 78,
      algorithmScore: 68,
      systemDesignScore: 65,
    },
    {
      id: 'CS002',
      name: 'Jane Smith',
      email: 'jane@example.com',
      department: 'Computer Science',
      semester: '3',
      dsaScore: 78,
      dbmsScore: 85,
      webScore: 72,
      algorithmScore: 75,
      systemDesignScore: 70,
    },
    {
      id: 'CS003',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      department: 'Computer Science',
      semester: '3',
      dsaScore: 92,
      dbmsScore: 88,
      webScore: 85,
      algorithmScore: 90,
      systemDesignScore: 82,
    },
  ]);

  const handleFileUpload = (file) => {
    // Update stats
    setUploadStats(prev => ({
      ...prev,
      totalFiles: prev.totalFiles + 1,
      successfulUploads: prev.successfulUploads + 1,
      totalRecords: prev.totalRecords + 50, // Simulated record count
    }));

    // Add to uploaded files list
    const newFile = {
      id: Date.now(),
      name: file.name,
      uploadDate: new Date().toISOString().split('T')[0],
      records: Math.floor(Math.random() * 50) + 100,
      status: 'completed',
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
    };

    setUploadedFiles(prev => [newFile, ...prev]);
    toast.success('File processed and data updated successfully!');
  };

  const downloadSampleData = () => {
    const csvContent = [
      'Student ID,Name,Email,Department,Semester,DSA Score,DBMS Score,Web Score,Algorithm Score,System Design Score',
      'CS001,John Doe,john@example.com,Computer Science,3,85,72,78,68,65',
      'CS002,Jane Smith,jane@example.com,Computer Science,3,78,85,72,75,70',
      'CS003,Bob Johnson,bob@example.com,Computer Science,3,92,88,85,90,82',
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_student_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Sample data downloaded!');
  };

  const viewFileDetails = (fileId) => {
    toast.success(`Viewing details for file ${fileId}`);
  };

  const deleteFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    toast.success('File deleted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Upload Student Data
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload and manage student performance data files
          </p>
        </div>

        {/* Upload Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Files"
            value={uploadStats.totalFiles}
            icon={FileText}
            color="primary"
          />
          <StatCard
            title="Successful Uploads"
            value={uploadStats.successfulUploads}
            icon={CheckCircle}
            color="success"
          />
          <StatCard
            title="Failed Uploads"
            value={uploadStats.failedUploads}
            icon={AlertTriangle}
            color="danger"
          />
          <StatCard
            title="Total Records"
            value={uploadStats.totalRecords}
            icon={Users}
            color="warning"
          />
        </div>

        {/* File Upload Component */}
        <div className="mb-8">
          <FileUpload onFileUpload={handleFileUpload} />
        </div>

        {/* Data Preview */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Data Preview
            </h3>
            <button
              onClick={downloadSampleData}
              className="btn btn-secondary flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Sample</span>
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Student ID
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Department
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Semester
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    DSA
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    DBMS
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Web
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Algorithms
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    System Design
                  </th>
                </tr>
              </thead>
              <tbody>
                {dataPreview.map((student, index) => (
                  <tr key={index} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4 text-sm font-medium text-gray-900 dark:text-white">
                      {student.id}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">
                      {student.name}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {student.email}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {student.department}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {student.semester}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.dsaScore >= 80 ? 'bg-success-100 text-success-600' :
                        student.dsaScore >= 60 ? 'bg-warning-100 text-warning-600' :
                        'bg-danger-100 text-danger-600'
                      }`}>
                        {student.dsaScore}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.dbmsScore >= 80 ? 'bg-success-100 text-success-600' :
                        student.dbmsScore >= 60 ? 'bg-warning-100 text-warning-600' :
                        'bg-danger-100 text-danger-600'
                      }`}>
                        {student.dbmsScore}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.webScore >= 80 ? 'bg-success-100 text-success-600' :
                        student.webScore >= 60 ? 'bg-warning-100 text-warning-600' :
                        'bg-danger-100 text-danger-600'
                      }`}>
                        {student.webScore}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.algorithmScore >= 80 ? 'bg-success-100 text-success-600' :
                        student.algorithmScore >= 60 ? 'bg-warning-100 text-warning-600' :
                        'bg-danger-100 text-danger-600'
                      }`}>
                        {student.algorithmScore}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.systemDesignScore >= 80 ? 'bg-success-100 text-success-600' :
                        student.systemDesignScore >= 60 ? 'bg-warning-100 text-warning-600' :
                        'bg-danger-100 text-danger-600'
                      }`}>
                        {student.systemDesignScore}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Uploaded Files History */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Upload History
          </h3>
          
          {uploadedFiles.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                      File Name
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Upload Date
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Records
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                      Size
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
                  {uploadedFiles.map((file) => (
                    <tr key={file.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Database className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {file.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {file.uploadDate}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {file.records}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                        {file.size}
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-600 dark:bg-success-900/20 dark:text-success-400">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {file.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => viewFileDetails(file.id)}
                            className="p-1 text-gray-500 hover:text-primary-600 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteFile(file.id)}
                            className="p-1 text-gray-500 hover:text-danger-600 transition-colors"
                            title="Delete File"
                          >
                            <AlertTriangle className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No files uploaded yet. Upload your first file to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadData;
