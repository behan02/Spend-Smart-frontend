import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider, Snackbar, Alert, CircularProgress, Typography } from '@mui/material';
import GoalNameBar from '../../components/GoalDetailsPageComponents/GoalNameBar';
import AddSavingRecordButton from '../../components/GoalDetailsPageComponents/AddSavingRecordButton';
import SavingRecordsHistoryTable from '../../components/GoalDetailsPageComponents/SavingRecordsHistoryTable';
import AddSavingRecodPopup from '../../components/GoalDetailsPageComponents/AddSavingRecodPopup';
import CardWithCircularProgressBar from '../../components/GoalDetailsPageComponents/CardWithCircularProgressBar';
import ProgressBarChart from '../../components/GoalDetailsPageComponents/ProgressBarChart';
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
      const newRecord = await savingRecordService.create(formData);
      
      // Convert the API response to match the component's expected format
      const adaptedRecord: SavingRecord = {
        ...newRecord,
        date: new Date(newRecord.date) // Convert string back to Date object for the component
      };
      
      // Update local state with the new record
      setSavingRecords(prevRecords => [...prevRecords, adaptedRecord]);
      
      // Refresh the goal data to get updated current amount
      // You might want to also update the goal's savedAmount in your state
      if (goalData) {
        const updatedGoal = {
          ...goalData,
          savedAmount: (goalData.savedAmount || 0) + recordData.amount
        };
        // Update your goal state here if you have it
      }

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

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <Box 
          component="nav" 
          sx={{ 
            width: { xs: 0, md: 260 }, // Hide sidebar on mobile, show on desktop
            flexShrink: 0,
            position: { xs: 'fixed', md: 'sticky' },
            top: 0,
            left: { xs: '-260px', md: 0 }, // Move sidebar off-screen on mobile
            height: '100vh',
            zIndex: 1000,
            overflow: 'hidden', // Hide all overflow to prevent scroll bars
            borderRight: `1px solid ${theme.palette.divider}`,
            transition: 'left 0.3s ease-in-out', // Smooth transition for mobile
            display: { xs: 'none', md: 'block' }, // Completely hide on mobile
          }}
        >
          <Sidebar />
        </Box>

        {/* Main content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            width: '100%', // Full width always
            minWidth: 0, // Prevent flex item from growing beyond container
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: theme.palette.background.default,
            marginLeft: { xs: 0, md: '260px' }, // Add margin to account for sidebar
          }}
        >
          {/* Content container */}
          <Box sx={{ 
            maxWidth: 1400,
            width: '100%',
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4 },
            pt: 3,
            pb: 8,
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
            {/* Header */}
            <Header pageName="" />

            {/* Goal Name Bar */}
            <Box sx={{ p: 0.5, mb: 5 }}>
              <GoalNameBar goalName={goalName} />
            </Box>

            {/* Main content section with Progress Bar and Chart */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', lg: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'center', lg: 'flex-start' },
                gap: { xs: 6, md: 8, lg: 12 },
                mb: 6,
                mx: 'auto',
                maxWidth: '1200px',
                width: '100%',
                px: { xs: 0, lg: 2 }
              }}
            >
              {/* Left side - Goal Progress Card */}
              <Box sx={{ 
                width: { xs: '100%', sm: '85%', md: '75%', lg: '48%' },
                minWidth: { lg: '450px' },
                maxWidth: { lg: '550px' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch'
              }}>
                {goalData && (
                  <CardWithCircularProgressBar
                    goal={goalData}
                    savingRecords={savingRecords}
                    onEdit={() => {
                      console.log('Edit goal clicked');
                    }}
                    onDelete={() => {
                      console.log('Delete goal clicked');
                    }}
                  />
                )}
              </Box>

              {/* Right side - Progress Bar Chart */}
              <Box sx={{ 
                width: { xs: '100%', sm: '85%', md: '75%', lg: '48%' },
                minWidth: { lg: '450px' },
                maxWidth: { lg: '550px' },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'stretch'
              }}>
                {goalData && (
                  <ProgressBarChart
                    savingRecords={savingRecords}
                    goalTargetAmount={goalData.targetAmount}
                  />
                )}
              </Box>
            </Box>

            {/* Add Saving Record Button - Centered below both components */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                mb: 6,
                position: 'relative'
              }}
            >
              {/* Decorative background */}
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(74, 144, 226, 0.05) 0%, transparent 70%)',
                borderRadius: '50%',
                zIndex: 0
              }} />
              <Box sx={{ position: 'relative', zIndex: 1 }}>
                <AddSavingRecordButton onClick={handleAddSavingRecord} />
              </Box>
            </Box>

            {/* History Table - Fixed container */}
            <Box sx={{ 
              width: '100%',
              mb: 5,
              overflow: 'hidden', // Prevent overflow
              '& .MuiTableContainer-root': {
                maxWidth: '95%',
                marginLeft:'25px',
                overflowX: 'auto', // Enable horizontal scroll for table if needed
              }
            }}>
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 5 }}>
                  <CircularProgress />
                  <Typography variant="body2" sx={{ ml: 2 }}>Loading saving records...</Typography>
                </Box>
              ) : (
                <SavingRecordsHistoryTable 
                  records={savingRecords.map(record => ({
                    ...record,
                    date: record.date.toISOString()
                  }))} 
                />
              )}
            </Box>
          </Box>

          {/* Footer */}
          <Box sx={{ mt: 'auto' }}>
            <Footer />
          </Box>
        </Box>
      </Box>

      {/* Add Saving Record Modal */}
      <AddSavingRecodPopup
        open={addRecordModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveRecord}
        goalId={goalData?.id || 0}
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