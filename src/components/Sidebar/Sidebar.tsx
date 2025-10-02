import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/ChatGPT_Image_Jul_23__2025__09_24_00_PM-removebg-preview.png';

const Sidebar = () => {
  const navigate = useNavigate(); //  for navigation programmatically

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          backgroundColor: '#0D47A1',
          color: '#fff',
        },
      }}
    >
      {/* Logo Section */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          padding: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
        }}
      >
        <img 
          src={Logo} 
          alt="SpendSmart Logo" 
          style={{ 
            height: 150,
            width: '120',
            
            objectFit: 'contain'
          }} 
        />
      </Box>

      <List sx={{ paddingTop: '25px' }}>
        {/* Dashboard Button */}
        <ListItem disablePadding sx={{ marginBottom: '21px' }}>
          <ListItemButton 
            onClick={() => navigate('/')}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateX(8px)',
                transition: 'all 0.3s ease',
                '& .MuiListItemIcon-root': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s ease',
                },
                '& .MuiListItemText-primary': {
                  fontWeight: 'bold',
                  transition: 'font-weight 0.3s ease',
                }
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ListItemIcon sx={{ color: '#fff', transition: 'transform 0.3s ease' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        {/* Manage Users Button */}
        <ListItem disablePadding sx={{ marginBottom: '16px' }}>
          <ListItemButton 
            onClick={() => navigate('/user')}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateX(8px)',
                transition: 'all 0.3s ease',
                '& .MuiListItemIcon-root': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s ease',
                },
                '& .MuiListItemText-primary': {
                  fontWeight: 'bold',
                  transition: 'font-weight 0.3s ease',
                }
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ListItemIcon sx={{ color: '#fff', transition: 'transform 0.3s ease' }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Users" />
          </ListItemButton>
        </ListItem>

        {/* System Settings Button */}
        <ListItem disablePadding sx={{ marginBottom: '16px' }}>
          <ListItemButton 
            onClick={() => navigate('/settings')}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateX(8px)',
                transition: 'all 0.3s ease',
                '& .MuiListItemIcon-root': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s ease',
                },
                '& .MuiListItemText-primary': {
                  fontWeight: 'bold',
                  transition: 'font-weight 0.3s ease',
                }
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ListItemIcon sx={{ color: '#fff', transition: 'transform 0.3s ease' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="System Settings" />
          </ListItemButton>
        </ListItem>

        {/* Logout Button */}
        <ListItem disablePadding>
          <ListItemButton
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateX(8px)',
                transition: 'all 0.3s ease',
                '& .MuiListItemIcon-root': {
                  transform: 'scale(1.1)',
                  transition: 'transform 0.3s ease',
                },
                '& .MuiListItemText-primary': {
                  fontWeight: 'bold',
                  transition: 'font-weight 0.3s ease',
                }
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ListItemIcon sx={{ color: '#fff', transition: 'transform 0.3s ease' }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
