
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Auth Pages
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

// Student Pages
import StudentHome from "./pages/student/StudentHome";
import RequestLaundry from "./pages/student/RequestLaundry";
import TrackStatus from "./pages/student/TrackStatus";
import Notifications from "./pages/student/Notifications";
import OrderHistory from "./pages/student/OrderHistory";
import StudentFeedback from "./pages/student/StudentFeedback";
import StudentProfile from "./pages/student/StudentProfile";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import SchedulePickups from "./pages/admin/SchedulePickups";
import Delivery from "./pages/admin/Delivery";
import StudentRecords from "./pages/admin/StudentRecords";
import AdminFeedback from "./pages/admin/AdminFeedback";
import AdminProfile from "./pages/admin/AdminProfile";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/feedback" element={<Feedback />} />
              {/* Student Routes */}
              <Route path="/" element={<ProtectedRoute allowedRoles={["Student"]}><StudentHome /></ProtectedRoute>} />
              <Route path="/student/home" element={<ProtectedRoute allowedRoles={["Student"]}><StudentHome /></ProtectedRoute>} />
              <Route path="/student/request" element={<ProtectedRoute allowedRoles={["Student"]}><RequestLaundry /></ProtectedRoute>} />
              <Route path="/student/track" element={<ProtectedRoute allowedRoles={["Student"]}><TrackStatus /></ProtectedRoute>} />
              <Route path="/student/notifications" element={<ProtectedRoute allowedRoles={["Student"]}><Notifications /></ProtectedRoute>} />
              <Route path="/student/history" element={<ProtectedRoute allowedRoles={["Student"]}><OrderHistory /></ProtectedRoute>} />
              <Route path="/student/feedback" element={<ProtectedRoute allowedRoles={["Student"]}><StudentFeedback /></ProtectedRoute>} />
              <Route path="/student/profile" element={<ProtectedRoute allowedRoles={["Student"]}><StudentProfile /></ProtectedRoute>} />
              
              {/* Admin Routes */}
              <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/schedule" element={<ProtectedRoute allowedRoles={["Admin"]}><SchedulePickups /></ProtectedRoute>} />
              <Route path="/admin/delivery" element={<ProtectedRoute allowedRoles={["Admin"]}><Delivery /></ProtectedRoute>} />
              <Route path="/admin/records" element={<ProtectedRoute allowedRoles={["Admin"]}><StudentRecords /></ProtectedRoute>} />
              <Route path="/admin/feedback" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminFeedback /></ProtectedRoute>} />
              <Route path="/admin/profile" element={<ProtectedRoute allowedRoles={["Admin"]}><AdminProfile /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
