import React from 'react';
import { TableRow, TableCell, Typography } from '@mui/material';

export interface SavingRecord {
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

interface SavingRecordProps {
  record: SavingRecord;
}

const SavingRecord: React.FC<SavingRecordProps> = ({ record }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatAmount = (amount: number) => {
    return `+${amount.toFixed(2)} LKR`;
  };

  return (
    <TableRow sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
      <TableCell>
        <Typography variant="body2">
          {formatDate(record.date)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2">
          {formatTime(record.date)}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="body2" color="textSecondary">
          {record.description || ''}
        </Typography>
      </TableCell>
      <TableCell align="right">
        <Typography variant="body2" fontWeight="medium" sx={{ color: '#4CAF50' }}>
          {formatAmount(record.amount)}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default SavingRecord;