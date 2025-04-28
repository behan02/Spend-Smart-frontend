import { Box, Container, Typography, Switch, FormControlLabel, Select, MenuItem, Button, TextField, Avatar, Stack } from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';

const SystemSettingsPage = () => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <Topbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          {/* System Maintenance */}
          <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>System Maintenance</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Enable maintenance mode to temporarily restrict user access while performing system updates.
            </Typography>
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Enable Maintenance Mode"
            />
          </Box>

          {/* User Interface color theme */}
          <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: 3, mb: 4 }}>
            <Typography variant="h6" gutterBottom>User Interface Color Theme</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Choose a color theme for the user interface
            </Typography>
            <Select
              defaultValue="darkBlue"
              sx={{ width: 200 }}
            >
              <MenuItem value="darkBlue">Dark Blue</MenuItem>
              <MenuItem value="lightBlue">Light Blue</MenuItem>
              <MenuItem value="white">White</MenuItem>
            </Select>
          </Box>

          {/* Profile Settings */}
          <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>Profile Settings</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Update your profile information and preferences
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
              <Avatar
                alt="User"
                src="https://i.pravatar.cc/150?img=3" // Dummy profile picture
                sx={{ width: 80, height: 80 }}
              />
              <Stack direction="row" spacing={2}>
                <Button variant="contained" color="primary">Change Picture</Button>
                <Button variant="contained" color="error">Delete Picture</Button>
              </Stack>
            </Stack>

            <Stack spacing={3}>
              <TextField fullWidth label="First Name" variant="outlined" />
              <TextField fullWidth label="Last Name" variant="outlined" />
              <TextField fullWidth label="E-mail" variant="outlined" />
              <TextField fullWidth label="Current Password" variant="outlined" type="password" />
              <TextField fullWidth label="New Password" variant="outlined" type="password" />
              <TextField fullWidth label="Re-enter New Password" variant="outlined" type="password" />
              <Box textAlign="right">
                <Button variant="contained" sx={{ mt: 2, px: 5, py: 1.5 }} color="primary">
                  Save
                </Button>
              </Box>
            </Stack>

          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default SystemSettingsPage;
