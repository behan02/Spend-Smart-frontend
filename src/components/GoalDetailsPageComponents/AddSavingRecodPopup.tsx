import React, { useState, useEffect } from 'react';
import {
  Modal,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SavingRecord } from './SavingRecord';

interface Goal {
  id: number;
  name: string;
  savedAmount: number;
  targetAmount: number;
  progress: number;
  deadline?: Date;
  description?: string;
  remainingDays?: number;
  createdAt?: string;
  startDate?: string;
}

interface AddSavingRecodPopupProps {
  open: boolean;
  onClose: () => void;
  onSave: (record: Omit<SavingRecord, 'id'>) => void;
  goalId: number;
  goal?: Goal;
  savingRecords: SavingRecord[];
}

const AddSavingRecodPopup: React.FC<AddSavingRecodPopupProps> = ({
  open,
  onClose,
  onSave,
  goalId,
  goal,
  savingRecords
}) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    if (open) {
      const now = new Date();
      const currentDate = now.toISOString().split('T')[0];
      const currentTime = now.toTimeString().split(' ')[0].slice(0, 5);
      setDate(currentDate);
      setTime(currentTime);
    }
  }, [open]);

  // Calculate current total saved amount
  const getCurrentSavedAmount = () => {
    if (!goal) return 0;
    const totalFromRecords = savingRecords.reduce((total, record) => total + record.amount, 0);
    return goal.savedAmount + totalFromRecords;
  };

  // Validate if the new amount would exceed target
  const validateAmount = (newAmount: number) => {
    if (!goal) return true;
    
    const currentSaved = getCurrentSavedAmount();
    const proposedTotal = currentSaved + newAmount;
    const targetAmount = goal.targetAmount;
    
    if (proposedTotal > targetAmount) {
      const remainingAmount = targetAmount - currentSaved;
      if (remainingAmount <= 0) {
        setValidationError('🎉 Goal already completed! You cannot add more savings.');
        return false;
      } else {
        setValidationError(`⚠️ Amount exceeds target! You can only add up to ${remainingAmount.toLocaleString()} LKR more to reach your goal.`);
        return false;
      }
    } else if (proposedTotal === targetAmount) {
      setValidationError('🎉 Perfect! This amount will complete your goal exactly at 100%!');
      return true;
    }
    
    setValidationError('');
    return true;
  };

  const handleAmountChange = (value: string) => {
    setAmount(value);
    if (value && !isNaN(parseFloat(value))) {
      validateAmount(parseFloat(value));
    } else {
      setValidationError('');
    }
  };

  const handleSave = () => {
    if (!amount || !date || !time) return;

    const numericAmount = parseFloat(amount);
    
    // Final validation before saving
    if (!validateAmount(numericAmount)) {
      return;
    }

    // Combine date and time into a single Date object without timezone conversion
    // Create the datetime string in local timezone and send as-is to backend
    const combinedDateTimeString = `${date}T${time}:00`;

    const newRecord = {
      amount: numericAmount,
      date: combinedDateTimeString,
      description: description || '',
      goalId: goalId
    };

    onSave(newRecord);
    handleClose();
  };

  const handleClose = () => {
    setAmount('');
    setDate('');
    setTime('');
    setDescription('');
    setValidationError('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-saving-record-modal"
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" component="h2" fontWeight="bold">
            Add Saving Record
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Amount
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
            type="number"
            size="small"
            placeholder="Enter amount"
            inputProps={{ min: 0, step: "0.01" }}
            error={!!validationError}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f8f9fa'
              }
            }}
          />
          
          {/* Current Progress Info */}
          {goal && (
            <Box sx={{ mt: 2, p: 2, bgcolor: '#f8f9fa', borderRadius: 2, border: '1px solid #e2e8f0' }}>
              <Typography variant="body2" sx={{ fontSize: '12px', color: '#64748b', mb: 1 }}>
                📊 Current Progress
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '13px', fontWeight: 500 }}>
                Saved: {getCurrentSavedAmount().toLocaleString()} LKR / {goal.targetAmount.toLocaleString()} LKR
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '12px', color: '#64748b' }}>
                Remaining: {Math.max(0, goal.targetAmount - getCurrentSavedAmount()).toLocaleString()} LKR
              </Typography>
            </Box>
          )}
          
          {/* Validation Error */}
          {validationError && (
            <Alert 
              severity={
                validationError.includes('completed') || validationError.includes('Perfect') ? 'success' : 
                validationError.includes('exceeds') ? 'warning' : 'info'
              } 
              sx={{ mt: 2 }}
            >
              {validationError}
            </Alert>
          )}
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Date
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            type="date"
            value={date}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f8f9fa'
              }
            }}
            disabled
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Time
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            type="time"
            value={time}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f8f9fa'
              }
            }}
            disabled
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            Description (Optional)
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={3}
            size="small"
            placeholder="Enter description"
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f8f9fa'
              }
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button 
            variant="contained"
            onClick={handleClose}
            sx={{ 
              borderRadius: 3, 
              textTransform: 'none',
              bgcolor: '#e3f2fd',
              color: '#0b00dd',
              fontWeight: 600,
              px: 3,
              py: 1,
              '&:hover': {
                bgcolor: '#bbdefb'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="contained"
            onClick={handleSave}
            sx={{ 
              borderRadius: 3, 
              textTransform: 'none',
              bgcolor: '#0b00dd',
              color: '#ffffff',
              fontWeight: 600,
              px: 3,
              py: 1,
              '&:hover': {
                bgcolor: '#0a00c9'
              }
            }}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddSavingRecodPopup;