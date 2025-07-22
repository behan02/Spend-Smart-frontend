import React, { useState, useEffect } from "react";
import {
  TextField,
  Stack,
  Typography,
  Alert,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import axios from "axios";
import { getApiBaseUrl } from "../../Utils/apiUtils";
import { userService, UpdateUserNameDto } from "../../Services/userService";

interface AccountFormProps {
  userId: number;
  initialName?: string;
  initialEmail?: string;
  onUpdateSuccess?: () => void;
  emailVerificationStatus?: {
    type: "success" | "error" | null;
    message: string;
  };
  onEmailVerificationStatusClear?: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({
  userId = 1,
  initialName = "",
  initialEmail = "",
  onUpdateSuccess,
  emailVerificationStatus,
  onEmailVerificationStatusClear,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const [originalData, setOriginalData] = useState({
    name: initialName,
    email: initialEmail,
  });

  const [pendingEmailChange, setPendingEmailChange] = useState<{
    pendingEmail: string;
    hasPendingChange: boolean;
  }>({
    pendingEmail: "",
    hasPendingChange: false,
  });

  const API_BASE_URL = getApiBaseUrl();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });
  const [success, setSuccess] = useState({
    name: "",
    email: "",
  });

  // Load email change status on component mount
  useEffect(() => {
    loadEmailChangeStatus();
  }, [userId]);

  // Auto-dismiss email verification notification after 10 seconds
  useEffect(() => {
    if (emailVerificationStatus?.type && onEmailVerificationStatusClear) {
      const timer = setTimeout(() => {
        onEmailVerificationStatusClear();
      }, 10000); // 10 seconds

      return () => clearTimeout(timer);
    }
  }, [emailVerificationStatus?.type, onEmailVerificationStatusClear]);

  // Update original data when props change - but keep form fields empty
  useEffect(() => {
    // Set original data for comparison purposes, but keep form fields empty
    setOriginalData({
      name: initialName || "",
      email: initialEmail || "",
    });

    // Always keep form fields empty - don't populate from props
    setFormData({
      name: "",
      email: "",
    });
  }, [initialName, initialEmail]);

  const loadEmailChangeStatus = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/EmailVerification/status/${userId}`
      );
      setPendingEmailChange({
        pendingEmail: response.data.pendingEmail || "",
        hasPendingChange: response.data.hasPendingEmailChange || false,
      });
    } catch (error) {
      console.warn("Could not load email change status:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (field: "name" | "email", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear previous errors and success messages for the specific field
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
    setSuccess((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check what changes need to be made
  const getChangesToMake = () => {
    const changes = {
      nameChanged:
        formData.name.trim() !== "" &&
        formData.name.trim() !== originalData.name,
      emailChanged:
        formData.email.trim() !== "" &&
        formData.email.trim() !== originalData.email,
    };
    return changes;
  };

  // Check if save button should be disabled
  const isSaveDisabled = () => {
    const changes = getChangesToMake();
    return loading || (!changes.nameChanged && !changes.emailChanged);
  };

  // Get button text based on what's changing
  const getButtonText = () => {
    if (loading) return "";
    const changes = getChangesToMake();
    if (changes.nameChanged && changes.emailChanged) {
      return "Save Changes";
    } else if (changes.nameChanged) {
      return "Update Name";
    } else if (changes.emailChanged) {
      return "Update Email";
    }
    return "Save Changes";
  };

  // Unified save changes handler
  const handleSaveChanges = async () => {
    const changes = getChangesToMake();

    // Clear previous messages
    setErrors({
      name: "",
      email: "",
    });
    setSuccess({
      name: "",
      email: "",
    });

    // Validation
    if (changes.nameChanged && !formData.name.trim()) {
      setErrors((prev) => ({ ...prev, name: "Name is required" }));
      return;
    }

    if (changes.emailChanged) {
      if (!formData.email.trim()) {
        setErrors((prev) => ({ ...prev, email: "Email is required" }));
        return;
      }
      if (!validateEmail(formData.email.trim())) {
        setErrors((prev) => ({
          ...prev,
          email: "Please enter a valid email address",
        }));
        return;
      }
    }

    setLoading(true);

    try {
      const results = {
        nameSuccess: false,
        emailSuccess: false,
        nameMessage: "",
        emailMessage: "",
      };

      // Handle name change
      if (changes.nameChanged) {
        try {
          const nameDto: UpdateUserNameDto = {
            userId: userId,
            userName: formData.name.trim(),
          };
          const nameResponse = await userService.updateUserName(nameDto);
          results.nameSuccess = true;
          results.nameMessage =
            nameResponse.message || "Name updated successfully";

          // Update original data
          setOriginalData((prev) => ({ ...prev, name: formData.name.trim() }));
        } catch (error: any) {
          let errorMessage = "Failed to update name";
          if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error.response?.status === 404) {
            errorMessage = "User not found";
          }
          setErrors((prev) => ({ ...prev, name: errorMessage }));
        }
      }

      // Handle email change
      if (changes.emailChanged) {
        try {
          const response = await axios.post(
            `${API_BASE_URL}/EmailVerification/request-change`,
            {
              userId: userId,
              newEmail: formData.email.trim(),
            }
          );
          results.emailSuccess = true;
          results.emailMessage =
            response.data.message ||
            "Verification link sent to your new email address";

          // Reload email change status
          await loadEmailChangeStatus();
        } catch (error: any) {
          let errorMessage = "Failed to send verification email";
          if (error.response?.data?.message) {
            errorMessage = error.response.data.message;
          } else if (error.response?.status === 400) {
            errorMessage =
              error.response.data?.message ||
              "Invalid email or email already in use";
          }
          setErrors((prev) => ({ ...prev, email: errorMessage }));
        }
      }

      // Set success messages and clear form data after successful updates
      if (results.nameSuccess) {
        setSuccess((prev) => ({ ...prev, name: results.nameMessage }));
        // Clear only the name field after successful update
        setFormData((prev) => ({ ...prev, name: "" }));
      }
      if (results.emailSuccess) {
        setSuccess((prev) => ({ ...prev, email: results.emailMessage }));
        // Clear only the email field after successful update
        setFormData((prev) => ({ ...prev, email: "" }));
      }

      // Call success callback if any changes were successful
      if ((results.nameSuccess || results.emailSuccess) && onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (error) {
      // Individual errors are already handled above for each operation
      console.error("Unexpected error in handleSaveChanges:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3} sx={{ ml: 15 }}>
      {/* Show pending email change notice */}
      {pendingEmailChange.hasPendingChange && (
        <Alert severity="info" sx={{ width: 500 }}>
          <Typography variant="body2">
            <strong>Email verification pending:</strong> A verification link has
            been sent to <strong>{pendingEmailChange.pendingEmail}</strong>.
            Please check your email and click the verification link to complete
            the email change.
          </Typography>
        </Alert>
      )}

      {/* Name Field */}
      <Box>
        <Typography sx={{ fontSize: 15, mb: 1 }}>User Name</Typography>
        <TextField
          placeholder="Enter your user name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          error={!!errors.name}
          disabled={loading}
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
        {errors.name && (
          <Alert severity="error" sx={{ mt: 1, width: 500 }}>
            {errors.name}
          </Alert>
        )}
        {success.name && (
          <Alert severity="success" sx={{ mt: 1, width: 500 }}>
            {success.name}
          </Alert>
        )}
      </Box>

      {/* Email Field */}
      <Box>
        <Typography sx={{ fontSize: 15, mb: 1 }}>Email</Typography>
        <TextField
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          error={!!errors.email}
          disabled={loading}
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
        {errors.email && (
          <Alert severity="error" sx={{ mt: 1, width: 500 }}>
            {errors.email}
          </Alert>
        )}
        {success.email && (
          <Alert severity="success" sx={{ mt: 1, width: 500 }}>
            {success.email}
          </Alert>
        )}
        {/* Email Verification Notification */}
        {emailVerificationStatus?.type && (
          <Alert
            severity={emailVerificationStatus.type}
            sx={{ mt: 1, width: 500 }}
            onClose={onEmailVerificationStatusClear}
          >
            {emailVerificationStatus.message}
          </Alert>
        )}
      </Box>

      {/* Unified Save Changes Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 3 }}>
        <Button
          onClick={handleSaveChanges}
          type="button"
          variant="contained"
          color="primary"
          disabled={isSaveDisabled()}
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : undefined
          }
          sx={{
            width: 150,
            borderRadius: 2,
            ml: 95,
          }}
        >
          {getButtonText()}
        </Button>
      </Box>
    </Stack>
  );
};

export default AccountForm;
