import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

const PasswordStrengthIndicator: React.FC<{ password: string }> = ({ password }) => {
  const getStrength = (): number => {
    if (!password) return 0;
    if (password.length < 6) return 1;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return 3;
    return 2;
  };

  const strength = getStrength();
  const strengthText = ["Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["#ff4444", "#ffbb33", "#00C851", "#00C851"][strength];

  return (
    <Box sx={{ width: "100%", mb: 1 }}>
      <LinearProgress
        variant="determinate"
        value={(strength + 1) * 25}
        sx={{
          height: 6,
          borderRadius: 3,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": { backgroundColor: strengthColor },
        }}
      />
      <Typography variant="caption" sx={{ color: strengthColor }}>
        Password Strength: {strengthText}
      </Typography>
    </Box>
  );
};

export default PasswordStrengthIndicator;
