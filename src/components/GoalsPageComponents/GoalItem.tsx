import React from 'react';
import { 
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  CircularProgressProps
} from '@mui/material';

interface Goal {
  id: number;
  name: string;
  savedAmount: number;
  targetAmount: number;
  progress: number;
}

interface GoalItemProps {
  goal: Goal;
  isSelected: boolean;
  onClick: () => void;
}

// CircularProgressWithLabel component
const CircularProgressWithLabel = (props: CircularProgressProps & { value: number }) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress 
        variant="determinate" 
        {...props} 
        sx={{
          color: props.value === 100 ? '#4caf50' : '#3f51b5', // Green if 100%, otherwise primary
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

const GoalItem: React.FC<GoalItemProps> = ({ goal, isSelected, onClick }) => {
  return (
    <Card 
      onClick={onClick}
      sx={{ 
        mb: 2, 
        border: '1px solid',
        borderColor: isSelected ? '#3f51b5' : '#f0f0f0',
        borderRadius: '8px',
        boxShadow: isSelected ? 2 : 'none',
        cursor: 'pointer',
        '&:hover': {
          borderColor: '#c5cae9'
        }
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ flexBasis: '40px', flexShrink: 0 }}>
            <CircularProgressWithLabel value={goal.progress} />
          </Box>
          <Box sx={{ ml: 2, flexGrow: 1 }}>
            <Typography variant="body1" fontWeight="medium">
              {goal.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              ${goal.savedAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default GoalItem;