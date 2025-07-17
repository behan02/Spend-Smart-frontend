import axios from 'axios';
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage, ensureAuthenticated } from '../../pages/UserSettings/firebaseconfig';
import { getApiBaseUrl, handleApiError } from '../../Utils/apiUtils';

// Types for profile picture operations
export interface ProfilePictureUploadResponse {
  success: boolean;
  message: string;
  profilePictureUrl?: string;
  fileName?: string;
  uploadedAt?: string;
}

export interface DeleteProfilePictureResponse {
  success: boolean;
  message: string;
  deletedAt?: string;
}

export interface ProfilePictureUrlResponse {
  userId: number;
  profilePictureUrl: string | null;
  hasProfilePicture: boolean;
}

export interface UserProfile {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePictureUrl?: string;
  createdAt: string;
  updatedAt: string;
}

class ProfilePictureService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = `${getApiBaseUrl()}/ProfilePicture`;
  }

  /**
   * Upload a profile picture: First to Firebase, then save URL to backend
   */
  async uploadProfilePicture(file: File, userId: number): Promise<ProfilePictureUploadResponse> {
    try {
      // Ensure user is authenticated with Firebase
      await ensureAuthenticated();

      // Create a unique filename to avoid conflicts
      const timestamp = Date.now();
      const fileName = `user_${userId}_${timestamp}_${file.name}`;

      // Create a reference in Firebase Storage
      const storageRef = ref(storage, `profile_pictures/${fileName}`);

      // Upload file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);
      console.log('File uploaded to Firebase:', snapshot);

      // Get the download URL from Firebase
      const firebaseUrl = await getDownloadURL(storageRef);
      console.log('Firebase download URL:', firebaseUrl);

      // Now save the Firebase URL to backend database
      const response = await axios.put(`${this.baseUrl}/update-url`, {
        userId: userId,
        profilePictureUrl: firebaseUrl,
        fileName: fileName
      });

      return {
        success: true,
        message: "Profile picture uploaded successfully!",
        profilePictureUrl: firebaseUrl,
        fileName: fileName,
        uploadedAt: new Date().toISOString()
      };

    } catch (error: any) {
      console.error("Upload failed:", error);
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Delete a profile picture: Remove from Firebase and update backend
   */
  async deleteProfilePicture(userId: number): Promise<DeleteProfilePictureResponse> {
    try {
      // First get the current profile picture info from backend
      const currentPicture = await this.getProfilePictureUrl(userId);
      
      if (!currentPicture.hasProfilePicture || !currentPicture.profilePictureUrl) {
        return {
          success: false,
          message: "No profile picture to delete"
        };
      }

      // Ensure user is authenticated with Firebase
      await ensureAuthenticated();

      // Extract the file path from Firebase URL to delete from Firebase Storage
      try {
        // Parse the Firebase URL to get the file path
        const url = new URL(currentPicture.profilePictureUrl);
        const pathMatch = url.pathname.match(/\/o\/(.*)\?/);
        if (pathMatch) {
          const filePath = decodeURIComponent(pathMatch[1]);
          const fileRef = ref(storage, filePath);
          await deleteObject(fileRef);
          console.log('File deleted from Firebase');
        }
      } catch (firebaseError) {
        console.warn('Could not delete file from Firebase:', firebaseError);
        // Continue with backend deletion even if Firebase deletion fails
      }

      // Update backend to remove the profile picture URL
      const response = await axios.put(`${this.baseUrl}/update-url`, {
        userId: userId,
        profilePictureUrl: null,
        fileName: null
      });

      return {
        success: true,
        message: "Profile picture deleted successfully!",
        deletedAt: new Date().toISOString()
      };

    } catch (error: any) {
      console.error("Delete failed:", error);
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Get the profile picture URL for a user from backend
   */
  async getProfilePictureUrl(userId: number): Promise<ProfilePictureUrlResponse> {
    try {
      const response = await axios.get(`${this.baseUrl}/url/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Get complete user profile including profile picture
   */
  async getUserProfile(userId: number): Promise<UserProfile> {
    try {
      const response = await axios.get(`${this.baseUrl}/profile/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }

  /**
   * Check if a user exists
   */
  async checkUserExists(userId: number): Promise<{ userId: number; exists: boolean }> {
    try {
      const response = await axios.get(`${this.baseUrl}/user-exists/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  }
}

// Export a singleton instance
export const profilePictureService = new ProfilePictureService();