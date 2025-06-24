
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Package, Bell, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import StudentNavbar from '../../components/StudentNavbar';

const StudentHome = () => {
  const { user } = useAuth();
  const activeRequests = 2; // Mock data
  const latestNotification = "Your laundry is ready for pickup!";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StudentNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to LAUNDRIFY, {user?.name}!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Manage your laundry requests with ease
          </p>
          
          {/* Quick Action Button */}
          <Link
            to="/student/request"
            className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="h-6 w-6 mr-3" />
            Request Laundry
          </Link>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Active Requests Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Requests</h3>
                <p className="text-gray-600 dark:text-gray-400">Your current laundry orders</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-4">
              {activeRequests}
            </div>
            <Link
              to="/student/track"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
            >
              Track all orders →
            </Link>
          </div>

          {/* Latest Notification Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Bell className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Latest Update</h3>
                <p className="text-gray-600 dark:text-gray-400">Most recent notification</p>
              </div>
            </div>
            <p className="text-gray-800 dark:text-gray-200 mb-4">
              {latestNotification}
            </p>
            <Link
              to="/student/notifications"
              className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium"
            >
              View all notifications →
            </Link>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            to="/student/request"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow text-center"
          >
            <Plus className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white">New Request</h3>
          </Link>
          
          <Link
            to="/student/track"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow text-center"
          >
            <Package className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Track Orders</h3>
          </Link>
          
          <Link
            to="/student/history"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow text-center"
          >
            <Clock className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Order History</h3>
          </Link>
          
          <Link
            to="/student/feedback"
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow text-center"
          >
            <Bell className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Feedback</h3>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;
