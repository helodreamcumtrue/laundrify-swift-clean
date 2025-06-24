
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Student' | 'Admin';
  hostelBlock: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string, role: 'Student' | 'Admin', hostelBlock: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('laundrify_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Mock authentication - replace with Supabase auth
      const mockUsers = [
        { id: '1', name: 'John Doe', email: 'student@example.com', password: 'password123', role: 'Student' as const, hostelBlock: 'Block A, Floor 2' },
        { id: '2', name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'Admin' as const, hostelBlock: 'Staff Quarter' },
      ];
      
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        const userData = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          role: foundUser.role,
          hostelBlock: foundUser.hostelBlock
        };
        setUser(userData);
        localStorage.setItem('laundrify_user', JSON.stringify(userData));
        setLoading(false);
        return true;
      }
      setLoading(false);
      return false;
    } catch (error) {
      console.error('Login error:', error);
      setLoading(false);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string, role: 'Student' | 'Admin', hostelBlock: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Mock signup - replace with Supabase auth
      const userData = {
        id: Date.now().toString(),
        name,
        email,
        role,
        hostelBlock
      };
      
      // In real implementation, this would create user in Supabase
      console.log('User registered:', userData);
      setLoading(false);
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('laundrify_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
