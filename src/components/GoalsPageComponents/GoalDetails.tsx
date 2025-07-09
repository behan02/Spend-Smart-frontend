import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  LinearProgress, 
  IconButton, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogContentText, 
  DialogActions, 
  Button
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

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
}

const GoalDetails: React.FC<GoalDetailsProps> = ({ goal, onEdit, onDelete, onViewDetails }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (!goal) {
    return (
      <Paper elevation={1} sx={{ p: 3, borderRadius: '8px', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
    if (goal) {
      onEdit(goal.id);
    }
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Top Section with Spend and Goals amounts */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          mb: 4
        }}>
          <Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Spend
            </Typography>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              color: '#000',
              fontSize: '2.5rem'
            }}>
              ${goal.savedAmount.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Goals
            </Typography>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              color: '#000',
              fontSize: '2.5rem'
            }}>
              ${goal.targetAmount.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ mb: 3 }}>
          <LinearProgress 
            variant="determinate" 
            value={goal.progress} 
            sx={{ 
              height: 12, 
              borderRadius: 6,
              backgroundColor: '#e8e8e8',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#2952CC',
                borderRadius: 6
              }
            }} 
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color="textSecondary">
              {Math.round(goal.progress)}%
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {Math.round(100 - goal.progress)}%
            </Typography>
          </Box>
        </Box>

        {/* Days Left */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: 4
        }}>
          <Typography variant="h6" sx={{ 
            color: '#2952CC',
            fontWeight: 'bold',
            fontSize: '1.25rem'
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
          <Button 
            variant="contained" 
            sx={{ 
              borderRadius: '25px', 
              textTransform: 'none', 
              px: 4,
              py: 1.5,
              backgroundColor: '#2952CC',
              fontSize: '1rem',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#1e3a8a'
              }
            }}
            onClick={() => onViewDetails(goal.id)}
          >
            View Details
          </Button>
          
          <Box>
            <IconButton 
              size="large" 
              onClick={handleEdit}
              aria-label="edit goal"
              sx={{ 
                color: '#666',
                '&:hover': { color: '#2952CC' }
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              size="large" 
              onClick={handleOpenDeleteDialog}
              aria-label="delete goal"
              sx={{ 
                color: '#666',
                '&:hover': { color: '#f44336' }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the goal "{goal.name}"?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default GoalDetails;