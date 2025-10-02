// src/context/UserContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: number;
  userName: string;
  email: string;
  firstName?: string;
  lastName?: string;
  currency: string;
}

interface UserContextType {
  userId: string | null;
  setUserId: (id: string | null) => void;
  user: User | null;
  setUser: (user: User | null) => void;
  isLoggedIn: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(() => {
    return sessionStorage.getItem("userId");
  });
  
  // For demo purposes, we'll use a mock user. In a real app, this would come from authentication
  const [user, setUser] = useState<User | null>({
    id: 1,
    userName: 'demo_user',
    email: 'demo@example.com',
    firstName: 'Demo',
    lastName: 'User',
    currency: 'USD'
  });

  console.log("Initial User ID from sessionStorage:", userId);

  useEffect(() => {
    if (userId) {
      sessionStorage.setItem("userId", userId);
    } else {
      sessionStorage.removeItem("userId");
    }
  }, [userId]);

  const isLoggedIn = user !== null;

  return (
    <UserContext.Provider value={{ userId, setUserId, user, setUser, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Custom hook for easy usage
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
