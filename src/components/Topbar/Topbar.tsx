import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAdminProfile } from '../../contexts/AdminProfileContext';
import { useNotifications } from '../../contexts/NotificationContext';
import NotificationDropdown from '../Notifications/NotificationDropdown';

const Topbar = () => {
  const { adminProfile, profilePictureUrl } = useAdminProfile();
  const { unreadCount } = useNotifications();
  
  // State for notification dropdown
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);
  const isNotificationOpen = Boolean(notificationAnchorEl);

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };
  
  // Debug log to see what we're getting
  console.log('Topbar - profilePictureUrl:', profilePictureUrl ? profilePictureUrl.substring(0, 50) + '...' : 'null');
  console.log('Topbar - adminProfile:', adminProfile?.name);
  console.log('Topbar - unreadCount:', unreadCount);
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)',
        color: '#333',
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        
        {/* Left Side: Welcome Text */}
        <Typography variant="h6" noWrap fontWeight="bold" color="primary">
          Admin
        </Typography>

        {/* Right Side: Notification, Profile */}
        <Box display="flex" alignItems="center">
          
          {/* Notification */}
          <IconButton 
            sx={{ color: '#555' }}
            onClick={handleNotificationClick}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Notification Dropdown */}
          <NotificationDropdown
            anchorEl={notificationAnchorEl}
            open={isNotificationOpen}
            onClose={handleNotificationClose}
          />

          {/* Avatar/Profile */}
          <IconButton sx={{ ml: 2 }}>
            <Avatar 
              alt={adminProfile?.name || "Admin"} 
              src={profilePictureUrl ? (
                profilePictureUrl.startsWith('data:') 
                  ? profilePictureUrl 
                  : `data:image/jpeg;base64,${profilePictureUrl}`
              ) : undefined}
              sx={{ 
                width: 32, 
                height: 32,
                fontSize: '0.875rem',
                backgroundColor: profilePictureUrl ? 'transparent' : '#9e9e9e',
                color: '#ffffff',
                fontWeight: 'bold'
              }}
            >
              {!profilePictureUrl && (adminProfile?.name?.charAt(0).toUpperCase() || "A")}
            </Avatar>
          </IconButton>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
