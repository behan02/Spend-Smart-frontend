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
import { goalService, Goal as GoalType, GoalFormData } from '../../services/goalService';
import { useNavigate } from 'react-router-dom';


interface Goal {
  id: number;
  name: string;
  currentAmount: number;
  savedAmount: number; // Keep for compatibility with GoalItem component
  targetAmount: number;
  progress: number;
  endDate?: string;
  startDate?: string;
  description?: string;
  remainingDays?: number;
}

const Goals: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [goalToEdit, setGoalToEdit] = useState<Goal | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Helper function to calculate remaining days
  const calculateRemainingDays = (endDate?: string): number => {
    if (!endDate) return 0;
    const today = new Date();
    const deadline = new Date(endDate);
    const diffTime = deadline.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  // Load goals from API
  useEffect(() => {
    loadGoals();
  }, []);

  const loadGoals = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await goalService.getAll();
      
      // Transform API data to match component interface
      const transformedGoals: Goal[] = data.map(goal => ({
        id: goal.id,
        name: goal.name,
        currentAmount: goal.currentAmount,
        savedAmount: goal.currentAmount, // Use currentAmount as savedAmount for compatibility
        targetAmount: goal.targetAmount,
        progress: Math.round((goal.currentAmount / goal.targetAmount) * 100),
        endDate: goal.endDate,
        description: goal.description,
        remainingDays: calculateRemainingDays(goal.endDate)
      }));
      
      setGoals(transformedGoals);
      
      if (transformedGoals.length > 0 && !selectedGoal) {
        setSelectedGoal(transformedGoals[0]);
      }
    } catch (err) {
      console.error('Error loading goals:', err);
      setError('Failed to load goals');
      // Fallback to sample data if API fails
      const fallbackGoals: Goal[] = [
        {
          id: 1,
          name: "Buying a guitar",
          currentAmount: 1458.30,
          savedAmount: 1458.30,
          targetAmount: 1500.00,
          progress: 97,
          endDate: '2025-07-11',
          description: "Saving for a new guitar",
          remainingDays: 2
        }
      ];
      setGoals(fallbackGoals);
      setSelectedGoal(fallbackGoals[0]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (goals.length > 0 && !selectedGoal) {
      setSelectedGoal(goals[0]);
    } else if (goals.length === 0) {
      setSelectedGoal(null);
    }
  }, [goals, selectedGoal]);

  // Calculate remaining days - Remove this since we now calculate on load
  // useEffect(() => {
  //   if (goals.length === 0) return;
    
  //   const updatedGoals = goals.map(goal => {
  //     if (goal.endDate) {
  //       const today = new Date();
  //       const deadlineDate = new Date(goal.endDate);
  //       const diffTime = deadlineDate.getTime() - today.getTime();
  //       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  //       return { ...goal, remainingDays: diffDays > 0 ? diffDays : 0 };
  //     }
  //     return goal;
  //   });
    
  //   setGoals(updatedGoals);
  // }, []);

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

  const handleSaveGoal = async (goalData: any) => {
    console.log('=== STARTING GOAL CREATION ===');
    console.log('Raw goal data received:', goalData);
    
    try {
      setLoading(true);
      setError(null);
      
      // Create goal data for API
      const createGoalData: GoalFormData = {
        name: goalData.name,
        targetAmount: Number(goalData.targetAmount),
        currentAmount: Number(goalData.currentAmount) || 0, // Make sure this is used
        startDate: new Date().toISOString(),
        endDate: goalData.endDate 
          ? new Date(goalData.endDate).toISOString() 
          : new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString(), // Default 3 months from now
        description: goalData.description || '',
        userId: 1 // Using test user ID, replace with actual user ID when auth is implemented
      };

      console.log('Formatted API data:', createGoalData);
      console.log('Making API call to create goal...');

      const newGoal = await goalService.create(createGoalData);
      
      console.log('✅ Goal created successfully:', newGoal);
      
      // Transform API response to match component interface
      const transformedGoal: Goal = {
        id: newGoal.id,
        name: newGoal.name,
        currentAmount: newGoal.currentAmount,
        savedAmount: newGoal.currentAmount,
        targetAmount: newGoal.targetAmount,
        progress: Math.round((newGoal.currentAmount / newGoal.targetAmount) * 100),
        endDate: newGoal.endDate,
        description: newGoal.description,
        remainingDays: calculateRemainingDays(newGoal.endDate)
      };
      
      console.log('Transformed goal for frontend:', transformedGoal);
      
      setGoals([...goals, transformedGoal]);
      setSelectedGoal(transformedGoal);
      
      console.log('✅ Goal added to frontend state');
      
      // Close the modal
      handleCloseModal();
      
    } catch (err: any) {
      console.error('❌ Error creating goal:', err);
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status
      });
      setError(`Failed to create goal: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateGoal = async (updatedGoalData: any) => {
    if (!goalToEdit) return;
    
    try {
      setLoading(true);
      setError(null);
      
      console.log('Updating goal:', goalToEdit.id, updatedGoalData);
      
      // Create goal data for API - only include what's in UpdateGoalDto
      // The backend only expects properties that could change, not the full goal
      const updateGoalData = {
        name: updatedGoalData.name,
        targetAmount: Number(updatedGoalData.targetAmount),
        currentAmount: Number(updatedGoalData.currentAmount) || 0,
        description: updatedGoalData.description || '',
        // Include dates properly
        startDate: goalToEdit.startDate || undefined,
        endDate: updatedGoalData.endDate ? new Date(updatedGoalData.endDate).toISOString() : undefined
      };
      
      console.log('API update data:', updateGoalData);
      
      // Update goal in API
      const updatedGoal = await goalService.update(goalToEdit.id, updateGoalData);
      
      console.log('✅ Goal updated successfully in API:', updatedGoal);
      
      // Update local state
      const updatedGoals = goals.map(goal => 
        goal.id === goalToEdit.id 
          ? { 
              ...goal, 
              ...updatedGoalData, 
              id: goal.id,
              currentAmount: Number(updatedGoalData.currentAmount) || 0,
              savedAmount: Number(updatedGoalData.currentAmount) || 0,
              progress: Math.round((Number(updatedGoalData.currentAmount) / Number(updatedGoalData.targetAmount)) * 100),
              remainingDays: calculateRemainingDays(updatedGoalData.endDate)
            } 
          : goal
      );
      
      setGoals(updatedGoals);
      setSelectedGoal(updatedGoals.find(g => g.id === goalToEdit.id) || null);
      handleCloseEditModal();
      
    } catch (err: any) {
      console.error('❌ Error updating goal:', err);
      setError(`Failed to update goal: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectGoal = (goal: Goal) => setSelectedGoal(goal);
  
  const handleEditGoal = (id: number) => {
    handleOpenEditModal(id);
  };
  
  const handleDeleteGoal = async (id: number) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Deleting goal with ID:', id);
      
      // Delete goal from API
      await goalService.delete(id);
      
      console.log('✅ Goal deleted successfully from API');
      
      // Update local state
      const updatedGoals = goals.filter(goal => goal.id !== id);
      setGoals(updatedGoals);
      
      if (selectedGoal && selectedGoal.id === id) {
        setSelectedGoal(updatedGoals.length > 0 ? updatedGoals[0] : null);
      }
    } catch (err: any) {
      console.error('❌ Error deleting goal:', err);
      setError(`Failed to delete goal: ${err.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleViewGoalDetails = (id: number) => {
    const goalToView = goals.find(goal => goal.id === id);
    if (goalToView) {
      // Navigate to goal details page with goal data
      navigate(`/goals/${id}`, { 
        state: { goal: goalToView } 
      });
    }
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
            
            {/* Error Display */}
            {error && (
              <Box sx={{ mb: 2, p: 2, bgcolor: '#ffebee', borderRadius: 1, border: '1px solid #f44336' }}>
                <Typography color="error" variant="body2">
                  {error}
                </Typography>
              </Box>
            )}
            
            {/* Loading Display */}
            {loading && (
              <Box sx={{ mb: 2, p: 2, bgcolor: '#e3f2fd', borderRadius: 1, border: '1px solid #2196f3' }}>
                <Typography color="primary" variant="body2">
                  Loading...
                </Typography>
              </Box>
            )}
            
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