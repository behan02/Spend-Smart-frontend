import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack, ThemeProvider, CssBaseline, Paper } from '@mui/material';
import HeaderCard from '../../components/GoalsPageComponents/Header-card';
import AddGoalModal from '../../components/GoalsPageComponents/AddGoalModal';
import GoalItem from '../../components/GoalsPageComponents/GoalItem';
import GoalDetails from '../../components/GoalsPageComponents/GoalDetails';
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/header";
import HeaderImage from '../../assets/images/goal_page_image.png';
import Sidebar from '../../components/sidebar/sidebar';
import theme from '../../assets/styles/theme';
//import { getGoals, createGoal, updateGoal, deleteGoal } from '../../api/goalApi';


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
  const [modalOpen, setModalOpen] = useState(false);// Controls Add Goal modal visibility
  const [editModalOpen, setEditModalOpen] = useState(false);// Controls Edit Goal modal visibility
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [goalToEdit, setGoalToEdit] = useState<Goal | null>(null);
  const [nextId, setNextId] = useState(5);// ID for the next new goal
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: 1,
      name: "Buying a guitar",
      savedAmount: 1458.30,
      targetAmount: 1500.00,
      progress: 97,
      deadline: new Date('2025-07-11'),
      description: "Saving for a new guitar",
      remainingDays: 2
    },
    {
      id: 2,
      name: "Laptop",
      savedAmount: 1458.30,
      targetAmount: 1458.85,
      progress: 76,
      deadline: new Date('2025-08-15'),
      description: "New laptop for work"
    },
    {
      id: 3,
      name: "Vacation",
      savedAmount: 1458.30,
      targetAmount: 3500.85,
      progress: 42,
      deadline: new Date('2025-12-31'),
      description: "Trip to Europe"
    },
    {
      id: 4,
      name: "Phone",
      savedAmount: 1458.30,
      targetAmount: 950.00,
      progress: 78,
      deadline: new Date('2025-09-01'),
      description: "New smartphone"
    }
  ]);

  useEffect(() => {
    if (goals.length > 0 && !selectedGoal) {
      setSelectedGoal(goals[0]);
    } else if (goals.length === 0) {
      setSelectedGoal(null);
    }
  }, [goals, selectedGoal]);

  // Calculate remaining days
  useEffect(() => {
    if (goals.length === 0) return;
    
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
  
  const handleOpenEditModal = (id: number) => {
    const goalToEdit = goals.find(goal => goal.id === id) || null;
    setGoalToEdit(goalToEdit);
    setEditModalOpen(true);
  };
  
  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setGoalToEdit(null);
  };

  const handleSaveGoal = (goalData: any) => {
    const newGoal = { ...goalData, id: nextId };
    setGoals([...goals, newGoal]);
    setNextId(nextId + 1);
    setSelectedGoal(newGoal);
  };

  const handleUpdateGoal = (updatedGoalData: any) => {
    if (!goalToEdit) return;
    
    const updatedGoals = goals.map(goal => 
      goal.id === goalToEdit.id 
        ? { ...goal, ...updatedGoalData, id: goal.id } 
        : goal
    );
    
    setGoals(updatedGoals);
    setSelectedGoal(updatedGoals.find(g => g.id === goalToEdit.id) || null);
    handleCloseEditModal();
  };

  const handleSelectGoal = (goal: Goal) => setSelectedGoal(goal);
  
  const handleEditGoal = (id: number) => {
    handleOpenEditModal(id);
  };
  
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

  // Empty state component
  const EmptyGoalState = () => (
    <Paper
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 4,
        height: '200px',
        border: '1px dashed #ccc',
        borderRadius: 2,
        bgcolor: '#f9f9f9'
      }}
    >
      <Typography variant="body1" color="textSecondary" sx={{ mb: 1, textAlign: 'center' }}>
        You haven't added any goals yet.
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
        Click on "Add New Goal" to create your first savings goal.
      </Typography>
    </Paper>
  );

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
              gap: 4,
              mb: 4,
              minHeight: '500px'
            }}>
              {/* Goals List - Left Side */}
              <Box sx={{ 
                width: '400px',
                flexShrink: 0
              }}>
                {goals.length > 0 ? (
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
                ) : (
                  <EmptyGoalState />
                )}
              </Box>
              
              {/* Goal Details - Right Side */}
              <Box sx={{ 
                flexGrow: 1,
                display: 'flex',
                flexDirection: 'column'
              }}>
                {selectedGoal ? (
                  <GoalDetails 
                    goal={selectedGoal} 
                    onEdit={handleEditGoal} 
                    onDelete={handleDeleteGoal} 
                    onViewDetails={handleViewGoalDetails} 
                  />
                ) : (
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      border: '1px solid #eee',
                      borderRadius: 2,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '300px',
                      bgcolor: '#f8f9fa'
                    }}
                  >
                    <Typography variant="body1" color="textSecondary">
                      Select a goal to view details
                    </Typography>
                  </Paper>
                )}
              </Box>
            </Box>
            
            {/* Add Goal Modal */}
            <AddGoalModal
              open={modalOpen}
              onClose={handleCloseModal}
              onSave={handleSaveGoal}
            />

            {/* Edit Goal Modal */}
            {goalToEdit && (
              <AddGoalModal
                open={editModalOpen}
                onClose={handleCloseEditModal}
                onSave={handleUpdateGoal}
                initialData={goalToEdit}
                isEditMode={true}
              />
            )}
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