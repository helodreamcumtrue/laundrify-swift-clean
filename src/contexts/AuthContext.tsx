
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'Student' | 'Admin';
  hostel_block?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string, role: 'Student' | 'Admin', hostelBlock?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserProfile | null>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider: Setting up auth state listener');
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('AuthProvider: Auth state changed', event, session?.user?.id);
      
      setSession(session);
      
      if (session?.user) {
        // Defer profile fetching to avoid blocking auth state updates
        setTimeout(async () => {
          const profile = await fetchUserProfile(session.user);
          setUser(profile);
          setLoading(false);
        }, 0);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    // THEN check for existing session
    const getInitialSession = async () => {
      try {
        console.log('AuthProvider: Checking for existing session');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('AuthProvider: Error getting session:', error);
          setLoading(false);
          return;
        }

        if (session?.user) {
          console.log('AuthProvider: Found existing session for user:', session.user.id);
          setSession(session);
          const profile = await fetchUserProfile(session.user);
          setUser(profile);
        }
      } catch (error) {
        console.error('AuthProvider: Error in getInitialSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    return () => {
      console.log('AuthProvider: Cleaning up auth subscription');
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (authUser: User): Promise<UserProfile | null> => {
    try {
      console.log('AuthProvider: Fetching profile for user:', authUser.id);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error('AuthProvider: Error fetching profile:', error);
        return null;
      }

      if (profile) {
        console.log('AuthProvider: Profile fetched successfully:', profile);
        const userProfile: UserProfile = {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          role: profile.role as 'Student' | 'Admin',
          hostel_block: profile.hostel_block
        };
        return userProfile;
      }
      return null;
    } catch (error) {
      console.error('AuthProvider: Error in fetchUserProfile:', error);
      return null;
    }
  };

  const signUp = async (email: string, password: string, name: string, role: 'Student' | 'Admin', hostelBlock?: string) => {
    try {
      console.log('AuthProvider: Starting signup process for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        console.error('AuthProvider: Signup error:', error);
        throw error;
      }

      if (data.user) {
        console.log('AuthProvider: User created, creating profile for:', data.user.id);
        
        // Create profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            name,
            email,
            role,
            hostel_block: hostelBlock
          });

        if (profileError) {
          console.error('AuthProvider: Profile creation error:', profileError);
          throw profileError;
        }
        
        console.log('AuthProvider: Profile created successfully');
      }
    } catch (error) {
      console.error('AuthProvider: Error in signUp:', error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string): Promise<UserProfile | null> => {
    try {
      console.log('AuthProvider: Starting signin process for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('AuthProvider: Signin error:', error);
        throw error;
      }

      if (data.user) {
        console.log('AuthProvider: User signed in, fetching profile for:', data.user.id);
        const profile = await fetchUserProfile(data.user);
        return profile;
      }
      return null;
    } catch (error) {
      console.error('AuthProvider: Error in signIn:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      console.log('AuthProvider: Starting signout process');
      
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('AuthProvider: Signout error:', error);
        throw error;
      }
      
      setUser(null);
      setSession(null);
      console.log('AuthProvider: User signed out successfully');
    } catch (error) {
      console.error('AuthProvider: Error in signOut:', error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };

  console.log('AuthProvider: Current state - loading:', loading, 'user:', user?.id, 'session:', !!session);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
