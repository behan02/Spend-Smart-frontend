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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface AddBudgetModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (budget: any) => void;
}

const AddBudgetModal: React.FC<AddBudgetModalProps> = ({ open, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [budgetLimit, setBudgetLimit] = useState('');  // Total budget amount
  const [spentAmount, setSpentAmount] = useState(''); // Amount already spent
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [description, setDescription] = useState('');

  const handleSave = () => {
    if (!name || !budgetLimit) {
      return;
    }

    // Default spent amount to 0 if not provided
    const spent = spentAmount ? parseFloat(spentAmount) : 0;
    const limit = parseFloat(budgetLimit);

    // Calculate remaining amount and percentage
    const remainingAmount = Math.max(0, limit - spent);
    const spentPercentage = Math.min(100, Math.round((spent / limit) * 100));

    const newBudget = {
      name,
      budgetLimit: limit,
      spentAmount: spent,
      remainingAmount: remainingAmount,
      progress: spentPercentage, // Progress now represents percentage spent
      deadline: deadline,
      description,
    };

    onSave(newBudget);
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setBudgetLimit('');
    setSpentAmount('');
    setDeadline(null);
    setDescription('');
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-budget-modal"
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
            Add New Budget
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Budget Name</Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="small"
            placeholder="e.g., Groceries, Entertainment"
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ width: '48%' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>Budget Limit</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={budgetLimit}
              onChange={(e) => setBudgetLimit(e.target.value)}
              type="number"
              size="small"
              placeholder="Total budget"
            />
          </Box>
          <Box sx={{ width: '48%' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>Already Spent</Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={spentAmount}
              onChange={(e) => setSpentAmount(e.target.value)}
              type="number"
              size="small"
              placeholder="Optional"
            />
          </Box>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>Budget Period End Date</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={deadline}
              onChange={(newValue) => setDeadline(newValue)}
              slotProps={{ textField: { size: 'small', fullWidth: true, placeholder: "When does this budget end?" } }}
            />
          </LocalizationProvider>
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
            placeholder="Add notes about this budget"
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

export default AddBudgetModal;