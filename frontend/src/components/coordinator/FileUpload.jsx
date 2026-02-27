import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';
import { Upload, FileText, X, CheckCircle, AlertCircle, Download } from 'lucide-react';

const FileUpload = ({ onFileUpload, acceptedFormats = ['.csv', '.xlsx', '.xls'] }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      progress: 0,
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
    },
    multiple: true,
  });

  const removeFile = (fileId) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const uploadFile = async (fileItem) => {
    setUploading(true);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => ({
        ...prev,
        [fileItem.id]: Math.min((prev[fileItem.id] || 0) + 10, 90)
      }));
    }, 200);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(progressInterval);
      setUploadProgress(prev => ({ ...prev, [fileItem.id]: 100 }));
      
      setFiles(prev => prev.map(f => 
        f.id === fileItem.id ? { ...f, status: 'completed' } : f
      ));
      
      toast.success(`${fileItem.file.name} uploaded successfully!`);
      
      if (onFileUpload) {
        onFileUpload(fileItem.file);
      }
    } catch (error) {
      clearInterval(progressInterval);
      setFiles(prev => prev.map(f => 
        f.id === fileItem.id ? { ...f, status: 'error' } : f
      ));
      toast.error(`Failed to upload ${fileItem.file.name}`);
    } finally {
      setUploading(false);
    }
  };

  const uploadAllFiles = async () => {
    const pendingFiles = files.filter(f => f.status === 'pending');
    
    for (const file of pendingFiles) {
      await uploadFile(file);
    }
  };

  const downloadTemplate = () => {
    // Create a sample CSV template
    const csvContent = "Student ID,Name,Email,Department,Semester,DSA Score,DBMS Score,Web Score,Algorithm Score,System Design Score\nCS001,John Doe,john@example.com,Computer Science,3,85,72,78,68,65\nCS002,Jane Smith,jane@example.com,Computer Science,3,78,85,72,75,70";
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'student_data_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Template downloaded successfully!');
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'error': return AlertCircle;
      default: return FileText;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success-600';
      case 'error': return 'text-danger-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <div className="card">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Upload Student Data
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Upload Excel or CSV files containing student performance data
          </p>
        </div>

        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200
            ${isDragActive 
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
              : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'
            }
          `}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          {isDragActive ? (
            <p className="text-primary-600 dark:text-primary-400 font-medium">
              Drop the files here...
            </p>
          ) : (
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">
                Drag & drop files here, or click to select files
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Supported formats: {acceptedFormats.join(', ')}
              </p>
            </div>
          )}
        </div>

        {/* Template Download */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Need a template? Download the sample format.
          </p>
          <button
            onClick={downloadTemplate}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Template</span>
          </button>
        </div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Uploaded Files ({files.length})
            </h3>
            {files.some(f => f.status === 'pending') && (
              <button
                onClick={uploadAllFiles}
                disabled={uploading}
                className="btn btn-primary"
              >
                {uploading ? 'Uploading...' : 'Upload All'}
              </button>
            )}
          </div>

          <div className="space-y-3">
            {files.map((fileItem) => {
              const Icon = getStatusIcon(fileItem.status);
              return (
                <div
                  key={fileItem.id}
                  className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                >
                  <Icon className={`w-5 h-5 ${getStatusColor(fileItem.status)}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {fileItem.file.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {(fileItem.file.size / 1024).toFixed(2)} KB
                    </p>
                    {fileItem.status === 'pending' && uploadProgress[fileItem.id] && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                          <div
                            className="bg-primary-600 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress[fileItem.id]}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {uploadProgress[fileItem.id]}%
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {fileItem.status === 'pending' && (
                      <button
                        onClick={() => uploadFile(fileItem)}
                        disabled={uploading}
                        className="btn btn-primary btn-sm"
                      >
                        Upload
                      </button>
                    )}
                    <button
                      onClick={() => removeFile(fileItem.id)}
                      className="p-1 text-gray-500 hover:text-danger-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
          Upload Instructions
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Ensure your file contains columns for Student ID, Name, Email, Department, and skill scores</li>
          <li>• Supported skill categories: DSA, DBMS, Web Development, Algorithms, System Design</li>
          <li>• Scores should be numerical values between 0-100</li>
          <li>• Maximum file size: 10MB per file</li>
          <li>• You can upload multiple files at once</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;
