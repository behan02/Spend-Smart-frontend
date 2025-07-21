import { AxiosError } from 'axios';

// Error handling utility
export const handleApiError = (error: AxiosError | any): string => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Server responded with error status
    switch (error.response.status) {
      case 400:
        return error.response.data?.message || 'Bad request';
      case 401:
        return 'Unauthorized. Please log in again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'Resource not found';
      case 409:
        return error.response.data?.message || 'Conflict occurred';
      case 422:
        return 'Validation error. Please check your input.';
      case 500:
        return 'Server error. Please try again later.';
      default:
        return error.response.data?.message || 'An unexpected error occurred';
    }
  } else if (error.request) {
    // Network error
    return 'Network error. Please check your connection and try again.';
  } else {
    // Other error
    return error.message || 'An unexpected error occurred';
  }
};

// Generic API success response type
export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

// Generic API error response type
export interface ApiErrorResponse {
  success: false;
  error: string;
  message?: string;
}

// Environment configuration for Vite
export const getApiBaseUrl = (): string => {
  // In a real application, you would use environment variables
  // For development
  if (import.meta.env.DEV) {
    return import.meta.env.VITE_API_URL || 'http://localhost:5110/api';
  }
  
  // For production
  return import.meta.env.VITE_API_URL || 'https://your-production-api.com/api';
};

// Validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || !value.trim()) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateMinLength = (value: string, minLength: number, fieldName: string): string | null => {
  if (value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters long`;
  }
  return null;
};

// Token management utilities
export const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

export const setAuthToken = (token: string): void => {
  localStorage.setItem('authToken', token);
};

export const removeAuthToken = (): void => {
  localStorage.removeItem('authToken');
};

// Generic loading state type
export interface LoadingState {
  [key: string]: boolean;
}

// Generic error state type
export interface ErrorState {
  [key: string]: string;
}

// Generic success state type
export interface SuccessState {
  [key: string]: string;
}