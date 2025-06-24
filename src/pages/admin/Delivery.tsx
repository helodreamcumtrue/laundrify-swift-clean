
import React, { useState } from 'react';
import { Truck, Check, User, Package, Clock } from 'lucide-react';
import AdminNavbar from '../../components/AdminNavbar';

const Delivery = () => {
  const [otpValues, setOtpValues] = useState<{ [key: string]: string }>({});
  const [confirming, setConfirming] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Mock orders ready for delivery
  const [readyOrders, setReadyOrders] = useState([
    {
      id: 'REQ001',
      studentName: 'John Doe',
      clothesType: 'Normal',
      pickupTime: '10:00 AM - 11:00 AM',
      completedAt: '2024-01-15 16:30'
    },
    {
      id: 'REQ004',
      studentName: 'Sarah Wilson',
      clothesType: 'Urgent',
      pickupTime: '3:00 PM - 4:00 PM',
      completedAt: '2024-01-15 17:45'
    }
  ]);

  const handleOtpChange = (requestId: string, value: string) => {
    setOtpValues({
      ...otpValues,
      [requestId]: value
    });
  };

  const handleConfirmDelivery = async (requestId: string) => {
    const otp = otpValues[requestId];
    
    if (!otp || otp.length !== 4) {
      setMessage('Please enter a valid 4-digit OTP.');
      return;
    }

    setConfirming(requestId);
    setMessage('');

    try {
      // Mock OTP validation - replace with real validation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simple OTP validation (in real app, validate against generated OTP)
      if (otp === '1234') {
        // Remove from ready orders
        setReadyOrders(readyOrders.filter(order => order.id !== requestId));
        
        // Clear OTP
        const newOtpValues = { ...otpValues };
        delete newOtpValues[requestId];
        setOtpValues(newOtpValues);
        
        setMessage('Delivery confirmed successfully!');
        
        // In real implementation:
        // 1. Update order status to 'Delivered'
        // 2. Save to OrderHistory table
        // 3. Send notification to student
      } else {
        setMessage('Invalid OTP. Please check and try again.');
      }
    } catch (error) {
      setMessage('Error confirming delivery. Please try again.');
    } finally {
      setConfirming(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNavbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
          <Truck className="h-8 w-8 mr-3" />
          Delivery Management
        </h1>

        {message && (
          <div className={`mb-6 p-4 rounded-md ${
            message.includes('successfully') 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
          }`}>
            {message}
          </div>
        )}

        {/* Ready for Delivery Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-green-900/20">
            <h2 className="text-lg font-semibold text-green-800 dark:text-green-200 flex items-center">
              <Check className="h-5 w-5 mr-2" />
              Orders Ready for Delivery
            </h2>
            <p className="text-sm text-green-600 dark:text-green-400 mt-1">
              These orders are completed and ready to be delivered to students
            </p>
          </div>
          
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {readyOrders.map((order) => (
              <div key={order.id} className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="flex items-center">
                        <Package className="h-5 w-5 text-blue-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Request ID</p>
                          <p className="text-gray-900 dark:text-white">{order.id}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-green-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Student</p>
                          <p className="text-gray-900 dark:text-white">{order.studentName}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Package className="h-5 w-5 text-purple-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Type</p>
                          <p className="text-gray-900 dark:text-white">{order.clothesType}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="h-5 w-5 text-orange-500 mr-2" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Completed</p>
                          <p className="text-gray-900 dark:text-white">{order.completedAt}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* OTP and Confirm Section */}
                  <div className="flex items-center space-x-4 lg:ml-6">
                    <div>
                      <label htmlFor={`otp-${order.id}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Enter OTP
                      </label>
                      <input
                        id={`otp-${order.id}`}
                        type="text"
                        maxLength={4}
                        value={otpValues[order.id] || ''}
                        onChange={(e) => handleOtpChange(order.id, e.target.value)}
                        placeholder="1234"
                        className="w-20 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-center font-mono"
                      />
                    </div>
                    
                    <button
                      onClick={() => handleConfirmDelivery(order.id)}
                      disabled={confirming === order.id || !otpValues[order.id] || otpValues[order.id].length !== 4}
                      className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {confirming === order.id ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Confirming...
                        </div>
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Confirm Delivery
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {readyOrders.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
            <Truck className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No deliveries pending</h3>
            <p className="text-gray-600 dark:text-gray-400">All orders have been delivered successfully.</p>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">Delivery Instructions</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700 dark:text-blue-300">
            <div>
              <h4 className="font-medium mb-2">Before Delivery:</h4>
              <ul className="space-y-1">
                <li>• Verify student identity</li>
                <li>• Check laundry items</li>
                <li>• Ask student for OTP</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">During Delivery:</h4>
              <ul className="space-y-1">
                <li>• Enter the 4-digit OTP provided by student</li>
                <li>• Confirm delivery in the system</li>
                <li>• Student will receive confirmation notification</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800/50 rounded-md">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Demo OTP:</strong> Use "1234" for testing purposes. In production, students will receive unique OTPs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
