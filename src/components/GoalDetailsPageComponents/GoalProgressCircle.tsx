import React from "react";
import { CircularProgress, Typography, Box } from "@mui/material";

interface GoalProgressCircleProps {
  percentage: number;
}

const GoalProgressCircle: React.FC<GoalProgressCircleProps> = ({ percentage }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <CircularProgress variant="determinate" value={percentage} size={100} />
      <Typography variant="h6" mt={1}>{percentage}% Completed</Typography>
    </Box>
  );
};

export default GoalProgressCircle;