
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, User, ChevronDown, Moon, Sun, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const StudentNavbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [notificationCount] = useState(3); // Mock notification count
  const { user, signOut } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/student/home" className="text-2xl font-bold text-blue-500 dark:text-blue-400">
              LAUNDRIFY
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/student/home"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/student/home') || isActive('/')
                  ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Home
            </Link>
            <Link
              to="/student/request"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/student/request')
                  ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              Request Laundry
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Link to="/student/notifications" className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors">
              <Bell className="h-6 w-6" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-2 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition-colors"
              >
                <User className="h-6 w-6" />
                <ChevronDown className="h-4 w-4" />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
                  </div>
                  
                  <div className="py-1">
                    <Link
                      to="/student/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/student/track"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Track Orders
                    </Link>
                    <Link
                      to="/student/history"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Order History
                    </Link>
                    <Link
                      to="/student/feedback"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Feedback
                    </Link>
                    
                    <div className="border-t border-gray-200 dark:border-gray-700 mt-1 pt-1">
                      <button
                        onClick={toggleDarkMode}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        {isDarkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
                        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                      </button>
                      <button
                        onClick={() => {
                          signOut();
                          setShowProfileMenu(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3 pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-4">
            <Link
              to="/student/home"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/student/home') || isActive('/')
                  ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Home
            </Link>
            <Link
              to="/student/request"
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                isActive('/student/request')
                  ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              Request
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default StudentNavbar;
