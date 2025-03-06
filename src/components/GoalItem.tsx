import React from 'react';
import { 
  Box,
  Typography,
  Card,
  CardContent
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
            <Box 
              sx={{
                position: 'relative',
                width: 40,
                height: 40,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '3px solid',
                  borderColor: isSelected ? '#3f51b5' : '#4caf50',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body2" fontWeight="bold" color="textSecondary">
                  {goal.progress}%
                </Typography>
              </Box>
            </Box>
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