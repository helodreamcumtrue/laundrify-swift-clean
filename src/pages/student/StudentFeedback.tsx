
import React, { useState } from 'react';
import { Star, Send } from 'lucide-react';
import StudentNavbar from '../../components/StudentNavbar';

const StudentFeedback = () => {
  const [formData, setFormData] = useState({
    requestId: '',
    issueDescription: '',
    rating: 0
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Mock completed requests
  const completedRequests = [
    { id: 'REQ001', date: '2024-01-17', type: 'Normal' },
    { id: 'REQ002', date: '2024-01-11', type: 'Urgent' },
    { id: 'REQ003', date: '2024-01-07', type: 'Normal' }
  ];

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Mock API call - replace with Supabase integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage('Feedback submitted successfully! Thank you for your review.');
      
      // Reset form
      setFormData({
        requestId: '',
        issueDescription: '',
        rating: 0
      });
    } catch (error) {
      setMessage('Error submitting feedback. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StudentNavbar />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Submit Feedback</h1>
          
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
              <label htmlFor="requestId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select Request
              </label>
              <select
                id="requestId"
                value={formData.requestId}
                onChange={(e) => setFormData({ ...formData, requestId: e.target.value })}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">Select a completed request</option>
                {completedRequests.map((request) => (
                  <option key={request.id} value={request.id}>
                    {request.id} - {request.type} ({request.date})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Rating
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleRatingClick(star)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        star <= formData.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300 dark:text-gray-600'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Click to rate your experience (1 = Poor, 5 = Excellent)
              </p>
            </div>

            <div>
              <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Feedback / Issue Description
              </label>
              <textarea
                id="issueDescription"
                rows={6}
                value={formData.issueDescription}
                onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
                placeholder="Please describe your experience, any issues, or suggestions for improvement..."
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading || formData.rating === 0}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting Feedback...
                </div>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </>
              )}
            </button>
          </form>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Your feedback helps us improve!</h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Rate your overall experience with our service</li>
              <li>• Report any issues with your laundry</li>
              <li>• Share suggestions for improvement</li>
              <li>• Help us serve you better</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFeedback;
