import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProgressBar from '../../components/common/ProgressBar';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Loader2
} from 'lucide-react';

const StudentProfile = () => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    year: '',
    rollNumber: '',
    codechefUsername: '',
    leetcodeUsername: '',
    joinDate: '',
    location: '',
    leetcodeStats: null,
    codechefStats: null,
  });

  const [formData, setFormData] = useState({
    department: '',
    year: '',
    rollNumber: '',
    leetcodeUsername: '',
    codechefUsername: '',
  });

  const [academicStats] = useState({
    gpa: 3.8,
    attendance: 92,
    assignments: 45,
    projects: 8,
  });

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Check if token exists
      if (!token) {
        console.error('No authentication token found');
        alert('Please login to access your profile');
        return;
      }
      
      const response = await fetch('http://localhost:8081/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (response.status === 401) {
        console.error('Authentication failed - token may be expired');
        localStorage.removeItem('token');
        alert('Your session has expired. Please login again.');
        window.location.href = '/login';
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log('Profile data received:', data);
        setProfileData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          department: data.department || '',
          year: data.year || '',
          rollNumber: data.rollNumber || '',
          codechefUsername: data.codechefUsername || '',
          leetcodeUsername: data.leetcodeUsername || '',
          joinDate: data.joinDate ? new Date(data.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '',
          location: data.location || '',
          leetcodeStats: data.leetcodeStats || null,
          codechefStats: data.codechefStats || null,
        });
        
        setFormData({
          department: data.department || '',
          year: data.year || '',
          rollNumber: data.rollNumber || '',
          leetcodeUsername: data.leetcodeUsername || '',
          codechefUsername: data.codechefUsername || '',
        });
      } else {
        console.error('Failed to fetch profile data:', response.status, response.statusText);
        if (response.status === 500) {
          alert('Server error. Please try again later.');
        } else {
          alert('Failed to fetch profile data');
        }
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      alert('Error fetching profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    try {
      setUpdating(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8081/api/users/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchProfileData(); // Refresh data
        setShowModal(false);
        alert('Profile updated successfully!');
      } else {
        const errorData = await response.json();
        alert('Failed to update profile: ' + (errorData.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="p-6">

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-full max-w-md shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Edit Profile</h2>

              <input
                className="w-full mb-3 p-2 border rounded"
                placeholder="CodeChef Username"
                value={formData.codechefUsername}
                onChange={(e) => handleInputChange('codechefUsername', e.target.value)}
              />

              <input
                className="w-full mb-3 p-2 border rounded"
                placeholder="LeetCode Username"
                value={formData.leetcodeUsername}
                onChange={(e) => handleInputChange('leetcodeUsername', e.target.value)}
              />

              <input
                className="w-full mb-3 p-2 border rounded"
                placeholder="Department"
                value={formData.department}
                onChange={(e) => handleInputChange('department', e.target.value)}
              />

              <input
                className="w-full mb-3 p-2 border rounded"
                placeholder="Year"
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
              />

              <input
                className="w-full mb-3 p-2 border rounded"
                placeholder="Roll Number"
                value={formData.rollNumber}
                onChange={(e) => handleInputChange('rollNumber', e.target.value)}
              />

              <div className="flex justify-end space-x-2">
                <button className="btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button 
                  className="btn btn-primary" 
                  onClick={handleUpdateProfile}
                  disabled={updating}
                >
                  {updating ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Student Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your personal information and track your progress
          </p>
        </div>

        {/* Profile Card */}
        <div className="card mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {profileData.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>{profileData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>{profileData.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{profileData.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {profileData.joinDate}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">CodeChef:</span>
                  <span>{profileData.codechefUsername}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">LeetCode:</span>
                  <span>{profileData.leetcodeUsername}</span>
                </div>
              </div>
            </div>
            <button 
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Academic + Coding Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Academic Information */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Academic Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Department</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{profileData.department}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Year</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{profileData.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Roll Number</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{profileData.rollNumber}</span>
              </div>
              <hr className="border-gray-200 dark:border-gray-700" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Profile Completion</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">85%</span>
                </div>
                <ProgressBar
                  value={85}
                  color="primary"
                  showLabel={false}
                />

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Coding Profile Strength</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">75%</span>
                </div>
                <ProgressBar
                  value={75}
                  color="success"
                  showLabel={false}
                />

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Overall Balance</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">80%</span>
                </div>
                <ProgressBar
                  value={80}
                  color="warning"
                  showLabel={false}
                />
              </div>
            </div>
          </div>

          {/* Coding Statistics */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Coding Statistics
            </h3>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary-600" />
                <span className="ml-2 text-gray-600 dark:text-gray-400">Loading coding stats...</span>
              </div>
            ) : (
              <>
                {/* LeetCode Stats */}
                {profileData.leetcodeStats && (
                  <div className="mb-6">
                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">LeetCode Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Solved</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          {profileData.leetcodeStats.totalSolved || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Easy</p>
                        <p className="text-xl font-bold text-green-600">
                          {profileData.leetcodeStats.easySolved || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Medium</p>
                        <p className="text-xl font-bold text-yellow-600">
                          {profileData.leetcodeStats.mediumSolved || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Hard</p>
                        <p className="text-xl font-bold text-red-600">
                          {profileData.leetcodeStats.hardSolved || 0}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">LeetCode Progress</span>
                        <span className="text-gray-900 dark:text-white">
                          {profileData.leetcodeStats.totalSolved ? 
                            Math.round((profileData.leetcodeStats.totalSolved / (profileData.leetcodeStats.totalQuestions || 1000)) * 100) : 0}%
                        </span>
                      </div>
                      <ProgressBar
                        value={profileData.leetcodeStats.totalSolved ? 
                          (profileData.leetcodeStats.totalSolved / (profileData.leetcodeStats.totalQuestions || 1000)) * 100 : 0}
                        color="primary"
                        showLabel={false}
                      />
                    </div>
                  </div>
                )}

                {/* CodeChef Stats */}
                {profileData.codechefStats && (
                  <div>
                    <h4 className="text-md font-medium text-gray-900 dark:text-white mb-3">CodeChef Statistics</h4>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Rating</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          {profileData.codechefStats.rating || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Highest Rating</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          {profileData.codechefStats.highestRating || 0}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Global Rank</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          #{profileData.codechefStats.globalRank || 'N/A'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Country Rank</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          #{profileData.codechefStats.countryRank || 'N/A'}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">CodeChef Progress</span>
                        <span className="text-gray-900 dark:text-white">
                          {profileData.codechefStats.rating ? 
                            Math.min(Math.round((profileData.codechefStats.rating / 3000) * 100), 100) : 0}%
                        </span>
                      </div>
                      <ProgressBar
                        value={profileData.codechefStats.rating ? 
                          Math.min((profileData.codechefStats.rating / 3000) * 100, 100) : 0}
                        color="success"
                        showLabel={false}
                      />
                    </div>
                  </div>
                )}

                {/* No coding stats available */}
                {!profileData.leetcodeStats && !profileData.codechefStats && (
                  <div className="text-center py-8">
                    <p className="text-gray-600 dark:text-gray-400">
                      No coding platform data available. Add your LeetCode and CodeChef usernames to see your statistics.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentProfile;