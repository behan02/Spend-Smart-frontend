import axios from 'axios';
import { getApiBaseUrl } from '../Utils/apiUtils';

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

class PasswordService {
  private apiBaseUrl: string;

  constructor() {
    this.apiBaseUrl = getApiBaseUrl();
  }

  /**
   * Change user password
   */
  async changePassword(request: ChangePasswordRequest): Promise<ChangePasswordResponse> {
    try {
      console.log('🔐 Sending password change request:', {
        userId: request.userId,
        hasCurrentPassword: !!request.currentPassword,
        hasNewPassword: !!request.newPassword,
        hasConfirmPassword: !!request.confirmPassword
      });

      const response = await axios.post<ChangePasswordResponse>(
        `${this.apiBaseUrl}/User/change-password`,
        request,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('🔐 Password change response:', response.data);
      return response.data;
    } catch (error) {
      console.error('🔐 Password change error:', error);
      
      if (axios.isAxiosError(error)) {
        // Handle specific HTTP status codes
        if (error.response?.status === 400) {
          return {
            success: false,
            message: error.response.data?.message || 'Bad request. Please check your input.'
          };
        } else if (error.response?.status === 401) {
          return {
            success: false,
            message: 'Current password is incorrect.'
          };
        } else if (error.response?.status >= 500) {
          return {
            success: false,
            message: 'Server error. Please try again later.'
          };
        } else if (error.code === 'ERR_NETWORK') {
          return {
            success: false,
            message: 'Network error. Please check your connection and make sure the server is running.'
          };
        }
      }

      return {
        success: false,
        message: 'An unexpected error occurred. Please try again.'
      };
    }
  }

  /**
   * Validate password strength
   */
  validatePasswordStrength(password: string): {
    isValid: boolean;
    score: number;
    feedback: string[];
  } {
    const feedback: string[] = [];
    let score = 0;

    if (password.length < 6) {
      feedback.push('Password must be at least 6 characters long');
      return { isValid: false, score: 0, feedback };
    }

    score += 1; // Base score for minimum length

    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('Consider using at least 8 characters for better security');
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include at least one uppercase letter');
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include at least one lowercase letter');
    }

    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include at least one number');
    }

    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      score += 1;
    } else {
      feedback.push('Include at least one special character');
    }

    return {
      isValid: score >= 3,
      score: Math.min(score, 4),
      feedback
    };
  }
}

// Export singleton instance
export const passwordService = new PasswordService();
export default passwordService;
