import React, { useState } from 'react';
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
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!name || !targetAmount || !currentAmount) {
      return;
    }

    // Convert the date string to a Date object if it exists
    const deadline = deadlineDate ? new Date(deadlineDate) : null;

    const newGoal = {
      name,
      targetAmount: parseFloat(targetAmount),
      savedAmount: parseFloat(currentAmount),
      progress: Math.round((parseFloat(currentAmount) / parseFloat(targetAmount)) * 100),
      deadline: deadline,
      description,
    };

    onSave(newGoal);
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
            onChange={(e) => setName(e.target.value)}
            size="small"
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ width: '48%' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>Target amount</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              type="number"
              size="small"
            />
          </Box>
          <Box sx={{ width: '48%' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>Current amount</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              type="number"
              size="small"
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