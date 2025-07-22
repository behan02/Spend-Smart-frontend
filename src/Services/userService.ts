import axios from 'axios';

// Base URL for your API - using Vite environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7211/api';

console.log('🔧 API Base URL:', API_BASE_URL);

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log('🚀 Making request to:', (config.baseURL ?? '') + (config.url ?? ''));
    console.log('📦 Request data:', config.data);
    console.log('📋 Request headers:', config.headers);
    
    // Add authorization token if available
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for debugging
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ Response received:', response.status, response.statusText);
    console.log('📄 Response data:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ Response error:', error);
    
    if (error.response) {
      // Server responded with error status
      console.error('🔴 Server Error Details:');
      console.error('Status:', error.response.status);
      console.error('Status Text:', error.response.statusText);
      console.error('Response Data:', error.response.data);
      console.error('Response Headers:', error.response.headers);
    } else if (error.request) {
      // Request was made but no response received
      console.error('🔴 Network Error Details:');
      console.error('Request:', error.request);
      console.error('This usually means CORS issue or server is not running');
    } else {
      // Something else happened
      console.error('🔴 Unknown Error:', error.message);
    }
    
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  }
);

// Data Transfer Objects (matching your backend DTOs)
export interface UpdateUserNameDto {
  userId: number;
  userName: string;
}

export interface UpdateUserEmailDto {
  userId: number;
  email: string;
}

// API Response interfaces
export interface ApiResponse<T = any> {
  message: string;
  data?: T;
}

// User service functions
export const userService = {
  // Test connection
  testConnection: async (): Promise<ApiResponse> => {
    try {
      console.log('🧪 Testing API connection...');
      const response = await apiClient.get('/user/test');
      return response.data;
    } catch (error) {
      console.error('❌ Connection test failed:', error);
      throw error;
    }
  },

  // Get user data
  getUserData: async (userId: number): Promise<{ userId: number; name: string; email: string }> => {
    try {
      console.log('👤 Getting user data for userId:', userId);
      const response = await apiClient.get(`/user/${userId}`);
      const userData = response.data;
      
      // Transform the response to match our frontend interface
      return {
        userId: userData.id,
        name: userData.userName || userData.fullName || `${userData.firstName || ''} ${userData.lastName || ''}`.trim() || 'User',
        email: userData.email
      };
    } catch (error) {
      console.error('❌ Error getting user data:', error);
      throw error;
    }
  },

  // Update user name
  updateUserName: async (dto: UpdateUserNameDto): Promise<ApiResponse> => {
    try {
      console.log('📝 Updating user name...', dto);
      const response = await apiClient.put('/user/update-name', dto);
      return response.data;
    } catch (error) {
      console.error('❌ Error updating user name:', error);
      throw error;
    }
  },

  // Update user email
  updateUserEmail: async (dto: UpdateUserEmailDto): Promise<ApiResponse> => {
    try {
      console.log('📧 Updating user email...', dto);
      const response = await apiClient.put('/user/update-email', dto);
      return response.data;
    } catch (error) {
      console.error('❌ Error updating user email:', error);
      throw error;
    }
  },
};

export default userService;
