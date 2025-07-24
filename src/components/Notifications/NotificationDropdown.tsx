import React, { useState } from 'react';
import {
  Menu,
  MenuItem,
  Typography,
  Box,
  Button,
  Divider,
  CircularProgress,
  Alert,
  Chip,
  IconButton,
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNotifications } from '../../contexts/NotificationContext';
import { notificationApi, NotificationResponse } from '../../services/notificationApi';

interface NotificationDropdownProps {
  anchorEl: HTMLElement | null;
  open: boolean;
  onClose: () => void;
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  anchorEl,
  open,
  onClose,
}) => {
  const { 
    notifications, 
    unreadCount, 
    loading, 
    error, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();

  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [viewingAll, setViewingAll] = useState(false);
  const [allNotifications, setAllNotifications] = useState<NotificationResponse[]>([]);
  const [allNotificationsLoading, setAllNotificationsLoading] = useState(false);

  const handleMarkAsRead = async (notificationId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setActionLoading(notificationId);
    try {
      await markAsRead(notificationId);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeleteNotification = async (notificationId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setActionLoading(notificationId);
    try {
      await deleteNotification(notificationId);
    } finally {
      setActionLoading(null);
    }
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleViewAllNotifications = async () => {
    setAllNotificationsLoading(true);
    try {
      const response = await notificationApi.getAllNotifications(1, 50); // Get first 50 notifications
      setAllNotifications(response.notifications);
      setViewingAll(true);
    } catch (error) {
      console.error('Failed to load all notifications:', error);
    } finally {
      setAllNotificationsLoading(false);
    }
  };

  const handleBackToSummary = () => {
    setViewingAll(false);
    setAllNotifications([]);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#f44336';
      case 'Medium': return '#ff9800';
      case 'Low': return '#4caf50';
      default: return '#2196f3';
    }
  };

  const getNotificationIcon = (type: string) => {
    return notificationApi.getNotificationIcon(type);
  };

  const handleClose = () => {
    handleBackToSummary(); // Reset to summary view when closing
    onClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: 380,
          maxHeight: 500,
          mt: 1,
          '& .MuiMenuItem-root': {
            whiteSpace: 'normal',
            alignItems: 'flex-start',
            padding: 2,
          },
        },
      }}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {/* Header */}
      <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            {viewingAll && (
              <IconButton size="small" onClick={handleBackToSummary}>
                <ArrowBackIcon />
              </IconButton>
            )}
            <Typography variant="h6" fontWeight="bold">
              {viewingAll ? 'All Notifications' : 'Notifications'}
            </Typography>
          </Box>
          {!viewingAll && unreadCount > 0 && (
            <Chip 
              label={`${unreadCount} unread`} 
              size="small" 
              color="primary" 
            />
          )}
        </Box>
        
        {!viewingAll && unreadCount > 0 && (
          <Button
            size="small"
            onClick={handleMarkAllAsRead}
            sx={{ mt: 1 }}
            startIcon={<MarkEmailReadIcon />}
          >
            Mark All as Read
          </Button>
        )}
      </Box>

      {/* Loading State */}
      {((loading && notifications.length === 0) || allNotificationsLoading) && (
        <Box display="flex" justifyContent="center" p={3}>
          <CircularProgress size={24} />
        </Box>
      )}

      {/* Error State */}
      {error && (
        <Box p={2}>
          <Alert severity="error">
            {error}
          </Alert>
        </Box>
      )}

      {/* No Notifications */}
      {!loading && !error && !allNotificationsLoading && 
       ((viewingAll && allNotifications.length === 0) || 
        (!viewingAll && notifications.length === 0)) && (
        <Box p={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            🔔 No notifications yet
          </Typography>
          <Typography variant="caption" color="text.secondary">
            You'll see new user registrations, inactive users, and email service alerts here.
          </Typography>
        </Box>
      )}

      {/* Notifications List */}
      {!allNotificationsLoading && (viewingAll ? allNotifications : notifications).map((notification) => (
        <MenuItem
          key={notification.id}
          sx={{
            backgroundColor: notification.isRead ? 'transparent' : '#f3f4f6',
            borderLeft: `4px solid ${getPriorityColor(notification.priority)}`,
            '&:hover': {
              backgroundColor: notification.isRead ? '#f9f9f9' : '#e8f4fd',
            },
          }}
        >
          <Box sx={{ width: '100%' }}>
            {/* Notification Header */}
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body2">
                  {getNotificationIcon(notification.type)}
                </Typography>
                <Typography variant="subtitle2" fontWeight="bold">
                  {notification.title}
                </Typography>
              </Box>
              
              <Box display="flex" gap={0.5}>
                {!notification.isRead && (
                  <Tooltip title="Mark as read">
                    <IconButton
                      size="small"
                      onClick={(e) => handleMarkAsRead(notification.id, e)}
                      disabled={actionLoading === notification.id}
                    >
                      {actionLoading === notification.id ? (
                        <CircularProgress size={16} />
                      ) : (
                        <MarkEmailReadIcon fontSize="small" />
                      )}
                    </IconButton>
                  </Tooltip>
                )}
                
                <Tooltip title="Delete">
                  <IconButton
                    size="small"
                    onClick={(e) => handleDeleteNotification(notification.id, e)}
                    disabled={actionLoading === notification.id}
                  >
                    {actionLoading === notification.id ? (
                      <CircularProgress size={16} />
                    ) : (
                      <DeleteIcon fontSize="small" />
                    )}
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Notification Message */}
            <Typography variant="body2" color="text.secondary" mb={1}>
              {notification.message}
            </Typography>

            {/* Notification Footer */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="caption" color="text.secondary">
                {notification.timeAgo}
              </Typography>
              
              <Chip
                label={notification.priority}
                size="small"
                sx={{
                  backgroundColor: getPriorityColor(notification.priority),
                  color: 'white',
                  fontSize: '0.65rem',
                  height: 20,
                }}
              />
            </Box>
          </Box>
        </MenuItem>
      ))}

      {/* Footer */}
      {!viewingAll && notifications.length > 0 && (
        <>
          <Divider />
          <Box p={2} textAlign="center">
            <Button 
              size="small" 
              onClick={handleViewAllNotifications}
              disabled={allNotificationsLoading}
            >
              View All Notifications
            </Button>
          </Box>
        </>
      )}
    </Menu>
  );
};

export default NotificationDropdown;
