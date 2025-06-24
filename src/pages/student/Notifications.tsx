
import React, { useState } from 'react';
import { Bell, CheckCircle, Clock, Package } from 'lucide-react';
import StudentNavbar from '../../components/StudentNavbar';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'Your laundry is ready for pickup!',
      timestamp: '2024-01-15T14:30:00',
      read: false,
      type: 'ready'
    },
    {
      id: 2,
      message: 'Your laundry has been picked up and is being processed.',
      timestamp: '2024-01-15T10:15:00',
      read: true,
      type: 'pickup'
    },
    {
      id: 3,
      message: 'Your laundry request has been confirmed.',
      timestamp: '2024-01-15T09:30:00',
      read: true,
      type: 'confirmed'
    },
    {
      id: 4,
      message: 'Your previous order has been delivered successfully.',
      timestamp: '2024-01-14T18:00:00',
      read: true,
      type: 'delivered'
    }
  ]);

  const getNotificationIcon = (type: string, read: boolean) => {
    const iconClass = `h-6 w-6 ${read ? 'text-gray-400' : 'text-blue-500'}`;
    
    switch (type) {
      case 'ready': return <CheckCircle className={iconClass} />;
      case 'pickup': return <Package className={iconClass} />;
      case 'confirmed': return <Clock className={iconClass} />;
      case 'delivered': return <CheckCircle className={iconClass} />;
      default: return <Bell className={iconClass} />;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StudentNavbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
            {unreadCount > 0 && (
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
              </p>
            )}
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Mark All as Read
            </button>
          )}
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-md border p-6 transition-all ${
                notification.read
                  ? 'border-gray-200 dark:border-gray-700'
                  : 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10'
              }`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-1">
                  {getNotificationIcon(notification.type, notification.read)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${
                    notification.read 
                      ? 'text-gray-900 dark:text-gray-100' 
                      : 'text-blue-900 dark:text-blue-100'
                  }`}>
                    {notification.message}
                  </p>
                  <p className={`text-sm mt-1 ${
                    notification.read 
                      ? 'text-gray-500 dark:text-gray-400' 
                      : 'text-blue-600 dark:text-blue-400'
                  }`}>
                    {formatTimestamp(notification.timestamp)}
                  </p>
                </div>
                {!notification.read && (
                  <div className="flex-shrink-0">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No notifications</h3>
            <p className="text-gray-600 dark:text-gray-400">You're all caught up! No new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
