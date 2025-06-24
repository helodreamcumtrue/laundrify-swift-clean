
import React, { useState } from 'react';
import { MessageSquare, Star, User, Calendar, Check, Edit } from 'lucide-react';
import AdminNavbar from '../../components/AdminNavbar';

const AdminFeedback = () => {
  const [adminNotes, setAdminNotes] = useState<{ [key: string]: string }>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Mock feedback data
  const [feedbackList, setFeedbackList] = useState([
    {
      id: '1',
      studentName: 'John Doe',
      requestId: 'REQ001',
      issueDescription: 'One of my shirts had a stain that wasn\'t completely removed. Otherwise, the service was good.',
      rating: 3,
      date: '2024-01-15',
      resolved: false,
      adminNote: ''
    },
    {
      id: '2',
      studentName: 'Jane Smith',
      requestId: 'REQ002',
      issueDescription: 'Excellent service! My clothes were clean and smelled fresh. Very satisfied with the urgent service.',
      rating: 5,
      date: '2024-01-14',
      resolved: true,
      adminNote: 'Thank you for the positive feedback!'
    },
    {
      id: '3',
      studentName: 'Mike Johnson',
      requestId: 'REQ003',
      issueDescription: 'Delivery was delayed by a day. Please improve the timing for urgent requests.',
      rating: 2,
      date: '2024-01-13',
      resolved: false,
      adminNote: ''
    },
    {
      id: '4',
      studentName: 'Sarah Wilson',
      requestId: 'REQ004',
      issueDescription: 'Great service overall. The pickup and delivery were on time. Keep up the good work!',
      rating: 4,
      date: '2024-01-12',
      resolved: true,
      adminNote: 'Glad you had a positive experience!'
    }
  ]);

  const handleMarkResolved = async (feedbackId: string) => {
    setSaving(feedbackId);
    try {
      // Mock API call - replace with Supabase integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFeedbackList(feedback => 
        feedback.map(item => 
          item.id === feedbackId 
            ? { ...item, resolved: true }
            : item
        )
      );
      
      setMessage('Feedback marked as resolved successfully!');
    } catch (error) {
      setMessage('Error updating feedback status. Please try again.');
    } finally {
      setSaving(null);
    }
  };

  const handleSaveNote = async (feedbackId: string) => {
    setSaving(feedbackId + '_note');
    try {
      // Mock API call - replace with Supabase integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setFeedbackList(feedback => 
        feedback.map(item => 
          item.id === feedbackId 
            ? { ...item, adminNote: adminNotes[feedbackId] || '' }
            : item
        )
      );
      
      setMessage('Admin note saved successfully!');
    } catch (error) {
      setMessage('Error saving note. Please try again.');
    } finally {
      setSaving(null);
    }
  };

  const handleNoteChange = (feedbackId: string, note: string) => {
    setAdminNotes({
      ...adminNotes,
      [feedbackId]: note
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600 dark:text-green-400';
    if (rating >= 3) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const averageRating = feedbackList.reduce((sum, feedback) => sum + feedback.rating, 0) / feedbackList.length;
  const resolvedCount = feedbackList.filter(f => f.resolved).length;
  const pendingCount = feedbackList.filter(f => !f.resolved).length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
          <MessageSquare className="h-8 w-8 mr-3" />
          Feedback Management
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

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Star className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Rating</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {averageRating.toFixed(1)}/5
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Check className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Resolved</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{resolvedCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                <MessageSquare className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{pendingCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-6">
          {feedbackList.map((feedback) => (
            <div key={feedback.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
                {/* Feedback Info */}
                <div className="flex-1 lg:mr-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <User className="h-5 w-5 text-blue-500 mr-2" />
                        <span className="font-semibold text-gray-900 dark:text-white">{feedback.studentName}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-500 dark:text-gray-400">{feedback.date}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {renderStars(feedback.rating)}
                      <span className={`font-semibold ${getRatingColor(feedback.rating)}`}>
                        {feedback.rating}/5
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Request ID: <span className="font-medium">{feedback.requestId}</span>
                    </p>
                    <p className="text-gray-800 dark:text-gray-200">{feedback.issueDescription}</p>
                  </div>

                  {/* Admin Note Section */}
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Admin Notes
                    </label>
                    <div className="flex space-x-2">
                      <textarea
                        rows={2}
                        value={adminNotes[feedback.id] !== undefined ? adminNotes[feedback.id] : feedback.adminNote}
                        onChange={(e) => handleNoteChange(feedback.id, e.target.value)}
                        placeholder="Add your response or notes..."
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                      />
                      <button
                        onClick={() => handleSaveNote(feedback.id)}
                        disabled={saving === feedback.id + '_note'}
                        className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 text-sm"
                      >
                        {saving === feedback.id + '_note' ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <Edit className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col items-end space-y-2">
                  {feedback.resolved ? (
                    <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-full">
                      <Check className="h-4 w-4 mr-1" />
                      Resolved
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMarkResolved(feedback.id)}
                      disabled={saving === feedback.id}
                      className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors disabled:opacity-50 text-sm"
                    >
                      {saving === feedback.id ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Resolving...
                        </div>
                      ) : (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Mark as Resolved
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {feedbackList.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No feedback yet</h3>
            <p className="text-gray-600 dark:text-gray-400">Student feedback will appear here once submitted.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFeedback;
