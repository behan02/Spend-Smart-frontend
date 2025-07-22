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
        backgroundColor: '#0B00DD',
        color: 'white',
        borderRadius: '30px',
        textTransform: 'none',
        fontWeight: 'bold',
        fontSize: '18px',
        fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
        padding: '10px 20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        '&:hover': {
          backgroundColor: '#0a00bb',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          transform: 'translateY(-1px)',
        },
        '&:active': {
          transform: 'translateY(0px)',
        },
        '&:disabled': {
          backgroundColor: '#e2e8f0',
          color: '#94a3b8',
          boxShadow: 'none',
        },
        minWidth: '220px',
        height: '52px',
        transition: 'all 0.2s ease'
      }}
    >
      {loading ? 'Adding...' : 'Add Saving Record'}
    </Button>
  );
};

export default AddSavingRecordButton;