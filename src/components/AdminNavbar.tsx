
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, ChevronDown, Moon, Sun, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const AdminNavbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, signOut } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    { name: 'Dashboard', path: '/admin/dashboard' },
    { name: 'Schedule Pickups', path: '/admin/schedule' },
    { name: 'Delivery', path: '/admin/delivery' },
    { name: 'Student Records', path: '/admin/records' },
    { name: 'Feedback', path: '/admin/feedback' },
  ];

  return (
    <nav className="bg-blue-600 dark:bg-blue-800 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/admin/dashboard" className="text-2xl font-bold text-white">
              LAUNDRIFY
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-blue-100 bg-blue-700 dark:bg-blue-900'
                    : 'text-white hover:text-blue-100 hover:bg-blue-700 dark:hover:bg-blue-900'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-white hover:bg-blue-700 rounded-md"
            >
              {showMobileMenu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 p-2 text-white hover:bg-blue-700 rounded-md transition-colors"
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
                      to="/admin/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      Profile
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
        {showMobileMenu && (
          <div className="md:hidden pb-3 pt-2 border-t border-blue-700">
            <div className="space-y-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block px-3 py-2 rounded-md text-sm font-medium ${
                    isActive(item.path)
                      ? 'text-blue-100 bg-blue-700'
                      : 'text-white hover:bg-blue-700'
                  }`}
                  onClick={() => setShowMobileMenu(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminNavbar;
