import { createContext, useState } from 'react';
import React from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const isAuth = JSON.parse(localStorage.getItem('isAuthenticated'));
    const storedUser = localStorage.getItem('user');
    return isAuth && storedUser ? JSON.parse(storedUser) : null;
  });

  const login = (userData) => {
    localStorage.setItem('isAuthenticated', JSON.stringify(true));  
    localStorage.setItem('user', JSON.stringify(userData));  
    setUser(userData); 
  };

  const logout = () => {
    localStorage.setItem('isAuthenticated', JSON.stringify(false)); 
    localStorage.removeItem('user');
    setUser(null);  
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
