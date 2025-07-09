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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Progress Circle */}
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress 
            variant="determinate" 
            value={goal.progress} 
            size={50} 
            thickness={4}
            sx={{ 
              color: isSelected ? '#4ADE80' : '#4ADE80',
              position: 'absolute',
              zIndex: 1
            }} 
          />
          <CircularProgress 
            variant="determinate" 
            value={100} 
            size={50} 
            thickness={4}
            sx={{ 
              color: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)', 
              position: 'absolute',
            }} 
          />
          <Typography 
            variant="caption" 
            component="div" 
            sx={{ 
              position: 'relative', 
              zIndex: 2,
              fontWeight: 'bold', 
              fontSize: '0.75rem',
              color: isSelected ? 'white' : '#2952CC'
            }}
          >
            {`${Math.round(goal.progress)}%`}
          </Typography>
        </Box>
        
        {/* Goal Info */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold', 
            color: isSelected ? 'white' : 'inherit',
            fontSize: '1.1rem',
            mb: 0.5
          }}>
            {goal.name}
          </Typography>
          <Typography variant="body2" sx={{ 
            color: isSelected ? 'rgba(255,255,255,0.8)' : 'text.secondary',
            fontSize: '0.9rem'
          }}>
            <span style={{ fontWeight: 'bold' }}>${goal.savedAmount.toFixed(2)}</span>
            <span style={{ opacity: 0.7 }}> / ${goal.targetAmount.toFixed(2)}</span>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default GoalItem;