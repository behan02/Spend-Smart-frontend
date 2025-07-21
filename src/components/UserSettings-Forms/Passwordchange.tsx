import {
  Stack,
  TextField,
  Typography,
  Box,
  Button,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

// Direct API configuration to avoid import issues
const API_BASE_URL = "https://localhost:7211/api";
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Debug function to check if user exists
const checkUserExists = async (userIdToCheck: number) => {
  try {
    console.log("🔍 DEBUG: Checking if user exists:", userIdToCheck);
    const response = await apiClient.get(`/user/${userIdToCheck}`);
    console.log("🔍 DEBUG: User data:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("🔍 DEBUG: User check failed:", error.response?.data);
    return null;
  }
};

// Helper function to create a test user if needed
const createTestUser = async () => {
  try {
    console.log("🔧 DEBUG: Creating test user...");
    // Simple user registration for testing
    const testUserData = {
      userName: "TestUser",
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
      firstName: "Test",
      lastName: "User",
    };

    // Note: This assumes there's a registration endpoint available
    const response = await apiClient.post("/auth/register", testUserData);
    console.log("🔧 DEBUG: Test user created:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "🔧 DEBUG: Failed to create test user:",
      error.response?.data
    );
    return null;
  }
};

// Direct password change function to avoid import issues
const changePasswordDirect = async (request: {
  userId: number;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  try {
    console.log(
      "🔐 Sending password change request to:",
      `${API_BASE_URL}/user/change-password`
    );
    console.log("🔐 Request payload:", request); // DEBUG: Log the request data
    const response = await apiClient.post("/user/change-password", request);
    return response.data;
  } catch (error: any) {
    console.error("Error changing password:", error);
    console.error("🔐 Error details:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
    }); // DEBUG: Log detailed error information

    // Log the data object separately to see its full content
    console.error(
      "🔐 Full error data:",
      JSON.stringify(error.response?.data, null, 2)
    );

    // Throw a more descriptive error
    const errorMessage =
      error.response?.data?.message ||
      JSON.stringify(error.response?.data) ||
      error.message ||
      "Failed to change password";
    throw new Error(errorMessage);
  }
};

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

const Passwordchange = ({ userId }: { userId?: number }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [warnings, setWarnings] = useState<string[]>([]);

  // Get user ID - use prop if provided, otherwise try localStorage, fallback to 1 for development
  const getUserId = (): number => {
    // TEMPORARY: Use hardcoded userId = 1 for development (same as UserSettings page)
    if (userId) {
      return userId;
    }

    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        return user.id || user.userId || 1; // TEMPORARY: fallback to 1 for development
      } catch {
        return 1; // TEMPORARY: fallback to 1 for development
      }
    }
    return 1; // TEMPORARY: fallback to 1 for development
  }; // Debug function to check if user exists
  const checkUserExists = async (userIdToCheck: number) => {
    try {
      console.log("🔍 DEBUG: Checking if user exists:", userIdToCheck);
      const response = await apiClient.get(`/user/${userIdToCheck}`);
      console.log("🔍 DEBUG: User data:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("🔍 DEBUG: User check failed:", error.response?.data);
      return null;
    }
  };

  // Check user existence on component mount
  React.useEffect(() => {
    const checkUser = async () => {
      const userIdToCheck = getUserId();
      const userData = await checkUserExists(userIdToCheck);
      if (!userData) {
        setErrorMessage(
          `User with ID ${userIdToCheck} not found in database. 
          For testing, you can use "test@example.com" and "password123" 
          as credentials if test user exists, or create a user account first.`
        );

        // Optionally try to create a test user
        console.log(
          "🔧 DEBUG: User not found, you may need to create a test user first"
        );
      } else {
        console.log("✅ DEBUG: User exists:", userData);
        setErrorMessage(""); // Clear any previous error message
      }
    };
    checkUser();
  }, [userId]);

  // Validate passwords and show warnings
  const validatePasswords = () => {
    const newWarnings: string[] = [];

    // Check if new password is same as current password
    if (currentPassword && newPassword && currentPassword === newPassword) {
      newWarnings.push("New password cannot be the same as current password");
    }

    // Check if new password and confirm password match
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      newWarnings.push("New password and confirm password do not match");
    }

    setWarnings(newWarnings);
    return newWarnings.length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous messages
    setErrorMessage("");
    setSuccessMessage("");

    // Validate required fields
    if (!currentPassword.trim()) {
      setErrorMessage("Current password is required");
      return;
    }

    if (!newPassword.trim()) {
      setErrorMessage("New password is required");
      return;
    }

    if (!confirmPassword.trim()) {
      setErrorMessage("Please confirm your new password");
      return;
    }

    // Validate passwords
    if (!validatePasswords()) {
      return;
    }

    const userId = getUserId();
    console.log("🔐 Using userId for password change:", userId); // DEBUG: Log userId
    if (!userId) {
      setErrorMessage("User not found. Please log in again.");
      return;
    }

    setLoading(true);

    try {
      console.log("🔐 DEBUG: About to call direct changePassword function");
      console.log("🔐 DEBUG: Using userId:", userId);

      const response = await changePasswordDirect({
        userId: userId,
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });

      console.log("🔐 Password change response:", response); // DEBUG: Log response

      if (response.success) {
        setSuccessMessage("Password changed successfully!");
        // Clear form
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setWarnings([]);
      } else {
        setErrorMessage(response.message || "Failed to change password");
      }
    } catch (error: any) {
      console.error("🔐 Password change error:", error); // DEBUG: Enhanced logging
      console.error("🔐 Error response:", error.response); // DEBUG: Log error response
      setErrorMessage(
        error.response?.data?.message ||
          error.message ||
          "An error occurred while changing password"
      );
    } finally {
      setLoading(false);
    }
  };

  // Update warnings when passwords change
  React.useEffect(() => {
    if (currentPassword || newPassword || confirmPassword) {
      validatePasswords();
    }
  }, [currentPassword, newPassword, confirmPassword]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="column" spacing={4} sx={{ ml: 15 }}>
        {/* Development Help Message */}
        <Alert severity="info" sx={{ width: 500, ml: 0, mb: 2 }}>
          <Typography variant="body2">
            <strong>Development Mode:</strong> Using User ID 1.
            <br />
            If user doesn't exist, you may need to:
            <br />
            1. Register a user account first, or
            <br />
            2. Update the user ID to match an existing user
          </Typography>
        </Alert>

        {/* Success Message */}
        {successMessage && (
          <Alert severity="success" sx={{ width: 500, ml: 0 }}>
            {successMessage}
          </Alert>
        )}

        {/* Error Message */}
        {errorMessage && (
          <Alert severity="error" sx={{ width: 500, ml: 0 }}>
            {errorMessage}
          </Alert>
        )}

        {/* Warning Messages */}
        {warnings.map((warning, index) => (
          <Alert key={index} severity="warning" sx={{ width: 500, ml: 0 }}>
            {warning}
          </Alert>
        ))}

        <label>
          <Typography sx={{ fontSize: 15, mb: 1 }}>Current Password</Typography>
          <TextField
            type="password"
            name="currentpwd"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            variant="outlined"
            placeholder="Enter your current password"
            required
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
            required
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            variant="outlined"
            placeholder="Re-enter your new password"
            required
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

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          disabled={loading || warnings.length > 0}
          sx={{
            width: 200,
            height: 48,
            ml: 0,
            borderRadius: "8px",
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
            "&:disabled": {
              backgroundColor: "#ccc",
            },
          }}
        >
          {loading ? "Changing..." : "Change Password"}
        </Button>
      </Stack>
    </form>
  );
};

export default Passwordchange;
