import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { notificationApi, NotificationResponse, NotificationCountResponse } from '../services/notificationApi';

interface NotificationContextType {
  notifications: NotificationResponse[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  
  // Methods
  refreshNotifications: () => Promise<void>;
  markAsRead: (notificationId: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (notificationId: number) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationResponse[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-refresh notifications every 30 seconds
  useEffect(() => {
    refreshNotifications(); // Initial load
    
    const interval = setInterval(() => {
      refreshNotifications();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshNotifications = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const response: NotificationCountResponse = await notificationApi.getUnreadNotifications();
      
      setNotifications(response.notifications);
      setUnreadCount(response.count);
      
      console.log('Notifications refreshed:', response.count, 'unread');
    } catch (err: any) {
      console.error('Error refreshing notifications:', err);
      setError('Failed to load notifications');
      
      // Don't show error to user for auto-refresh failures
      // Just log it and continue with existing data
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: number): Promise<void> => {
    try {
      await notificationApi.markAsRead(notificationId);
      
      // Update local state
      setNotifications(prev => 
        prev.map(n => 
          n.id === notificationId 
            ? { ...n, isRead: true }
            : n
        )
      );
      
      // Decrease unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
      
      console.log(`Notification ${notificationId} marked as read`);
    } catch (err: any) {
      console.error('Error marking notification as read:', err);
      setError('Failed to mark notification as read');
    }
  };

  const markAllAsRead = async (): Promise<void> => {
    try {
      await notificationApi.markAllAsRead();
      
      // Update local state
      setNotifications(prev => 
        prev.map(n => ({ ...n, isRead: true }))
      );
      setUnreadCount(0);
      
      console.log('All notifications marked as read');
    } catch (err: any) {
      console.error('Error marking all notifications as read:', err);
      setError('Failed to mark all notifications as read');
    }
  };

  const deleteNotification = async (notificationId: number): Promise<void> => {
    try {
      await notificationApi.deleteNotification(notificationId);
      
      // Update local state
      const deletedNotification = notifications.find(n => n.id === notificationId);
      setNotifications(prev => prev.filter(n => n.id !== notificationId));
      
      // Decrease unread count if it was unread
      if (deletedNotification && !deletedNotification.isRead) {
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
      
      console.log(`Notification ${notificationId} deleted`);
    } catch (err: any) {
      console.error('Error deleting notification:', err);
      setError('Failed to delete notification');
    }
  };

  const value: NotificationContextType = {
    notifications,
    unreadCount,
    loading,
    error,
    refreshNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook to use notification context
export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export default NotificationContext;
