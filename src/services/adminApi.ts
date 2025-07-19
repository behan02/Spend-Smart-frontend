// TypeScript API service for admin operations
// This file is like a "phone book" for your frontend with type safety

import axios, { AxiosResponse } from 'axios';

// Define TypeScript interfaces (like blueprints for data structures)
export interface AdminCreateDto {
  name: string;
  email: string;
  password: string;
}

export interface AdminProfileUpdateDto {
  name: string;
  email: string;
  currentPassword?: string; // Required for password/email changes
  password?: string; // Optional - only if changing password
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  password: string; // This will be hashed
  userAdmins: any[]; // You can define this type later
}

// Profile Picture DTOs
export interface ProfilePictureResponseDto {
  base64Image?: string;
  fileName?: string;
  uploadedAt?: string;
}

export interface AdminResponseDto {
  id: number;
  name: string;
  email: string;
  profilePictureUrl?: string;
  profilePictureFileName?: string;
  profilePictureUploadedAt?: string;
  hasProfilePicture: boolean;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// This is the "address" of your backend server
const API_BASE_URL = 'http://localhost:5110/api';

// Create an axios instance with default settings and types
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// This object contains all the "phone calls" (API functions) we can make
export const adminApi = {
  
  // GET all admins - Returns array of Admin objects
  getAllAdmins: async (): Promise<Admin[]> => {
    try {
      const response: AxiosResponse<Admin[]> = await apiClient.get('/AdminProfile');
      return response.data;
    } catch (error) {
      console.error('Error getting all admins:', error);
      throw error;
    }
  },

  // GET admin by ID - Returns single Admin object
  getAdmin: async (id: number): Promise<Admin> => {
    try {
      const response: AxiosResponse<Admin> = await apiClient.get(`/AdminProfile/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error getting admin ${id}:`, error);
      throw error;
    }
  },

  // POST create new admin - Returns created Admin object
  createAdmin: async (adminData: AdminCreateDto): Promise<Admin> => {
    try {
      const response: AxiosResponse<Admin> = await apiClient.post('/AdminProfile', adminData);
      return response.data;
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  },

  // PUT update admin - Returns void (204 No Content)
  updateAdmin: async (id: number, adminData: AdminProfileUpdateDto): Promise<void> => {
    try {
      await apiClient.put(`/AdminProfile/${id}`, adminData);
      // PUT returns 204 No Content, so no data to return
    } catch (error) {
      console.error(`Error updating admin ${id}:`, error);
      throw error;
    }
  },

  // DELETE admin - Returns void (204 No Content)
  deleteAdmin: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/AdminProfile/${id}`);
      // DELETE returns 204 No Content, so no data to return
    } catch (error) {
      console.error(`Error deleting admin ${id}:`, error);
      throw error;
    }
  },

  // ==================== PROFILE PICTURE CRUD OPERATIONS ====================

  // GET admin profile picture
  getProfilePicture: async (id: number): Promise<ProfilePictureResponseDto> => {
    try {
      const response: AxiosResponse<ProfilePictureResponseDto> = await apiClient.get(`/AdminProfile/${id}/profile-picture`);
      return response.data;
    } catch (error) {
      console.error(`Error getting profile picture for admin ${id}:`, error);
      throw error;
    }
  },

  // POST upload new profile picture
  uploadProfilePicture: async (id: number, file: File): Promise<{ message: string; fileName: string; uploadedAt: string }> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.post(`/AdminProfile/${id}/profile-picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error uploading profile picture for admin ${id}:`, error);
      throw error;
    }
  },

  // PUT update existing profile picture
  updateProfilePicture: async (id: number, file: File): Promise<{ message: string; fileName: string; uploadedAt: string }> => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.put(`/AdminProfile/${id}/profile-picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating profile picture for admin ${id}:`, error);
      throw error;
    }
  },

  // DELETE profile picture
  deleteProfilePicture: async (id: number): Promise<{ message: string }> => {
    try {
      const response = await apiClient.delete(`/AdminProfile/${id}/profile-picture`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting profile picture for admin ${id}:`, error);
      throw error;
    }
  },

  // GET admin info including profile picture status
  getAdminWithProfileInfo: async (id: number): Promise<AdminResponseDto> => {
    try {
      const response: AxiosResponse<AdminResponseDto> = await apiClient.get(`/AdminProfile/${id}/profile-info`);
      return response.data;
    } catch (error) {
      console.error(`Error getting admin profile info for ${id}:`, error);
      throw error;
    }
  }
};

// Export the API client in case we need it elsewhere
export default apiClient;
