/* eslint-disable no-debugger */
import React, { createContext, useContext, useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

interface AuthContextType {
  isAuthenticated: boolean;
  Role: string;
  login: (token: string) => void;
  logout: () => void;
}

interface DecodedToken {
  Role: string; // Assuming roles are included in the token
  exp: number; // Expiry time in Unix epoch
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [Role, setRoles] = useState<string>('');

  // Helper function to decode token and set roles
  const decodeTokenAndSetRoles = (token: string) => {
    try {
      debugger;
      const decodedToken: DecodedToken = jwtDecode<DecodedToken>(token);
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();
      if (isTokenExpired) {
        logout();
        return;
      }
      debugger;
      setRoles(decodedToken.Role || "");
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Invalid token:", error);
      logout();
    }
  };

  const login = (token: string) => {
    localStorage.setItem('authToken', token);
    decodeTokenAndSetRoles(token);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setRoles('');
    setIsAuthenticated(false);
  };

  // On initial load, check if token exists and is valid
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      decodeTokenAndSetRoles(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, Role, login, logout }}>
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
