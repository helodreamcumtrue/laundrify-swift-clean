
-- Fix RLS policies to allow user registration and proper access

-- First, create a security definer function to safely check user roles
-- This prevents infinite recursion in RLS policies
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Drop existing policies that might be causing issues
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create new, properly structured RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON public.profiles
  FOR SELECT USING (public.get_current_user_role() = 'Admin');

-- Fix other tables' RLS policies to prevent recursion issues

-- Drop and recreate laundry_requests policies
DROP POLICY IF EXISTS "Users can view their own requests" ON public.laundry_requests;
DROP POLICY IF EXISTS "Users can create their own requests" ON public.laundry_requests;
DROP POLICY IF EXISTS "Users can update their own requests" ON public.laundry_requests;
DROP POLICY IF EXISTS "Admins can view all requests" ON public.laundry_requests;
DROP POLICY IF EXISTS "Admins can update all requests" ON public.laundry_requests;

CREATE POLICY "Users can view their own requests" ON public.laundry_requests
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own requests" ON public.laundry_requests
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own requests" ON public.laundry_requests
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all requests" ON public.laundry_requests
  FOR SELECT USING (public.get_current_user_role() = 'Admin');

CREATE POLICY "Admins can update all requests" ON public.laundry_requests
  FOR UPDATE USING (public.get_current_user_role() = 'Admin');

-- Fix other table policies similarly
DROP POLICY IF EXISTS "Users can view their own history" ON public.order_history;
DROP POLICY IF EXISTS "Admins can view all history" ON public.order_history;

CREATE POLICY "Users can view their own history" ON public.order_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all history" ON public.order_history
  FOR SELECT USING (public.get_current_user_role() = 'Admin');

-- Fix feedback policies
DROP POLICY IF EXISTS "Users can view their own feedback" ON public.feedback;
DROP POLICY IF EXISTS "Users can create their own feedback" ON public.feedback;
DROP POLICY IF EXISTS "Admins can view all feedback" ON public.feedback;
DROP POLICY IF EXISTS "Admins can update feedback" ON public.feedback;

CREATE POLICY "Users can view their own feedback" ON public.feedback
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own feedback" ON public.feedback
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all feedback" ON public.feedback
  FOR SELECT USING (public.get_current_user_role() = 'Admin');

CREATE POLICY "Admins can update feedback" ON public.feedback
  FOR UPDATE USING (public.get_current_user_role() = 'Admin');

-- Fix student_usage policies
DROP POLICY IF EXISTS "Users can view their own usage" ON public.student_usage;
DROP POLICY IF EXISTS "Admins can view all usage" ON public.student_usage;
DROP POLICY IF EXISTS "System can manage usage" ON public.student_usage;

CREATE POLICY "Users can view their own usage" ON public.student_usage
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all usage" ON public.student_usage
  FOR SELECT USING (public.get_current_user_role() = 'Admin');

CREATE POLICY "System can manage usage" ON public.student_usage
  FOR ALL USING (true);

-- Fix notifications policies
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can update their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "System can create notifications" ON public.notifications;

CREATE POLICY "Users can view their own notifications" ON public.notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" ON public.notifications
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" ON public.notifications
  FOR INSERT WITH CHECK (true);
