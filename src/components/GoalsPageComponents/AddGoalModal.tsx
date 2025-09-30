import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Modal, 
  Paper,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface AddGoalModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (goal: any) => void;
  initialData?: any;
  isEditMode?: boolean;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ open, onClose, onSave, initialData, isEditMode = false }) => {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [description, setDescription] = useState('');
  
  // Set initial values when editing
  useEffect(() => {
    if (isEditMode && initialData) {
      setName(initialData.name || '');
      setTargetAmount(initialData.targetAmount?.toString() || '');
      setCurrentAmount(initialData.currentAmount?.toString() || '');
      setDeadlineDate(initialData.endDate ? initialData.endDate.split('T')[0] : '');
      setDescription(initialData.description || '');
      console.log('Editing goal with data:', initialData);
    } else {
      // Reset form when opening for new goal
      setName('');
      setTargetAmount('');
      setCurrentAmount('');
      setDeadlineDate('');
      setDescription('');
    }
  }, [isEditMode, initialData, open]);

  const handleSave = () => {
    if (!name || !targetAmount) {
      return;
    }

    const currentAmountValue = currentAmount ? parseFloat(currentAmount) : 0;
    
    // Prepare the goal data with field names that match the API
    const goalData = {
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: currentAmountValue,
      // Also include savedAmount for backwards compatibility with frontend
      savedAmount: currentAmountValue,
      progress: parseFloat(targetAmount) > 0 
        ? Math.round((currentAmountValue / parseFloat(targetAmount)) * 100) 
        : 0,
      // Use endDate to match backend model
      endDate: deadlineDate || new Date().toISOString().split('T')[0],
      description,
      // Include the ID if in edit mode
      ...(isEditMode && initialData?.id && { id: initialData.id }),
    };

    console.log('Saving goal data:', goalData);
    onSave(goalData);
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setTargetAmount('');
    setCurrentAmount('');
    setDeadlineDate('');
    setDescription('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-goal-modal"
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" component="h2" fontWeight="bold">
            Add New Goal
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Name</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => {
              // Allow only letters, numbers, and spaces
              if (e.target.value === '' || /^[a-zA-Z0-9 ]+$/.test(e.target.value)) {
          setName(e.target.value);
              }
            }}
            size="small"
            error={name !== '' && !/^[a-zA-Z0-9 ]+$/.test(name)}
            helperText={name !== '' && !/^[a-zA-Z0-9 ]+$/.test(name) ? "Name should contain only letters and numbers" : ""}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ width: '48%' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>Target amount</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={targetAmount}
              onChange={(e) => {
              const value = e.target.value;
              if (value === '' || /^\d*\.?\d*$/.test(value)) {
          setTargetAmount(value);
              }
              }}
              type="number"
              size="small"
              error={targetAmount !== '' && !/^\d*\.?\d*$/.test(targetAmount)}
              helperText={targetAmount !== '' && !/^\d*\.?\d*$/.test(targetAmount) 
              ? "Target amount should be a valid number" 
              : ""}
            />
            </Box>
          <Box sx={{ width: '48%' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>Current amount</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={currentAmount}
              onChange={(e) => {
          const value = e.target.value;
          if (value === '' || (/^\d*\.?\d*$/.test(value) && (targetAmount === '' || parseFloat(value) <= parseFloat(targetAmount)))) {
            setCurrentAmount(value);
          }
              }}
              type="number"
              size="small"
              error={currentAmount !== '' && (!/^\d*\.?\d*$/.test(currentAmount) || 
          (targetAmount !== '' && parseFloat(currentAmount) > parseFloat(targetAmount)))}
              helperText={currentAmount !== '' && (!/^\d*\.?\d*$/.test(currentAmount) 
          ? "Current amount should be a valid number" 
          : (targetAmount !== '' && parseFloat(currentAmount) > parseFloat(targetAmount))
            ? "Current amount cannot exceed target amount"
            : "")}
            />
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Deadline</Typography>
          <TextField
            fullWidth
            variant="outlined"
            type="date"
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              min: new Date().toISOString().split('T')[0]
            }}
            error={deadlineDate !== '' && new Date(deadlineDate) <= new Date(new Date().setHours(0, 0, 0, 0))}
            helperText={deadlineDate !== '' && new Date(deadlineDate) <= new Date(new Date().setHours(0, 0, 0, 0)) 
              ? "Deadline must be a future date" 
              : ""}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Description (Optional)</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button 
            variant="contained" 
            color="inherit"
            onClick={handleClose}
            sx={{ borderRadius: 2, textTransform: 'none', bgcolor: '#d3e3f9' }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleSave}
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddGoalModal;