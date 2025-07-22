import React, { useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  Tooltip,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import {
  DeleteOutline,
  AccountBalanceWallet,
  CalendarToday,
  Schedule,
  Description,
  Savings // Add this import for the savings icon
} from '@mui/icons-material';

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

interface SavingRecordsHistoryTableProps {
  records: SavingRecord[];
  onDeleteRecord?: (recordId: number) => void;
}

const SavingRecordsHistoryTable: React.FC<SavingRecordsHistoryTableProps> = ({ 
  records, 
  onDeleteRecord 
}) => {
  const theme = useTheme();
  const isTabletOrDesktop = useMediaQuery(theme.breakpoints.down("lg"));
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  
  const [showAll, setShowAll] = useState<boolean>(false);
  const [deletingRecord, setDeletingRecord] = useState<number | null>(null);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState<boolean>(false);
  const [recordToDelete, setRecordToDelete] = useState<SavingRecord | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeString: string) => {
    // timeString is in format "HH:mm:ss" from backend TimeSpan
    if (!timeString) {
      return '12:00 AM'; // Fallback for missing time
    }
    
    // Create a temporary date with the time to format it properly
    const tempDate = new Date(`1970-01-01T${timeString}`);
    if (isNaN(tempDate.getTime())) {
      return '12:00 AM'; // Fallback for invalid time
    }
    
    return tempDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-LK', {
      style: 'currency',
      currency: 'LKR',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const handleDeleteClick = (record: SavingRecord) => {
    setRecordToDelete(record);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!onDeleteRecord || !recordToDelete) return;
    
    setDeletingRecord(recordToDelete.id);
    try {
      await onDeleteRecord(recordToDelete.id);
    } catch (error) {
      console.error('Error deleting record:', error);
    } finally {
      setDeletingRecord(null);
      setConfirmDeleteOpen(false);
      setRecordToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmDeleteOpen(false);
    setRecordToDelete(null);
  };

  // Get the records to display (limit to 8 if showAll is false)
  const getRecordsToDisplay = () => {
    return showAll ? records : records.slice(0, 8);
  };

  const handleViewToggle = () => {
    setShowAll(!showAll);
  };

  const recordsToDisplay = getRecordsToDisplay();

  return (
    <Box sx={{ mx: 3 }}>
      {/* Desktop and Tablet view */}
      <Box sx={{
        display: { xs: 'none', md: 'block' }
      }}>
        <Table sx={{ minWidth: 650 }} aria-label="savings history table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarToday sx={{ fontSize: 18, color: '#666' }} />
                Date
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Schedule sx={{ fontSize: 18, color: '#666' }} />
                  Time
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Description sx={{ fontSize: 18, color: '#666' }} />
                  Description
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AccountBalanceWallet sx={{ fontSize: 18, color: '#666' }} />
                  Amount
                </Box>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recordsToDisplay.length > 0 ? (
              recordsToDisplay.map((record, index) => (
                <TableRow 
                  key={record.id}
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { backgroundColor: '#f5f5f5' },
                    opacity: deletingRecord === record.id ? 0.5 : 1,
                    transition: 'all 0.2s ease'
                  }}
                >
                  <TableCell>
                    <Typography variant={isTabletOrDesktop ? "body2" : "body1"}>
                      {formatDate(record.date)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant={isTabletOrDesktop ? "body2" : "body1"}>
                      {formatTime(record.time)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ wordBreak: "break-word", whiteSpace: "normal", maxWidth: "250px" }}>
                    <Typography variant={isTabletOrDesktop ? "body2" : "body1"} color="textSecondary">
                      {record.description || ''}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography 
                      variant={isTabletOrDesktop ? "body2" : "body1"} 
                      sx={{ 
                        color: '#4CAF50', 
                        fontWeight: 'bold'
                      }}
                    >
                      +{formatCurrency(record.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ textAlign: 'center' }}>
                    {onDeleteRecord && (
                      <Tooltip title="Delete record" arrow>
                        <IconButton
                          onClick={() => handleDeleteClick(record)}
                          disabled={deletingRecord === record.id}
                          size="small"
                          sx={{
                            color: '#f44336',
                            '&:hover': {
                              backgroundColor: '#ffebee',
                              transform: 'scale(1.1)'
                            },
                            '&:disabled': {
                              color: '#bdc3c7'
                            },
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <DeleteOutline fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} sx={{ textAlign: 'center', py: 6 }}>
                  <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 2
                  }}>
                    <Box sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      backgroundColor: '#f0f7ff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid #e3f2fd'
                    }}>
                      <AccountBalanceWallet sx={{ fontSize: 40, color: '#1976d2' }} />
                    </Box>
                    <Typography variant="h6" sx={{ 
                      color: '#1976d2',
                      fontWeight: 600
                    }}>
                      No Savings Records Yet
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ 
                      textAlign: 'center',
                      maxWidth: 300
                    }}>
                      Start your savings journey by adding your first saving record to track your progress towards your goals.
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {/* View More/Less Button for Desktop/Tablet */}
        {records.length > 8 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button 
              variant="outlined" 
              onClick={handleViewToggle}
              disableRipple
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                px: 3,
                py: 1
              }}
            >
              {showAll ? "View Less" : `View More (${records.length - 8} more)`}
            </Button>
          </Box>
        )}
      </Box>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDeleteOpen}
        onClose={handleCancelDelete}
        aria-labelledby="confirm-delete-dialog-title"
        aria-describedby="confirm-delete-dialog-description"
        PaperProps={{
          sx: {
            borderRadius: '12px',
            padding: '8px'
          }
        }}
      >
        <DialogTitle id="confirm-delete-dialog-title" sx={{ 
          fontWeight: 600, 
          fontSize: '1.25rem',
          color: '#1a1a1a'
        }}>
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-delete-dialog-description" sx={{ 
            color: '#666666',
            fontSize: '0.95rem'
          }}>
            Are you sure you want to delete this saving record of{' '}
            <strong>
              {recordToDelete && formatCurrency(recordToDelete.amount)}
            </strong>
            {recordToDelete?.description && recordToDelete.description.trim() && (
              <span> for "{recordToDelete.description}"</span>
            )}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button 
            onClick={handleCancelDelete}
            sx={{ 
              textTransform: 'none',
              color: '#666666',
              fontWeight: 500
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            variant="contained"
            disabled={deletingRecord === recordToDelete?.id}
            sx={{ 
              textTransform: 'none',
              backgroundColor: '#d32f2f',
              '&:hover': {
                backgroundColor: '#b71c1c'
              },
              fontWeight: 600,
              minWidth: '80px'
            }}
          >
            {deletingRecord === recordToDelete?.id ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SavingRecordsHistoryTable;