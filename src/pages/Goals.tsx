import React, { useState, useEffect } from 'react';
import { Box, Typography, Stack } from '@mui/material';
import Header from '../components/GoalsPageComponents/Header';
import AddGoalModal from '../components/GoalsPageComponents/AddGoalModal';
import GoalItem from '../components/GoalsPageComponents/GoalItem';
import GoalDetails from '../components/GoalsPageComponents/GoalDetails';
import { differenceInDays } from 'date-fns';
import HeaderImage from '../assets/images/goal_page_image.png';

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

const GoalsPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [nextId, setNextId] = useState(5); // Starting from 5 since we have 4 initial goals
  
  const [goals, setGoals] = useState<Goal[]>([
    { 
      id: 1, 
      name: 'Buying a guitar', 
      savedAmount: 1458.30, 
      targetAmount: 4580.85, 
      progress: 32,
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

  // Set first goal as selected by default
  useEffect(() => {
    if (goals.length > 0 && !selectedGoal) {
      setSelectedGoal(goals[0]);
    }
  }, [goals, selectedGoal]);

  // Calculate remaining days for goals with deadlines
  useEffect(() => {
    const updatedGoals = goals.map(goal => {
      if (goal.deadline) {
        const today = new Date();
        const days = differenceInDays(new Date(goal.deadline), today);
        return { ...goal, remainingDays: days > 0 ? days : 0 };
      }
      return goal;
    });
    
    setGoals(updatedGoals);
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveGoal = (goalData: any) => {
    const newGoal = {
      ...goalData,
      id: nextId,
    };
    
    setGoals([...goals, newGoal]);
    setNextId(nextId + 1);
    setSelectedGoal(newGoal);
  };

  const handleSelectGoal = (goal: Goal) => {
    setSelectedGoal(goal);
  };

  const handleEditGoal = (id: number) => {
    // Implementation for editing goal would go here
    console.log('Edit goal:', id);
  };

  const handleDeleteGoal = (id: number) => {
    const updatedGoals = goals.filter(goal => goal.id !== id);
    setGoals(updatedGoals);
    
    if (selectedGoal && selectedGoal.id === id) {
      setSelectedGoal(updatedGoals.length > 0 ? updatedGoals[0] : null);
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Component */}
      <Header 
        title="Set personalized goals and track your savings effortlessly —whether it's for a dream vacation, a new gadget, or a special event."
        description="Start saving today!"
        buttonText="Add New Goal"
        onButtonClick={handleOpenModal}
        imagePath={HeaderImage}
      />

      {/* Main Content */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Left Side - Goals List */}
        <Box sx={{ width: '35%' }}>
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

        {/* Right Side - Goal Details */}
        <Box sx={{ width: '65%' }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Goal Details
          </Typography>
          <GoalDetails 
            goal={selectedGoal}
            onEdit={handleEditGoal}
            onDelete={handleDeleteGoal}
          />
        </Box>
      </Box>

      {/* Add Goal Modal */}
      <AddGoalModal
        open={modalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveGoal}
      />
    </Box>
  );
};

export default GoalsPage;