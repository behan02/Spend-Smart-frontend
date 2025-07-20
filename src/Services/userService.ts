import axios from 'axios';

const API_BASE_URL = 'http://localhost:5110/api';

export interface UpdateNameRequest {
  userId: number;
  userName: string;
}

export interface UpdateEmailRequest {
  userId: number;
  email: string;
}

export interface ApiResponse {
  success: boolean;
  message: string;
  [key: string]: any;
}

class UserService {
  async updateUserName(request: UpdateNameRequest): Promise<ApiResponse> {
    try {
      const response = await axios.put(`${API_BASE_URL}/user/update-name`, request, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error updating user name:', error);
      throw new Error(error.response?.data?.message || 'Failed to update name');
    }
  }

  async updateUserEmail(request: UpdateEmailRequest): Promise<ApiResponse> {
    try {
      const response = await axios.put(`${API_BASE_URL}/user/update-email`, request, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error: any) {
      console.error('Error updating user email:', error);
      throw new Error(error.response?.data?.message || 'Failed to update email');
    }
  }

  async getUserProfile(userId: number): Promise<any> {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error getting user profile:', error);
      throw new Error(error.response?.data?.message || 'Failed to get user profile');
    }
  }
}

export const userService = new UserService();