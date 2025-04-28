import { Box, Container, Typography, Breadcrumbs, Link, Paper } from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';
import ManageUsersTable from '../components/ManageUsers/ManageUsersTable'; // We'll assume you have a Table component ready

const ManageUsersPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: 'white',
        width: '100%',
      }}
    >
      <Sidebar />
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: 'white',
          overflowY: 'auto',
          height: '100vh',
          width: '100%',
        }}
      >
        <Topbar />
        <Container maxWidth="xl" sx={{ mt: 4, padding: 0 }}>
          
          {/* Breadcrumb */}
          <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
            
            <Typography color="text.primary">Manage Users</Typography>
          </Breadcrumbs>

          {/* Page Title */}
          <Typography variant="h4" sx={{ mb: 4 }}>
            Manage Users
          </Typography>

          {/* Users Table inside a nice Paper card */}
          <Paper elevation={3} sx={{ p: 2 }}>
            <ManageUsersTable />
          </Paper>

        </Container>
      </Box>
    </Box>
  );
};

export default ManageUsersPage;
