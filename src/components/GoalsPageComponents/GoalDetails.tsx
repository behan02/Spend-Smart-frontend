import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  Button
} from '@mui/material';

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

interface GoalDetailsProps {
  goal: Goal | null;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onViewDetails: (id: number) => void;
  hasRecords?: boolean; // New prop to check if goal has saving records
}

const GoalDetails: React.FC<GoalDetailsProps> = ({ goal, onEdit, onDelete, onViewDetails }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (!goal) {
    return (
      <Paper elevation={0} sx={{ 
        p: 4,
        border: '1px solid #E5E7EB',
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
        backgroundColor: '#F9FAFB'
      }}>
        <Typography variant="body1" color="textSecondary">
          Select a goal to view details
        </Typography>
      </Paper>
    );
  }

  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(goal.id);
    setDeleteDialogOpen(false);
  };

  const handleEdit = () => {
    onEdit(goal.id);
  };

  const handleViewDetails = () => {
    onViewDetails(goal.id);
  };

  return (
    <>
      <Paper elevation={0} sx={{ 
        p: 4,
        border: '1px solid #E5E7EB',
        borderRadius: 2,
        height: 'fit-content',
        minHeight: '400px',
        backgroundColor: '#fff'
      }}>
        {/* Header Section with Spend and Goals */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          mb: 4
        }}>
          <Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1, fontSize: '14px' }}>
              Spend
            </Typography>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              color: '#1F2937',
              fontSize: '32px'
            }}>
              {goal.savedAmount.toFixed(2)} LKR
            </Typography>
          </Box>
          
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1, fontSize: '14px' }}>
              Goals
            </Typography>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              color: '#1F2937',
              fontSize: '32px'
            }}>
              {goal.targetAmount.toFixed(2)} LKR
            </Typography>
          </Box>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ 
            width: '100%', 
            height: 8, 
            backgroundColor: '#E5E7EB',
            borderRadius: 4,
            overflow: 'hidden',
            mb: 2
          }}>
            <Box sx={{ 
              width: `${goal.progress}%`, 
              height: '100%',
              backgroundColor: 'rgb(11, 0, 221)',
              transition: 'width 0.3s ease'
            }} />
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="textSecondary" sx={{ fontSize: '14px' }}>
              {goal.progress}%
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ fontSize: '14px' }}>
              {100 - goal.progress}%
            </Typography>
          </Box>
        </Box>

        {/* Days Left */}
        <Box sx={{ textAlign: 'center', mb: 4,mr:12 }}>
          <Typography variant="h5" sx={{ 
            color: ' rgb(11, 0, 221)', 
            fontWeight: 'bold',
            fontSize: '22px'
          }}>
            {goal.remainingDays !== undefined ? `${goal.remainingDays} days left` : ''}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          mt: 'auto'
        }}>
          <Box /> {/* Spacer */}
          
          {/* View Details Button */}
          <Box
            onClick={handleViewDetails}
            sx={{
              px: 8,
              py: 1.5,
              backgroundColor: 'rgb(11, 0, 221)',
              color: '#fff',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '16px',
               fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#1E40AF',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(29, 78, 216, 0.3)'
              }
            }}
          >
            View Details
          </Box>

          {/* Action Icons */}
          <Box sx={{ 
            display: 'flex',
            gap: 1,
            alignItems: 'center'
          }}>
            {/* Edit Icon */}
            <Box
              onClick={handleEdit}
              sx={{
                width: 40,
                height: 40,
                borderRadius: '8px',
                backgroundColor: '#F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#E5E7EB',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Box>
            
            {/* Delete Icon */}
            <Box
              onClick={handleOpenDeleteDialog}
              sx={{
                width: 40,
                height: 40,
                borderRadius: '8px',
                backgroundColor: '#F3F4F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                '&:hover': {
                  backgroundColor: '#FEE2E2',
                  transform: 'translateY(-1px)'
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6h18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1
          }
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, color: '#1F2937' }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#6B7280' }}>
            Are you sure you want to delete the goal "{goal.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={handleCloseDeleteDialog} 
            sx={{ 
              color: '#6B7280',
              fontWeight: 600,
              textTransform: 'none',
              px: 3
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            sx={{ 
              backgroundColor: '#DC2626',
              color: '#fff',
              fontWeight: 600,
              textTransform: 'none',
              px: 3,
              '&:hover': {
                backgroundColor: '#B91C1C'
              }
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GoalDetails;