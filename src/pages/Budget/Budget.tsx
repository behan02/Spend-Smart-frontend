import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import HeaderCard from '../../components/Budget/Header-Card';
import AddBudgetModal from '../../components/Budget/AddBudgetModal';
import BudgetItem from '../../components/Budget/BudgetItem';
import BudgetDetails from '../../components/Budget/BudgetDetails';
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/header";
import { differenceInDays } from 'date-fns';
import HeaderImage from '../../assets/images/Budget_Page_Image.png';

interface Budget {
  id: number;
  name: string;
  savedAmount: number;
  targetAmount: number;
  progress: number;
  deadline?: Date;
  description?: string;
  remainingDays?: number;
}

const BudgetPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget| null>(null);
  const [nextId, setNextId] = useState(5); // Starting from 5 since we have 4 initial budget
  
  const [budgets, setBudgets] = useState<Budget[]>([
    { 
      id: 1, 
      name: 'Buying a guitar', 
      savedAmount: 3458.30, 
      targetAmount: 4580.85, 
      progress: 75,
      deadline: new Date('2025-03-08'),
      description: 'Saving for a Fender Stratocaster guitar',
      remainingDays: 2
    },
    { 
      id: 2, 
      name: 'Laptop', 
      savedAmount: 1458.30, 
      targetAmount: 4580.85, 
      progress: 32,
      deadline: new Date('2025-04-15'),
      description: 'New MacBook Pro'
    },
    { 
      id: 3, 
      name: 'Vacation', 
      savedAmount: 1458.30, 
      targetAmount: 4580.85, 
      progress: 32,
      deadline: new Date('2025-06-01'),
      description: 'Trip to Bali'
    },
    { 
      id: 4, 
      name: 'Phone', 
      savedAmount: 1458.30, 
      targetAmount: 4580.85, 
      progress: 32,
      deadline: new Date('2025-05-10')
    }
  ]);

  // Set first Budget as selected by default
  useEffect(() => {
    if (budgets.length > 0 && !selectedBudget) {
      setSelectedBudget(budgets[0]);
    }
  }, [budgets, selectedBudget]);

  // Calculate remaining days for budgets with deadlines
  useEffect(() => {
    const updatedBudgets = budgets.map(budget => {
      if (budget.deadline) {
        const today = new Date();
        const days = differenceInDays(new Date(budget.deadline), today);
        return { ...budget, remainingDays: days > 0 ? days : 0 };
      }
      return budget;
    });
    
    setBudgets(updatedBudgets);
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveBudget = (budegtData: any) => {
    const newBudget = {
      ...budegtData,
      id: nextId,
    };
    
    setBudgets([...budgets, newBudget]);
    setNextId(nextId + 1);
    setSelectedBudget(newBudget);
  };

  const handleSelectBudget = (budget: Budget) => {
    setSelectedBudget(budget);
  };

  const handleEditBudget = (id: number) => {
    // Implementation for editing budget would go here
    console.log('Edit budget:', id);
  };

  const handleDeleteBudget = (id: number) => {
    const updatedBudgets = budgets.filter(budget => budget.id !== id);
    setBudgets(updatedBudgets);
    
    if (selectedBudget && selectedBudget.id === id) {
      setSelectedBudget(updatedBudgets.length > 0 ? updatedBudgets[0] : null);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Component */}
      <Header pageName="Budgets" />

      {/* Header-card Component */}
      <HeaderCard
      
        title="Set personalized budgets and track your savings effortlessly —whether it's for a dream vacation, a new gadget, or a special event."
        description="Start saving today!"
        buttonText="Add New budget"
        onButtonClick={handleOpenModal}
        imagePath={HeaderImage}
      />

      {/* Main Content */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Left Side - Budgets List */}
        <Box sx={{ width: '35%' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Your Budgets
          </Typography>
          <Stack spacing={2}>
            {budgets.map((budget) => (
              <BudgetItem 
                key={budget.id}
                budget={budget}
                isSelected={selectedBudget?.id === budget.id}
                onClick={() => handleSelectBudget(budget)}
              />
            ))}
          </Stack>
        </Box>

        {/* Right Side - Budget Details */}
        <Box sx={{ width: '65%' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Budget Details
          </Typography>
          <BudgetDetails 
            budget={selectedBudget}
            onEdit={handleEditBudget}
            onDelete={handleDeleteBudget}
          />
        </Box>
      </Box>

      {/* Add Budget Modal */}
      <AddBudgetModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveBudget}
      />
    </Box>


      
  );
};

export default BudgetPage;
