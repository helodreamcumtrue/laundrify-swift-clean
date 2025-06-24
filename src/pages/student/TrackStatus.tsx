
import React, { useState } from 'react';
import { Package, Clock, CheckCircle, Truck } from 'lucide-react';
import StudentNavbar from '../../components/StudentNavbar';

const TrackStatus = () => {
  const [refreshing, setRefreshing] = useState(false);

  // Mock laundry requests data
  const requests = [
    {
      id: 'REQ001',
      clothesType: 'Normal',
      status: 'Washing',
      pickupTime: '10:00 AM - 11:00 AM, Block A',
      estimatedCompletion: 'Today, 6:00 PM',
      orderDate: '2024-01-15'
    },
    {
      id: 'REQ002',
      clothesType: 'Urgent',
      status: 'Ready',
      pickupTime: '2:00 PM - 3:00 PM, Block A',
      estimatedCompletion: 'Ready for pickup',
      orderDate: '2024-01-14'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'Picked Up': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400';
      case 'Washing': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400';
      case 'Drying': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400';
      case 'Ready': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400';
      case 'Delivered': return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Pending': return <Clock className="h-5 w-5" />;
      case 'Picked Up': return <Package className="h-5 w-5" />;
      case 'Washing': return <Package className="h-5 w-5" />;
      case 'Drying': return <Package className="h-5 w-5" />;
      case 'Ready': return <CheckCircle className="h-5 w-5" />;
      case 'Delivered': return <Truck className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Mock refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StudentNavbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Track Your Orders</h1>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
          >
            {refreshing ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : null}
            Refresh
          </button>
        </div>

        <div className="space-y-6">
          {requests.map((request) => (
            <div key={request.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex items-center mb-2 sm:mb-0">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mr-3">
                    Request #{request.id}
                  </h3>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                    {getStatusIcon(request.status)}
                    <span className="ml-1">{request.status}</span>
                  </span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Ordered on {request.orderDate}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Clothes Type</p>
                  <p className="text-gray-900 dark:text-white">{request.clothesType}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Pickup Time</p>
                  <p className="text-gray-900 dark:text-white">{request.pickupTime}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Estimated Completion</p>
                  <p className="text-gray-900 dark:text-white">{request.estimatedCompletion}</p>
                </div>
              </div>

              {/* Status Progress */}
              <div className="mt-6">
                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                  <span>Progress</span>
                  <span>
                    {request.status === 'Ready' ? '90%' : 
                     request.status === 'Washing' ? '50%' : 
                     request.status === 'Picked Up' ? '25%' : '10%'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      request.status === 'Ready' ? 'bg-green-500 w-[90%]' :
                      request.status === 'Washing' ? 'bg-purple-500 w-1/2' :
                      request.status === 'Picked Up' ? 'bg-blue-500 w-1/4' : 'bg-yellow-500 w-[10%]'
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {requests.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No active requests</h3>
            <p className="text-gray-600 dark:text-gray-400">You don't have any laundry requests in progress.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackStatus;
