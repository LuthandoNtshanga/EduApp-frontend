import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/router';

interface DecodedToken {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  exp: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const fakeUser = {
  id: 'demo',
  name: 'Demo User',
  email: 'demo@example.com',
  role: 'user' as 'user',
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(fakeUser);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  // Decode JWT to get user info
  const decodeAndSetUser = (token: string) => {
    try {
      const decoded: DecodedToken = jwtDecode(token);
      setUser({
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
      });
    } catch {
      setUser(null);
    }
  };

  // On mount, check for token in localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded: DecodedToken = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        setUser({
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        });
        setToken(token);
      } else {
        logout(); // token expired
      }
    }
    // eslint-disable-next-line
  }, []);

  // Login function (disabled)
  const login = async (email: string, password: string) => {
    setUser(fakeUser);
    // router.push('/dashboard');
  };

  // Register function (unchanged)
  const register = async (name: string, email: string, password: string) => {
    setUser(fakeUser);
    // router.push('/dashboard');
  };

  // Logout function (optional: can be disabled or set user to null)
  const logout = () => {
    setUser(fakeUser);
    // router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
} 