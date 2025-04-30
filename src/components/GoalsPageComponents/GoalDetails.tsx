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

  return (
    <>
      <Paper elevation={1} sx={{ p: 4, borderRadius: '8px', bgcolor: 'white' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Spend
            </Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">
              ${goal.savedAmount.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="subtitle2" color="textSecondary">
              Goal
            </Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">
              ${goal.targetAmount.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ my: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={goal.progress} 
            sx={{ 
              height: 8, 
              borderRadius: 5,
              backgroundColor: '#e0e0e0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#2952CC'
              }
            }} 
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
            <Typography variant="caption" color="textSecondary">
              {goal.progress}%
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {100 - goal.progress}%
            </Typography>
          </Box>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          my: 3
        }}>
          <Typography variant="subtitle1" color="primary" fontWeight="medium">
            {goal.remainingDays !== undefined ? `${goal.remainingDays} days left` : ''}
          </Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mt: 2
        }}>
          <Button 
            variant="contained" 
            color="primary"
            sx={{ 
              borderRadius: '50px', 
              textTransform: 'none', 
              px: 6,
              py: 1,
              backgroundColor: '#2952CC',
              height: '30px',
            }}
            onClick={() => onViewDetails(goal.id)}
          >
            View Details
          </Button>
          
          <Box>
            <IconButton size="medium" onClick={() => onEdit(goal.id)}>
              <EditIcon fontSize="medium" />
            </IconButton>
            <IconButton size="medium" onClick={handleOpenDeleteDialog}>
              <DeleteIcon fontSize="medium" />
            </IconButton>
          </Box>
        </Box>
      </Paper>

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