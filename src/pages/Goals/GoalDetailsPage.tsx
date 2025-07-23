import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, Snackbar, Alert, CircularProgress, Typography } from '@mui/material';
import GoalNameBar from '../../components/GoalDetailsPageComponents/GoalNameBar';
import AddSavingRecordButton from '../../components/GoalDetailsPageComponents/AddSavingRecordButton';
import SavingRecordsHistoryTable from '../../components/GoalDetailsPageComponents/SavingRecordsHistoryTable';
import AddSavingRecodPopup from '../../components/GoalDetailsPageComponents/AddSavingRecodPopup';
import CardWithCircularProgressBar from '../../components/GoalDetailsPageComponents/CardWithCircularProgressBar';
import OptimizedProgressBarChart from '../../components/GoalDetailsPageComponents/OptimizedProgressBarChart';
import Footer from '../../components/footer/Footer';
import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar';
import theme from '../../assets/styles/theme';
import { savingRecordService, SavingRecordFormData } from '../../services/savingRecordService';
import { goalService, Goal } from '../../services/goalService';
import SavingsIcon from '@mui/icons-material/Savings';

// Local interface for component compatibility
interface SavingRecord {
  id: number;
  amount: number;
  date: string; // Date part
  time: string; // Time part
  description?: string;
  goalId: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface SavingRecord {
  id: number;
  amount: number;
  date: string; // Date part
  time: string; // Time part
  description?: string;
  goalId: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

const GoalDetailsPage: React.FC = () => {
  const location = useLocation();
  const [addRecordModalOpen, setAddRecordModalOpen] = useState(false);
  const [savingRecords, setSavingRecords] = useState<SavingRecord[]>([]);
  const [currentGoal, setCurrentGoal] = useState<Goal | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });
  
  // Get initial goal data from navigation state
  const initialGoalData: Goal | undefined = location.state?.goal;
  const goalName = currentGoal?.name || initialGoalData?.name || 'Goal Details';

  // Initialize currentGoal with data from navigation state
  useEffect(() => {
    if (initialGoalData) {
      setCurrentGoal(initialGoalData);
    }
  }, [initialGoalData]);

  // Fetch saving records when component mounts or goal changes
  useEffect(() => {
    const goalId = currentGoal?.id || initialGoalData?.id;
    if (goalId) {
      fetchSavingRecords(goalId);
    }
  }, [currentGoal?.id, initialGoalData?.id]);

