import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PaidRoundedIcon from '@mui/icons-material/PaidRounded';
import MoneyOffCsredRoundedIcon from '@mui/icons-material/MoneyOffCsredRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import PieChartRoundedIcon from '@mui/icons-material/PieChartRounded';

// Interface for the report data coming from backend
interface ReportData {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  budgetUtilization: number;
}

// Interface for card props
interface CardsProps {
  data: ReportData | null;
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

// Helper function to format percentage
const formatPercentage = (value: number): string => {
  return `${value.toFixed(1)}%`;
};

function Cards({ data }: CardsProps) {
  // Handle loading or no data state
  if (!data) {
    return (
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
          {[...Array(4)].map((_, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 120 }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Box sx={{ width: 40, height: 40, bgcolor: 'grey.300', borderRadius: '50%' }} />
                    <Typography variant="body2" color="text.secondary">
                      Loading...
                    </Typography>
                  </Box>
                  <Box alignItems={'center'} display="flex" flexDirection="column">
                    <Typography variant="h6" fontWeight={600} color="text.disabled">
                      ---
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  // Map backend data to card configuration
  const cardData = [
    {
      title: 'Total Income',
      value: formatCurrency(data.totalIncome),
      icon: <PaidRoundedIcon fontSize="large" color="primary" />,
      color: 'primary.main',
      bgColor: 'primary.light',
      rawValue: data.totalIncome,
    },
    {
      title: 'Total Expenses',
      value: formatCurrency(data.totalExpenses),
      icon: <MoneyOffCsredRoundedIcon fontSize="large" color="error" />,
      color: 'error.main',
      bgColor: 'error.light',
      rawValue: data.totalExpenses,
    },
    {
      title: 'Total Savings',
      value: formatCurrency(data.totalSavings),
      icon: <SavingsRoundedIcon fontSize="large" color="success" />,
      color: 'success.main',
      bgColor: 'success.light',
      rawValue: data.totalSavings,
    },
    {
      title: 'Budget Utilization',
      value: formatPercentage(data.budgetUtilization),
      icon: <PieChartRoundedIcon fontSize="large" color="warning" />,
      color: 'warning.main',
      bgColor: 'warning.light',
      rawValue: data.budgetUtilization,
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={3} sx={{ width: '100%', margin: 0 }}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                p: 2, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                minHeight: 120,
                transition: 'all 0.3s ease',
                cursor: 'default',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                },
                background: `linear-gradient(135deg, ${card.bgColor}08 0%, ${card.bgColor}20 100%)`,
                border: `1px solid ${card.bgColor}40`,
                justifyContent: "center"
              }}
            >
              <CardContent sx={{ textAlign: 'center', width: '100%' }}>
                {/* Icon and Title Row */}
                <Box display="flex" alignItems="center" justifyContent="center" gap={1} mb={2}>
                  <Box 
                    sx={{ 
                      p: 1, 
                      borderRadius: '50%', 
                      bgcolor: `${card.bgColor}40`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {card.icon}
                  </Box>
                </Box>
                
                {/* Title */}
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ mb: 1, fontWeight: 500 }}
                >
                  {card.title}
                </Typography>
                
                {/* Value */}
                <Box alignItems={'center'} display="flex" flexDirection="column" flexGrow={1}>
                  <Typography 
                    variant="h5" 
                    fontWeight={700}
                    sx={{ 
                      color: card.color,
                      letterSpacing: '-0.5px'
                    }}
                  >
                    {card.value}
                  </Typography>
                  
                  
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Summary Row */}
      <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          💡 Financial Summary: 
          {data.totalSavings > 0 
            ? ` You saved ${formatCurrency(data.totalSavings)} this period!` 
            : data.totalSavings < 0 
            ? ` You overspent by ${formatCurrency(Math.abs(data.totalSavings))} this period.`
            : ' You broke even this period.'
          }
          {data.budgetUtilization > 0 && (
            ` Budget utilization is ${formatPercentage(data.budgetUtilization)}.`
          )}
        </Typography>
      </Box>
    </Box>
  );
}

export default Cards;