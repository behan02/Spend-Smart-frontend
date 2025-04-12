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
import { format } from 'date-fns';

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
}

const GoalDetails: React.FC<GoalDetailsProps> = ({ goal, onEdit, onDelete }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State for delete confirmation dialog

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
    onDelete(goal.id); // Call the onDelete function passed as a prop
    setDeleteDialogOpen(false);
  };

  return (
    <>
      <Paper elevation={1} sx={{ p: 3, mb: 3, borderRadius: '8px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            {goal.name}
          </Typography>
          <Box>
            <IconButton size="small" onClick={() => onEdit(goal.id)}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton size="small" onClick={handleOpenDeleteDialog}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ width: '48%' }}>
            <Typography variant="subtitle2" color="textSecondary">
              Spend
            </Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">
              ${goal.savedAmount.toFixed(2)}
            </Typography>
            <Box sx={{ mt: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={goal.progress} 
                sx={{ 
                  height: 8, 
                  borderRadius: 5,
                  backgroundColor: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#3f51b5'
                  }
                }} 
              />
              <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
                {goal.progress}%
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: '48%', textAlign: 'right' }}>
            <Typography variant="subtitle2" color="textSecondary">
              Goals
            </Typography>
            <Typography variant="h5" color="primary" fontWeight="bold">
              ${goal.targetAmount.toFixed(2)}
            </Typography>
            <Box sx={{ mt: 1, display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant="caption" color="textSecondary" sx={{ mt: 0.5 }}>
                {100 - goal.progress}%
              </Typography>
            </Box>
          </Box>
        </Box>
        
        {goal.deadline && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="textSecondary">
              Deadline: {format(new Date(goal.deadline), 'MMM d, yyyy')}
            </Typography>
          </Box>
        )}
        
        {goal.remainingDays !== undefined && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" color="primary" fontWeight="medium">
              {goal.remainingDays} days left
            </Typography>
          </Box>
        )}
        
        {goal.description && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="body2" color="textSecondary" fontWeight="medium">
              Description:
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mt: 0.5 }}>
              {goal.description}
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the goal<Typography variant="h6">{goal.name} ?</Typography> 
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