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
        setError(`API Error: ${errorMessage}`);
        // NO fallback data - show real data only
        setData([]);
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
        <Alert severity="error">
          {error} - Please check your backend connection and database.
        </Alert>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis domain={[0, 20]} ticks={[0, 5, 10, 15, 20]} />
        <Tooltip />
        <Legend />
        <Bar dataKey="activeUsers" fill="#0D47A1" name="Active Users" />
        <Bar dataKey="newRegistrations" fill="#74d9f2ff" name="New Registrations" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatisticsChart;
