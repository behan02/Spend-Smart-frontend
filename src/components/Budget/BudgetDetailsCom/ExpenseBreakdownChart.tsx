import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ExpenseBreakdown } from '../types/BudgetDetails';
import { getCategoryIconAndColor } from '../../../utils/categoryUtils';

interface ExpenseBreakdownChartProps {
  data: ExpenseBreakdown[];
  totalSpent: number;
}

const ExpenseBreakdownChart: React.FC<ExpenseBreakdownChartProps> = ({ 
  data, 
  totalSpent 
}) => {
  // Default colors for categories
  const defaultColors = [
    '#4CAF50', '#2196F3', '#FF9800', '#F44336', '#9C27B0', 
    '#607D8B', '#795548', '#009688', '#FFEB3B', '#E91E63'
  ];

  // Prepare data for the pie chart with CategoryIcons
  const chartData = data.map((item, index) => {
    const { icon, color } = getCategoryIconAndColor(item.label);
    return {
      ...item,
      icon: icon,
      color: item.color || color || defaultColors[index % defaultColors.length]
    };
  });

  const renderCustomizedLabel = () => {
    return (
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="recharts-text">
        <tspan x="50%" dy="-0.5em" fontSize="24" fontWeight="bold">
          ${totalSpent.toFixed(2)}
        </tspan>
        <tspan x="50%" dy="1.2em" fontSize="14" fill="#666">
          Total
        </tspan>
      </text>
    );
  };

  return (
    <Box>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
        Expenses Breakdown
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Pie Chart */}
        <Box sx={{ width: '100%', height: 300, mb: 2 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry) => (
                  <Cell key={`cell-${entry.id}`} fill={entry.color} />
                ))}
              </Pie>
              {renderCustomizedLabel()}
            </PieChart>
          </ResponsiveContainer>
        </Box>

        {/* Legend */}
        <Box sx={{ width: '100%' }}>
          <List sx={{ py: 0 }}>
            {chartData.map((item) => (
              <ListItem key={item.id} sx={{ py: 0.5, px: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      backgroundColor: item.color,
                      mr: 1,
                      flexShrink: 0
                    }}
                  />
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                          {item.icon && `${item.icon} `}{item.label}
                        </Typography>
                        <Box sx={{ textAlign: 'right' }}>
                          <Typography variant="body2" fontWeight="bold">
                            ${item.value.toFixed(2)}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.percentage.toFixed(1)}%
                          </Typography>
                        </Box>
                      </Box>
                    }
                    sx={{ m: 0 }}
                  />
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default ExpenseBreakdownChart;