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
  Button,
  Chip,
  Divider
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Budget {
  id: number;
  name: string;
  type: 'monthly' | 'annually';
  totalAmount: number;
  spentAmount: number;
  remainingAmount: number;
  progress: number;
  categories: Array<{
    id: number;
    name: string;
    allocatedAmount: number;
    spentAmount: number;
    icon?: string;
  }>;
  description?: string;
  remainingDays?: number;
}

interface BudgetDetailsProps {
  budget: Budget | null;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const BudgetDetails: React.FC<BudgetDetailsProps> = ({ 
  budget, 
  onEdit, 
  onDelete, 
  onViewDetails 
}) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (!budget) {
    return (
      <Paper elevation={1} sx={{ 
        p: 3, 
        borderRadius: '8px', 
        height: '400px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Typography variant="body1" color="textSecondary">
          Select a budget to view details
        </Typography>
      </Paper>
    );
  }

  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);
  const handleConfirmDelete = () => {
    onDelete(budget.id);
    setDeleteDialogOpen(false);
  };

  const getStatusColor = () => {
    if (budget.progress >= 90) return '#f44336';
    if (budget.progress >= 70) return '#ff9800';
    return '#4caf50';
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Header with Budget Type */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {budget.name}
          </Typography>
          <Chip
            label={budget.type.charAt(0).toUpperCase() + budget.type.slice(1)}
            sx={{
              backgroundColor: '#e3f2fd',
              color: '#1976d2',
              fontWeight: 'bold'
            }}
          />
        </Box>

        {/* Amount Section */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          mb: 4
        }}>
          <Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Spent
            </Typography>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              color: getStatusColor(),
              fontSize: '2.5rem'
            }}>
              ${budget.spentAmount.toFixed(2)}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Budget
            </Typography>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              color: '#000',
              fontSize: '2.5rem'
            }}>
              ${budget.totalAmount.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ mb: 3 }}>
          <LinearProgress 
            variant="determinate" 
            value={Math.min(budget.progress, 100)} 
            sx={{ 
              height: 12, 
              borderRadius: 6,
              backgroundColor: '#e8e8e8',
              '& .MuiLinearProgress-bar': {
                backgroundColor: getStatusColor(),
                borderRadius: 6
              }
            }} 
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body2" color="textSecondary">
              {Math.round(budget.progress)}%
            </Typography>
            <Typography variant="body2" color="textSecondary">
              ${budget.remainingAmount.toFixed(2)} remaining
            </Typography>
          </Box>
        </Box>

        {/* Categories Breakdown */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
            Categories
          </Typography>
          <Box sx={{ maxHeight: '200px', overflowY: 'auto' }}>
            {budget.categories.map((category, index) => (
              <Box key={category.id}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2">
                      {category.icon} {category.name}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    ${category.spentAmount.toFixed(2)} / ${category.allocatedAmount.toFixed(2)}
                  </Typography>
                </Box>
                {index < budget.categories.length - 1 && <Divider />}
              </Box>
            ))}
          </Box>
        </Box>

        {/* Days Left */}
        {budget.remainingDays && (
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
              {budget.remainingDays} days left
            </Typography>
          </Box>
        )}

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
            onClick={() => onViewDetails(budget.id)}
          >
            View Details
          </Button>
          
          <Box>
            <IconButton 
              size="large" 
              onClick={() => onEdit(budget.id)}
              aria-label="edit budget"
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
              aria-label="delete budget"
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
            Are you sure you want to delete the budget "{budget.name}"?
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

export default BudgetDetails;