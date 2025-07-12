import React from 'react';
import { Box, Typography, LinearProgress, Chip } from '@mui/material';

interface BudgetItemProps {
  budget: {
    id: number;
    name: string;
    type: 'monthly' | 'annually';
    totalAmount: number;
    spentAmount: number;
    progress: number;
    remainingDays?: number;
  };
  isSelected: boolean;
  onClick: () => void;
}

const BudgetItem: React.FC<BudgetItemProps> = ({ budget, isSelected, onClick }) => {
  const getStatusColor = () => {
    if (budget.progress >= 90) return '#f44336'; // Red
    if (budget.progress >= 70) return '#ff9800'; // Orange
    return '#4caf50'; // Green
  };

  const getStatusText = () => {
    if (budget.progress >= 100) return 'Overbudget';
    if (budget.progress >= 90) return 'High';
    if (budget.progress >= 70) return 'Medium';
    return 'Low';
  };

  return (
    <Box 
      onClick={onClick}
      sx={{ 
        p: 3,
        borderRadius: 2,
        cursor: 'pointer',
        border: '1px solid #e0e0e0',
        bgcolor: isSelected ? '#2952CC' : 'background.paper',
        color: isSelected ? 'white' : 'text.primary',
        '&:hover': {
          bgcolor: isSelected ? '#2952cc' : 'rgba(41, 82, 204, 0.04)',
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        },
        transition: 'all 0.3s ease',
        boxShadow: isSelected ? '0 4px 12px rgba(41, 82, 204, 0.2)' : '0 2px 4px rgba(0,0,0,0.05)'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold', 
            color: isSelected ? 'white' : 'inherit',
            fontSize: '1.1rem',
            mb: 0.5
          }}>
            {budget.name}
          </Typography>
          <Chip
            label={budget.type.charAt(0).toUpperCase() + budget.type.slice(1)}
            size="small"
            sx={{
              backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : '#e3f2fd',
              color: isSelected ? 'white' : '#1976d2',
              fontSize: '0.75rem'
            }}
          />
        </Box>
        <Chip
          label={getStatusText()}
          size="small"
          sx={{
            backgroundColor: getStatusColor(),
            color: 'white',
            fontSize: '0.75rem',
            fontWeight: 'bold'
          }}
        />
      </Box>

      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ 
          color: isSelected ? 'rgba(255,255,255,0.8)' : 'text.secondary',
          mb: 1
        }}>
          <span style={{ fontWeight: 'bold' }}>${budget.spentAmount.toFixed(2)}</span>
          <span style={{ opacity: 0.7 }}> / ${budget.totalAmount.toFixed(2)}</span>
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={Math.min(budget.progress, 100)} 
          sx={{ 
            height: 8, 
            borderRadius: 4,
            backgroundColor: isSelected ? 'rgba(255,255,255,0.2)' : '#e8e8e8',
            '& .MuiLinearProgress-bar': {
              backgroundColor: getStatusColor(),
              borderRadius: 4
            }
          }} 
        />
      </Box>

      {budget.remainingDays && (
        <Typography variant="body2" sx={{ 
          color: isSelected ? 'rgba(255,255,255,0.8)' : '#2952CC',
          fontWeight: 'bold',
          fontSize: '0.8rem'
        }}>
          {budget.remainingDays} days left
        </Typography>
      )}
    </Box>
  );
};

export default BudgetItem;