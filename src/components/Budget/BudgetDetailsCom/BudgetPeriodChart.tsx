import React from 'react';
import { Box, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';
import { PeriodData } from '../types/BudgetDetails';

interface BudgetPeriodChartProps {
  data: PeriodData[];
  budgetType: 'monthly' | 'annually';
}

const BudgetPeriodChart: React.FC<BudgetPeriodChartProps> = ({ 
  data, 
  budgetType 
}) => {
  // Default data if none provided
  const defaultData = budgetType === 'monthly' 
    ? [
        { date: '4 Jan', amount: 100, cumulativeAmount: 100, budgetLimit: 1458.30 },
        { date: '5 Jan', amount: 120, cumulativeAmount: 220, budgetLimit: 1458.30 },
        { date: '6 Jan', amount: 80, cumulativeAmount: 300, budgetLimit: 1458.30 },
        { date: '7 Jan', amount: 150, cumulativeAmount: 450, budgetLimit: 1458.30 },
        { date: '8 Jan', amount: 90, cumulativeAmount: 540, budgetLimit: 1458.30 },
        { date: '9 Jan', amount: 200, cumulativeAmount: 740, budgetLimit: 1458.30 },
        { date: '10 Jan', amount: 110, cumulativeAmount: 850, budgetLimit: 1458.30 },
        { date: '11 Jan', amount: 130, cumulativeAmount: 980, budgetLimit: 1458.30 },
        { date: '12 Jan', amount: 160, cumulativeAmount: 1140, budgetLimit: 1458.30 },
        { date: '13 Jan', amount: 140, cumulativeAmount: 1280, budgetLimit: 1458.30 },
        { date: '14 Jan', amount: 180, cumulativeAmount: 1460, budgetLimit: 1458.30 },
        { date: '15 Jan', amount: 200, cumulativeAmount: 1660, budgetLimit: 1458.30 }
      ]
    : [
        { date: 'Jan', amount: 1200, cumulativeAmount: 1200, budgetLimit: 15000 },
        { date: 'Feb', amount: 1100, cumulativeAmount: 2300, budgetLimit: 15000 },
        { date: 'Mar', amount: 1300, cumulativeAmount: 3600, budgetLimit: 15000 },
        { date: 'Apr', amount: 1150, cumulativeAmount: 4750, budgetLimit: 15000 },
        { date: 'May', amount: 1400, cumulativeAmount: 6150, budgetLimit: 15000 },
        { date: 'Jun', amount: 1250, cumulativeAmount: 7400, budgetLimit: 15000 },
        { date: 'Jul', amount: 1350, cumulativeAmount: 8750, budgetLimit: 15000 },
        { date: 'Aug', amount: 1300, cumulativeAmount: 10050, budgetLimit: 15000 },
        { date: 'Sep', amount: 1450, cumulativeAmount: 11500, budgetLimit: 15000 },
        { date: 'Oct', amount: 1200, cumulativeAmount: 12700, budgetLimit: 15000 },
        { date: 'Nov', amount: 1350, cumulativeAmount: 14050, budgetLimit: 15000 },
        { date: 'Dec', amount: 1500, cumulativeAmount: 15550, budgetLimit: 15000 }
      ];

  const chartData = data.length > 0 ? data : defaultData;
  const budgetLimit = chartData[0]?.budgetLimit || 1458.30;

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 3 }}>
        Budget Period
      </Typography>
      
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              domain={[0, 'dataMax + 500']}
            />
            
            {/* Budget limit reference line */}
            <ReferenceLine 
              y={budgetLimit} 
              stroke="#ff4444" 
              strokeDasharray="5 5"
              label={{ value: `Budget: $${budgetLimit.toFixed(2)}`, position: 'top' }}
            />
            
            {/* Cumulative spending line */}
            <Line
              type="monotone"
              dataKey="cumulativeAmount"
              stroke="#8884d8"
              strokeWidth={3}
              dot={{ r: 4, fill: '#8884d8' }}
              activeDot={{ r: 6 }}
              name="Cumulative Spending"
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      {/* Chart Legend */}
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 3,
              backgroundColor: '#8884d8',
              borderRadius: 1
            }}
          />
          <Typography variant="caption" color="text.secondary">
            Cumulative Spending
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 12,
              height: 1,
              backgroundColor: '#ff4444',
              borderStyle: 'dashed',
              borderWidth: '1px 0',
              borderColor: '#ff4444'
            }}
          />
          <Typography variant="caption" color="text.secondary">
            Budget Limit
          </Typography>
        </Box>
      </Box>

      {/* Summary Stats */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: 2, 
        mt: 3,
        p: 2,
        backgroundColor: '#f8f9fa',
        borderRadius: 2
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Current Spending
          </Typography>
          <Typography variant="h6" fontWeight="bold" color="primary.main">
            ${chartData[chartData.length - 1]?.cumulativeAmount.toFixed(2) || '0.00'}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            Budget Limit
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            ${budgetLimit.toFixed(2)}
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            {chartData[chartData.length - 1]?.cumulativeAmount > budgetLimit ? 'Over Budget' : 'Remaining'}
          </Typography>
          <Typography 
            variant="h6" 
            fontWeight="bold" 
            color={chartData[chartData.length - 1]?.cumulativeAmount > budgetLimit ? 'error.main' : 'success.main'}
          >
            ${Math.abs(budgetLimit - (chartData[chartData.length - 1]?.cumulativeAmount || 0)).toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetPeriodChart;