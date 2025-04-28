import { AppBar, Toolbar, Typography, InputBase, Box, IconButton, Badge, Avatar } from '@mui/material';
import { styled } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#f1f3f4', // very soft gray
  '&:hover': {
    backgroundColor: '#e0e0e0',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  maxWidth: 250,
  display: 'flex',
  alignItems: 'center',
  padding: '4px 10px',
}));

const Topbar = () => {
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

        {/* Right Side: Search, Notification, Profile */}
        <Box display="flex" alignItems="center">
          
          {/* Search */}
          <Search>
            <SearchIcon color="action" />
            <InputBase placeholder="Search..." sx={{ ml: 1, width: '100%' }} />
          </Search>

          {/* Notification */}
          <IconButton sx={{ color: '#555' }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          {/* Avatar/Profile */}
          <IconButton sx={{ ml: 2 }}>
            <Avatar alt="Admin" src="/static/images/avatar/1.jpg" />
          </IconButton>

        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
