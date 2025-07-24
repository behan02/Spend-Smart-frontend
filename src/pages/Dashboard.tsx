import { 
  Box, 
  Container, 
  Typography
} from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';
import OverviewCards from '../components/OverviewCards/OverviewCards';
import LoginFrequencyChart from '../components/LoginFrequencyChart/LoginFrequencyChart';
import StatisticsChart from '../components/StatisticsChart/StatisticsChart';

const Dashboard = () => {
  return (
    <Box sx={{ 
      display: 'flex',
      minHeight: '100vh', // Ensures the dashboard takes the full height of the screen
      backgroundColor: 'white', // Set background to white
      width: '100%', // Ensure the full width is used
    }}>
      <Sidebar />
      <Box sx={{ 
        flexGrow: 1, 
        backgroundColor: 'white',
        overflowY: 'auto', // Make the main content area scrollable vertically
        height: '100vh', // Ensure the content container takes the full viewport height
        width: '100%', // Ensure the content container spans full width
      }}>
        <Topbar />
        <Container maxWidth="xl" sx={{ mt: 4, padding: 0 }}>
          <OverviewCards />
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            User login frequency
          </Typography>
          <LoginFrequencyChart />
          <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
            Statistics
          </Typography>
          <StatisticsChart />
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
