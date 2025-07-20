import React, { useState, useEffect } from 'react';
import { Box, Paper, CircularProgress, Alert, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BudgetItem from '../../components/Budget/BudgetItem';
import BudgetDetails from '../../components/Budget/BudgetDetails';
import AddBudgetModal from '../../components/Budget/AddBudgetModal';
import BudgetHeaderCard from '../../components/Budget/BudgetHeaderCard';
import { budgetApi, BudgetSummary } from '../../api/budgetApi';
import { useUser } from '../../context/UserContext';
import Sidebar from '../../components/sidebar/sidebar';

const BudgetPage: React.FC = () => {
  const { user } = useUser();
  const [selectedBudget, setSelectedBudget] = useState<BudgetSummary | null>(null);
  const [budgets, setBudgets] = useState<BudgetSummary[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingBudget, setEditingBudget] = useState<BudgetSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // Load budgets when component mounts or user changes
  useEffect(() => {
    if (user) {
      loadBudgets();
    }
  }, [user]);

  const loadBudgets = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      setError(null);
      console.log('Loading budgets for user:', user.id);
      
      const userBudgets = await budgetApi.getUserBudgets(user.id);
      console.log('Loaded budgets:', userBudgets);
      
      // Ensure userBudgets is an array
      const budgetsArray = Array.isArray(userBudgets) ? userBudgets : [];
      setBudgets(budgetsArray);
      
      // Set first budget as selected if none selected and budgets exist
      if (budgetsArray.length > 0 && !selectedBudget) {
        setSelectedBudget(budgetsArray[0]);
      } else if (budgetsArray.length === 0) {
        setSelectedBudget(null);
      }
    } catch (error: any) {
      console.error('Error loading budgets:', error);
      setError(error.message || 'Failed to load budgets');
      setBudgets([]); // Set empty array on error
      setSelectedBudget(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBudget = () => {
    setIsEditMode(false);
    setEditingBudget(null);
    setIsAddModalOpen(true);
  };

  const handleEditBudget = (budgetId: number) => {
    const budget = budgets.find(b => b.budgetId === budgetId);
    if (budget) {
      setEditingBudget(budget);
      setIsEditMode(true);
      setIsAddModalOpen(true);
    }
  };

  const handleDeleteBudget = async (budgetId: number) => {
    try {
      await budgetApi.deleteBudget(budgetId);
      setBudgets(prev => prev.filter(b => b.budgetId !== budgetId));
      if (selectedBudget?.budgetId === budgetId) {
        setSelectedBudget(budgets.find(b => b.budgetId !== budgetId) || null);
      }
    } catch (error) {
      console.error('Error deleting budget:', error);
      setError('Failed to delete budget');
    }
  };

  const handleViewDetails = (budgetId: number) => {
    navigate(`/budgets/${budgetId}`);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa', overflowX: 'hidden' }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
              {error}
            </Alert>
          )}

          {/* Budget Content */}
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', gap: 3, mt: 4 }}>
              {/* Budget List */}
              <Box sx={{ flex: '1 1 400px', maxWidth: '400px' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {budgets.map(budget => (
                    <BudgetItem
                      key={budget.budgetId}
                      budget={{
                        id: budget.budgetId,
                        name: budget.budgetName,
                        type: budget.budgetType.toLowerCase() as 'monthly' | 'annually',
                        totalAmount: budget.totalBudgetAmount,
                        spentAmount: budget.totalSpentAmount,
                        progress: budget.progressPercentage
                      }}
                      isSelected={selectedBudget?.budgetId === budget.budgetId}
                      onClick={() => setSelectedBudget(budget)}
                    />
                  ))}
                  {budgets.length === 0 && !loading && (
                    <Paper sx={{ p: 4, textAlign: 'center' }}>
                      <Typography variant="body1" color="text.secondary">
                        No budgets found. Create your first budget to get started!
                      </Typography>
                    </Paper>
                  )}
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
                    budget={selectedBudget ? {
                      id: selectedBudget.budgetId,
                      name: selectedBudget.budgetName,
                      type: selectedBudget.budgetType.toLowerCase() as 'monthly' | 'annually',
                      totalAmount: selectedBudget.totalBudgetAmount || 0,
                      spentAmount: selectedBudget.totalSpentAmount || 0,
                      remainingAmount: (selectedBudget.totalBudgetAmount || 0) - (selectedBudget.totalSpentAmount || 0),
                      progress: selectedBudget.progressPercentage || 0
                    } : null}
                    onEdit={handleEditBudget}
                    onDelete={handleDeleteBudget}
                    onViewDetails={handleViewDetails}
                  />
                </Paper>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* Add/Edit Budget Modal */}
      <AddBudgetModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={loadBudgets} // Refresh the budget list after save
        initialData={editingBudget}
        isEditMode={isEditMode}
      />

      {/* Footer */}
    </Box>
  );
};

export default BudgetPage;
