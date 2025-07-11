import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
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
import { SavingRecord } from '../../components/GoalDetailsPageComponents/SavingRecord';

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
  const [nextRecordId, setNextRecordId] = useState(1);
  
  // Get goal data from navigation state
  const goalData: Goal | undefined = location.state?.goal;
  const goalName = goalData?.name || 'Goal Details';

  const handleAddSavingRecord = () => {
    setAddRecordModalOpen(true);
  };

  const handleCloseModal = () => {
    setAddRecordModalOpen(false);
  };

  const handleSaveRecord = (recordData: Omit<SavingRecord, 'id'>) => {
    const newRecord: SavingRecord = {
      ...recordData,
      id: nextRecordId
    };
    
    setSavingRecords([...savingRecords, newRecord]);
    setNextRecordId(nextRecordId + 1);
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
                justifyContent: 'center',
                alignItems: { xs: 'center', lg: 'stretch' },
                gap: { xs: 3, md: 4, lg: 3 },
                mb: 6,
                mx: 'auto',
                maxWidth: 1200,
                width: '100%'
              }}
            >
              {/* Left side - Goal Progress Card */}
              <Box sx={{ 
                width: { xs: '100%', sm: '80%', md: '70%', lg: '50%' },
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
                width: { xs: '100%', sm: '80%', md: '70%', lg: '50%' },
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

            {/* History Table */}
            <Box sx={{ 
              width: '100%',
              mb: 5
            }}>
              <SavingRecordsHistoryTable records={savingRecords} />
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
    </ThemeProvider>
  );
};

export default GoalDetailsPage;