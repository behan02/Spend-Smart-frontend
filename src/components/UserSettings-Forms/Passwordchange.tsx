import { Stack, TextField, Typography, Box, Alert } from "@mui/material";
import { useState, useEffect } from "react";

export interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordChangeProps {
  onPasswordDataChange: (data: PasswordChangeData) => void;
  onValidationChange: (isValid: boolean) => void;
  error?: string;
  success?: string;
}

const PasswordStrengthIndicator: React.FC<{ password: string }> = ({
  password,
}) => {
  const getStrength = (): number => {
    if (!password) return 0;
    if (password.length < 6) return 1;
    if (
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[!@#$%^&*]/.test(password)
    )
      return 3;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return 2;
    return 1;
  };

  const strength = getStrength();
  const strengthText = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["#e0e0e0", "#ff4444", "#ffbb33", "#00C851", "#00C851"][
    strength
  ];

  if (!password) return null;

  return (
    <>
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
            width: `${(strength / 4) * 100}%`,
            backgroundColor: strengthColor,
            transition:
              "width 0.3s ease-in-out, background-color 0.3s ease-in-out",
          }}
        />
      </Box>
      <Typography sx={{ color: strengthColor, ml: 0, mt: 0, fontSize: 12 }}>
        Strength: {strengthText}
      </Typography>
    </>
  );
};

const Passwordchange: React.FC<PasswordChangeProps> = ({
  onPasswordDataChange,
  onValidationChange,
  error,
  success,
}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validation function
  const validatePasswords = () => {
    const newErrors: { [key: string]: string } = {};

    // Check if all fields are filled
    if (!currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters long";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your new password";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Check if new password is different from current
    if (currentPassword && newPassword && currentPassword === newPassword) {
      newErrors.newPassword =
        "New password must be different from current password";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Update parent component with current data and validation status
  useEffect(() => {
    const isValid = validatePasswords();
    const passwordData: PasswordChangeData = {
      currentPassword,
      newPassword,
      confirmPassword,
    };

    onPasswordDataChange(passwordData);
    onValidationChange(isValid);
  }, [currentPassword, newPassword, confirmPassword]);

  return (
    <form>
      <Stack direction="column" spacing={4} sx={{ ml: 15 }}>
        {/* Success Message */}
        {success && (
          <Alert severity="success" sx={{ width: 500, ml: 0 }}>
            {success}
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ width: 500, ml: 0 }}>
            {error}
          </Alert>
        )}

        <label>
          <Typography sx={{ fontSize: 15, mb: 1 }}>Current Password</Typography>
          <TextField
            type="password"
            name="currentpwd"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            variant="outlined"
            placeholder="Enter your current password"
            error={!!errors.currentPassword}
            helperText={errors.currentPassword}
            sx={{
              width: 500,
              mb: 2,
              ml: 0,
              "& .MuiOutlinedInput-root": {
                height: 48,
                borderRadius: "8px",
                backgroundColor: "#f8f9fa",
                "& fieldset": {
                  borderColor: errors.currentPassword ? "#d32f2f" : "#e0e0e0",
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: errors.currentPassword ? "#d32f2f" : "#1976d2",
                  borderWidth: "2px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.currentPassword ? "#d32f2f" : "#1976d2",
                  borderWidth: "2px",
                  boxShadow: errors.currentPassword
                    ? "0 0 0 3px rgba(211, 47, 47, 0.1)"
                    : "0 0 0 3px rgba(25, 118, 210, 0.1)",
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
            error={!!errors.newPassword}
            helperText={errors.newPassword}
            sx={{
              width: 500,
              ml: 0,
              "& .MuiOutlinedInput-root": {
                height: 48,
                borderRadius: "8px",
                backgroundColor: "#f8f9fa",
                "& fieldset": {
                  borderColor: errors.newPassword ? "#d32f2f" : "#e0e0e0",
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: errors.newPassword ? "#d32f2f" : "#1976d2",
                  borderWidth: "2px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.newPassword ? "#d32f2f" : "#1976d2",
                  borderWidth: "2px",
                  boxShadow: errors.newPassword
                    ? "0 0 0 3px rgba(211, 47, 47, 0.1)"
                    : "0 0 0 3px rgba(25, 118, 210, 0.1)",
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            placeholder="Re-enter your new password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            sx={{
              width: 500,
              mb: 2,
              ml: 0,
              "& .MuiOutlinedInput-root": {
                height: 48,
                borderRadius: "8px",
                backgroundColor: "#f8f9fa",
                "& fieldset": {
                  borderColor: errors.confirmPassword ? "#d32f2f" : "#e0e0e0",
                  borderWidth: "1px",
                },
                "&:hover fieldset": {
                  borderColor: errors.confirmPassword ? "#d32f2f" : "#1976d2",
                  borderWidth: "2px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: errors.confirmPassword ? "#d32f2f" : "#1976d2",
                  borderWidth: "2px",
                  boxShadow: errors.confirmPassword
                    ? "0 0 0 3px rgba(211, 47, 47, 0.1)"
                    : "0 0 0 3px rgba(25, 118, 210, 0.1)",
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
