import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';

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
  const [isHovered, setIsHovered] = useState(false);
  // Custom circular progress component
  const CircularProgress = ({ percentage, size = 50, strokeWidth = 4 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <Box sx={{ 
        position: 'relative', 
        display: 'inline-flex',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        transition: 'transform 0.3s ease'
      }}>
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
            stroke={isHovered ? "#16A34A" : "#22C55E"}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.5s ease-in-out, stroke 0.1s ease',
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
              fontSize: isHovered ? '13px' : '12px',
              fontWeight: 'bold',
              color: isSelected ? '#22C55E' : (isHovered ? '#16A34A' : '#22C55E'),
              transition: 'all 0s ease',
              fontFamily: '"Inter", system-ui, sans-serif'
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{ 
        p: 2.5,
        borderRadius: 2,
        cursor: 'pointer',
        backgroundColor: isSelected ? 'rgb(11, 0, 221)' : '#fff',
        color: isSelected ? '#fff' : '#000',
        border: '1px solid #E5E7EB',
        transition: 'all 0.3s ease',
        transform: isHovered || isSelected ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered 
          ? '0 12px 24px rgba(0,0,0,0.15)' 
          : isSelected 
            ? '0 8px 16px rgba(27, 16, 235, 0.3)' 
            : '0 2px 4px rgba(0,0,0,0.08)',
        '&:hover': {
          backgroundColor: isSelected ? 'rgb(11, 0, 221)' : '#F8FAFC',
        },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Subtle gradient overlay for hover effect */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: isHovered && !isSelected 
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(147, 197, 253, 0.03) 100%)'
            : 'transparent',
          borderRadius: 2,
          transition: 'all 0.3s ease',
          pointerEvents: 'none'
        }}
      />
      
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative', zIndex: 1 }}>
        {/* Progress Circle */}
        <CircularProgress 
          percentage={goal.progress} 
          size={50} 
          strokeWidth={4}
        />
        
        {/* Goal Info */}
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 600, 
            fontSize: isHovered ? '17px' : '16px',
            mb: 0.5,
            color: 'inherit',
            transition: 'all 0.1s ease',
            fontFamily: '"Inter", system-ui, sans-serif'
          }}>
            {goal.name}
          </Typography>
          <Typography variant="body2" sx={{ 
            fontSize: '14px',
            opacity: isHovered ? 0.9 : 0.8,
            color: 'inherit',
            transition: 'all 0.3s ease',
            fontFamily: '"Inter", system-ui, sans-serif',
            fontWeight: isHovered ? '500' : '400'
          }}>
            {goal.savedAmount.toLocaleString()} LKR / {goal.targetAmount.toLocaleString()} LKR
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default GoalItem;