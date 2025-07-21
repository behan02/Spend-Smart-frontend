import React, { useState, useEffect } from "react";
import {
  TextField,
  Stack,
  Typography,
  Alert,
  CircularProgress,
  Box,
} from "@mui/material";
import axios from "axios";
import { getApiBaseUrl } from "../../Utils/apiUtils";
import { userService, UpdateUserNameDto } from "../../Services/userService";
import PageButton from "../Button/PageButton";

interface AccountFormProps {
  userId: number;
  initialName?: string;
  initialEmail?: string;
  onUpdateSuccess?: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({
  userId = 1,
  initialName = "",
  initialEmail = "",
  onUpdateSuccess,
}) => {
  const [formData, setFormData] = useState({
    name: initialName,
    email: initialEmail,
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
    general: "",
  });
  const [success, setSuccess] = useState({
    name: "",
    email: "",
    general: "",
  });

  // Load email change status on component mount
  useEffect(() => {
    loadEmailChangeStatus();
  }, [userId]);

  // Update original data when props change
  useEffect(() => {
    setFormData({
      name: initialName,
      email: initialEmail,
    });
    setOriginalData({
      name: initialName,
      email: initialEmail,
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

    // Clear previous errors and success messages
    setErrors((prev) => ({
      ...prev,
      [field]: "",
      general: "",
    }));
    setSuccess((prev) => ({
      ...prev,
      [field]: "",
      general: "",
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
      nameChanged: formData.name.trim() !== originalData.name,
      emailChanged: formData.email.trim() !== originalData.email,
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
      general: "",
    });
    setSuccess({
      name: "",
      email: "",
      general: "",
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

      // Set success messages
      if (results.nameSuccess && results.emailSuccess) {
        setSuccess((prev) => ({
          ...prev,
          general: `Name updated successfully! ${results.emailMessage}`,
        }));
      } else if (results.nameSuccess) {
        setSuccess((prev) => ({ ...prev, name: results.nameMessage }));
      } else if (results.emailSuccess) {
        setSuccess((prev) => ({ ...prev, email: results.emailMessage }));
      }

      // Call success callback if any changes were successful
      if ((results.nameSuccess || results.emailSuccess) && onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: "An unexpected error occurred. Please try again.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack spacing={3}>
      {/* Show pending email change notice */}
      {pendingEmailChange.hasPendingChange && (
        <Alert severity="info">
          <Typography variant="body2">
            <strong>Email verification pending:</strong> A verification link has
            been sent to <strong>{pendingEmailChange.pendingEmail}</strong>.
            Please check your email and click the verification link to complete
            the email change.
          </Typography>
        </Alert>
      )}

      {/* General success message */}
      {success.general && <Alert severity="success">{success.general}</Alert>}

      {/* General error message */}
      {errors.general && <Alert severity="error">{errors.general}</Alert>}

      {/* Name Field */}
      <Box>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Full Name
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter your full name"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          error={!!errors.name}
          disabled={loading}
        />
        {errors.name && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {errors.name}
          </Alert>
        )}
        {success.name && (
          <Alert severity="success" sx={{ mt: 1 }}>
            {success.name}
          </Alert>
        )}
      </Box>

      {/* Email Field */}
      <Box>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Email
        </Typography>
        <TextField
          fullWidth
          type="email"
          placeholder="Enter your email address"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          error={!!errors.email}
          disabled={loading}
        />
        {errors.email && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {errors.email}
          </Alert>
        )}
        {success.email && (
          <Alert severity="success" sx={{ mt: 1 }}>
            {success.email}
          </Alert>
        )}
      </Box>

      {/* Unified Save Changes Button */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <PageButton
          text={getButtonText()}
          onClick={handleSaveChanges}
          type="button"
          disabled={isSaveDisabled()}
          startIcon={
            loading ? <CircularProgress size={20} color="inherit" /> : undefined
          }
        />
      </Box>
    </Stack>
  );
};

export default AccountForm;
