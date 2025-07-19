import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

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
      <List>
        {/* Dashboard Button */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/')}>
            <ListItemIcon sx={{ color: '#fff' }}>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>

        {/* Manage Users Button */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/user')}>
            <ListItemIcon sx={{ color: '#fff' }}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Users" />
          </ListItemButton>
        </ListItem>

        {/* System Settings Button */}
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/settings')}>
            <ListItemIcon sx={{ color: '#fff' }}>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="System Settings" />
          </ListItemButton>
        </ListItem>

        {/* Logout Button */}
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{ color: '#fff' }}>
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
