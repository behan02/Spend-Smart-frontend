import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: number;
  userName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  currency: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // For demo purposes, we'll use a mock user. In a real app, this would come from authentication
  const [user, setUser] = useState<User | null>({
    id: 1,
    userName: 'demo_user',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    currency: 'USD'
  });

  const isLoggedIn = user !== null;

  return (
    <UserContext.Provider value={{ user, setUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
