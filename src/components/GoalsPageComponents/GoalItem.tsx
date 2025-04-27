import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface GoalItemProps {
  goal: {
    id: number;
    name: string;
    savedAmount: number;
    targetAmount: number;
    progress: number;
  };
  isSelected: boolean;
  onClick: () => void;
}

const GoalItem: React.FC<GoalItemProps> = ({ goal, isSelected, onClick }) => {
  return (
    <Box 
      onClick={onClick}
      sx={{ 
        p: 2,
        borderRadius: 1,
        cursor: 'pointer',
        border: '1px solid #e0e0e0',
        bgcolor: isSelected ? '#2952CC' : 'background.paper',
        color: isSelected ? 'white' : 'text.primary',
        '&:hover': {
          bgcolor: isSelected ? '#2952cc' : 'rgba(13, 31, 223, 0.04)',
        },
        transition: 'background-color 0.3s'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box sx={{ position: 'relative', mr: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* CircularProgress component for the progress indicator */}
          <CircularProgress 
            variant="determinate" 
            value={goal.progress} 
            size={40} 
            thickness={3.6}
            sx={{ 
              color: isSelected ? '#4ADE80' : '#4ADE80', // Green color for progress
              position: 'absolute',
              zIndex: 1
            }} 
          />
          {/* Background circle */}
          <CircularProgress 
            variant="determinate" 
            value={100} 
            size={40} 
            thickness={3.6}
            sx={{ 
              color: isSelected ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)', 
              position: 'absolute',
            }} 
          />
          {/* Percentage text */}
          <Typography 
            variant="caption" 
            component="div" 
            sx={{ 
              position: 'relative', 
              zIndex: 2,
              fontWeight: 'bold', 
              fontSize: '0.7rem',
              color: isSelected ? 'white' : '#3366FF'
            }}
          >
            {`${Math.round(goal.progress)}%`}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold', 
            color: isSelected ? 'white' : 'inherit',
            fontSize: '1rem' 
          }}>
            {goal.name}
          </Typography>
          <Typography variant="body2" sx={{ 
            color: isSelected ? 'white' : 'text.secondary',
            '& span': {
              color: isSelected ? 'white' : 'text.disabled'
            }
          }}>
            ${goal.savedAmount.toFixed(2)} <span>/ ${goal.targetAmount.toFixed(2)}</span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default GoalItem;