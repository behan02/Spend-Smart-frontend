import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CssBaseline } from '@mui/material';
import { useParams } from 'react-router-dom';
import ExpenseBreakdownChart from '../../components/Budget/BudgetDetailsCom/ExpenseBreakdownChart';
import BudgetProgressCard from '../../components/Budget/BudgetDetailsCom/BudgetProgressCard';
import ExpenseHistoryTable from '../../components/Budget/BudgetDetailsCom/ExpenseHistoryTable';
import { Budget, Transaction, ExpenseBreakdown } from '../../components/Budget/types/BudgetDetails';
import { budgetService } from '../../services/budgetService';
import { getCategoryIconAndColor } from '../../utils/categoryUtils';
import Sidebar from '../../components/sidebar/sidebar';
import Header from '../../components/header/header'; // Importing header component
// Import the chart components
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, ReferenceLine } from 'recharts';


// Inline BudgetPeriodChart component
const BudgetPeriodChart: React.FC<{ data: any[]; budgetType: string }> = ({ data, budgetType }) => {
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
        { date: 'Jun', amount: 1250, cumulativeAmount: 7400, budgetLimit: 15000 }
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

interface BudgetDetailsPageProps {
  budgetId?: string;
  onBudgetUpdate?: (budget: Budget) => void;
}

const BudgetDetailsPage: React.FC<BudgetDetailsPageProps> = ({ 
  budgetId, 
  onBudgetUpdate 
}) => {
  const { id } = useParams<{ id: string }>();
  const currentBudgetId = budgetId || id;
  
  const [budget, setBudget] = useState<Budget | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [expenseBreakdown, setExpenseBreakdown] = useState<ExpenseBreakdown[]>([]);
  const [periodData, setPeriodData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (currentBudgetId) {
      fetchBudgetDetails(currentBudgetId);
    } else {
      // Default to budget ID 1 if no ID is provided
      fetchBudgetDetails('1');
    }
  }, [currentBudgetId]);

  const fetchBudgetDetails = async (budgetId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      await Promise.all([
        fetchBudget(budgetId),
        fetchTransactions(budgetId),
        fetchExpenseBreakdown(budgetId),
        fetchPeriodData(budgetId)
      ]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch budget details');
    } finally {
      setLoading(false);
    }
  };

  const fetchBudget = async (budgetId: string) => {
    const budget = await budgetService.getBudgetById(budgetId);
    setBudget(budget);
  };

  const fetchTransactions = async (budgetId: string) => {
    const transactions = await budgetService.getTransactionsByBudgetId(budgetId);
    setTransactions(transactions);
  };

  const fetchExpenseBreakdown = async (budgetId: string) => {
    const breakdown = await budgetService.getExpenseBreakdown(budgetId);
    
    // Enhance breakdown data with CategoryIcons
    const enhancedBreakdown = breakdown.map(item => {
      const { icon, color } = getCategoryIconAndColor(item.label);
      return {
        ...item,
        icon: icon,
        color: item.color || color
      };
    });
    
    setExpenseBreakdown(enhancedBreakdown);
  };

  const fetchPeriodData = async (budgetId: string) => {
    const data = await budgetService.getPeriodData(budgetId);
    setPeriodData(data);
  };



  const handleTransactionUpdate = async () => {
    if (currentBudgetId) {
      await Promise.all([
        fetchTransactions(currentBudgetId),
        fetchBudget(currentBudgetId),
        fetchExpenseBreakdown(currentBudgetId),
        fetchPeriodData(currentBudgetId)
      ]);
    }
  };

  const handleTransactionDelete = async (transactionId: number) => {
    try {
      await budgetService.deleteTransaction(transactionId);
      await handleTransactionUpdate();
    } catch (err) {
      console.error('Failed to delete transaction:', err);
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        mx: 'auto',
        maxWidth: '1200px',
        m: 3
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Loading budget details...
          </Typography>
          <Box sx={{ 
            width: 40, 
            height: 40, 
            border: '4px solid #e0e0e0',
            borderTop: '4px solid #1976d2',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            mx: 'auto',
            '@keyframes spin': {
              '0%': { transform: 'rotate(0deg)' },
              '100%': { transform: 'rotate(360deg)' }
            }
          }} />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '400px',
        backgroundColor: '#ffebee',
        borderRadius: 2,
        mx: 'auto',
        maxWidth: '1200px',
        m: 3,
        p: 3
      }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" color="error" sx={{ mb: 2 }}>
            Error Loading Budget
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            {error}
          </Typography>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content */}
      <Box sx={{ flex: 1, px: 3, pb: 3, width: '100%' }}>
        {/* App Header */}
        <Box sx={{ width: '100%' }}>
          <Header pageName="Stay on Track with Your Budget!" />
        </Box>

        <Box sx={{ maxWidth: '1200px', mx: 'auto', px: 3, mt: 3 }}>
          {/* Budget Name Card */}
          <Paper 
            elevation={1}
            sx={{
              mb: 3,
              borderRadius: 2,
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px 0 rgba(0,0,0,0.03)',
              p: 2,
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ textAlign: 'left' }}>
              {budget?.name || 'January'}
            </Typography>
          </Paper>

          {/* Main Content Grid */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
            {/* Left Column - Expense Breakdown Chart */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, backgroundColor: 'white' }}>
              <ExpenseBreakdownChart 
                data={expenseBreakdown}
                totalSpent={budget?.spentAmount || 0}
              />
            </Paper>

            {/* Right Column - Budget Progress */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, backgroundColor: 'white' }}>
              <BudgetProgressCard 
                budget={budget}
                onUpdate={onBudgetUpdate}
              />
            </Paper>
          </Box>

          {/* Expense History Table */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mb: 3, backgroundColor: 'white' }}>
            <ExpenseHistoryTable 
              transactions={transactions}
              onTransactionUpdate={handleTransactionUpdate}
              onDeleteTransaction={handleTransactionDelete}
            />
          </Paper>

          {/* Budget Period Chart */}
          <Paper elevation={2} sx={{ p: 3, borderRadius: 3, backgroundColor: 'white' }}>
            <BudgetPeriodChart 
              data={periodData}
              budgetType={budget?.type || 'monthly'}
            />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetDetailsPage;