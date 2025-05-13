import { BarChart } from '@mui/x-charts/BarChart';
import { Box } from '@mui/material';

const chartSetting = {
  yAxis: [
    {
      label: '',
      width: 60,
    },
  ],
  height: 300,
};

export const dataset = [
  { month: 'Jan', Income: 59, Expenses: 57 },
  { month: 'Feb', Income: 50, Expenses: 52 },
  { month: 'Mar', Income: 47, Expenses: 53 },
  { month: 'Apr', Income: 54, Expenses: 56 },
  { month: 'May', Income: 57, Expenses: 69 },
  { month: 'Jun', Income: 60, Expenses: 63 },
  { month: 'Jul', Income: 59, Expenses: 60 },
  { month: 'Aug', Income: 65, Expenses: 60 },
  { month: 'Sep', Income: 51, Expenses: 51 },
  { month: 'Oct', Income: 60, Expenses: 65 },
  { month: 'Nov', Income: 67, Expenses: 64 },
  { month: 'Dec', Income: 61, Expenses: 70 },
];

export function valueFormatter(value: number | null) {
  return `${value}`;
}

export default function BarsDataset() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 500,
        ml: 105,
        mt: -112,
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#fff',
      }}
    >
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: 'band', dataKey: 'month' }]} 
      series={[
        { dataKey: 'Income', label: 'Income', valueFormatter ,color:'blue'},
        { dataKey: 'Expenses', label: 'Expenses', valueFormatter,color:'red' },
      ]}
      {...chartSetting}
      width={500}
        height={350}
    />
</Box>
  );
}