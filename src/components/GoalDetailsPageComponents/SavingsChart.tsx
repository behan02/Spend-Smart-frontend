import React from "react";
import { Box, Typography } from "@mui/material";

const SavingsChart: React.FC = () => {
  return (
    <Box p={3} bgcolor="grey.100" borderRadius={2}>
      <Typography variant="h6">Savings Progress Chart</Typography>
      <Typography variant="body2">Chart displaying savings trends will be here.</Typography>
    </Box>
  );
};

export default SavingsChart;