import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Paper
} from '@mui/material';
import BudgetItem from '../../components/Budget/BudgetItem';
import BudgetDetails from '../../components/Budget/BudgetDetails';
import AddBudgetModal from '../../components/Budget/AddBudgetModal';
import BudgetHeaderCard from '../../components/Budget/BudgetHeaderCard';
import { budgetCategories } from '../../components/Budget/types/budgetCategories';
import { Budget, BudgetFormData } from '../../components/Budget/types/budget';
import Sidebar from '../../components/sidebar/sidebar'; 

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
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa', overflowX: 'hidden' }}>
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Header */}
        <header />
        
        {/* Page Content */}
        <Box sx={{ mt: 4, mb: 4, flexGrow: 1, px: 4, maxWidth: '1200px', mx: 'auto', overflowX: 'hidden' }}>
          {/* Hero Section */}
          <BudgetHeaderCard
            title="Budget"
            description="Take control of your finances with our easy-to-use Budget Manager. Create personalized budgets, categorize your spending, and track your expenses in real time."
            buttonText="Add Budget"
            onButtonClick={handleAddBudget}
            imagePath="/src/assets/images/Finance-pana1.png"
          />

          {/* Budget Content */}
          <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
            {/* Budget List */}
            <Box sx={{ flex: '1 1 400px', maxWidth: '400px' }}>
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
            </Box>

            {/* Budget Details */}
            <Box sx={{ flex: '1 1 auto' }}>
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
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Add/Edit Budget Modal */}
      <AddBudgetModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveBudget}
        initialData={editingBudget}
        isEditMode={isEditMode}
      />

        {/* Footer */}
    </Box>

                
  );
};

export default BudgetPage;