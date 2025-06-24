
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Package, User, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import AdminNavbar from '../../components/AdminNavbar';
import QRCodeScanner from '../../components/QRCodeScanner';

const QRPickupScanner = () => {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scannedRequest, setScannedRequest] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleQRScan = async (qrCode: string) => {
    setLoading(true);
    setScannerOpen(false);

    try {
      const { data: request, error } = await supabase
        .from('laundry_requests')
        .select(`
          *,
          profiles:user_id (name, email, hostel_block),
          pickup_slots:pickup_slot_id (time_slot, hostel_block, pickup_date)
        `)
        .eq('qr_code', qrCode)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          toast({
            title: "Invalid QR Code",
            description: "No laundry request found with this QR code.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
        return;
      }

      if (request.status === 'Delivered') {
        toast({
          title: "Already Delivered",
          description: "This laundry request has already been delivered.",
          variant: "destructive",
        });
        return;
      }

      setScannedRequest(request);
    } catch (error: any) {
      console.error('Error scanning QR code:', error);
      toast({
        title: "Error",
        description: "Failed to scan QR code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePickup = async () => {
    if (!scannedRequest) return;

    setLoading(true);

    try {
      const { error } = await supabase
        .from('laundry_requests')
        .update({
          status: 'Picked Up',
          pickup_time: new Date().toISOString(),
        })
        .eq('id', scannedRequest.id);

      if (error) throw error;

      // Create notification for student
      await supabase
        .from('notifications')
        .insert({
          user_id: scannedRequest.user_id,
          title: 'Laundry Picked Up',
          message: `Your ${scannedRequest.clothes_type.toLowerCase()} laundry has been picked up and is now being processed.`,
          type: 'info'
        });

      toast({
        title: "Success",
        description: "Laundry marked as picked up successfully!",
      });

      // Reset state
      setScannedRequest(null);
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);
    } catch (error: any) {
      console.error('Error updating pickup status:', error);
      toast({
        title: "Error",
        description: "Failed to update pickup status. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNavbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
          <QrCode className="h-8 w-8 mr-3" />
          QR Code Pickup Scanner
        </h1>

        {!scannedRequest ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-8 text-center">
            <QrCode className="h-24 w-24 text-blue-500 mx-auto mb-6" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Scan QR Code to Mark Pickup
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Use the camera to scan the QR code on the laundry bag or student's phone
            </p>
            
            <button
              onClick={() => setScannerOpen(true)}
              disabled={loading}
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <QrCode className="h-5 w-5 mr-2" />
                  Start Scanning
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20">
              <h2 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                Laundry Request Found
              </h2>
            </div>
            
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-blue-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Request ID</p>
                      <p className="text-gray-900 dark:text-white">{scannedRequest.id.slice(0, 8)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <User className="h-5 w-5 text-green-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Student</p>
                      <p className="text-gray-900 dark:text-white">{scannedRequest.profiles?.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{scannedRequest.profiles?.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Package className="h-5 w-5 text-purple-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Clothes Type</p>
                      <p className="text-gray-900 dark:text-white">{scannedRequest.clothes_type}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-orange-500 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Status</p>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400">
                        {scannedRequest.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {scannedRequest.pickup_slots && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Pickup Details</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {scannedRequest.pickup_slots.time_slot} - {scannedRequest.pickup_slots.hostel_block}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Date: {new Date(scannedRequest.pickup_slots.pickup_date).toLocaleDateString()}
                  </p>
                </div>
              )}

              {scannedRequest.notes && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">Notes</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{scannedRequest.notes}</p>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={handlePickup}
                  disabled={loading}
                  className="flex-1 flex justify-center items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Confirming Pickup...
                    </>
                  ) : (
                    <>
                      <Package className="h-4 w-4 mr-2" />
                      Confirm Pickup
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setScannedRequest(null)}
                  disabled={loading}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors disabled:opacity-50"
                >
                  Scan Another
                </button>
              </div>
            </div>
          </div>
        )}

        <QRCodeScanner
          isOpen={scannerOpen}
          onScan={handleQRScan}
          onClose={() => setScannerOpen(false)}
        />
      </div>
    </div>
  );
};

export default QRPickupScanner;
