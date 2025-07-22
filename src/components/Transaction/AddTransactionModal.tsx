import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Chip
} from '@mui/material';
import { categoryApi, Category } from '../../api/categoryApi';
import { transactionApi, CreateTransactionRequest } from '../../api/transactionApi';
import { useUser } from '../../context/UserContext';
import CategoryIcons, { iconType } from '../../assets/categoryIcons/CategoryIcons';

interface AddTransactionModalProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  initialData?: any;
  isEditMode?: boolean;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  open,
  onClose,
  onSave,
  initialData,
  isEditMode = false
}) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [budgetImpacts, setBudgetImpacts] = useState<any[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  
  const [formData, setFormData] = useState({
    transactionType: 'Expense' as 'Income' | 'Expense',
    categoryId: '',
    amount: '',
    transactionDate: new Date().toISOString().split('T')[0],
    description: '',
    merchantName: '',
    location: '',
    tags: [] as string[],
    receiptUrl: '',
    isRecurring: false,
    recurringFrequency: '' as 'Daily' | 'Weekly' | 'Monthly' | 'Annually' | '',
    recurringEndDate: ''
  });

  // Load categories when modal opens
  useEffect(() => {
    if (open) {
      loadCategories();
      resetForm();
    }
  }, [open]);

  const loadCategories = async () => {
    try {
      setLoadingCategories(true);
      const allCategories = await categoryApi.getAllCategories();
      console.log('Categories loaded:', allCategories);
      setCategories(allCategories);
    } catch (error) {
      console.error('Error loading categories:', error);
      setError('Failed to load categories. Using default categories.');
      
      // Create fallback categories from CategoryIcons
      const fallbackCategories: Category[] = CategoryIcons.map(icon => ({
        id: icon.id,
        categoryName: icon.category,
        type: icon.category === "Salary / Income" ? "Income" : "Expense"
      }));
      
      console.log('Using fallback categories:', fallbackCategories);
      setCategories(fallbackCategories);
    } finally {
      setLoadingCategories(false);
    }
  };

  const resetForm = () => {
    if (isEditMode && initialData) {
      setFormData({
        transactionType: initialData.transactionType || 'Expense',
        categoryId: initialData.categoryId?.toString() || '',
        amount: initialData.amount?.toString() || '',
        transactionDate: initialData.transactionDate?.split('T')[0] || new Date().toISOString().split('T')[0],
        description: initialData.description || '',
        merchantName: initialData.merchantName || '',
        location: initialData.location || '',
        tags: initialData.tags || [],
        receiptUrl: initialData.receiptUrl || '',
        isRecurring: initialData.isRecurring || false,
        recurringFrequency: initialData.recurringFrequency || '',
        recurringEndDate: initialData.recurringEndDate?.split('T')[0] || ''
      });
    } else {
      setFormData({
        transactionType: 'Expense',
        categoryId: '',
        amount: '',
        transactionDate: new Date().toISOString().split('T')[0],
        description: '',
        merchantName: '',
        location: '',
        tags: [],
        receiptUrl: '',
        isRecurring: false,
        recurringFrequency: '',
        recurringEndDate: ''
      });
    }
    setError(null);
    setBudgetImpacts([]);
  };

  const handleSave = async () => {
    if (!user) {
      setError('User not found');
      return;
    }

    if (!formData.categoryId || !formData.amount || !formData.transactionDate) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const transactionRequest: CreateTransactionRequest = {
        transactionType: formData.transactionType,
        categoryId: parseInt(formData.categoryId),
        amount: parseFloat(formData.amount),
        transactionDate: formData.transactionDate,
        description: formData.description || undefined,
        merchantName: formData.merchantName || undefined,
        location: formData.location || undefined,
        tags: formData.tags.length > 0 ? formData.tags : undefined,
        receiptUrl: formData.receiptUrl || undefined,
        isRecurring: formData.isRecurring,
        recurringFrequency: formData.recurringFrequency || undefined,
        recurringEndDate: formData.recurringEndDate || undefined
      };

      let result;
      if (isEditMode && initialData?.transactionId) {
        result = await transactionApi.updateTransaction(initialData.transactionId, transactionRequest);
      } else {
        result = await transactionApi.createTransaction(user.id, transactionRequest);
      }

      // Show budget impacts if this is an expense transaction
      if (result.budgetImpacts && result.budgetImpacts.length > 0) {
        setBudgetImpacts(result.budgetImpacts);
      }

      onSave(); // Trigger refresh
      
      // Close modal after showing impacts (or immediately if no impacts)
      if (result.budgetImpacts.length === 0) {
        onClose();
      } else {
        // Auto-close after 3 seconds to show budget impacts
        setTimeout(() => {
          onClose();
        }, 3000);
      }
    } catch (error: any) {
      console.error('Error saving transaction:', error);
      setError(error.response?.data?.message || 'Failed to save transaction');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Get categories filtered by transaction type (case-insensitive comparison)
  const filteredCategories = categories.filter(cat => 
    cat.type.toLowerCase() === formData.transactionType.toLowerCase()
  );

  console.log('Current transaction type:', formData.transactionType);
  console.log('Filtered categories:', filteredCategories);
  console.log('All categories:', categories);

  // Get category details for UI
  const getCategoryDetails = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    
    // If we have icon and color directly from the API, use those
    if (category?.icon && category?.color) {
      return {
        name: category.categoryName,
        icon: category.icon,
        color: category.color
      };
    }
    
    // Fallback to CategoryIcons
    const iconDetails = CategoryIcons.find(icon => icon.id === categoryId);
    return {
      name: category?.categoryName || 'Unknown',
      icon: iconDetails?.icon || '❓',
      color: iconDetails?.color || '#ccc'
    };
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth={true}
    >
      <DialogTitle>
        {isEditMode ? 'Edit Transaction' : 'Add New Transaction'}
      </DialogTitle>
      
      <DialogContent>
        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* Budget Impact Alert */}
        {budgetImpacts.length > 0 && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Budget Impact:
            </Typography>
            {budgetImpacts.map((impact, index) => (
              <Typography key={index} variant="body2">
                • {impact.budgetName} ({impact.categoryName}): ${impact.impactAmount.toFixed(2)} deducted
              </Typography>
            ))}
          </Alert>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress />
          </Box>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          {/* Transaction Type */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Transaction Type
            </Typography>
            <ToggleButtonGroup
              value={formData.transactionType}
              exclusive
              onChange={(e, value) => {
                if (value) {
                  console.log('Setting transaction type to:', value);
                  setFormData(prev => ({ ...prev, transactionType: value, categoryId: '' }));
                }
              }}
              sx={{ mb: 1 }}
            >
              <ToggleButton value="Income" sx={{ px: 3 }}>
                Income
              </ToggleButton>
              <ToggleButton value="Expense" sx={{ px: 3 }}>
                Expense
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Category */}
          <FormControl fullWidth required>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.categoryId}
              label="Category"
              onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
            >
              {loadingCategories ? (
                <MenuItem disabled>Loading categories...</MenuItem>
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map(category => {
                  const details = getCategoryDetails(category.id);
                  return (
                    <MenuItem key={category.id} value={category.id.toString()}>
                      {details.icon} {details.name}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem disabled>No categories found for {formData.transactionType}</MenuItem>
              )}
            </Select>
          </FormControl>

          {/* Amount */}
          <TextField
            fullWidth
            required
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            inputProps={{ min: 0, step: 0.01 }}
          />

          {/* Date */}
          <TextField
            fullWidth
            required
            label="Date"
            type="date"
            value={formData.transactionDate}
            onChange={(e) => setFormData(prev => ({ ...prev, transactionDate: e.target.value }))}
            InputLabelProps={{ shrink: true }}
          />

          {/* Description */}
          <TextField
            fullWidth
            label="Description"
            multiline
            rows={2}
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />

          {/* Merchant Name */}
          <TextField
            fullWidth
            label="Merchant Name"
            value={formData.merchantName}
            onChange={(e) => setFormData(prev => ({ ...prev, merchantName: e.target.value }))}
          />

          {/* Location */}
          <TextField
            fullWidth
            label="Location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          variant="contained" 
          disabled={loading || !formData.categoryId || !formData.amount}
        >
          {loading ? <CircularProgress size={20} /> : (isEditMode ? 'Update' : 'Save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTransactionModal;
