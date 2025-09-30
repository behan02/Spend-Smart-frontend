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
  Button,
  LinearProgress,
  Chip
} from '@mui/material';
import { getCategoryIconAndColor } from '../../utils/categoryUtils';

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
  startDate?: string;
  endDate?: string;
}

interface BudgetDetailsProps {
  budget: Budget | null;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onViewDetails: (id: number) => void;
}

const BudgetDetails: React.FC<BudgetDetailsProps> = ({ budget, onEdit, onDelete, onViewDetails }) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Calculate days remaining based on budget type and dates
  const calculateDaysRemaining = (budget: Budget): number => {
    if (budget.remainingDays !== undefined) {
      return budget.remainingDays;
    }

    if (budget.endDate) {
      const today = new Date();
      const endDate = new Date(budget.endDate);
      const diffTime = endDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(0, diffDays);
    }

    // Fallback calculation based on budget type
    const today = new Date();
    let endDate: Date;

    if (budget.type === 'monthly') {
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      endDate = nextMonth;
    } else {
      const endOfYear = new Date(today.getFullYear(), 11, 31);
      endDate = endOfYear;
    }

    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  if (!budget) {
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
          Select a budget to view details
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
    onDelete(budget.id);
    setDeleteDialogOpen(false);
  };

  const handleEdit = () => {
    onEdit(budget.id);
  };

  const handleViewDetails = () => {
    onViewDetails(budget.id);
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 90) return '#DC2626'; // Red for overspending
    if (progress >= 70) return '#F59E0B'; // Orange for warning
    return '#22C55E'; // Green for good
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
        {/* Header Section with Budget Name and Type */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 3
        }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 'bold',
            color: '#1F2937',
            fontSize: '28px'
          }}>
            {budget.name}
          </Typography>
          <Typography variant="body2" sx={{ 
            backgroundColor: '#E3F2FD',
            color: '#1976D2',
            px: 2,
            py: 0.5,
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: 600
          }}>
            {budget.type.charAt(0).toUpperCase() + budget.type.slice(1)}
          </Typography>
        </Box>

        {/* Spent and Budget Section */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          mb: 4
        }}>
          <Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1, fontSize: '14px' }}>
              Spent
            </Typography>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              color: getProgressColor(budget.progress),
              fontSize: '32px'
            }}>
              LKR {budget.spentAmount.toFixed(2)}
            </Typography>
          </Box>

          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1, fontSize: '14px' }}>
              Budget
            </Typography>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              color: '#1F2937',
              fontSize: '32px'
            }}>
              LKR {budget.totalAmount.toFixed(2)}
            </Typography>
          </Box>
        </Box>

        {/* Progress Bar */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 600 }}>
              Progress: {budget.progress.toFixed(1)}%
            </Typography>
            <Chip 
              label={(() => {
                if (budget.progress >= 100) return "Over Budget";
                if (budget.progress >= 90) return "Warning"; 
                if (budget.progress >= 70) return "Caution";
                return "On Track";
              })()}
              size="small"
              color={(() => {
                if (budget.progress >= 100) return "error";
                if (budget.progress >= 90) return "warning";
                if (budget.progress >= 70) return "warning";
                return "success";
              })()}
              sx={{ fontSize: '0.75rem', fontWeight: 'bold' }}
            />
          </Box>

          <LinearProgress 
            variant="determinate" 
            value={Math.min(budget.progress, 100)} 
            sx={{ 
              height: 12, 
              borderRadius: 6,
              backgroundColor: '#E5E7EB',
              '& .MuiLinearProgress-bar': {
                backgroundColor: getProgressColor(budget.progress),
                borderRadius: 6,
              }
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
            <Typography variant="body2" color="textSecondary" sx={{ fontSize: '13px' }}>
              LKR {budget.spentAmount.toFixed(2)} spent
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ fontSize: '13px' }}>
              {budget.remainingAmount >= 0 
                ? `LKR ${budget.remainingAmount.toFixed(2)} remaining`
                : `LKR ${Math.abs(budget.remainingAmount).toFixed(2)} over budget`
              }
            </Typography>
          </Box>
        </Box>

        {/* Categories Section */}
        {budget.categories && budget.categories.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold',
              color: '#1F2937',
              fontSize: '18px',
              mb: 2
            }}>
              Categories
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {budget.categories.map((category) => {
                const { icon, color } = getCategoryIconAndColor(category.name);
                return (
                  <Box 
                    key={category.id}
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      backgroundColor: '#F9FAFB',
                      px: 2,
                      py: 1,
                      borderRadius: '8px',
                      border: `1px solid ${color}20`, // Add subtle border with category color
                      '&:hover': {
                        backgroundColor: `${color}10`, // Light background on hover
                      }
                    }}
                  >
                    <Typography sx={{ 
                      fontSize: '16px',
                      color: color // Use category color for the icon
                    }}>
                      {icon}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 500 }}>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '14px', color: '#6B7280' }}>
                      LKR {category.spentAmount.toFixed(2)} / LKR {category.allocatedAmount.toFixed(2)}
                    </Typography>
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}

        {/* Action Buttons */}
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          mt: 'auto'
        }}>
          {/* Days Left */}
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#1976D2',
              fontWeight: 'bold',
              fontSize: '18px',
              textAlign: 'center'
            }}
          >
            {calculateDaysRemaining(budget)} days left
          </Typography>

          {/* Button and Actions Row */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
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
                fontWeight: 700,
                fontSize: '16px',
                fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
                letterSpacing: '0.5px',
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
            Are you sure you want to delete the budget for "{budget.name}"? This action cannot be undone.
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
export default BudgetDetails;