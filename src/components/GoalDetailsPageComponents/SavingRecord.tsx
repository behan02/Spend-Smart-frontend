import React from 'react';
import { TableRow, TableCell, Typography } from '@mui/material';

export interface SavingRecord {
  id: number;
  amount: number;
  date: Date;
  description?: string;
  goalId: number;
}

interface SavingRecordProps {
  record: SavingRecord;
}

const SavingRecord: React.FC<SavingRecordProps> = ({ record }) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatAmount = (amount: number) => {
    return `+$${amount.toFixed(2)}`;
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
          {record.description || 'Necessities'}
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