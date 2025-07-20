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
        borderBottom: '1px solid #E5E7EB',
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
          color: '#6B7280',
          '&:hover': {
            backgroundColor: '#F3F4F6'
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
          fontWeight: 'normal',
          color: '#1F2937',
          fontSize: '20px',
          fontFamily: '"Inter", "Roboto", "Arial", sans-serif'
        }}
      >
        {goalName}
      </Typography>
    </Box>
  );
};

export default GoalNameBar;