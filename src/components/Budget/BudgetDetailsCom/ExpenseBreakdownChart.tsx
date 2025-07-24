import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, Button, Tooltip } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ExpenseBreakdown } from '../types/BudgetDetails';
import { getCategoryIconAndColor } from '../../../utils/categoryUtils';
import RefreshIcon from '@mui/icons-material/Refresh';

interface ExpenseBreakdownChartProps {
  data: ExpenseBreakdown[];
  totalSpent: number;
  onRefresh?: () => void;
}

const ExpenseBreakdownChart: React.FC<ExpenseBreakdownChartProps> = ({ 
  data, 
  totalSpent,
  onRefresh 
}) => {
  // Default colors for categories (fallback only)
  const defaultColors = [
    '#4CAF50', '#2196F3', '#FF9800', '#F44336', '#9C27B0', 
    '#607D8B', '#795548', '#009688', '#FFEB3B', '#E91E63'
  ];

  // Use the data directly from the backend, which should include proper icons and colors
  const chartData = data.map((item, index) => ({
    ...item,
    // Use database values first, then fallback to defaults if needed
    color: item.color || defaultColors[index % defaultColors.length],
    icon: item.icon || '💰'
  }));

  console.log('Chart data with icons and colors:', chartData);

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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" fontWeight="bold">
          Expenses Breakdown
        </Typography>
        
        {onRefresh && (
          <Tooltip title="Refresh expense data">
            <Button 
              size="small" 
              onClick={onRefresh}
              startIcon={<RefreshIcon />}
              sx={{ minWidth: 'auto', p: 0.5 }}
            >
              Refresh
            </Button>
          </Tooltip>
        )}
      </Box>
      
      {data.length === 0 ? (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: 300,
          flexDirection: 'column',
          backgroundColor: '#f5f5f5',
          borderRadius: 2
        }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            No expense data available
          </Typography>
          {onRefresh && (
            <Button 
              variant="outlined" 
              size="small" 
              onClick={onRefresh}
              startIcon={<RefreshIcon />}
            >
              Refresh Data
            </Button>
          )}
        </Box>
      ) : (
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
      )}
    </Box>
  );
};

export default ExpenseBreakdownChart;