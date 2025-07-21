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
          { month: 'Jan', activeUsers: 1180, newRegistrations: 150 },
          { month: 'Feb', activeUsers: 1220, newRegistrations: 165 },
          { month: 'Mar', activeUsers: 1280, newRegistrations: 190 },
          { month: 'Apr', activeUsers: 1320, newRegistrations: 205 },
          { month: 'May', activeUsers: 1380, newRegistrations: 220 },
          { month: 'Jun', activeUsers: 1450, newRegistrations: 240 },
          { month: 'Jul', activeUsers: 1520, newRegistrations: 260 },
          { month: 'Aug', activeUsers: 1490, newRegistrations: 245 },
          { month: 'Sep', activeUsers: 1430, newRegistrations: 215 },
          { month: 'Oct', activeUsers: 1390, newRegistrations: 195 },
          { month: 'Nov', activeUsers: 1350, newRegistrations: 175 },
          { month: 'Dec', activeUsers: 1320, newRegistrations: 160 },
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
            <Bar dataKey="newRegistrations" fill="#28baefff" name="New Registrations" />
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
        <Bar dataKey="newRegistrations" fill="#74d9f2ff" name="New Registrations" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatisticsChart;
