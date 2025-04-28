import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'JAN', logins: 400 },
  { month: 'FEB', logins: 500 },
  { month: 'MAR', logins: 450 },
  { month: 'APR', logins: 480 },
  { month: 'MAY', logins: 520 },
];

const LoginFrequencyChart = () => {
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
