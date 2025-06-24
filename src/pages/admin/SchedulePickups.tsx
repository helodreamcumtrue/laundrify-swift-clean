import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Plus, Trash2 } from 'lucide-react';
import AdminNavbar from '../../components/AdminNavbar';

const SchedulePickups = () => {
  const [formData, setFormData] = useState({
    time: '',
    hostelBlock: '',
    assignedStaff: '',
    date: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Mock pickup slots
  const [pickupSlots, setPickupSlots] = useState([
    {
      id: 1,
      time: '10:00 AM - 11:00 AM',
      hostelBlock: 'Block A',
      assignedStaff: 'Staff 1',
      date: '2024-01-15'
    },
    {
      id: 2,
      time: '11:00 AM - 12:00 PM',
      hostelBlock: 'Block A',
      assignedStaff: 'Staff 2',
      date: '2024-01-15'
    },
    {
      id: 3,
      time: '2:00 PM - 3:00 PM',
      hostelBlock: 'Block B',
      assignedStaff: 'Staff 1',
      date: '2024-01-15'
    }
  ]);

  const staffMembers = ['Staff 1', 'Staff 2', 'Staff 3', 'Staff 4'];
  const hostelBlocks = ['Block A', 'Block B', 'Block C', 'Block D'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Mock API call - replace with Supabase integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newSlot = {
        id: pickupSlots.length + 1,
        ...formData
      };
      
      setPickupSlots([...pickupSlots, newSlot]);
      setMessage('Pickup slot created successfully!');
      
      // Reset form
      setFormData({
        time: '',
        hostelBlock: '',
        assignedStaff: '',
        date: ''
      });
    } catch (error) {
      setMessage('Error creating pickup slot. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slotId: number) => {
    if (window.confirm('Are you sure you want to delete this pickup slot?')) {
      try {
        // Mock API call - replace with Supabase integration
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setPickupSlots(pickupSlots.filter(slot => slot.id !== slotId));
        setMessage('Pickup slot deleted successfully!');
      } catch (error) {
        setMessage('Error deleting pickup slot.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNavbar />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Schedule Pickups</h1>

        {message && (
          <div className={`mb-6 p-4 rounded-md ${
            message.includes('successfully') 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-800'
              : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800'
          }`}>
            {message}
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Create New Slot Form */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Create New Pickup Slot
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Time Slot
                </label>
                <input
                  id="time"
                  type="text"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  placeholder="e.g., 10:00 AM - 11:00 AM"
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="hostelBlock" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  Hostel Block
                </label>
                <select
                  id="hostelBlock"
                  value={formData.hostelBlock}
                  onChange={(e) => setFormData({ ...formData, hostelBlock: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select hostel block</option>
                  {hostelBlocks.map(block => (
                    <option key={block} value={block}>{block}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="assignedStaff" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Assigned Staff
                </label>
                <select
                  id="assignedStaff"
                  value={formData.assignedStaff}
                  onChange={(e) => setFormData({ ...formData, assignedStaff: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select staff member</option>
                  {staffMembers.map(staff => (
                    <option key={staff} value={staff}>{staff}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Pickup Date
                </label>
                <input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                    Creating Slot...
                  </div>
                ) : (
                  'Create Slot'
                )}
              </button>
            </form>
          </div>

          {/* Existing Pickup Slots */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Existing Pickup Slots</h2>

            <div className="space-y-4 max-h-96 overflow-y-auto">
              {pickupSlots.map((slot) => (
                <div key={slot.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Clock className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="font-medium text-gray-900 dark:text-white">{slot.time}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <MapPin className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-gray-600 dark:text-gray-400">{slot.hostelBlock}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <User className="h-4 w-4 text-purple-500 mr-2" />
                        <span className="text-gray-600 dark:text-gray-400">{slot.assignedStaff}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Calendar className="h-4 w-4 text-orange-500 mr-2" />
                        <span className="text-gray-600 dark:text-gray-400">{slot.date}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(slot.id)}
                      className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {pickupSlots.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400">No pickup slots scheduled yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePickups;
