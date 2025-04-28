import React from 'react';
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
  Box
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ManageUsersTable: React.FC = () => {
  // Dummy data (later you will replace with API data)
  const users = [
    { id: 1, username: 'john_doe', email: 'john@example.com', role: 'Admin' },
    { id: 2, username: 'jane_smith', email: 'jane@example.com', role: 'User' },
    { id: 3, username: 'alice_wonder', email: 'alice@example.com', role: 'User' },
  ];

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography fontWeight="bold">User ID</Typography></TableCell>
            <TableCell><Typography fontWeight="bold">Username</Typography></TableCell>
            <TableCell><Typography fontWeight="bold">Email</Typography></TableCell>
            <TableCell><Typography fontWeight="bold">Role</Typography></TableCell>
            <TableCell align="center"><Typography fontWeight="bold">Actions</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell align="center">
                  <Box>
                    <IconButton color="primary" aria-label="edit user">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" aria-label="delete user">
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ManageUsersTable;
