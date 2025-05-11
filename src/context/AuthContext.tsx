
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

type UserRole = 'buyer' | 'seller' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  // Mock login function (replace with actual authentication later)
  const login = async (email: string, password: string) => {
    // This is a mock - in a real app you would call an API
    console.log('Login with', email, password);
    
    // For demo purposes, we'll create mock users
    if (email === 'buyer@example.com' && password === 'password') {
      const userData = { id: '1', name: 'Test Buyer', email, role: 'buyer' as UserRole };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
    } else if (email === 'seller@example.com' && password === 'password') {
      const userData = { id: '2', name: 'Test Seller', email, role: 'seller' as UserRole };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
    } else if (email === 'admin@example.com' && password === 'password') {
      const userData = { id: '3', name: 'Admin', email, role: 'admin' as UserRole };
      setUser(userData);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string, role: UserRole) => {
    // This is a mock - in a real app you would call an API
    console.log('Register', name, email, password, role);
    
    const userData = { id: Date.now().toString(), name, email, role };
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
