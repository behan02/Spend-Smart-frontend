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
        gap: 2,
        py: 2,
        px: 3,
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        mb: 3
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={handleBackClick}
        sx={{
          color: '#666',
          '&:hover': {
            backgroundColor: '#f5f5f5'
          }
        }}
        aria-label="Go back to goals"
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Goal Name */}
      <Typography
        variant="h5"
        component="h1"
        sx={{
          fontWeight: 600,
          color: '#333',
          fontSize: '1.5rem'
        }}
      >
        {goalName}
      </Typography>
    </Box>
  );
};

export default GoalNameBar;