import React, { useState } from 'react';
import {
  Modal,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { SavingRecord } from './SavingRecord';

interface AddSavingRecodPopupProps {
  open: boolean;
  onClose: () => void;
  onSave: (record: Omit<SavingRecord, 'id'>) => void;
  goalId: number;
}

const AddSavingRecodPopup: React.FC<AddSavingRecodPopupProps> = ({
  open,
  onClose,
  onSave,
  goalId
}) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!amount || !date || !time) return;

    // Combine date and time into a single Date object and convert to ISO string for API
    const combinedDateTime = new Date(`${date}T${time}`);
    const isoDateString = combinedDateTime.toISOString();

    const newRecord = {
      amount: parseFloat(amount),
      date: isoDateString,
      description: description || 'Necessities',
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
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            size="small"
            placeholder="Enter amount"
            inputProps={{ min: 0, step: "0.01" }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: '#f8f9fa'
              }
            }}
          />
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
            onChange={(e) => setDate(e.target.value)}
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
            onChange={(e) => setTime(e.target.value)}
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
              color: '#1976d2',
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
            disabled={!amount || !date || !time}
            sx={{ 
              borderRadius: 3, 
              textTransform: 'none',
              bgcolor: '#1976d2',
              fontWeight: 600,
              px: 3,
              py: 1,
              '&:hover': {
                bgcolor: '#1565c0'
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