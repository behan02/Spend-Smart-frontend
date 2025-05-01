import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, ThemeProvider, CssBaseline } from '@mui/material';
import HeaderCard from '../../components/Budget/Header-Card';
import AddBudgetModal from '../../components/Budget/AddBudgetModal';
import BudgetItem from '../../components/Budget/BudgetItem';
import BudgetDetails from '../../components/Budget/BudgetDetails';
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/header";
import HeaderImage from '../../assets/images/budget_page_image.png';
import Sidebar from '../../components/sidebar/sidebar';
import theme from '../../assets/styles/theme';

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

const Budget: React.FC = () => {
  // State definitions
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [nextId, setNextId] = useState(5);
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

  // Default budget selection
  useEffect(() => {
    if (budgets.length > 0 && !selectedBudget) {
      setSelectedBudget(budgets[0]);
    }
  }, [budgets, selectedBudget]);

  // Calculate remaining days
  useEffect(() => {
    const updatedBudgets = budgets.map(budget => {
      if (budget.deadline) {
        const today = new Date();
        const deadlineDate = new Date(budget.deadline);
        const diffTime = deadlineDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return { ...budget, remainingDays: diffDays > 0 ? diffDays : 0 };
      }
      return budget;
    });
    
    setBudgets(updatedBudgets);
  }, []);

  // Event handlers
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleSaveBudget = (budgetData: any) => {
    const newBudget = { ...budgetData, id: nextId };
    setBudgets([...budgets, newBudget]);
    setNextId(nextId + 1);
    setSelectedBudget(newBudget);
  };
  const handleSelectBudget = (budget: Budget) => setSelectedBudget(budget);
  const handleEditBudget = (id: number) => console.log('Edit budget:', id);
  const handleDeleteBudget = (id: number) => {
    const updatedBudgets = budgets.filter(budget => budget.id !== id);
    setBudgets(updatedBudgets);
    
    if (selectedBudget && selectedBudget.id === id) {
      setSelectedBudget(updatedBudgets.length > 0 ? updatedBudgets[0] : null);
    }
  };
  const handleViewBudgetDetails = (id: number) => {
    console.log('View budget details:', id);
    // Implementation to be added
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh'}}>
        {/* Sidebar */}
        <Box 
          component="nav" 
          sx={{ 
            width: 260,
            flexShrink: 0,
            position: { xs: 'fixed', md: 'sticky' },
            top: 0,
            height: '100vh',
            zIndex: 1000,
            overflowY: 'auto',
            borderRight: `1px solid ${theme.palette.divider}`
          }}
        >
          <Sidebar />
        </Box>
        
        {/* Main content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.default,
          }}
        >
          {/* Content container */}
          <Box sx={{ 
            maxWidth: 1200,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, sm: 3 },
            pt: 3,
            pb: 6,
            flexGrow: 1
          }}>
            {/* Header */}
            <Header pageName="Budget" />
            
            {/* Header Card */}
            <Box sx={{ mb: 4 }}>
              <HeaderCard
                title="Set personalized budgets and track your savings effortlessly —whether it's for a dream vacation, a new gadget, or a special event."
                description="Start saving today!"
                buttonText="Add New Budget"
                onButtonClick={handleOpenModal}
                imagePath={HeaderImage}
              />
            </Box>
            
            {/* Main Content Area */}
            <Box sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              mb: 4
            }}>
              {/* Budgets List */}
              <Box sx={{ 
                width: { xs: '100%', md: '45%' },
              }}>
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
              
              {/* Budget Details */}
              <Box sx={{ 
                flexGrow: 1
              }}>
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
            
            {/* Budget Modal */}
            <AddBudgetModal
              open={modalOpen}
              onClose={handleCloseModal}
              onSave={handleSaveBudget}
            />
          </Box>
          
          {/* Footer */}
          <Box component="footer" sx={{ 
            mt: 'auto', 
            borderTop: `1px solid ${theme.palette.divider}` 
          }}>
            <Footer />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Budget;