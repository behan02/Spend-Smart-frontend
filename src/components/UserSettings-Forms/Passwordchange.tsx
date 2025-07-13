import { Stack, TextField, Typography, Box } from "@mui/material";
import { useState } from "react";

const PasswordStrengthIndicator: React.FC<{ password: string }> = ({
  password,
}) => {
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
    <>
      {" "}
      <Box
        sx={{
          height: 4,
          width: 500,
          backgroundColor: "#e0e0e0",
          ml: 0,
          mt: 0.5,
          mb: 0.5,
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            height: "100%",
            width: `${(strength / 3) * 100}%`,
            backgroundColor: strengthColor,
            transition:
              "width 0.3s ease-in-out, background-color 0.3s ease-in-out",
          }}
        />
      </Box>
      <Typography sx={{ color: strengthColor, ml: 0, mt: 0 }}>
        Strength: {strengthText}
      </Typography>
    </>
  );
};

const Passwordchange = () => {
  const [newPassword, setNewPassword] = useState("");

  return (
    <form>
      <Stack direction="column" spacing={4} sx={{ ml: 15 }}>
        <label>
          <Typography sx={{ fontSize: 15, mb: 1 }}>Current Password</Typography>
          <TextField
            type="password"
            name="currentpwd"
            variant="outlined"
            placeholder="Enter your current password"
            sx={{
              width: 500,
              mb: 2,
              ml: 0,
              "& .MuiOutlinedInput-root": {
                height: 48,
                borderRadius: "8px",
                backgroundColor: "#f8f9fa",
                "& fieldset": {
                  borderColor: "#e0e0e0",
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: "2px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: "2px",
                  boxShadow: "0 0 0 3px rgba(25, 118, 210, 0.1)",
                },
                "&.Mui-error fieldset": {
                  borderColor: "#d32f2f",
                },
              },
              "& .MuiInputBase-input": {
                padding: "12px 14px",
                fontSize: "14px",
                color: "#333",
                "&::placeholder": {
                  color: "#999",
                  opacity: 1,
                },
              },
            }}
          />
        </label>

        <label>
          <Typography sx={{ fontSize: 15, mb: 1 }}>New Password</Typography>
          <TextField
            type="password"
            name="newpwd"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            variant="outlined"
            placeholder="Enter your new password"
            sx={{
              width: 500,
              ml: 0,
              "& .MuiOutlinedInput-root": {
                height: 48,
                borderRadius: "8px",
                backgroundColor: "#f8f9fa",
                "& fieldset": {
                  borderColor: "#e0e0e0",
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: "2px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: "2px",
                  boxShadow: "0 0 0 3px rgba(25, 118, 210, 0.1)",
                },
                "&.Mui-error fieldset": {
                  borderColor: "#d32f2f",
                },
              },
              "& .MuiInputBase-input": {
                padding: "12px 14px",
                fontSize: "14px",
                color: "#333",
                "&::placeholder": {
                  color: "#999",
                  opacity: 1,
                },
              },
            }}
          />
          <PasswordStrengthIndicator password={newPassword} />
        </label>

        <label>
          <Typography sx={{ fontSize: 15, mb: 1 }}>
            Re Enter New Password
          </Typography>
          <TextField
            type="password"
            name="reenterpwd"
            variant="outlined"
            placeholder="Re-enter your new password"
            sx={{
              width: 500,
              mb: 2,
              ml: 0,
              "& .MuiOutlinedInput-root": {
                height: 48,
                borderRadius: "8px",
                backgroundColor: "#f8f9fa",
                "& fieldset": {
                  borderColor: "#e0e0e0",
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: "2px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#1976d2",
                  borderWidth: "2px",
                  boxShadow: "0 0 0 3px rgba(25, 118, 210, 0.1)",
                },
                "&.Mui-error fieldset": {
                  borderColor: "#d32f2f",
                },
              },
              "& .MuiInputBase-input": {
                padding: "12px 14px",
                fontSize: "14px",
                color: "#333",
                "&::placeholder": {
                  color: "#999",
                  opacity: 1,
                },
              },
            }}
          />
        </label>
      </Stack>
    </form>
  );
};

export default Passwordchange;
