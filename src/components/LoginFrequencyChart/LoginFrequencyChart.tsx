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
        console.log('Full error details:', err);
        setError(`API Error: ${errorMessage}`);
        // Fallback to demo data in case of error
        console.log('Using fallback demo data');
        setData([
          { month: 'JAN', logins: 400 },
          { month: 'FEB', logins: 500 },
          { month: 'MAR', logins: 450 },
          { month: 'APR', logins: 480 },
          { month: 'MAY', logins: 520 },
        ]);
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
        <Alert severity="warning" style={{ marginBottom: '16px' }}>
          {error}
        </Alert>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="logins" stroke="#0D47A1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="logins" stroke="#0D47A1" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LoginFrequencyChart;
