import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid, 
  Container,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BudgetItem from '../../components/Budget/BudgetItem';
import BudgetDetails from '../../components/Budget/BudgetDetails';
import AddBudgetModal from '../../components/Budget/AddBudgetModal';
import { budgetCategories } from '../../components/Budget/types/budgetCategories';
import { Budget, BudgetFormData } from '../../components/Budget/types/budget';
import Sidebar from '../../components/sidebar/sidebar';
import Header from '../../components/header/header'; 

const BudgetPage: React.FC = () => {
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  // Mock data - replace with actual data fetching
  useEffect(() => {
    const mockBudgets: Budget[] = [
      {
        id: 1,
        name: 'Grocery',
        type: 'monthly',
        startDate: '2024-01-01',
        totalAmount: 1458.30,
        spentAmount: 1458.30,
        remainingAmount: 0,
        progress: 100,
        remainingDays: 2,
        categories: [
          {
            id: 1,
            name: 'Food and beverages',
            allocatedAmount: 1458.30,
            spentAmount: 1458.30,
            remainingAmount: 0,
            icon: '🍔'
          }
        ],
        description: 'Monthly grocery budget'
      },
      {
        id: 2,
        name: 'Cloths',
        type: 'monthly',
        startDate: '2024-01-01',
        totalAmount: 500.00,
        spentAmount: 250.00,
        remainingAmount: 250.00,
        progress: 50,
        categories: [
          {
            id: 12,
            name: 'Clothing',
            allocatedAmount: 500.00,
            spentAmount: 250.00,
            remainingAmount: 250.00,
            icon: '👔'
          }
        ],
        description: 'Monthly clothing budget'
      },
      {
        id: 3,
        name: 'Transportation',
        type: 'monthly',
        startDate: '2024-01-01',
        totalAmount: 800.00,
        spentAmount: 400.00,
        remainingAmount: 400.00,
        progress: 50,
        categories: [
          {
            id: 2,
            name: 'Transportation',
            allocatedAmount: 800.00,
            spentAmount: 400.00,
            remainingAmount: 400.00,
            icon: '🚗'
          }
        ],
        description: 'Monthly transportation budget'
      },
      {
        id: 4,
        name: 'Education',
        type: 'monthly',
        startDate: '2024-01-01',
        totalAmount: 1200.00,
        spentAmount: 300.00,
        remainingAmount: 900.00,
        progress: 25,
        categories: [
          {
            id: 3,
            name: 'Education',
            allocatedAmount: 1200.00,
            spentAmount: 300.00,
            remainingAmount: 900.00,
            icon: '🎓'
          }
        ],
        description: 'Monthly education budget'
      }
    ];

    setBudgets(mockBudgets);
    setSelectedBudget(mockBudgets[0]); // Select first budget by default
  }, []);

  const handleAddBudget = () => {
    setIsEditMode(false);
    setEditingBudget(null);
    setIsAddModalOpen(true);
  };

  const handleEditBudget = (id: number) => {
    const budget = budgets.find(b => b.id === id);
    if (budget) {
      setEditingBudget(budget);
      setIsEditMode(true);
      setIsAddModalOpen(true);
    }
  };

  const handleDeleteBudget = (id: number) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
    if (selectedBudget?.id === id) {
      setSelectedBudget(budgets.find(b => b.id !== id) || null);
    }
  };

  const handleSaveBudget = (budgetData: BudgetFormData) => {
    if (isEditMode && editingBudget) {
      // Update existing budget
      const updatedBudget: Budget = {
        ...editingBudget,
        name: budgetData.name,
        type: budgetData.type,
        startDate: budgetData.startDate,
        totalAmount: budgetData.totalAmount,
        remainingAmount: budgetData.totalAmount - editingBudget.spentAmount,
        progress: (editingBudget.spentAmount / budgetData.totalAmount) * 100,
        categories: budgetData.selectedCategories.map(categoryId => {
          const category = budgetCategories.find(c => c.id === categoryId);
          const existingCategory = editingBudget.categories.find(c => c.id === categoryId);
          return {
            id: categoryId,
            name: category?.name || '',
            allocatedAmount: budgetData.categoryAmounts[categoryId] || 0,
            spentAmount: existingCategory?.spentAmount || 0,
            remainingAmount: (budgetData.categoryAmounts[categoryId] || 0) - (existingCategory?.spentAmount || 0),
            icon: category?.icon
          };
        }),
        description: budgetData.description
      };

      setBudgets(prev => prev.map(b => b.id === editingBudget.id ? updatedBudget : b));
      setSelectedBudget(updatedBudget);
    } else {
      // Create new budget
      const newBudget: Budget = {
        id: Date.now(),
        name: budgetData.name,
        type: budgetData.type,
        startDate: budgetData.startDate,
        totalAmount: budgetData.totalAmount,
        spentAmount: 0,
        remainingAmount: budgetData.totalAmount,
        progress: 0,
        categories: budgetData.selectedCategories.map(categoryId => {
          const category = budgetCategories.find(c => c.id === categoryId);
          return {
            id: categoryId,
            name: category?.name || '',
            allocatedAmount: budgetData.categoryAmounts[categoryId] || 0,
            spentAmount: 0,
            remainingAmount: budgetData.categoryAmounts[categoryId] || 0,
            icon: category?.icon
          };
        }),
        description: budgetData.description
      };

      setBudgets(prev => [...prev, newBudget]);
      setSelectedBudget(newBudget);
    }
  };

  const handleViewDetails = (id: number) => {
    // Navigate to detailed budget view - implement based on your routing
    console.log('View details for budget:', id);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <header />
        
        {/* Page Content */}
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4, flexGrow: 1 }}>
          {/* Hero Section */}
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              mb: 4,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
                Budget
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, opacity: 0.9, maxWidth: '60%' }}>
                Take control of your finances with our easy-to-use Budget Manager. Create personalized budgets, categorize your spending, and track your expenses in real time.
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAddBudget}
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  backdropFilter: 'blur(10px)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                  }
                }}
              >
                Add Budget
              </Button>
            </Box>
            
            {/* Decorative Elements */}
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                zIndex: 0
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: -30,
                right: 100,
                width: 100,
                height: 100,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                zIndex: 0
              }}
            />
          </Paper>

          {/* Budget Content */}
          <Grid container spacing={3}>
            {/* Budget List */}
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {budgets.map(budget => (
                  <BudgetItem
                    key={budget.id}
                    budget={budget}
                    isSelected={selectedBudget?.id === budget.id}
                    onClick={() => setSelectedBudget(budget)}
                  />
                ))}
              </Box>
            </Grid>

            {/* Budget Details */}
            <Grid item xs={12} md={8}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 4, 
                  borderRadius: 3,
                  height: 'fit-content',
                  minHeight: '500px'
                }}
              >
                <BudgetDetails
                  budget={selectedBudget}
                  onEdit={handleEditBudget}
                  onDelete={handleDeleteBudget}
                  onViewDetails={handleViewDetails}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Add/Edit Budget Modal */}
      <AddBudgetModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveBudget}
        initialData={editingBudget}
        isEditMode={isEditMode}
      />
    </Box>
  );
};

export default BudgetPage;