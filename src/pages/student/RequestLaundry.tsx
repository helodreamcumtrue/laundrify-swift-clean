
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import StudentNavbar from '../../components/StudentNavbar';

const RequestLaundry = () => {
  const [formData, setFormData] = useState({
    clothesType: 'Normal',
    pickupSlotId: '',
    notes: ''
  });
  const [pickupSlots, setPickupSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchPickupSlots();
  }, [user]);

  const fetchPickupSlots = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('pickup_slots')
        .select('*')
        .eq('is_available', true)
        .gte('pickup_date', new Date().toISOString().split('T')[0])
        .order('pickup_date', { ascending: true });

      if (error) throw error;

      // Filter by user's hostel block if they have one
      const filteredSlots = user.hostel_block 
        ? data.filter(slot => slot.hostel_block === user.hostel_block)
        : data;

      setPickupSlots(filteredSlots);
    } catch (error: any) {
      console.error('Error fetching pickup slots:', error);
      toast({
        title: "Error",
        description: "Failed to load pickup slots",
        variant: "destructive",
      });
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('laundry_requests')
        .insert({
          user_id: user.id,
          clothes_type: formData.clothesType,
          pickup_slot_id: formData.pickupSlotId || null,
          notes: formData.notes || null,
        });

      if (error) throw error;

      // Create notification
      await supabase
        .from('notifications')
        .insert({
          user_id: user.id,
          title: 'Request Submitted',
          message: `Your ${formData.clothesType.toLowerCase()} laundry request has been submitted successfully.`,
          type: 'success'
        });

      toast({
        title: "Success",
        description: "Laundry request submitted successfully!",
      });

      // Reset form
      setFormData({
        clothesType: 'Normal',
        pickupSlotId: '',
        notes: ''
      });

      // Redirect to track status
      setTimeout(() => {
        navigate('/student/track');
      }, 2000);
    } catch (error: any) {
      console.error('Error submitting request:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to submit request",
        variant: "destructive",
      });
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
                <option value="Normal">Normal (24-48 hours)</option>
                <option value="Urgent">Urgent (12-24 hours)</option>
              </select>
            </div>

            <div>
              <label htmlFor="pickupSlotId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pickup Time
              </label>
              {loadingSlots ? (
                <div className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700">
                  <div className="animate-pulse text-gray-500 dark:text-gray-400">Loading pickup slots...</div>
                </div>
              ) : (
                <select
                  id="pickupSlotId"
                  name="pickupSlotId"
                  value={formData.pickupSlotId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select a pickup time</option>
                  {pickupSlots.map((slot) => (
                    <option key={slot.id} value={slot.id}>
                      {slot.time_slot} - {slot.hostel_block} ({new Date(slot.pickup_date).toLocaleDateString()})
                    </option>
                  ))}
                </select>
              )}
              {!loadingSlots && pickupSlots.length === 0 && (
                <p className="text-sm text-yellow-600 dark:text-yellow-400 mt-1">
                  No pickup slots available for your hostel block at the moment.
                </p>
              )}
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
              disabled={loading || pickupSlots.length === 0}
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
              <li>• Normal laundry takes 24-48 hours to complete</li>
              <li>• Urgent requests are processed within 12-24 hours</li>
              <li>• Make sure to be available during pickup time</li>
              <li>• You'll receive notifications about status updates</li>
              <li>• A QR code will be generated for your request for easy tracking</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestLaundry;
