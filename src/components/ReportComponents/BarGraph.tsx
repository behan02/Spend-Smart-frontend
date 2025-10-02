import { BarChart } from '@mui/x-charts/BarChart';
import { Box, Typography, Alert, Skeleton } from '@mui/material';

// Interface for monthly data from backend
interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

// Interface for bar chart props
interface BarGraphProps {
  data: MonthlyData[] | null | undefined;
  title?: string;
  width?: number;
  height?: number;
}

// Helper function to format currency values
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Value formatter for chart tooltips and labels
export function valueFormatter(value: number | null): string {
  if (value === null || value === undefined) return '0';
  return formatCurrency(value);
}

// Chart configuration
const chartSetting = {
  yAxis: [
    {
      label: 'Amount (LKR)',
      width: 80,
      valueFormatter: (value: number) => {
        // Format Y-axis labels as abbreviated currency
        if (value >= 1000000) {
          return `${(value / 1000000).toFixed(1)}M`;
        } else if (value >= 1000) {
          return `${(value / 1000).toFixed(0)}K`;
        }
        return value.toString();
      },
    },
  ],
  margin: { left: 90, right: 20, top: 40, bottom: 60 },
  grid: { horizontal: true },
};

function BarGraph({ 
  data, 
  title = "Monthly Income vs Expenses",
  width = 500,
  height = 350 
}: BarGraphProps) {
  
  // Loading state
  if (data === null || data === undefined) {
    return (
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
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
          <Skeleton variant="rectangular" width="100%" height={height - 50} />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
          Loading chart data...
        </Typography>
      </Box>
    );
  }

  // No data state
  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          width: '100%',
          maxWidth: 600,
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
              No monthly data available for the selected date range.
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Try expanding your date range to include more months.
            </Typography>
          </Alert>
        </Box>
      </Box>
    );
  }

  // Transform backend data to chart format
  const chartData = data.map((item, index) => ({
    id: index,
    month: item.month,
    Income: item.income,
    Expenses: item.expenses,
    NetSavings: item.income - item.expenses,
  }));

  // Calculate summary statistics
  const totalIncome = chartData.reduce((sum, item) => sum + item.Income, 0);
  const totalExpenses = chartData.reduce((sum, item) => sum + item.Expenses, 0);
  const avgIncome = totalIncome / chartData.length;
  const avgExpenses = totalExpenses / chartData.length;
  const netSavings = totalIncome - totalExpenses;

  // Find best and worst performing months
  const bestMonth = chartData.reduce((best, current) => 
    current.NetSavings > best.NetSavings ? current : best
  );
  const worstMonth = chartData.reduce((worst, current) => 
    current.NetSavings < worst.NetSavings ? current : worst
  );

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 700,
        margin: '0 auto',
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h6" sx={{ textAlign: 'center', mb: 1 }}>
        {title}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 2 }}>
        Comparing {chartData.length} months • Avg Income: {formatCurrency(avgIncome)} • Avg Expenses: {formatCurrency(avgExpenses)}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', overflow: 'auto' }}>
        <BarChart
          dataset={chartData}
          xAxis={[{ 
            scaleType: 'band', 
            dataKey: 'month',
            tickLabelStyle: {
              angle: -45,
              textAnchor: 'end',
              fontSize: 12,
            }
          }]}
          series={[
            { 
              dataKey: 'Income', 
              label: 'Income', 
              valueFormatter,
              color: '#2196F3' // Blue
            },
            { 
              dataKey: 'Expenses', 
              label: 'Expenses', 
              valueFormatter,
              color: '#F44336' // Red
            },
          ]}
          {...chartSetting}
          width={width}
          height={height}
          slotProps={{
            legend: {
              direction: 'row',
              position: {
                vertical: 'top',
                horizontal: 'middle',
              },
              padding: 0,
              itemMarkWidth: 15,
              itemMarkHeight: 15,
              markGap: 8,
              itemGap: 20,
              labelStyle: {
                fontSize: 14,
                fontWeight: 500,
              },
            },
          }}
        />
      </Box>

      {/* Monthly breakdown summary */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, textAlign: 'center' }}>
          Monthly Summary:
        </Typography>
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: 1,
          maxHeight: 120, 
          overflowY: 'auto' 
        }}>
          {chartData.map((item) => (
            <Box
              key={item.id}
              sx={{
                p: 1,
                border: '1px solid',
                borderColor: item.NetSavings >= 0 ? 'success.light' : 'error.light',
                borderRadius: 1,
                backgroundColor: item.NetSavings >= 0 ? 'success.50' : 'error.50',
                '&:hover': {
                  backgroundColor: item.NetSavings >= 0 ? 'success.100' : 'error.100',
                },
              }}
            >
              <Typography variant="body2" fontWeight={600}>
                {item.month}
              </Typography>
              <Typography variant="caption" display="block">
                Income: {formatCurrency(item.Income)}
              </Typography>
              <Typography variant="caption" display="block">
                Expenses: {formatCurrency(item.Expenses)}
              </Typography>
              <Typography 
                variant="caption" 
                display="block"
                color={item.NetSavings >= 0 ? 'success.main' : 'error.main'}
                fontWeight={500}
              >
                Net: {formatCurrency(item.NetSavings)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Key insights */}
      <Box sx={{ mt: 2, p: 1, bgcolor: 'grey.50', borderRadius: 1 }}>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', textAlign: 'center', mb: 1 }}>
          📊 <strong>Financial Insights:</strong>
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
            💰 Total Net Savings: <strong style={{ color: netSavings >= 0 ? 'green' : 'red' }}>
              {formatCurrency(netSavings)}
            </strong>
          </Typography>
          {bestMonth.NetSavings !== worstMonth.NetSavings && (
            <>
              <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                🏆 Best Month: <strong>{bestMonth.month}</strong> (Net: {formatCurrency(bestMonth.NetSavings)})
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ textAlign: 'center' }}>
                📉 Challenging Month: <strong>{worstMonth.month}</strong> (Net: {formatCurrency(worstMonth.NetSavings)})
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default BarGraph;