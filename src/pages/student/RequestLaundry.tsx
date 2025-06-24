
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentNavbar from '../../components/StudentNavbar';
import { supabase } from "@/integrations/supabase/client";
const RequestLaundry = () => {
  const [formData, setFormData] = useState({
    clothesType: 'Normal',
    pickupTime: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Mock pickup slots
  const pickupSlots = [
    '10:00 AM - 11:00 AM, Block A',
    '11:00 AM - 12:00 PM, Block A',
    '2:00 PM - 3:00 PM, Block A',
    '3:00 PM - 4:00 PM, Block A',
    '4:00 PM - 5:00 PM, Block A'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Mock API call - replace with Supabase integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage('Request submitted successfully!');
      
      // Reset form
      setFormData({
        clothesType: 'Normal',
        pickupTime: '',
        notes: ''
      });

      // Redirect after success
      setTimeout(() => {
        navigate('/student/track');
      }, 2000);
    } catch (error) {
      setMessage('Error submitting request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StudentNavbar />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Request Laundry Service</h1>
          
          {message && (
            <div className={`mb-6 p-4 rounded-md ${
              message.includes('successfully') 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
            }`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="clothesType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Clothes Type
              </label>
              <select
                id="clothesType"
                name="clothesType"
                value={formData.clothesType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label htmlFor="pickupTime" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pickup Time
              </label>
              <select
                id="pickupTime"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select a pickup time</option>
                {pickupSlots.map((slot, index) => (
                  <option key={index} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any special instructions or notes about your laundry..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting Request...
                </div>
              ) : (
                'Submit Request'
              )}
            </button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Important Notes:</h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Normal laundry takes 24-48 hours</li>
              <li>• Urgent requests are processed within 12-24 hours</li>
              <li>• Make sure to be available during pickup time</li>
              <li>• You'll receive notifications about status updates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestLaundry;
