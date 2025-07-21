import axios from 'axios';

const API_BASE_URL = 'http://localhost:5110/api';

// Configure axios instance for HTTP development (no SSL issues)
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ChangePasswordRequest {
  userId: number;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  success: boolean;
  message: string;
}

// Standalone password change function as backup
export const changePassword = async (request: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
  try {
    console.log('🔐 Sending password change request to:', `${API_BASE_URL}/user/change-password`);
    const response = await apiClient.post('/user/change-password', request);
    return response.data;
  } catch (error: any) {
    console.error('Error changing password:', error);
    throw new Error(error.response?.data?.message || 'Failed to change password');
  }
};
