
import React, { useState } from 'react';
import { User, Mail, MapPin, Shield, Edit2, Save, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import StudentNavbar from '../../components/StudentNavbar';

const StudentProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    hostelBlock: user?.hostel_block || ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      name: user?.name || '',
      email: user?.email || '',
      hostelBlock: user?.hostel_block || ''
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setMessage('');
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Mock API call - replace with Supabase integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Profile updated successfully!');
      setIsEditing(false);
      
      // In real implementation, update the user context
    } catch (error) {
      setMessage('Error updating profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Mock stats
  const stats = {
    totalOrders: 15,
    activeOrders: 2,
    completedOrders: 13,
    memberSince: 'January 2024'
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StudentNavbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">My Profile</h1>

        {message && (
          <div className={`mb-6 p-4 rounded-md ${
            message.includes('successfully') 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
          }`}>
            {message}
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Information</h2>
                {!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Edit
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <Save className="h-4 w-4 mr-2" />
                      )}
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{user?.name}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                    <Mail className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{user?.email}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                    <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Hostel Block</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editData.hostelBlock}
                        onChange={(e) => setEditData({ ...editData, hostelBlock: e.target.value })}
                        placeholder="e.g., Block A, Floor 2"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    ) : (
                      <p className="text-gray-900 dark:text-white">{user?.hostel_block}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-lg">
                    <Shield className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Account Type</label>
                    <p className="text-gray-900 dark:text-white">{user?.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Account Statistics</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Orders</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{stats.totalOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Active Orders</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{stats.activeOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Completed Orders</span>
                  <span className="font-semibold text-green-600 dark:text-green-400">{stats.completedOrders}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Member Since</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{stats.memberSince}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">Need Help?</h3>
              <p className="text-blue-700 dark:text-blue-300 text-sm mb-4">
                Contact our support team if you need assistance with your account or laundry services.
              </p>
              <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium text-sm">
                Contact Support →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
