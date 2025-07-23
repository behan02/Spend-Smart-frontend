import React from 'react';
import { Box, Typography } from '@mui/material';

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
  // Custom circular progress component
  const CircularProgress = ({ percentage, size = 50, strokeWidth = 4 }: {
    percentage: number;
    size?: number;
    strokeWidth?: number;
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    // Determine color based on progress
    const getProgressColor = () => {
      if (percentage >= 90) return '#DC2626'; // Red for overspending
      if (percentage >= 70) return '#F59E0B'; // Orange for warning
      return '#22C55E'; // Green for good
    };

    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={isSelected ? "rgba(255,255,255,0.3)" : "#E5E7EB"}
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={getProgressColor()}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.5s ease-in-out',
            }}
          />
        </svg>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: '12px',
              fontWeight: 'bold',
              color: isSelected ? getProgressColor() : getProgressColor(),
            }}
          >
            {percentage}%
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Box 
      onClick={onClick}
      sx={{ 
        p: 2.5,
        borderRadius: 2,
        cursor: 'pointer',
        backgroundColor: isSelected ? 'rgb(11, 0, 221)' : '#fff',
        color: isSelected ? '#fff' : '#000',
        border: '1px solid #E5E7EB',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor: isSelected ? 'rgb(11, 0, 221)' : '#F9FAFB',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        },
        boxShadow: isSelected ? '0 4px 12px rgba(27, 16, 235, 0.2)' : '0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Progress Circle */}
        <CircularProgress 
          percentage={budget.progress} 
          size={50} 
          strokeWidth={4}
        />
        
        {/* Budget Info */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            fontSize: '16px',
            mb: 0.5,
            color: 'inherit'
          }}>
            {budget.name}
          </Typography>
          <Typography variant="body2" sx={{ 
            fontSize: '14px',
            opacity: 0.8,
            color: 'inherit'
          }}>
            ${budget.spentAmount.toFixed(2)} / ${budget.totalAmount.toFixed(2)}
          </Typography>
          <Typography variant="body2" sx={{ 
            fontSize: '12px',
            opacity: 0.6,
            color: 'inherit'
          }}>
            {budget.type.charAt(0).toUpperCase() + budget.type.slice(1)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default BudgetItem;