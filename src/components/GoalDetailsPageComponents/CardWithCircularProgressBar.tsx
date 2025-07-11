import React from 'react';
import { Box, Typography, Card, IconButton } from '@mui/material';
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

interface SavingRecord {
  id: number;
  amount: number;
  date: Date;
  description?: string;
  goalId: number;
}

interface CardWithCircularProgressBarProps {
  goal: Goal;
  savingRecords: SavingRecord[];
  onEdit?: () => void;
  onDelete?: () => void;
}

const CardWithCircularProgressBar: React.FC<CardWithCircularProgressBarProps> = ({
  goal,
  savingRecords,
  onEdit,
  onDelete
}) => {
  // Calculate total saved amount from records
  const totalSavedFromRecords = savingRecords.reduce((total, record) => total + record.amount, 0);
  
  // Calculate current saved amount (initial saved + records)
  const currentSavedAmount = goal.savedAmount + totalSavedFromRecords;
  
  // Calculate progress percentage
  const progressPercentage = goal.targetAmount > 0 
    ? Math.min(100, Math.round((currentSavedAmount / goal.targetAmount) * 100))
    : 0;
  
  // Calculate remaining days
  const remainingDays = goal.remainingDays || 0;

  // Circle properties
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPercentage / 100) * circumference;

  return (
    <Card 
      sx={{ 
        p: 3, 
        borderRadius: "16px", 
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
        border: "1px solid rgba(0, 0, 0, 0.06)",
        background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        minHeight: '400px',
        position: 'relative',
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
          transform: "translateY(-2px)"
        }
      }}
    >
      {/* Edit and Delete buttons */}
      <Box sx={{ position: 'absolute', top: 16, right: 16, display: 'flex', gap: 1 }}>
        <IconButton 
          size="small" 
          onClick={onEdit}
          sx={{
            backgroundColor: 'rgba(25, 118, 210, 0.1)',
            color: '#1976d2',
            '&:hover': {
              backgroundColor: 'rgba(25, 118, 210, 0.2)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton 
          size="small" 
          onClick={onDelete}
          sx={{
            backgroundColor: 'rgba(211, 47, 47, 0.1)',
            color: '#d32f2f',
            '&:hover': {
              backgroundColor: 'rgba(211, 47, 47, 0.2)',
              transform: 'scale(1.1)'
            },
            transition: 'all 0.2s ease'
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        {/* Circular Progress */}
        <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="140" height="140">
            {/* Background circle */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke="#e0e7ff"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Progress circle */}
            <circle
              cx="70"
              cy="70"
              r={radius}
              stroke={progressPercentage > 0 ? "#1976d2" : "#e0e7ff"}
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 70 70)"
              style={{
                transition: 'stroke-dashoffset 0.5s ease-in-out'
              }}
            />
          </svg>
          
          {/* Percentage text in center */}
          <Box sx={{ 
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Typography variant="h4" fontWeight="bold" color="primary">
              {progressPercentage}%
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Completed
            </Typography>
          </Box>
        </Box>

        {/* Goal Information */}
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
              Goal
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {goal.targetAmount.toLocaleString()} LKR
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
              Saved
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {currentSavedAmount.toLocaleString()} LKR
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
              Remaining
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {remainingDays} Days
            </Typography>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};

export default CardWithCircularProgressBar;
