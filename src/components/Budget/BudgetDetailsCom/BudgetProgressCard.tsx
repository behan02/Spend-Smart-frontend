import React from 'react';
import { Box, Typography, LinearProgress, Chip } from '@mui/material';
import { Budget } from '../types/BudgetDetails';

interface BudgetProgressCardProps {
  budget: Budget | null;
  onUpdate?: (budget: Budget) => void;
}

const BudgetProgressCard: React.FC<BudgetProgressCardProps> = ({ 
  budget, 
  onUpdate: _onUpdate 
}) => {
  if (!budget) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <Typography color="text.secondary">No budget selected</Typography>
      </Box>
    );
  }

  const getProgressColor = (progress: number) => {
    if (progress <= 50) return 'success';
    if (progress <= 80) return 'warning';
    return 'error';
  };

  const getStatusChip = (progress: number) => {
    if (progress <= 50) {
      return (
        <Chip 
          label="On Track" 
          size="small" 
          color="success" 
          sx={{ fontSize: '0.75rem' }}
        />
      );
    }
    if (progress <= 80) {
      return (
        <Chip 
          label="Warning" 
          size="small" 
          color="warning" 
          sx={{ fontSize: '0.75rem' }}
        />
      );
    }
    return (
      <Chip 
        label="Over Budget" 
        size="small" 
        color="error" 
        sx={{ fontSize: '0.75rem' }}
      />
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR'
    }).format(amount);
  };

  return (
    <Box>
      {/* Header with Budget Type */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">
          {budget.name}
        </Typography>
        <Chip 
          label={budget.type === 'monthly' ? 'Monthly' : 'Annually'} 
          size="small"
          variant="outlined"
          color="primary"
        />
      </Box>

      {/* Spent vs Budget */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Spent
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Budget
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="h5" fontWeight="bold" color="success.main">
            {formatCurrency(budget.spentAmount)}
          </Typography>
          <Typography variant="h5" fontWeight="bold">
            {formatCurrency(budget.totalAmount)}
          </Typography>
        </Box>
      </Box>

      {/* Progress Bar */}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="body2">
            {budget.progress.toFixed(1)}%
          </Typography>
          {getStatusChip(budget.progress)}
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={Math.min(budget.progress, 100)} 
          color={getProgressColor(budget.progress)}
          sx={{ 
            height: 8, 
            borderRadius: 4,
            backgroundColor: '#e0e0e0'
          }}
        />
        <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
          {formatCurrency(budget.remainingAmount)} remaining
        </Typography>
      </Box>

      {/* Categories Breakdown */}
      <Box>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Categories
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {budget.categories.map((category) => (
            <Box 
              key={category.id} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                py: 1,
                px: 2,
                backgroundColor: '#f8f9fa',
                borderRadius: 1
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: category.color || '#666'
                  }}
                />
                <Typography variant="body2">
                  {category.icon && `${category.icon} `}{category.name}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                {formatCurrency(category.spentAmount)} / {formatCurrency(category.allocatedAmount)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetProgressCard;