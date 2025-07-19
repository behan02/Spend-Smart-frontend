// User API interfaces and types
export interface UserResponse {
  id: number;
  userName: string;
  firstName?: string;
  lastName?: string;
  email: string;
  currency: string;
  createdAt: string;
  lastLoginAt?: string;
  isActive: boolean;
  status: string;
  updatedAt?: string;
  fullName: string;
  lastLoginDisplay: string;
  statusBadgeColor: string;
}

export interface UserStatistics {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  newUsersThisMonth: number;
  totalGrowthPercentage: number;
}

export interface LoginFrequencyData {
  month: string;
  logins: number;
}

export interface UserActivityData {
  month: string;
  activeUsers: number;
  newRegistrations: number;
}

// API Base URL - adjust this to match your backend
const API_BASE_URL = 'http://localhost:5110/api';

class UserApiService {
  
  // Get all users (Admin only)
  async getAllUsers(): Promise<UserResponse[]> {
    const response = await fetch(`${API_BASE_URL}/User`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  // Get specific user by ID (Admin only - for viewing)
  async getUser(id: number): Promise<UserResponse> {
    const response = await fetch(`${API_BASE_URL}/User/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  // Delete user (Admin only - for account management)
  async deleteUser(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/User/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Failed to delete user: ${response.status} ${response.statusText}`);
    }
  }

  // Suspend user (Admin only)
  async suspendUser(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/User/${id}/suspend`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to suspend user: ${response.status} ${response.statusText}`);
    }
  }

  // Activate user (Admin only)
  async activateUser(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/User/${id}/activate`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to activate user: ${response.status} ${response.statusText}`);
    }
  }

  // Update last login time (For user authentication system)
  async updateLastLogin(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/User/${id}/login`, {
      method: 'PUT',
    });

    if (!response.ok) {
      throw new Error(`Failed to update last login: ${response.status} ${response.statusText}`);
    }
  }

  // Get user statistics for dashboard (Admin only)
  async getUserStatistics(): Promise<UserStatistics> {
    const response = await fetch(`${API_BASE_URL}/User/statistics`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user statistics: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  }

  // Get login frequency data for chart (Admin only)
  async getLoginFrequency(): Promise<LoginFrequencyData[]> {
    try {
      console.log('Making request to:', `${API_BASE_URL}/User/login-frequency`);
      const response = await fetch(`${API_BASE_URL}/User/login-frequency`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response body:', errorText);
        throw new Error(`Failed to fetch login frequency: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Parsed response data:', data);
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }

  // Get user activity statistics for bar chart (Admin only)
  async getUserActivityStatistics(): Promise<UserActivityData[]> {
    try {
      console.log('Making request to:', `${API_BASE_URL}/User/activity-statistics`);
      const response = await fetch(`${API_BASE_URL}/User/activity-statistics`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Activity stats response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Activity stats error response body:', errorText);
        throw new Error(`Failed to fetch activity statistics: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('Activity stats data received:', data);
      return data;
    } catch (error) {
      console.error('Activity stats fetch error:', error);
      throw error;
    }
  }
}

// Create a singleton instance
export const userApi = new UserApiService();
