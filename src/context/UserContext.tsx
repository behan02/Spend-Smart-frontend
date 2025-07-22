// UserContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

interface UserContextType {
  userId: number | null;
  setUserId: (id: number | null) => void;
  clearUserId: () => void; // add clearUserId method
}

const UserContext = createContext<UserContextType>({
  userId: null,
  setUserId: () => {},
  clearUserId: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<number | null>(null);

  // Load from sessionStorage on mount
  useEffect(() => {
    const storedId = sessionStorage.getItem("userId");
    if (storedId) setUserId(parseInt(storedId));
  }, []);

  // Sync userId state to sessionStorage
  useEffect(() => {
    if (userId !== null) {
      sessionStorage.setItem("userId", userId.toString());
    } else {
      sessionStorage.removeItem("userId");
    }
  }, [userId]);

  // clearUserId method
  const clearUserId = () => {
    setUserId(null);
    sessionStorage.removeItem("userId");
  };

  return (
    <UserContext.Provider value={{ userId, setUserId, clearUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
