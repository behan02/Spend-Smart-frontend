import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Tooltip,
  Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { userApi, UserResponse } from '../../services/userApi';

interface ManageUsersTableProps {
  searchQuery?: string;
  statusFilter?: string;
  currencyFilter?: string;
}

const ManageUsersTable: React.FC<ManageUsersTableProps> = ({
  searchQuery = '',
  statusFilter = '',
  currencyFilter = ''
}) => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states (only for viewing user details)
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserResponse | null>(null);

  // Load users on component mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Filter users whenever filters or users change
  useEffect(() => {
    let filtered = [...users];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.userName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    // Apply currency filter
    if (currencyFilter) {
      filtered = filtered.filter(user => user.currency === currencyFilter);
    }

    setFilteredUsers(filtered);
  }, [users, searchQuery, statusFilter, currencyFilter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const usersData = await userApi.getAllUsers();
      setUsers(usersData);
    } catch (err: any) {
      console.error('Error loading users:', err);
      setError(`Failed to load users: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenViewDialog = (user: UserResponse) => {
    setSelectedUser(user);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedUser(null);
    setError(null);
  };

  const handleDelete = async (id: number, userName: string) => {
    if (window.confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone and will remove all user data.`)) {
      try {
        setLoading(true);
        await userApi.deleteUser(id);
        await loadUsers();
      } catch (err: any) {
        console.error('Error deleting user:', err);
        setError(`Failed to delete user: ${err.message}`);
      } finally {
        setLoading(false);
      }
    }
  };

  const getStatusChip = (status: string, isActive: boolean) => {
    let color: 'success' | 'warning' | 'default' = 'default';
    
    if (status === 'Active' && isActive) color = 'success';
    else if (status === 'Inactive' || !isActive) color = 'warning';
    
    return (
      <Chip 
        label={status} 
        color={color} 
        size="small" 
        variant="filled"
      />
    );
  };

  if (loading && users.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height={200}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Users Management</Typography>
        <Box>
          <Typography variant="body2" color="text.secondary">
            {filteredUsers.length !== users.length 
              ? `Showing ${filteredUsers.length} of ${users.length} users`
              : `${users.length} total users`
            }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Users register themselves. Admin can view or delete accounts.
          </Typography>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight="bold">Username</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Email</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Status</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Last Login</Typography></TableCell>
              <TableCell><Typography fontWeight="bold">Currency</Typography></TableCell>
              <TableCell align="center"><Typography fontWeight="bold">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{getStatusChip(user.status, user.isActive)}</TableCell>
                  <TableCell>{user.lastLoginDisplay}</TableCell>
                  <TableCell>{user.currency}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" gap={1} justifyContent="center">
                      <Tooltip title="View User Details">
                        <IconButton 
                          color="info" 
                          size="small"
                          onClick={() => handleOpenViewDialog(user)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      
                      <Tooltip title="Delete User (Permanent)">
                        <IconButton 
                          color="error" 
                          size="small"
                          onClick={() => handleDelete(user.id, user.userName)}
                          disabled={loading}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body2" color="text.secondary">
                    {users.length === 0 
                      ? "No users found. Users will appear here after they register themselves."
                      : "No users match the current filters. Try adjusting your search criteria."
                    }
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* View User Dialog (Read-only) */}
      <Dialog 
        open={openViewDialog} 
        onClose={handleCloseViewDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          User Details: {selectedUser?.userName}
        </DialogTitle>
        
        <DialogContent>
          {selectedUser && (
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <Typography variant="body1">
                <strong>Username:</strong> {selectedUser.userName}
              </Typography>
              
              <Typography variant="body1">
                <strong>Email:</strong> {selectedUser.email}
              </Typography>
              
              <Typography variant="body1">
                <strong>Currency:</strong> {selectedUser.currency}
              </Typography>
              
              <Typography variant="body1">
                <strong>Status:</strong> {getStatusChip(selectedUser.status, selectedUser.isActive)}
              </Typography>
              
              <Typography variant="body1">
                <strong>Account Created:</strong> {new Date(selectedUser.createdAt).toLocaleDateString()}
              </Typography>
              
              <Typography variant="body1">
                <strong>Last Login:</strong> {selectedUser.lastLoginDisplay}
              </Typography>
              
              {selectedUser.updatedAt && (
                <Typography variant="body1">
                  <strong>Last Updated:</strong> {new Date(selectedUser.updatedAt).toLocaleDateString()}
                </Typography>
              )}
              
              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>Privacy Note:</strong> User personal details can only be modified by the user themselves. 
                  Admins can only view account information and manage account status.
                </Typography>
              </Alert>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseViewDialog}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ManageUsersTable;
