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
  Chip,
  Step,
  Stepper,
  StepLabel,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import CategoryIcons, { iconType } from '../../assets/categoryIcons/CategoryIcons';
import { categoryApi, Category } from '../../api/categoryApi';
import { budgetApi, CreateBudgetRequest } from '../../api/budgetApi';
import { useUser } from '../../context/UserContext';

interface BudgetFormData {
  name: string;
  type: 'Monthly' | 'Annually';
  startDate: string;
  selectedCategories: number[];
  categoryAmounts: { [key: number]: number };
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

// Create a local Category type that matches the structure we need
interface LocalCategory {
  id: number;
  categoryName: string;
  type: string;
}

const AddBudgetModal: React.FC<AddBudgetModalProps> = ({ 
  open, 
  onClose, 
  onSave, 
  initialData, 
  isEditMode = false 
}) => {
  const { user } = useUser();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<LocalCategory[]>([]);
  const [formData, setFormData] = useState<BudgetFormData>({
    name: '',
    type: 'Monthly',
    startDate: new Date().toISOString().split('T')[0], // Default to today
    selectedCategories: [],
    categoryAmounts: {},
    totalAmount: 0,
    description: ''
  });

  const steps = ['Budget Details', 'Set Amounts'];

  // Load categories from CategoryIcons when modal opens
  useEffect(() => {
    if (open) {
      loadCategoriesFromIcons();
      resetForm();
    }
  }, [open]);

  const loadCategoriesFromIcons = () => {
    try {
      // Filter out income categories (we only want expense categories for budgets)
      const expenseCategories = CategoryIcons
        .filter(icon => !icon.category.toLowerCase().includes('income') && 
                       !icon.category.toLowerCase().includes('salary'))
        .map((icon, index) => ({
          id: icon.id,
          categoryName: icon.category,
          type: 'Expense'
        }));
      
      setCategories(expenseCategories);
      setError(null);
    } catch (error) {
      console.error('Error loading categories from icons:', error);
      setError('Failed to load categories');
    }
  };

  const resetForm = () => {
    if (isEditMode && initialData) {
      setFormData({
        name: initialData.budgetName || '',
        type: initialData.budgetType || 'Monthly',
        startDate: initialData.startDate?.split('T')[0] || '',
        selectedCategories: initialData.categories?.map((cat: any) => cat.categoryId) || [],
        categoryAmounts: initialData.categories?.reduce((acc: any, cat: any) => {
          acc[cat.categoryId] = cat.allocatedAmount;
          return acc;
        }, {}) || {},
        totalAmount: initialData.totalBudgetAmount || 0,
        description: initialData.description || ''
      });
    } else {
      setFormData({
        name: '',
        type: 'Monthly',
        startDate: new Date().toISOString().split('T')[0], // Default to today
        selectedCategories: [],
        categoryAmounts: {},
        totalAmount: 0,
        description: ''
      });
    }
    setActiveStep(0);
    setError(null);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      // Validate first step
      if (!formData.name.trim()) {
        setError('Please enter a budget name');
        return;
      }
      if (!formData.startDate) {
        setError('Please select a start date');
        return;
      }
      if (formData.selectedCategories.length === 0) {
        setError('Please select at least one category');
        return;
      }
      setError(null);
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleCategoryToggle = (categoryId: number) => {
    setFormData(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(categoryId)
        ? prev.selectedCategories.filter(id => id !== categoryId)
        : [...prev.selectedCategories, categoryId]
    }));
  };

  const handleCategoryAmountChange = (categoryId: number, amount: string) => {
    const numAmount = parseFloat(amount) || 0;
    setFormData(prev => ({
      ...prev,
      categoryAmounts: {
        ...prev.categoryAmounts,
        [categoryId]: numAmount
      }
    }));
  };

  const calculateTotalAmount = () => {
    return Object.values(formData.categoryAmounts).reduce((sum, amount) => sum + amount, 0);
  };

  const handleSave = async () => {
    if (!user) {
      setError('User not found');
      return;
    }

    // Check if all categories have amounts
    const missingAmounts = formData.selectedCategories.some(
      categoryId => !formData.categoryAmounts[categoryId] && formData.categoryAmounts[categoryId] !== 0
    );

    if (missingAmounts) {
      setError('Please enter amounts for all selected categories');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const totalAmount = calculateTotalAmount();

      // Map our local category IDs to the budget request
      const budgetRequest: CreateBudgetRequest = {
        budgetName: formData.name,
        budgetType: formData.type,
        startDate: formData.startDate,
        description: formData.description,
        categoryAllocations: formData.selectedCategories.map(categoryId => {
          // Find the corresponding category
          const category = categories.find(cat => cat.id === categoryId);
          
          return {
            categoryId,
            allocatedAmount: formData.categoryAmounts[categoryId] || 0
          };
        })
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
        selectedCategories: [],
        categoryAmounts: {},
        totalAmount: 0,
        description: ''
      });
      setActiveStep(0);
    } catch (error: any) {
      console.error('Error saving budget:', error);
      console.error('Error response:', error.response);
      setError(error.response?.data?.message || error.message || 'Failed to save budget');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setActiveStep(0);
    setError(null);
    onClose();
  };

