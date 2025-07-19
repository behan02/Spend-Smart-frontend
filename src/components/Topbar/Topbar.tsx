import { AppBar, Toolbar, Typography, Box, IconButton, Badge, Avatar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useAdminProfile } from '../../contexts/AdminProfileContext';

const Topbar = () => {
  const { adminProfile, profilePictureUrl } = useAdminProfile();
  
  // Debug log to see what we're getting
  console.log('Topbar - profilePictureUrl:', profilePictureUrl ? profilePictureUrl.substring(0, 50) + '...' : 'null');
  console.log('Topbar - adminProfile:', adminProfile?.name);
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
          <IconButton sx={{ color: '#555' }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

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
                fontSize: '0.875rem'
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
