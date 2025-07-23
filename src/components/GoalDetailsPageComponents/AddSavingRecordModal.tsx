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

interface AddSavingRecordModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (record: Omit<SavingRecord, 'id'>) => void;
  goalId: number;
}

const AddSavingRecordModal: React.FC<AddSavingRecordModalProps> = ({
  open,
  onClose,
  onSave,
  goalId
}) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!amount) return;

    const newRecord = {
      amount: parseFloat(amount),
      date: new Date().toISOString(),
      description: description || '',
      goalId: goalId
    };

    onSave(newRecord);
    handleClose();
  };

  const handleClose = () => {
    setAmount('');
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
          borderRadius: 2,
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

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Amount</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            size="small"
            placeholder="Enter amount"
            inputProps={{ min: 0, step: "0.01" }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Description (Optional)</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
            placeholder="e.g., Necessities, Monthly savings"
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
            disabled={!amount}
            sx={{ borderRadius: 2, textTransform: 'none' }}
          >
            Add Record
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddSavingRecordModal;
