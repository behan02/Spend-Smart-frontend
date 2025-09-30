import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface GoalNameBarProps {
  goalName: string;
  onBack?: () => void;
}

const GoalNameBar: React.FC<GoalNameBarProps> = ({ goalName, onBack }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (onBack) {
      onBack();
    } else {
      // Default behavior: navigate back to goals page
      navigate('/goals');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        py: 2.5,
        px: 3,
        backgroundColor: '#fff',
        borderBottom: '1px solid #E5E7EB',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        mb: 0,
        minHeight: '72px',
        borderRadius: '15px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: '#f8fafc',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          transform: 'translateY(-2px)',
          borderColor: '#cbd5e1'
        }
      }}
    >
      

      {/* Goal Name */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 600,
          color: '#111827',
          fontSize: '28px',
          fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
          lineHeight: 1.2,
          letterSpacing: '-0.02em'
        }}
      >
        {goalName}
      </Typography>
    </Box>
  );
};

export default GoalNameBar;