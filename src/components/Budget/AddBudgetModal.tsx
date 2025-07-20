import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Modal, 
  Paper,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { budgetApi, CreateBudgetRequest } from '../../api/budgetApi';
import { useUser } from '../../context/UserContext';

interface BudgetFormData {
  name: string;
  type: 'Monthly' | 'Annually';
  startDate: string;
  totalAmount: number;
  description: string;
}

interface AddBudgetModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void; // Changed to just trigger refresh
  initialData?: any;
  isEditMode?: boolean;
}

interface AddBudgetModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void; // Changed to just trigger refresh
  initialData?: any;
  isEditMode?: boolean;
}

const AddBudgetModal: React.FC<AddBudgetModalProps> = ({ 
  open, 
  onClose, 
  onSave, 
  initialData, 
  isEditMode = false 
}) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<BudgetFormData>({
    name: '',
    type: 'Monthly',
    startDate: new Date().toISOString().split('T')[0], // Default to today
    totalAmount: 0,
    description: ''
  });

  // Load initial data when modal opens
  useEffect(() => {
    if (open) {
      resetForm();
    }
  }, [open]);

  const resetForm = () => {
    if (isEditMode && initialData) {
      setFormData({
        name: initialData.budgetName || '',
        type: initialData.budgetType || 'Monthly',
        startDate: initialData.startDate?.split('T')[0] || '',
        totalAmount: initialData.totalBudgetAmount || 0,
        description: initialData.description || ''
      });
    } else {
      setFormData({
        name: '',
        type: 'Monthly',
        startDate: new Date().toISOString().split('T')[0], // Default to today
        totalAmount: 0,
        description: ''
      });
    }
    setError(null);
  };

  const handleNext = () => {
    // Validate form
    if (!formData.name.trim()) {
      setError('Please enter a budget name');
      return;
    }
    if (!formData.startDate) {
      setError('Please select a starting date');
      return;
    }
    if (formData.totalAmount <= 0) {
      setError('Please enter a valid budget amount greater than 0');
      return;
    }
    handleSave();
  };

  const handleSave = async () => {
    if (!user) {
      setError('User not found');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const budgetRequest: CreateBudgetRequest = {
        budgetName: formData.name,
        budgetType: formData.type,
        startDate: formData.startDate,
        description: formData.description,
        categoryAllocations: [{
          categoryId: 1, // Use a default category or create a general category
          allocatedAmount: formData.totalAmount
        }]
      };

      console.log('Sending budget request:', budgetRequest);
      console.log('User ID:', user.id);

      if (isEditMode && initialData?.budgetId) {
        await budgetApi.updateBudget(initialData.budgetId, budgetRequest);
      } else {
        await budgetApi.createBudget(user.id, budgetRequest);
      }

      console.log('Budget saved successfully!');
      onSave(); // Trigger refresh
      onClose();
      
      // Reset form data
      setFormData({
        name: '',
        type: 'Monthly',
        startDate: new Date().toISOString().split('T')[0],
        totalAmount: 0,
        description: ''
      });
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError(null);
    onClose();
  };

  const renderFormContent = () => {
    return (
      <Box>
        {/* Budget Type Toggle */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
          <ToggleButtonGroup
            value={formData.type}
            exclusive
            onChange={(_, newType) => newType && setFormData(prev => ({ ...prev, type: newType }))}
            sx={{ borderRadius: 2 }}
          >
            <ToggleButton value="Monthly" sx={{ px: 3, textTransform: 'none' }}>
              Monthly
            </ToggleButton>
            <ToggleButton value="Annually" sx={{ px: 3, textTransform: 'none' }}>
              Annually
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {/* Budget Name */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
            Name
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter budget name"
            size="small"
          />
        </Box>

        {/* Starting Date */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
            Starting Date
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
        </Box>

        {/* Total Budget Amount */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
            Total Budget
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            value={formData.totalAmount || ''}
            onChange={(e) => setFormData(prev => ({ ...prev, totalAmount: parseFloat(e.target.value) || 0 }))}
            placeholder="Enter total budget amount"
            size="small"
            inputProps={{ min: 0, step: 0.01 }}
          />
        </Box>

        {/* Description */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
            Description (Optional)
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter budget description"
            size="small"
          />
        </Box>
      </Box>
    );
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
          width: 500,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          maxHeight: '80vh',
          overflowY: 'auto'
        }}
      >
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" component="h2" fontWeight="bold">
            {isEditMode ? 'Edit Budget' : 'Create Your Budget'}
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          /* Form Content */
          renderFormContent()
        )}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            onClick={handleClose}
            variant="outlined"
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            Cancel
          </Button>
          
          <Button
            onClick={handleNext}
            variant="contained"
            disabled={loading}
            sx={{ 
              textTransform: 'none', 
              borderRadius: 2,
              backgroundColor: '#2952CC'
            }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Save'}
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default AddBudgetModal;