  const fetchSavingRecords = async (goalId: number) => {
    setIsLoading(true);
    try {
      const records = await savingRecordService.getByGoalId(goalId);
      
      // Keep records as they come from the API (with separate date and time)
      console.log('Fetched records:', records); // Debug log
      setSavingRecords(records);
    } catch (err) {
      console.error('Error fetching saving records:', err);
      setSnackbar({
        open: true,
        message: 'Failed to load saving records',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const refreshGoalData = async (goalId: number) => {
    try {
      const updatedGoal = await goalService.getById(goalId);
      setCurrentGoal(updatedGoal);
      console.log('Goal data refreshed:', updatedGoal);
    } catch (err) {
      console.error('Error refreshing goal data:', err);
      // Don't show error to user as this is not critical
    }
  };

  const handleAddSavingRecord = () => {
    setAddRecordModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddRecordModalOpen(false);
  };

  const handleSaveRecord = async (recordData: { amount: number; date: string | Date; description?: string }) => {
    const goalId = currentGoal?.id || initialGoalData?.id;
    if (!goalId) {
      setSnackbar({
        open: true,
        message: 'Cannot add record: Goal ID is missing',
        severity: 'error'
      });
      return;
    }

    setIsLoading(true);
    try {
      // Convert the record data to the format expected by the API
      const formData: SavingRecordFormData = {
        amount: recordData.amount,
        date: recordData.date instanceof Date ? recordData.date.toISOString() : recordData.date,
        description: recordData.description || '',
        goalId: goalId,
        userId: 1 // Default user ID, update when you have authentication
      };

      // Call the service to create the record
      await savingRecordService.create(formData);
      
      // Refresh saving records after creating to ensure consistency
      await fetchSavingRecords(goalId);
      
      // Refresh goal data to get updated currentAmount
      await refreshGoalData(goalId);

      

      setSnackbar({
        open: true,
        message: 'Saving record added successfully!',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error saving record:', err);
      setSnackbar({
        open: true,
        message: 'Failed to save record',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
      handleCloseModal();
    }
  };

  const handleDeleteRecord = async (recordId: number) => {
    const goalId = currentGoal?.id || initialGoalData?.id;
    if (!goalId) {
      setSnackbar({
        open: true,
        message: 'Cannot delete record: Goal ID is missing',
        severity: 'error'
      });
      return;
    }

    setIsLoading(true);
    try {
      // Call the service to delete the record
      await savingRecordService.delete(recordId);
      
      // Refresh saving records after deleting
      await fetchSavingRecords(goalId);
      
      // Refresh goal data to get updated currentAmount
      await refreshGoalData(goalId);

     
      setSnackbar({
        open: true,
        message: 'Saving record deleted successfully!',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error deleting record:', err);
      setSnackbar({
        open: true,
        message: 'Failed to delete record',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            width: '100%',
            minWidth: 0,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Content container */}
          <Box sx={{ 
            maxWidth: 1200,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, sm: 3 },
            pt: 3,
            pb: 4,
            flexGrow: 1,
          }}>
            {/* Header with Goal Name */}
            <Box sx={{ mb: 4 }}>
              <GoalNameBar goalName={goalName} />
            </Box>

            {/* Main Stats Section */}
            <Box sx={{ 
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
              gap: 4,
              mb: 4,
              alignItems: 'flex-start'
            }}>
              {/* Goal Progress Card */}
              <Box sx={{ 
                width: { xs: '100%', lg: '350px' },
                flexShrink: 0,
                display: 'flex',
                justifyContent: 'center'
              }}>
                {currentGoal && (
                  <CardWithCircularProgressBar
                    goal={currentGoal}
                    savingRecords={savingRecords}
                  />
                )}
              </Box>

              {/* Progress Chart */}
              <Box sx={{
                flex: 1,
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                overflow: 'hidden',
                minHeight: '400px'
              }}>
                {currentGoal && (
                  <OptimizedProgressBarChart
                    savingRecords={savingRecords}
                    goalTargetAmount={currentGoal.targetAmount}
                    goalDeadline={currentGoal.deadline}
                    goalCreationDate={currentGoal.createdAt ? new Date(currentGoal.createdAt) : (currentGoal.startDate ? new Date(currentGoal.startDate) : undefined)}
                  />
                )}
              </Box>
            </Box>

            {/* Action Section */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              mb: 4,
              ml: '100mm'
            }}>
              <AddSavingRecordButton onClick={handleAddSavingRecord} />
            </Box>

            {/* History Section */}
            <Box sx={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                transform: 'translateY(-2px)',
                borderColor: '#cbd5e1'
              }
            }}>
              <Box sx={{ p: 3, borderBottom: '1px solid #e2e8f0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box sx={{
                    backgroundColor: '#ece8c1ff',
                    borderRadius: '20%',
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <SavingsIcon sx={{ fontSize: 20, color: '#f58b22ff' }} />
                  </Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600,
                    color: '#1e293b',
                    fontSize: '18px'
                  }}>
                    Savings History
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ 
                  color: '#64748b',
                  mt: 0.5
                }}>
                  Track all your saving contributions
                </Typography>
              </Box>
              
              <Box sx={{ minHeight: '200px' }}>
                {isLoading ? (
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    p: 5,
                    flexDirection: 'column',
                    gap: 2
                  }}>
                    <CircularProgress size={40} />
                    <Typography variant="body2" color="text.secondary">
                      Loading saving records...
                    </Typography>
                  </Box>
                ) : (
                  <SavingRecordsHistoryTable 
                    records={savingRecords} 
                    onDeleteRecord={handleDeleteRecord}
                  />
                )}
              </Box>
            </Box>
          </Box>

         
        </Box>
      </Box>

      {/* Add Saving Record Modal */}
      <AddSavingRecodPopup
        open={addRecordModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveRecord}
        goalId={(currentGoal?.id || initialGoalData?.id) || 0}
        goal={currentGoal || initialGoalData}
        savingRecords={savingRecords}
      />

      {/* Snackbar for notifications */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  );
};

export default GoalDetailsPage;