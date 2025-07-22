// Create this file: src/components/ReportComponents/SavingsGrowthChart.tsx

import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography, Paper } from '@mui/material';

interface SavingsGrowthData {
  month: string;
  monthlySavings: number;
  cumulativeSavings: number;
  income: number;
  expenses: number;
  savingsRate: number; // percentage
  monthDate: string;
}

interface SavingsGrowthChartProps {
  data: SavingsGrowthData[];
  title?: string;
  height?: number;
}

const SavingsGrowthChart: React.FC<SavingsGrowthChartProps> = ({ 
  data, 
  title = "Savings Growth Over Time",
  height = 400 
}) => {
  
  // Format currency using LKR
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Custom tooltip to show detailed information
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;

      return (
        <Paper 
          elevation={3} 
          sx={{ 
            p: 1.5, 
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: 1,
            minWidth: '200px'
          }}
        >
          <Typography variant="subtitle2" color="primary" sx={{ fontWeight: 'bold', mb: 1 }}>
            {label}
          </Typography>
          
          <Typography variant="body2" sx={{ color: '#2e7d32', mb: 0.5 }}>
            <span style={{ color: '#2e7d32' }}>●</span> Monthly Savings: {formatCurrency(data.monthlySavings)}
          </Typography>
          
          <Typography variant="body2" sx={{ color: '#1976d2', mb: 0.5 }}>
            <span style={{ color: '#1976d2' }}>●</span> Cumulative: {formatCurrency(data.cumulativeSavings)}
          </Typography>
          
          <Typography variant="body2" sx={{ color: '#ff9800', mb: 0.5 }}>
            <span style={{ color: '#ff9800' }}>●</span> Savings Rate: {data.savingsRate.toFixed(1)}%
          </Typography>
          
          <Typography variant="caption" sx={{ color: '#666', display: 'block', mt: 1 }}>
            Income: {formatCurrency(data.income)}
          </Typography>
          <Typography variant="caption" sx={{ color: '#666', display: 'block' }}>
            Expenses: {formatCurrency(data.expenses)}
          </Typography>
        </Paper>
      );
    }
    return null;
  };

  // Calculate summary statistics
  const totalSavings = data.length > 0 ? data[data.length - 1]?.cumulativeSavings || 0 : 0;
  const avgMonthlySavings = data.length > 0 ? 
    data.reduce((sum, item) => sum + item.monthlySavings, 0) / data.length : 0;
  const avgSavingsRate = data.length > 0 ? 
    data.reduce((sum, item) => sum + item.savingsRate, 0) / data.length : 0;
  const bestSavingsMonth = data.length > 0 ? 
    Math.max(...data.map(item => item.monthlySavings)) : 0;
  const positiveMonths = data.filter(item => item.monthlySavings > 0).length;

  // Determine trend
  const getTrend = () => {
    if (data.length < 2) return "neutral";
    const recent = data.slice(-3); // Last 3 months
    const avgRecent = recent.reduce((sum, item) => sum + item.monthlySavings, 0) / recent.length;
    const earlier = data.slice(-6, -3); // Previous 3 months
    if (earlier.length === 0) return "neutral";
    const avgEarlier = earlier.reduce((sum, item) => sum + item.monthlySavings, 0) / earlier.length;
    
    if (avgRecent > avgEarlier * 1.1) return "improving";
    if (avgRecent < avgEarlier * 0.9) return "declining";
    return "stable";
  };

  const trend = getTrend();
  const trendColor = trend === "improving" ? "#4caf50" : trend === "declining" ? "#f44336" : "#ff9800";
  const trendIcon = trend === "improving" ? "📈" : trend === "declining" ? "📉" : "➡️";

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 2, width: '100%', maxWidth: '700px' }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', mb: 1 }}>
          💰 {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Track your savings consistency and growth • Cumulative vs Monthly trends
        </Typography>
      </Box>

      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            stroke="#666"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            yAxisId="left"
            stroke="#666"
            fontSize={12}
            tickFormatter={(value) => formatCurrency(value)}
          />
          <YAxis 
            yAxisId="right"
            orientation="right"
            stroke="#ff9800"
            fontSize={12}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            iconType="line"
          />
          
          {/* Monthly Savings Bars */}
          <Bar
            yAxisId="left"
            dataKey="monthlySavings"
            fill="#2e7d32"
            fillOpacity={0.6}
            name="Monthly Savings"
          />
          
          {/* Cumulative Savings Line */}
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="cumulativeSavings"
            stroke="#1976d2"
            strokeWidth={3}
            dot={{ fill: '#1976d2', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#1976d2', strokeWidth: 2 }}
            name="Cumulative Savings"
          />
          
          {/* Savings Rate Line */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="savingsRate"
            stroke="#ff9800"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#ff9800', strokeWidth: 2, r: 3 }}
            name="Savings Rate %"
          />
        </ComposedChart>
      </ResponsiveContainer>

      {/* Trend Indicator */}
      <Box sx={{ 
        mt: 2, 
        p: 2, 
        backgroundColor: `${trendColor}15`, 
        borderRadius: 1,
        border: `1px solid ${trendColor}30`
      }}>
        <Typography variant="body2" sx={{ color: trendColor, fontWeight: 600 }}>
          {trendIcon} Trend: {trend.charAt(0).toUpperCase() + trend.slice(1)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Based on recent 3-month performance vs previous period
        </Typography>
      </Box>

      
      {/* Insights */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
          💡 Tip: Aim for a consistent 20% savings rate for strong financial health
        </Typography>
        {avgSavingsRate < 10 && (
          <Typography variant="body2" color="warning.main" sx={{ fontStyle: 'italic', mt: 0.5 }}>
            ⚠️ Consider increasing your savings rate to build stronger financial security
          </Typography>
        )}
        {positiveMonths === data.length && data.length >= 3 && (
          <Typography variant="body2" color="success.main" sx={{ fontStyle: 'italic', mt: 0.5 }}>
            🎉 Excellent! You've maintained positive savings every month
          </Typography>
        )}
      </Box>
    </Paper>
  );
};

export default SavingsGrowthChart;