  // Get category icon and details
  const getCategoryDetails = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    // Get icon directly from CategoryIcons since we're using the same IDs
    const iconDetails = CategoryIcons.find(icon => icon.id === categoryId);
    
    return {
      name: category?.categoryName || 'Unknown',
      icon: iconDetails?.icon || '❓',
      color: iconDetails?.color || '#ccc'
    };
  };

  // Only show expense categories for budget selection
  const availableCategories = categories;

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Box>
            {/* Budget Type Toggle */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
              <ToggleButtonGroup
                value={formData.type}
                exclusive
                onChange={(e, newType) => newType && setFormData(prev => ({ ...prev, type: newType as 'Monthly' | 'Annually' }))}
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

            {/* Categories */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold' }}>
                Categories
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {formData.selectedCategories.length > 0 ? (
                  formData.selectedCategories.map(categoryId => {
                    const categoryDetails = getCategoryDetails(categoryId);
                    return (
                      <Chip
                        key={categoryId}
                        icon={<span style={{ fontSize: '1.2rem', marginLeft: '8px' }}>{categoryDetails.icon}</span>}
                        label={categoryDetails.name}
                        onDelete={() => handleCategoryToggle(categoryId)}
                        sx={{ 
                          backgroundColor: categoryDetails.color + '20',  // Add transparency
                          color: 'rgba(0,0,0,0.87)',
                          '& .MuiChip-deleteIcon': { color: 'rgba(0,0,0,0.54)' }
                        }}
                      />
                    );
                  })
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No categories selected. Please select from the list below.
                  </Typography>
                )}
              </Box>
            </Box>

            {/* Category Selection Grid */}
            <Box sx={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
              gap: 1,
              mb: 3,
              maxHeight: '300px',
              overflowY: 'auto',
              p: 1
            }}>
              {availableCategories.map(category => {
                const categoryDetails = getCategoryDetails(category.id);
                return (
                  <Button
                    key={category.id}
                    onClick={() => handleCategoryToggle(category.id)}
                    sx={{
                      p: 1.5,
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      backgroundColor: formData.selectedCategories.includes(category.id) 
                        ? '#e3f2fd' 
                        : 'transparent',
                      color: formData.selectedCategories.includes(category.id) 
                        ? '#1976d2' 
                        : 'inherit',
                      textTransform: 'none',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      gap: 1
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{categoryDetails.icon}</span> 
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {categoryDetails.name}
                    </span>
                  </Button>
                );
              })}
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box>
            {/* Budget Type Toggle */}
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center' }}>
              <ToggleButtonGroup
                value={formData.type}
                exclusive
                onChange={(e, newType) => newType && setFormData(prev => ({ ...prev, type: newType as 'Monthly' | 'Annually' }))}
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

            {/* Category Amounts */}
            <Box sx={{ mb: 3 }}>
              {formData.selectedCategories.map(categoryId => {
                const categoryDetails = getCategoryDetails(categoryId);
                return (
                  <Box key={categoryId} sx={{ mb: 2 }}>
                    <Typography variant="body1" sx={{ 
                      mb: 1, 
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1
                    }}>
                      <span style={{ 
                        fontSize: '1.2rem', 
                        backgroundColor: categoryDetails.color + '30',
                        padding: '4px',
                        borderRadius: '4px',
                        display: 'inline-flex'
                      }}>
                        {categoryDetails.icon}
                      </span> 
                      {categoryDetails.name}
                    </Typography>
                    <TextField
                      fullWidth
                      variant="outlined"
                      type="number"
                      value={formData.categoryAmounts[categoryId] || ''}
                      onChange={(e) => handleCategoryAmountChange(categoryId, e.target.value)}
                      placeholder="Enter amount"
                      size="small"
                      InputProps={{
                        startAdornment: <span style={{ marginRight: 8 }}>LKR</span>,
                      }}
                    />
                  </Box>
                );
              })}
            </Box>

            {/* Total Budget */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body1" sx={{ mb: 1, fontWeight: 'bold' }}>
                Total Budget
              </Typography>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                value={calculateTotalAmount()}
                disabled
                size="small"
                sx={{ backgroundColor: '#f5f5f5' }}
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

      default:
        return null;
    }















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

        {/* Step Progress */}
        <Box sx={{ mb: 3 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
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
          /* Step Content */
          renderStepContent()
        )}

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            onClick={activeStep === 0 ? handleClose : handleBack}
            variant="outlined"
            sx={{ textTransform: 'none', borderRadius: 2 }}
          >
            {activeStep === 0 ? 'Cancel' : 'Back'}
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              onClick={handleSave}
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
          ) : (
            <Button
              onClick={handleNext}
              variant="contained"
              disabled={loading || formData.name.trim() === '' || formData.selectedCategories.length === 0}
              sx={{ 
                textTransform: 'none', 
                borderRadius: 2,
                backgroundColor: '#2952CC'
              }}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Modal>
  );
}
export default AddBudgetModal;