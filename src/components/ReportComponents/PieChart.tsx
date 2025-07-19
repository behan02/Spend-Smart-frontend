import { PieChart as MUIPieChart } from '@mui/x-charts/PieChart';
import { Box, Typography, Alert, Skeleton } from '@mui/material';

// Interface for the category breakdown data from backend
interface CategoryBreakdown {
  [categoryName: string]: number;
}

// Interface for pie chart props
interface PieChartProps {
  data: CategoryBreakdown | null | undefined;
  title?: string;
  width?: number;
  height?: number;
}

// Helper function to format currency
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Helper function to generate colors for pie chart segments
const generateColors = (count: number): string[] => {
  const baseColors = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#96CEB4', // Green
    '#FFEAA7', // Yellow
    '#DDA0DD', // Plum
    '#98D8C8', // Mint
    '#F7DC6F', // Light Yellow
    '#BB8FCE', // Light Purple
    '#85C1E9', // Light Blue
    '#F8C471', // Orange
    '#82E0AA', // Light Green
  ];
  
  // If we need more colors than available, generate random ones
  const colors = [...baseColors];
  while (colors.length < count) {
    const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;
    colors.push(randomColor);
  }
  
  return colors.slice(0, count);
};

function PieChart({ 
  data, 
  title = "Expense Breakdown by Category",
  width = 400,
  height = 300 
}: PieChartProps) {
  
  // Loading state
  if (data === null || data === undefined) {
    return (
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          margin: '0 auto',
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: height }}>
          <Skeleton variant="circular" width={200} height={200} />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
          Loading chart data...
        </Typography>
      </Box>
    );
  }

  // No data state
  if (!data || Object.keys(data).length === 0) {
    return (
      <Box
        sx={{
          width: '100%',
          maxWidth: 500,
          margin: '0 auto',
          p: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: '#fff',
        }}
      >
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: height }}>
          <Alert severity="info" sx={{ width: '100%' }}>
            <Typography variant="body2">
              No expense data available for the selected date range.
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Try expanding your date range or add some expense transactions.
            </Typography>
          </Alert>
        </Box>
      </Box>
    );
  }

  // Transform backend data to pie chart format
  const categories = Object.entries(data);
  const totalAmount = categories.reduce((sum, [_, amount]) => sum + amount, 0);
  
  // Sort categories by amount (largest first)
  const sortedCategories = categories.sort(([, a], [, b]) => b - a);
  
  // Create pie chart data with proper formatting
  const pieChartData = sortedCategories.map(([category, amount], index) => ({
    id: index,
    value: amount,
    label: category,
    formattedValue: formatCurrency(amount),
    percentage: ((amount / totalAmount) * 100).toFixed(1),
  }));

  // Generate colors for each segment
  const colors = generateColors(pieChartData.length);

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 500,
        margin: '0 auto',
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>
        {title}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
        Total: {formatCurrency(totalAmount)} across {pieChartData.length} categories
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <MUIPieChart
          series={[
            {
              data: pieChartData,
              outerRadius: Math.min(width, height) / 3,
              highlightScope: { faded: 'global', highlighted: 'item' },
              faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
            },
          ]}
          colors={colors}
          width={width}
          height={height}
          slotProps={{
            legend: {
              direction: 'column',
              position: {
                vertical: 'middle',
                horizontal: 'right',
              },
              padding: 0,
              itemMarkWidth: 10,
              itemMarkHeight: 10,
              markGap: 5,
              itemGap: 8,
              labelStyle: {
                fontSize: 12,
                fill: '#666',
              },
            },
          }}
          margin={{ right: 120 }}
        />
      </Box>

      {/* Category breakdown list */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, textAlign: 'center' }}>
          Category Breakdown:
        </Typography>
        <Box sx={{ maxHeight: 150, overflowY: 'auto' }}>
          {pieChartData.map((item, index) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                py: 0.5,
                px: 1,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: colors[index],
                  }}
                />
                <Typography variant="body2">{item.label}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body2" fontWeight={500}>
                  {item.formattedValue}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  ({item.percentage}%)
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Additional insights */}
      {pieChartData.length > 0 && (
        <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center' }}>
            💡 Top spending category: <strong>{pieChartData[0].label}</strong> ({pieChartData[0].percentage}% of total expenses)
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default PieChart;