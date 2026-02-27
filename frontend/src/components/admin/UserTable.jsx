import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';

const UserTable = ({ users, onEdit, onDelete, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  }) || [];

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'inactive': return XCircle;
      case 'pending': return AlertTriangle;
      default: return CheckCircle;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success-600';
      case 'inactive': return 'text-danger-600';
      case 'pending': return 'text-warning-600';
      default: return 'text-gray-600';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-danger-100 text-danger-600 dark:bg-danger-900/20 dark:text-danger-400';
      case 'coordinator': return 'bg-warning-100 text-warning-600 dark:bg-warning-900/20 dark:text-warning-400';
      case 'student': return 'bg-primary-100 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400';
      default: return 'bg-gray-100 text-gray-600 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="input"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="coordinator">Coordinator</option>
            <option value="student">Student</option>
          </select>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="input"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-primary-600"
                >
                  <span>User</span>
                  <span className="text-xs">
                    {sortField === 'name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </span>
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                <button
                  onClick={() => handleSort('role')}
                  className="flex items-center space-x-1 hover:text-primary-600"
                >
                  <span>Role</span>
                  <span className="text-xs">
                    {sortField === 'role' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </span>
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                Contact
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                Department
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 hover:text-primary-600"
                >
                  <span>Status</span>
                  <span className="text-xs">
                    {sortField === 'status' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </span>
                </button>
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                Joined
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length > 0 ? (
              sortedUsers.map((user) => {
                const StatusIcon = getStatusIcon(user.status);
                return (
                  <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            ID: {user.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                          <Mail className="w-3 h-3" />
                          <span>{user.email}</span>
                        </div>
                        {user.phone && (
                          <div className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400">
                            <Phone className="w-3 h-3" />
                            <span>{user.phone}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {user.department || '-'}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <StatusIcon className={`w-4 h-4 ${getStatusColor(user.status)}`} />
                        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {user.status}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">
                      {user.joinDate}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onView(user)}
                          className="p-1 text-gray-500 hover:text-primary-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEdit(user)}
                          className="p-1 text-gray-500 hover:text-warning-600 transition-colors"
                          title="Edit User"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(user)}
                          className="p-1 text-gray-500 hover:text-danger-600 transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="py-8 text-center text-gray-500 dark:text-gray-400">
                  No users found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {sortedUsers.length > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {sortedUsers.length} of {users?.length || 0} users
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              Previous
            </button>
            <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
