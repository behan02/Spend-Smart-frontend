import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, ThemeProvider, CssBaseline } from '@mui/material';
import HeaderCard from '../../components/GoalsPageComponents/Header-card';
import AddGoalModal from '../../components/GoalsPageComponents/AddGoalModal';
import GoalItem from '../../components/GoalsPageComponents/GoalItem';
import GoalDetails from '../../components/GoalsPageComponents/GoalDetails';
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/header";
import HeaderImage from '../../assets/images/goal_page_image.png';
import Sidebar from '../../components/sidebar/sidebar';
import theme from '../../assets/styles/theme';

interface Goal {
  id: number;
  name: string;
  savedAmount: number;
  targetAmount: number;
  progress: number;
  deadline?: Date;
  description?: string;
  remainingDays?: number;
}

const Goals: React.FC = () => {
  // State definitions
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [nextId, setNextId] = useState(5);
  const [goals, setGoals] = useState<Goal[]>([
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

  // Default goal selection
  useEffect(() => {
    if (goals.length > 0 && !selectedGoal) {
      setSelectedGoal(goals[0]);
    }
  }, [goals, selectedGoal]);

  // Calculate remaining days
  useEffect(() => {
    const updatedGoals = goals.map(goal => {
      if (goal.deadline) {
        const today = new Date();
        const deadlineDate = new Date(goal.deadline);
        const diffTime = deadlineDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return { ...goal, remainingDays: diffDays > 0 ? diffDays : 0 };
      }
      return goal;
    });
    
    setGoals(updatedGoals);
  }, []);

  // Event handlers
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleSaveGoal = (goalData: any) => {
    const newGoal = { ...goalData, id: nextId };
    setGoals([...goals, newGoal]);
    setNextId(nextId + 1);
    setSelectedGoal(newGoal);
  };
  const handleSelectGoal = (goal: Goal) => setSelectedGoal(goal);
  const handleEditGoal = (id: number) => console.log('Edit goal:', id);
  const handleDeleteGoal = (id: number) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
    
    if (selectedGoal && selectedGoal.id === id) {
      setSelectedGoal(updatedGoals.length > 0 ? updatedGoals[0] : null);
    }
  };
  const handleViewGoalDetails = (id: number) => {
    console.log('View goal details:', id);
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
            <Header pageName="Goals" />
            
            {/* Header Card */}
            <Box sx={{ mb: 4 }}>
              <HeaderCard
                title="Set personalized goals and track your savings effortlessly —whether it's for a dream vacation, a new gadget, or a special event."
                description="Start saving today!"
                buttonText="Add New Goal"
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
              {/* Goals List */}
              <Box sx={{ 
                width: { xs: '100%', md: '35%' },
                minWidth: { md: 280 }
              }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Your Goals
                </Typography>
                <Stack spacing={2}>
                  {goals.map((goal) => (
                    <GoalItem 
                      key={goal.id}
                      goal={goal}
                      isSelected={selectedGoal?.id === goal.id}
                      onClick={() => handleSelectGoal(goal)}
                    />
                  ))}
                </Stack>
              </Box>
              
              {/* Goal Details */}
              <Box sx={{ 
                width: { xs: '100%', md: '65%' },
                flexGrow: 1
              }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Goal Details
                </Typography>
                <GoalDetails 
                  goal={selectedGoal} 
                  onEdit={handleEditGoal} 
                  onDelete={handleDeleteGoal} 
                  onViewDetails={handleViewGoalDetails} 
                />
              </Box>
            </Box>
            
            {/* Goal Modal */}
            <AddGoalModal
              open={modalOpen}
              onClose={handleCloseModal}
              onSave={handleSaveGoal}
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

export default Goals;