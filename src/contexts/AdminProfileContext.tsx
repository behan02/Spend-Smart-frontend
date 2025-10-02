import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminApi, Admin, ProfilePictureResponseDto } from '../services/adminApi';

interface AdminProfileContextType {
  adminProfile: Admin | null;
  profilePictureUrl: string | null;
  isLoading: boolean;
  loadAdminProfile: () => Promise<void>;
  updateProfilePicture: (url: string | null) => void;
}

const AdminProfileContext = createContext<AdminProfileContextType | undefined>(undefined);

interface AdminProfileProviderProps {
  children: ReactNode;
}

export const AdminProfileProvider: React.FC<AdminProfileProviderProps> = ({ children }) => {
  const [adminProfile, setAdminProfile] = useState<Admin | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadAdminProfile = async () => {
    try {
      setIsLoading(true);
      
      // Load the first admin (current logged in admin)
      const admins = await adminApi.getAllAdmins();
      if (admins.length > 0) {
        const firstAdmin = admins[0];
        setAdminProfile(firstAdmin);
        
        // Load profile picture
        try {
          const profilePicture: ProfilePictureResponseDto = await adminApi.getProfilePicture(firstAdmin.id);
          console.log('Context - Loaded profile picture:', profilePicture.base64Image ? profilePicture.base64Image.substring(0, 50) + '...' : 'null');
          setProfilePictureUrl(profilePicture.base64Image || null);
        } catch (error) {
          // No profile picture exists - this is normal
          console.log('Context - No profile picture found');
          setProfilePictureUrl(null);
        }
      }
    } catch (error) {
      console.error('Error loading admin profile:', error);
      setAdminProfile(null);
      setProfilePictureUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfilePicture = (url: string | null) => {
    console.log('Context - Updating profile picture:', url ? url.substring(0, 50) + '...' : 'null');
    setProfilePictureUrl(url);
  };

  useEffect(() => {
    loadAdminProfile();
  }, []);

  const value: AdminProfileContextType = {
    adminProfile,
    profilePictureUrl,
    isLoading,
    loadAdminProfile,
    updateProfilePicture,
  };

  return (
    <AdminProfileContext.Provider value={value}>
      {children}
    </AdminProfileContext.Provider>
  );
};

export const useAdminProfile = (): AdminProfileContextType => {
  const context = useContext(AdminProfileContext);
  if (context === undefined) {
    throw new Error('useAdminProfile must be used within an AdminProfileProvider');
  }
  return context;
};
