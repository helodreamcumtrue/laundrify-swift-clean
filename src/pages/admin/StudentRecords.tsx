
import React, { useState } from 'react';
import { Users, AlertTriangle, DollarSign, Calendar } from 'lucide-react';
import AdminNavbar from '../../components/AdminNavbar';

const StudentRecords = () => {
  const [saving, setSaving] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  // Mock student usage data
  const [studentRecords, setStudentRecords] = useState([
    {
      userId: '1',
      studentName: 'John Doe',
      requestCount: 3,
      weekNumber: 3,
      extraCharges: 0,
      flagged: false
    },
    {
      userId: '2',
      studentName: 'Jane Smith',
      requestCount: 2,
      weekNumber: 3,
      extraCharges: 0,
      flagged: false
    },
    {
      userId: '3',
      studentName: 'Mike Johnson',
      requestCount: 4,
      weekNumber: 3,
      extraCharges: 50,
      flagged: true
    },
    {
      userId: '4',
      studentName: 'Sarah Wilson',
      requestCount: 1,
      weekNumber: 3,
      extraCharges: 0,
      flagged: false
    }
  ]);

  const handleFlagOverUsage = async (userId: string) => {
    setSaving(userId);
    try {
      // Mock API call - replace with Supabase integration
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStudentRecords(records => 
        records.map(record => 
          record.userId === userId 
            ? { ...record, flagged: true }
            : record
        )
      );
      
      setMessage('Student flagged for over-usage successfully!');
    } catch (error) {
      setMessage('Error flagging student. Please try again.');
    } finally {
      setSaving(null);
    }
  };

  const handleExtraChargesChange = (userId: string, charges: number) => {
    setStudentRecords(records => 
      records.map(record => 
        record.userId === userId 
          ? { ...record, extraCharges: charges }
          : record
      )
    );
  };

  const handleSaveChanges = async () => {
    setSaving('all');
    try {
      // Mock API call - replace with Supabase integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setMessage('All changes saved successfully!');
    } catch (error) {
      setMessage('Error saving changes. Please try again.');
    } finally {
      setSaving(null);
    }
  };

  const currentWeek = 3;
  const overUsageCount = studentRecords.filter(r => r.requestCount > 2).length;
  const totalExtraCharges = studentRecords.reduce((sum, r) => sum + r.extraCharges, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminNavbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
          <Users className="h-8 w-8 mr-3" />
          Student Records
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
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Current Week</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">Week {currentWeek}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-red-100 dark:bg-red-900 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Over-Usage</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">{overUsageCount} Students</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Extra Charges</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">₹{totalExtraCharges}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Student Records Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Student Usage Records</h2>
              <button
                onClick={handleSaveChanges}
                disabled={saving === 'all'}
                className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
              >
                {saving === 'all' ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    User ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Request Count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Week Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Extra Charges (₹)
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {studentRecords.map((record) => (
                  <tr 
                    key={record.userId} 
                    className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      record.requestCount > 2 ? 'bg-red-50 dark:bg-red-900/10' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {record.studentName}
                        </span>
                        {record.flagged && (
                          <AlertTriangle className="h-4 w-4 text-red-500 ml-2" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {record.userId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${
                        record.requestCount > 2 
                          ? 'text-red-600 dark:text-red-400' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {record.requestCount}
                        {record.requestCount > 2 && (
                          <span className="ml-1 text-xs text-red-500">(Over limit)</span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {record.weekNumber}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="number"
                        min="0"
                        value={record.extraCharges}
                        onChange={(e) => handleExtraChargesChange(record.userId, Number(e.target.value))}
                        className="w-20 px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {record.requestCount > 2 && !record.flagged ? (
                        <button
                          onClick={() => handleFlagOverUsage(record.userId)}
                          disabled={saving === record.userId}
                          className="flex items-center px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition-colors disabled:opacity-50"
                        >
                          {saving === record.userId ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b border-white mr-1"></div>
                          ) : (
                            <AlertTriangle className="h-3 w-3 mr-1" />
                          )}
                          Flag Over-Usage
                        </button>
                      ) : record.flagged ? (
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Flagged
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs">No action needed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Usage Policy */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">Usage Policy Information</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700 dark:text-blue-300">
            <div>
              <h4 className="font-medium mb-2">Weekly Limits:</h4>
              <ul className="space-y-1">
                <li>• Maximum 2 requests per student per week</li>
                <li>• Additional requests incur extra charges</li>
                <li>• Urgent requests count towards the limit</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Over-Usage Actions:</h4>
              <ul className="space-y-1">
                <li>• Flag students exceeding weekly limits</li>
                <li>• Apply extra charges for additional requests</li>
                <li>• Monitor usage patterns for policy updates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRecords;
