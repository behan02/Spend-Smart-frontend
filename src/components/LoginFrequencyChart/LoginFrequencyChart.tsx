import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { userApi, LoginFrequencyData } from '../../services/userApi';
import { CircularProgress, Alert } from '@mui/material';

const LoginFrequencyChart = () => {
  const [data, setData] = useState<LoginFrequencyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLoginFrequency = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching login frequency data...');
        const frequencyData = await userApi.getLoginFrequency();
        console.log('Login frequency data received:', frequencyData);
        setData(frequencyData);
      } catch (err) {
        console.error('Error fetching login frequency:', err);
        const errorMessage = err instanceof Error ? err.message : 'Failed to load login frequency data';
        setError(`API Error: ${errorMessage}`);
        // NO fallback data - show real data only
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLoginFrequency();
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
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis domain={[0, 20]} ticks={[0, 5, 10, 15, 20]} />
        <Tooltip />
        <Line type="monotone" dataKey="logins" stroke="#0D47A1" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LoginFrequencyChart;
