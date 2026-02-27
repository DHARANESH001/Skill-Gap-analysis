import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/common/StatCard';
import { 
  Building, 
  Plus, 
  Search, 
  Filter,
  Users,
  TrendingUp,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Award
} from 'lucide-react';
import toast from 'react-hot-toast';

const ManageDepartments = () => {
  const { user } = useAuth();
  
  const [departments, setDepartments] = useState([
    {
      id: '1',
      name: 'Computer Science',
      code: 'CS',
      hod: 'Dr. Sarah Johnson',
      totalStudents: 150,
      totalCoordinators: 3,
      averageScore: 76,
      establishedDate: '2010-09-01',
      status: 'active',
      description: 'Department of Computer Science and Engineering',
    },
    {
      id: '2',
      name: 'Information Technology',
      code: 'IT',
      hod: 'Dr. Michael Chen',
      totalStudents: 120,
      totalCoordinators: 2,
      averageScore: 72,
      establishedDate: '2012-08-15',
      status: 'active',
      description: 'Department of Information Technology',
    },
    {
      id: '3',
      name: 'Electronics Engineering',
      code: 'EE',
      hod: 'Dr. Robert Williams',
      totalStudents: 100,
      totalCoordinators: 2,
      averageScore: 68,
      establishedDate: '2008-07-20',
      status: 'active',
      description: 'Department of Electronics and Communication',
    },
    {
      id: '4',
      name: 'Mechanical Engineering',
      code: 'ME',
      hod: 'Dr. James Brown',
      totalStudents: 110,
      totalCoordinators: 2,
      averageScore: 65,
      establishedDate: '2005-06-10',
      status: 'active',
      description: 'Department of Mechanical Engineering',
    },
    {
      id: '5',
      name: 'Civil Engineering',
      code: 'CE',
      hod: 'Dr. Lisa Anderson',
      totalStudents: 90,
      totalCoordinators: 1,
      averageScore: 70,
      establishedDate: '2003-05-15',
      status: 'active',
      description: 'Department of Civil Engineering',
    },
  ]);

  const [departmentStats, setDepartmentStats] = useState({
    totalDepartments: departments.length,
    activeDepartments: departments.filter(d => d.status === 'active').length,
    totalStudents: departments.reduce((sum, d) => sum + d.totalStudents, 0),
    totalCoordinators: departments.reduce((sum, d) => sum + d.totalCoordinators, 0),
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.hod.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || dept.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleEditDepartment = (department) => {
    setSelectedDepartment(department);
    setShowAddModal(true);
  };

  const handleDeleteDepartment = (department) => {
    if (window.confirm(`Are you sure you want to delete ${department.name}?`)) {
      setDepartments(prev => prev.filter(d => d.id !== department.id));
      toast.success('Department deleted successfully!');
      
      // Update stats
      const newDepartments = departments.filter(d => d.id !== department.id);
      setDepartmentStats({
        totalDepartments: newDepartments.length,
        activeDepartments: newDepartments.filter(d => d.status === 'active').length,
        totalStudents: newDepartments.reduce((sum, d) => sum + d.totalStudents, 0),
        totalCoordinators: newDepartments.reduce((sum, d) => sum + d.totalCoordinators, 0),
      });
    }
  };

  const handleViewDepartment = (department) => {
    toast.success(`Viewing details for ${department.name}`);
  };

  const handleAddCoordinator = (department) => {
    toast.success(`Adding coordinator to ${department.name}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-success-100 text-success-600 dark:bg-success-900/20 dark:text-success-400';
      case 'inactive': return 'bg-danger-100 text-danger-600 dark:bg-danger-900/20 dark:text-danger-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-success-600';
    if (score >= 60) return 'text-warning-600';
    return 'text-danger-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Manage Departments
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage departments and assign coordinators
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedDepartment(null);
                setShowAddModal(true);
              }}
              className="btn btn-primary flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Department</span>
            </button>
          </div>
        </div>

        {/* Department Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Departments"
            value={departmentStats.totalDepartments}
            icon={Building}
            color="primary"
          />
          <StatCard
            title="Active Departments"
            value={departmentStats.activeDepartments}
            icon={Award}
            color="success"
          />
          <StatCard
            title="Total Students"
            value={departmentStats.totalStudents}
            icon={Users}
            color="warning"
          />
          <StatCard
            title="Total Coordinators"
            value={departmentStats.totalCoordinators}
            icon={UserPlus}
            color="primary"
          />
        </div>

        {/* Filters */}
        <div className="card mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search departments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input pl-10"
                />
              </div>
            </div>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="input"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Department List */}
        <div className="card">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Department List
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage all departments and their coordinators
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Department
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    HOD
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Students
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Coordinators
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                    Avg Score
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
                {filteredDepartments.map((department) => (
                  <tr key={department.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                          <Building className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {department.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Code: {department.code}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {department.hod}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Head of Department
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {department.totalStudents}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <UserPlus className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-900 dark:text-white">
                          {department.totalCoordinators}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4 text-gray-500" />
                        <span className={`text-sm font-medium ${getScoreColor(department.averageScore)}`}>
                          {department.averageScore}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(department.status)}`}>
                        {department.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDepartment(department)}
                          className="p-1 text-gray-500 hover:text-primary-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleAddCoordinator(department)}
                          className="p-1 text-gray-500 hover:text-success-600 transition-colors"
                          title="Add Coordinator"
                        >
                          <UserPlus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditDepartment(department)}
                          className="p-1 text-gray-500 hover:text-warning-600 transition-colors"
                          title="Edit Department"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDepartment(department)}
                          className="p-1 text-gray-500 hover:text-danger-600 transition-colors"
                          title="Delete Department"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredDepartments.length === 0 && (
            <div className="text-center py-8">
              <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No departments found matching your criteria.
              </p>
            </div>
          )}
        </div>

        {/* Department Performance Overview */}
        <div className="card mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Department Performance Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <div key={dept.id} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {dept.name}
                  </h4>
                  <span className={`text-lg font-bold ${getScoreColor(dept.averageScore)}`}>
                    {dept.averageScore}%
                  </span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Students:</span>
                    <span className="text-gray-900 dark:text-white">{dept.totalStudents}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Coordinators:</span>
                    <span className="text-gray-900 dark:text-white">{dept.totalCoordinators}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Established:</span>
                    <span className="text-gray-900 dark:text-white">
                      {new Date(dept.establishedDate).getFullYear()}
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

export default ManageDepartments;
