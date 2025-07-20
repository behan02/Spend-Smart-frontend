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
import { goalService } from '../../services/goalService';

// Local interface for component compatibility with Date object
interface SavingRecord {
  id: number;
  amount: number;
  date: Date;
  description?: string;
  goalId: number;
  userId?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface Goal {
  id: number;
  name: string;
  savedAmount: number;
  targetAmount: number;
  progress: number;
  deadline?: Date;
  description?: string;
  remainingDays?: number;
  createdAt?: string;
  startDate?: string;
}

const GoalDetailsPage: React.FC = () => {
  const location = useLocation();
  const [addRecordModalOpen, setAddRecordModalOpen] = useState(false);
  const [savingRecords, setSavingRecords] = useState<SavingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });
  
  // Get goal data from navigation state
  const goalData: Goal | undefined = location.state?.goal;
  const goalName = goalData?.name || 'Goal Details';

  // Fetch saving records when component mounts
  useEffect(() => {
    if (goalData?.id) {
      fetchSavingRecords(goalData.id);
    }
  }, [goalData?.id]);

  const fetchSavingRecords = async (goalId: number) => {
    setIsLoading(true);
    try {
      const records = await savingRecordService.getByGoalId(goalId);
      
      // Convert date strings to Date objects for component compatibility
      const adaptedRecords: SavingRecord[] = records.map(record => ({
        ...record,
        date: new Date(record.date)
      }));
      
      console.log('Fetched and adapted records:', adaptedRecords); // Debug log
      setSavingRecords(adaptedRecords);
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

  const handleAddSavingRecord = () => {
    setAddRecordModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddRecordModalOpen(false);
  };

  const handleSaveRecord = async (recordData: { amount: number; date: string | Date; description?: string }) => {
    if (!goalData?.id) {
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
        goalId: goalData.id,
        userId: 1 // Default user ID, update when you have authentication
      };

      // Call the service to create the record
      await savingRecordService.create(formData);
      
      // Refresh all records after creating to ensure consistency
      await fetchSavingRecords(goalData.id);

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
    if (!goalData?.id) {
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
      
      // Refresh all records after deleting
      await fetchSavingRecords(goalData.id);

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
                {goalData && (
                  <CardWithCircularProgressBar
                    goal={goalData}
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
                {goalData && (
                  <OptimizedProgressBarChart
                    savingRecords={savingRecords}
                    goalTargetAmount={goalData.targetAmount}
                    goalDeadline={goalData.deadline}
                    goalCreationDate={goalData.createdAt ? new Date(goalData.createdAt) : (goalData.startDate ? new Date(goalData.startDate) : undefined)}
                  />
                )}
              </Box>
            </Box>

            {/* Action Section */}
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 4
            }}>
              <AddSavingRecordButton onClick={handleAddSavingRecord} />
            </Box>

            {/* History Section */}
            <Box sx={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0',
              overflow: 'hidden'
            }}>
              <Box sx={{ p: 3, borderBottom: '1px solid #e2e8f0' }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600,
                  color: '#1e293b',
                  fontSize: '18px'
                }}>
                  💰 Savings History
                </Typography>
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
                    records={savingRecords.map(record => ({
                      ...record,
                      date: record.date.toISOString()
                    }))} 
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
        goalId={goalData?.id || 0}
        goal={goalData}
        savingRecords={savingRecords.map(record => ({
          ...record,
          date: record.date.toISOString()
        }))}
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