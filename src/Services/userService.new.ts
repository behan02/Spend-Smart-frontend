import axios from 'axios';

const API_BASE_URL = 'https://localhost:7211/api';

// Configure axios instance for HTTPS development
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface UpdateNameRequest {
  userId: number;
  userName: string;
}

export interface UpdateEmailRequest {
  newEmail: string;
  userId: number; // Temporary: for testing without JWT authentication
}

export interface EmailChangeResponse {
  success: boolean;
  message: string;
  hasPendingChange?: boolean;
  currentEmail?: string;
  pendingEmail?: string;
  expiresAt?: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  [key: string]: any;
}

// Function-based approach instead of class
const updateUserName = async (request: UpdateNameRequest): Promise<ApiResponse> => {
  try {
    const response = await apiClient.put('/user/update-name', request);
    return response.data;
  } catch (error: any) {
    console.error('Error updating user name:', error);
    throw new Error(error.response?.data?.message || 'Failed to update name');
  }
};

const updateUserEmail = async (request: UpdateEmailRequest): Promise<EmailChangeResponse> => {
  try {
    const response = await apiClient.post('/EmailVerification/request-change', request);
    return response.data;
  } catch (error: any) {
    console.error('Error requesting email change:', error);
    throw new Error(error.response?.data?.message || 'Failed to request email change');
  }
};

const checkPendingEmailChange = async (userId: number): Promise<EmailChangeResponse> => {
  try {
    const response = await apiClient.get(`/EmailVerification/pending-change?userId=${userId}`);
    return response.data;
  } catch (error: any) {
    console.error('Error checking pending email change:', error);
    throw new Error(error.response?.data?.message || 'User not authenticated');
  }
};

const cancelEmailChange = async (userId: number): Promise<EmailChangeResponse> => {
  try {
    const response = await apiClient.post('/EmailVerification/cancel-change', { userId });
    return response.data;
  } catch (error: any) {
    console.error('Error canceling email change:', error);
    throw new Error(error.response?.data?.message || 'Failed to cancel email change');
  }
};

const updateProfilePicture = async (formData: FormData): Promise<ApiResponse> => {
  try {
    const response = await apiClient.post('/ProfilePicture/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error('Error updating profile picture:', error);
    throw new Error(error.response?.data?.message || 'Failed to update profile picture');
  }
};

const getProfilePicture = async (): Promise<ApiResponse> => {
  try {
    const response = await apiClient.get('/ProfilePicture');
    return response.data;
  } catch (error: any) {
    console.error('Error getting profile picture:', error);
    throw new Error(error.response?.data?.message || 'Failed to get profile picture');
  }
};

const deleteProfilePicture = async (): Promise<ApiResponse> => {
  try {
    const response = await apiClient.delete('/ProfilePicture');
    return response.data;
  } catch (error: any) {
    console.error('Error deleting profile picture:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete profile picture');
  }
};

// Export as default object with all methods
const userService = {
  updateUserName,
  updateUserEmail,
  checkPendingEmailChange,
  cancelEmailChange,
  updateProfilePicture,
  getProfilePicture,
  deleteProfilePicture,
};

export default userService;
