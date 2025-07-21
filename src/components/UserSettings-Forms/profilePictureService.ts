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
    console.log('ProfilePictureService initialized with base URL:', this.baseUrl);
  }

  /**
   * Upload a profile picture: First to Firebase, then save URL to backend
   */
  async uploadProfilePicture(file: File, userId: number): Promise<ProfilePictureUploadResponse> {
    try {
        console.log('Starting profile picture upload for user:', userId);

        // Validate file before upload
        this.validateFile(file);

        // Ensure user is authenticated with Firebase
        await ensureAuthenticated();

        // Create a unique filename to avoid conflicts
        const timestamp = Date.now();
        const fileExtension = file.name.split('.').pop() || 'jpg';
        const fileName = `user_${userId}_${timestamp}.${fileExtension}`;

        // Create a reference in Firebase Storage
        const storageRef = ref(storage, `profile_pictures/${fileName}`);

        // Upload file to Firebase Storage
        console.log('Uploading to Firebase...');
        const snapshot = await uploadBytes(storageRef, file);
        console.log('File uploaded to Firebase successfully:', snapshot);

        // Get the download URL from Firebase
        const firebaseUrl = await getDownloadURL(storageRef);
        console.log('Firebase download URL:', firebaseUrl);

        // ✅ FIX: Use the existing update-url endpoint that works
        console.log('Saving URL to backend database...');
        const backendResponse = await axios.put(`${this.baseUrl}/update-url`, {
            userId: userId,
            profilePictureUrl: firebaseUrl,
            fileName: fileName
        });

        if (backendResponse.data.success) {
            console.log('Backend database updated successfully');
            return {
                success: true,
                message: "Profile picture uploaded successfully!",
                profilePictureUrl: firebaseUrl,
                fileName: fileName,
                uploadedAt: new Date().toISOString()
            };
        } else {
            throw new Error(backendResponse.data.message || 'Backend update failed');
        }

    } catch (error: any) {
        console.error("Upload failed:", error);
        
        // Better error handling
        let errorMessage = 'Upload failed';
        
        if (error.response) {
            // Backend responded with error
            errorMessage = error.response.data?.message || `Backend error: ${error.response.status}`;
        } else if (error.message.includes('Firebase')) {
            // Firebase error
            errorMessage = 'Firebase upload failed: ' + error.message;
        } else if (error.message.includes('Network')) {
            // Network error
            errorMessage = 'Network error. Please check your connection and try again.';
        } else {
            // General error
            errorMessage = error.message || 'An unexpected error occurred';
        }
        
        throw new Error(errorMessage);
    }
}

  /**
   * Delete a profile picture: Remove from Firebase and update backend
   */
  async deleteProfilePicture(userId: number): Promise<DeleteProfilePictureResponse> {
    try {
      console.log('Starting profile picture deletion for user:', userId);

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
      let firebaseDeleted = false;
      try {
        // Parse the Firebase URL to get the file path
        const url = new URL(currentPicture.profilePictureUrl);
        const pathMatch = url.pathname.match(/\/o\/(.*)\?/);
        if (pathMatch) {
          const filePath = decodeURIComponent(pathMatch[1]);
          const fileRef = ref(storage, filePath);
          await deleteObject(fileRef);
          console.log('File deleted from Firebase successfully');
          firebaseDeleted = true;
        }
      } catch (firebaseError) {
        console.warn('Could not delete file from Firebase:', firebaseError);
        // Continue with backend deletion even if Firebase deletion fails
      }

      // ✅ Update backend using the correct delete endpoint
      const backendResponse = await axios.delete(`${this.baseUrl}/delete/${userId}`);

      if (backendResponse.data.success) {
        return {
          success: true,
          message: firebaseDeleted 
            ? "Profile picture deleted successfully from both Firebase and database!"
            : "Profile picture deleted from database (Firebase deletion failed)",
          deletedAt: new Date().toISOString()
        };
      } else {
        throw new Error(backendResponse.data.message || 'Backend deletion failed');
      }

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
      const url = `${this.baseUrl}/url/${userId}`;
      console.log('Getting profile picture from URL:', url);
      const response = await axios.get(url);
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

  /**
   * Validate file before upload
   */
  private validateFile(file: File): void {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    if (!file) {
      throw new Error('No file selected');
    }

    if (file.size > maxSize) {
      throw new Error('File size exceeds 5MB limit');
    }

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed');
    }
  }

  /**
   * Get file extension from filename
   */
  private getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || 'jpg';
  }
}

// Export a singleton instance
export const profilePictureService = new ProfilePictureService();