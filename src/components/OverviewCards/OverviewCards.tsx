import { useState, useEffect } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  Alert,
  Chip,
  CardContent
} from '@mui/material';
import { userApi, UserStatistics } from '../../services/userApi';

const OverviewCards = () => {
  const [userStats, setUserStats] = useState<UserStatistics | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserStatistics();
  }, []);

  const loadUserStatistics = async () => {
    try {
      setError(null);
      setLoading(true);
      const statsData = await userApi.getUserStatistics();
      setUserStats(statsData);
    } catch (err: any) {
      console.error('Error loading user statistics:', err);
      setError(`Failed to load user statistics: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
        {[1, 2, 3, 4].map((index) => (
          <Card 
            key={index} 
            sx={{ 
              flex: { xs: '1 1 100%', sm: '1 1 48%', md: '1 1 22%' }, 
              p: 2,
              background: 'linear-gradient(135deg, #F5F5F5 0%, #FFFFFF 100%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              border: '1px solid rgba(0, 0, 0, 0.05)',
              height: '140px',
              display: 'flex',
              flexDirection: 'column',
              cursor: 'pointer',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-5px) scale(1.02)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
                border: '1px solid rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            <CardContent sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant="body2" color="textSecondary">Loading...</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2, mb: 2 }} onClose={() => setError(null)}>
        {error}
      </Alert>
    );
  }

  if (!userStats) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2, mb: 4 }}>
      {/* Total Users Card */}
      <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 48%', md: '1 1 22%' } }}>
        <Card sx={{ 
          background: 'linear-gradient(135deg, #E3F2FD 0%, #FFFFFF 100%)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid rgba(33, 150, 243, 0.1)',
          height: '140px',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px) scale(1.02)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            border: '1px solid rgba(33, 150, 243, 0.2)'
          }
        }}>
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Total Users
            </Typography>
            <Typography variant="h4" component="div">
              {userStats.totalUsers}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              +{userStats.newUsersThisMonth} this month
            </Typography>
          </CardContent>
        </Card>
      </Box>
      
      {/* Active Users Card */}
      <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 48%', md: '1 1 22%' } }}>
        <Card sx={{ 
          background: 'linear-gradient(135deg, #E8F5E8 0%, #FFFFFF 100%)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid rgba(76, 175, 80, 0.1)',
          height: '140px',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px) scale(1.02)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            border: '1px solid rgba(76, 175, 80, 0.2)'
          }
        }}>
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Active Users
            </Typography>
            <Typography variant="h4" component="div" color="success.main">
              {userStats.activeUsers}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Chip label="Active" color="success" size="small" sx={{ width: 'auto', minWidth: 'auto' }} />
            </Box>
          </CardContent>
        </Card>
      </Box>
      
      {/* Inactive Users Card */}
      <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 48%', md: '1 1 22%' } }}>
        <Card sx={{ 
          background: 'linear-gradient(135deg, #FFF3E0 0%, #FFFFFF 100%)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255, 152, 0, 0.1)',
          height: '140px',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px) scale(1.02)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            border: '1px solid rgba(255, 152, 0, 0.2)'
          }
        }}>
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Inactive Users
            </Typography>
            <Typography variant="h4" component="div" color="warning.main">
              {userStats.inactiveUsers}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Chip label="Needs Attention" color="warning" size="small" sx={{ width: 'auto', minWidth: 'auto' }} />
            </Box>
          </CardContent>
        </Card>
      </Box>
      
      {/* Growth Rate Card */}
      <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 48%', md: '1 1 22%' } }}>
        <Card sx={{ 
          background: 'linear-gradient(135deg, #F3E5F5 0%, #FFFFFF 100%)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          border: '1px solid rgba(156, 39, 176, 0.1)',
          height: '140px',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px) scale(1.02)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            border: '1px solid rgba(156, 39, 176, 0.2)'
          }
        }}>
          <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Typography color="textSecondary" gutterBottom variant="body2">
              Growth Rate
            </Typography>
            <Typography variant="h4" component="div" color="primary.main">
              {userStats.totalGrowthPercentage}%
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Monthly growth
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default OverviewCards;
