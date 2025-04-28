import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { month: 'May', income: 9000, expense: 3000 },
  { month: 'Jun', income: 8500, expense: 2800 },
  { month: 'Jul', income: 8700, expense: 4000 },
  { month: 'Aug', income: 8600, expense: 3800 },
  { month: 'Sep', income: 8800, expense: 3200 },
  { month: 'Oct', income: 8700, expense: 3100 },
  { month: 'Nov', income: 8900, expense: 3300 },
];

const StatisticsChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="income" fill="#0D47A1" />
        <Bar dataKey="expense" fill="#e53935" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default StatisticsChart;
