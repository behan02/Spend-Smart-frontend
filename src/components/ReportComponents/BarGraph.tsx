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
  
];

export function valueFormatter(value: number | null) {
  return `${value}`;
}

export default function BarsDataset() {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 900,
        margin: '0 auto',
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
      width={400}
        height={300}
    />
</Box>
  );
}