import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Goal, GoalFormData, goalService } from '../services/goalService';

// Define the shape of our context
interface GoalContextType {
  goals: Goal[];
  selectedGoal: Goal | null;
  loading: boolean;
  error: string | null;
  fetchGoals: () => Promise<void>;
  createGoal: (goal: GoalFormData) => Promise<void>;
  updateGoal: (id: number, goal: Goal) => Promise<void>;
  deleteGoal: (id: number) => Promise<void>;
  selectGoal: (goal: Goal | null) => void;
}

// Create the context
const GoalContext = createContext<GoalContextType | undefined>(undefined);

// Provider component
export const GoalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch all goals
  const fetchGoals = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await goalService.getAll();
      setGoals(data);
    } catch (err) {
      console.error('Error fetching goals:', err);
      setError('Failed to load goals. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Create a new goal
  const createGoal = async (goalData: GoalFormData) => {
    setLoading(true);
    setError(null);
    try {
      const newGoal = await goalService.create(goalData);
      setGoals(prevGoals => [...prevGoals, newGoal]);
    } catch (err) {
      console.error('Error creating goal:', err);
      setError('Failed to create goal. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update an existing goal
  const updateGoal = async (id: number, goalData: Goal) => {
    setLoading(true);
    setError(null);
    try {
      await goalService.update(id, goalData);
      setGoals(prevGoals => 
        prevGoals.map(goal => goal.id === id ? { ...goal, ...goalData } : goal)
      );
      // Update selected goal if it's the one being edited
      if (selectedGoal && selectedGoal.id === id) {
        setSelectedGoal({ ...selectedGoal, ...goalData });
      }
    } catch (err) {
      console.error('Error updating goal:', err);
      setError('Failed to update goal. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a goal
  const deleteGoal = async (id: number) => {
    setLoading(true);
    setError(null);
    try {
      await goalService.delete(id);
      setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
      // Clear selected goal if it's the one being deleted
      if (selectedGoal && selectedGoal.id === id) {
        setSelectedGoal(null);
      }
    } catch (err) {
      console.error('Error deleting goal:', err);
      setError('Failed to delete goal. Please try again.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Select a goal for viewing details
  const selectGoal = (goal: Goal | null) => {
    setSelectedGoal(goal);
  };

  // Load goals when component mounts
  useEffect(() => {
    fetchGoals();
  }, []);

  const value = {
    goals,
    selectedGoal,
    loading,
    error,
    fetchGoals,
    createGoal,
    updateGoal,
    deleteGoal,
    selectGoal
  };

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
};

// Custom hook to use the goal context
export const useGoalContext = () => {
  const context = useContext(GoalContext);
  if (context === undefined) {
    throw new Error('useGoalContext must be used within a GoalProvider');
  }
  return context;
};