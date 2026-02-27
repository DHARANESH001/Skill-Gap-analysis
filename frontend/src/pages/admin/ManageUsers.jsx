import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/common/StatCard';
import UserTable from '../../components/admin/UserTable';
import AddUserModal from '../../components/admin/AddUserModal';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter,
  TrendingUp,
  UserCheck,
  UserX,
  Download,
  Upload
} from 'lucide-react';
import toast from 'react-hot-toast';

const ManageUsers = () => {
  const { user } = useAuth();
  
  const [users, setUsers] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 8900',
      role: 'student',
      department: 'Computer Science',
      status: 'active',
      joinDate: '2024-01-15',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 234 567 8901',
      role: 'coordinator',
      department: 'Computer Science',
      status: 'active',
      joinDate: '2023-08-20',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      phone: '+1 234 567 8902',
      role: 'student',
      department: 'Information Technology',
      status: 'active',
      joinDate: '2024-02-10',
    },
    {
      id: '4',
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      phone: '+1 234 567 8903',
      role: 'admin',
      department: 'Administration',
      status: 'active',
      joinDate: '2023-06-15',
    },
    {
      id: '5',
      name: 'Mike Davis',
      email: 'mike.davis@example.com',
      phone: '+1 234 567 8904',
      role: 'student',
      department: 'Electronics',
      status: 'inactive',
      joinDate: '2023-09-05',
    },
  ]);

  const [userStats, setUserStats] = useState({
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    inactiveUsers: users.filter(u => u.status === 'inactive').length,
    newUsersThisMonth: 12,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const openAddModal = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = (userData) => {
    if (selectedUser) {
      // Update existing user
      setUsers(prev => prev.map(u => u.id === userData.id ? userData : u));
      toast.success('User updated successfully!');
    } else {
      // Add new user
      setUsers(prev => [...prev, userData]);
      toast.success('User created successfully!');
    }
    
    // Update stats
    const newUsers = selectedUser ? users : [...users, userData];
    setUserStats({
      totalUsers: newUsers.length,
      activeUsers: newUsers.filter(u => u.status === 'active').length,
      inactiveUsers: newUsers.filter(u => u.status === 'inactive').length,
      newUsersThisMonth: 12, // This would be calculated based on actual data
    });
  };

  const handleDeleteUser = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.name}?`)) {
      setUsers(prev => prev.filter(u => u.id !== user.id));
      toast.success('User deleted successfully!');
      
      // Update stats
      const newUsers = users.filter(u => u.id !== user.id);
      setUserStats({
        totalUsers: newUsers.length,
        activeUsers: newUsers.filter(u => u.status === 'active').length,
        inactiveUsers: newUsers.filter(u => u.status === 'inactive').length,
        newUsersThisMonth: 12,
      });
    }
  };

  const handleViewUser = (user) => {
    toast.success(`Viewing details for ${user.name}`);
  };

  const exportUsers = () => {
    // Create CSV content
    const csvContent = [
      'ID,Name,Email,Phone,Role,Department,Status,Join Date',
      ...users.map(user => 
        `${user.id},${user.name},${user.email},${user.phone},${user.role},${user.department},${user.status},${user.joinDate}`
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users_export.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    
    toast.success('Users exported successfully!');
  };

  const importUsers = () => {
    toast.success('Import feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Manage Users
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Add, edit, and manage system users
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={importUsers}
                className="btn btn-secondary flex items-center space-x-2"
              >
                <Upload className="w-4 h-4" />
                <span>Import</span>
              </button>
              <button
                onClick={exportUsers}
                className="btn btn-secondary flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button
                onClick={openAddModal}
                className="btn btn-primary flex items-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Add User</span>
              </button>
            </div>
          </div>
        </div>

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={userStats.totalUsers}
            icon={Users}
            color="primary"
            trend="registered users"
          />
          <StatCard
            title="Active Users"
            value={userStats.activeUsers}
            icon={UserCheck}
            color="success"
            trend="currently active"
          />
          <StatCard
            title="Inactive Users"
            value={userStats.inactiveUsers}
            icon={UserX}
            color="danger"
            trend="not active"
          />
          <StatCard
            title="New This Month"
            value={userStats.newUsersThisMonth}
            icon={TrendingUp}
            color="warning"
            trend="new registrations"
          />
        </div>

        {/* User Table */}
        <div className="card">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              User List
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Manage all system users from here
            </p>
          </div>
          
          <UserTable
            users={users}
            onEdit={openEditModal}
            onDelete={handleDeleteUser}
            onView={handleViewUser}
          />
        </div>

        {/* Add/Edit User Modal */}
        <AddUserModal
          isOpen={isModalOpen}
          onClose={closeModal}
          user={selectedUser}
          onSave={handleSaveUser}
        />
      </div>
    </div>
  );
};

export default ManageUsers;
