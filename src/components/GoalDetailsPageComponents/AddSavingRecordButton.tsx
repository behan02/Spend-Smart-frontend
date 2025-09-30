import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface AddSavingRecordButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

const AddSavingRecordButton: React.FC<AddSavingRecordButtonProps> = ({ 
  onClick, 
  disabled = false,
  loading = false 
}) => {
  return (
    <Button
      variant="contained"
      startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <AddIcon />}
      onClick={onClick}
      disabled={disabled || loading}
      sx={{
        backgroundColor: '#4A90E2',
        color: 'white',
        borderRadius: '12px',
        textTransform: 'none',
        fontWeight: 700,
        fontSize: '16px',
        padding: '14px 32px',
        boxShadow: '0 4px 20px rgba(74, 144, 226, 0.3)',
        background: 'linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        '&:hover': {
          background: 'linear-gradient(135deg, #357ABD 0%, #2563EB 100%)',
          boxShadow: '0 6px 25px rgba(74, 144, 226, 0.4)',
          transform: 'translateY(-2px)',
        },
        '&:active': {
          transform: 'translateY(0px)',
        },
        '&:disabled': {
          backgroundColor: '#e2e8f0',
          color: '#94a3b8',
          boxShadow: 'none',
          background: 'none',
        },
        minWidth: '220px',
        height: '52px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {loading ? 'Adding...' : 'Add Saving Record'}
    </Button>
  );
};

export default AddSavingRecordButton;