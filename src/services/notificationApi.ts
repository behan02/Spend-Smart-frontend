// Notification API Service for frontend
export interface NotificationResponse {
  id: number;
  type: string;
  title: string;
  message: string;
  priority: string;
  isRead?: boolean;
  createdAt: string;
  relatedUserId?: number;
  relatedUserName?: string;
  timeAgo: string;
}

export interface NotificationCountResponse {
  count: number;
  notifications: NotificationResponse[];
}

export interface NotificationListResponse {
  page: number;
  pageSize: number;
  notifications: NotificationResponse[];
}

// API Base URL
const API_BASE_URL = 'http://localhost:5110/api';

class NotificationApiService {
  
  // Get unread notifications with count
  async getUnreadNotifications(): Promise<NotificationCountResponse> {
    const response = await fetch(`${API_BASE_URL}/Notification/unread`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch unread notifications: ${response.statusText}`);
    }

    return response.json();
  }

  // Get all notifications with pagination
  async getAllNotifications(page: number = 1, pageSize: number = 20): Promise<NotificationListResponse> {
    const response = await fetch(`${API_BASE_URL}/Notification?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch notifications: ${response.statusText}`);
    }

    return response.json();
  }

  // Mark specific notification as read
  async markAsRead(notificationId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/Notification/${notificationId}/read`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to mark notification as read: ${response.statusText}`);
    }
  }

  // Mark all notifications as read
  async markAllAsRead(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/Notification/mark-all-read`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to mark all notifications as read: ${response.statusText}`);
    }
  }

  // Delete specific notification
  async deleteNotification(notificationId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/Notification/${notificationId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete notification: ${response.statusText}`);
    }
  }

  // Cleanup expired notifications (admin only)
  async cleanupExpiredNotifications(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/Notification/cleanup`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to cleanup notifications: ${response.statusText}`);
    }
  }

  // Helper method to get notification icon based on type
  getNotificationIcon(type: string): string {
    switch (type) {
      case 'NewUser':
        return '👤';
      case 'InactiveUser':
        return '😴';
      case 'EmailServiceFailure':
        return '📧';
      default:
        return '🔔';
    }
  }

  // Helper method to get notification color based on priority
  getNotificationColor(priority: string): string {
    switch (priority) {
      case 'High':
        return '#f44336'; // Red
      case 'Medium':
        return '#ff9800'; // Orange
      case 'Low':
        return '#4caf50'; // Green
      default:
        return '#2196f3'; // Blue
    }
  }
}

// Export singleton instance
export const notificationApi = new NotificationApiService();
