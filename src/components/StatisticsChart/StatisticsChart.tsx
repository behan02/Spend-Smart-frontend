import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { userApi, UserActivityData } from '../../services/userApi';
import { CircularProgress, Alert } from '@mui/material';

const StatisticsChart = () => {
  const [data, setData] = useState<UserActivityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivityStatistics = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching user activity statistics...');
        const activityData = await userApi.getUserActivityStatistics();
        console.log('Activity statistics data received:', activityData);
        setData(activityData);
      } catch (err) {
        console.error('Error fetching activity statistics:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load activity statistics';
        console.log('Full error details:', err);
        setError(`API Error: ${errorMessage}`);
        // Fallback to demo data in case of error
        console.log('Using fallback demo data for statistics chart');
        setData([
          { month: 'May', activeUsers: 1250, newRegistrations: 180 },
          { month: 'Jun', activeUsers: 1320, newRegistrations: 220 },
          { month: 'Jul', activeUsers: 1380, newRegistrations: 195 },
          { month: 'Aug', activeUsers: 1410, newRegistrations: 210 },
          { month: 'Sep', activeUsers: 1450, newRegistrations: 185 },
          { month: 'Oct', activeUsers: 1480, newRegistrations: 200 },
          { month: 'Nov', activeUsers: 1520, newRegistrations: 225 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchActivityStatistics();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 300 }}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '16px' }}>
        <Alert severity="warning" style={{ marginBottom: '16px' }}>
          {error}
        </Alert>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="activeUsers" fill="#0D47A1" name="Active Users" />
            <Bar dataKey="newRegistrations" fill="#e53935" name="New Registrations" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="activeUsers" fill="#0D47A1" name="Active Users" />
        <Bar dataKey="newRegistrations" fill="#e53935" name="New Registrations" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatisticsChart;
