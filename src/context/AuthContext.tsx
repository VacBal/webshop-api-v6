import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  email: string;
  firstName:string;
  lastName:string;
  shippingAddress:string;
  billingAddress:string;
}

interface AuthContextProps {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode; // Ez a gyerekkomponenseket jelzi
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('users', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null); // Törli a kontextusból a felhasználót
    localStorage.removeItem('authToken'); // Törli a helyi tárolt tokent
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
