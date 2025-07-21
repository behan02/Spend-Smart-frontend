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

  // Update user name
  const handleUpdateName = async () => {
    if (!formData.name.trim()) {
      setErrors((prev) => ({
        ...prev,
        name: "Name is required",
      }));
      return;
    }

    setLoading((prev) => ({ ...prev, name: true }));

    try {
      const dto: UpdateUserNameDto = {
        userId: userId,
        userName: formData.name.trim(),
      };

      const response = await userService.updateUserName(dto);

      setSuccess((prev) => ({
        ...prev,
        name: response.message || "Name updated successfully",
      }));

      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (error: any) {
      let errorMessage = "Failed to update name";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 404) {
        errorMessage = "User not found";
      } else if (error.response?.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      }

      setErrors((prev) => ({
        ...prev,
        name: errorMessage,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, name: false }));
    }
  };

  // Update user email with verification
  const handleUpdateEmail = async () => {
    if (!formData.email.trim()) {
      setErrors((prev) => ({
        ...prev,
        email: "Email is required",
      }));
      return;
    }

    if (!validateEmail(formData.email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
      return;
    }

    // Check if email is the same as current email
    if (formData.email.trim() === initialEmail) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a different email address",
      }));
      return;
    }

    setLoading((prev) => ({ ...prev, email: true }));

    try {
      const response = await axios.post(
        `${API_BASE_URL}/EmailVerification/request-change`,
        {
          userId: userId,
          newEmail: formData.email.trim(),
        }
      );

      setSuccess((prev) => ({
        ...prev,
        email:
          response.data.message ||
          "Verification link sent to your new email address. Please check your email to complete the change.",
      }));

      // Clear any previous errors
      setErrors((prev) => ({
        ...prev,
        email: "",
      }));

      // Reload email change status
      await loadEmailChangeStatus();
    } catch (error: any) {
      let errorMessage = "Failed to send verification email";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 404) {
        errorMessage = "User not found";
      } else if (error.response?.status === 400) {
        errorMessage =
          error.response.data?.message ||
          "Invalid email address or email already in use";
      } else if (error.response?.status >= 500) {
        errorMessage = "Server error. Please try again later.";
      }

      setErrors((prev) => ({
        ...prev,
        email: errorMessage,
      }));
    } finally {
      setLoading((prev) => ({ ...prev, email: false }));
    }
  };

  return (
    <Stack spacing={3}>
      {/* Name Section */}
      <Box>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Full Name
        </Typography>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <TextField
            fullWidth
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            error={!!errors.name}
            disabled={loading.name}
            sx={{ flex: 1 }}
          />
          <PageButton
            text={loading.name ? "" : "Update"}
            onClick={handleUpdateName}
            type="button"
            disabled={loading.name || !formData.name.trim()}
            sx={{
              minWidth: 100,
              height: 56,
            }}
            startIcon={
              loading.name ? (
                <CircularProgress size={20} color="inherit" />
              ) : undefined
            }
          />
        </Stack>
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

      {/* Email Section */}
      <Box>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Email
        </Typography>

        {/* Show pending email change notice */}
        {pendingEmailChange.hasPendingChange && (
          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2">
              <strong>Email verification pending:</strong> A verification link
              has been sent to{" "}
              <strong>{pendingEmailChange.pendingEmail}</strong>. Please check
              your email and click the verification link to complete the email
              change.
            </Typography>
          </Alert>
        )}

        <Stack direction="row" spacing={2} alignItems="flex-start">
          <TextField
            fullWidth
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            error={!!errors.email}
            disabled={loading.email}
            sx={{ flex: 1 }}
          />
          <PageButton
            text={loading.email ? "" : "Update"}
            onClick={handleUpdateEmail}
            type="button"
            disabled={loading.email || !formData.email.trim()}
            sx={{
              minWidth: 100,
              height: 56,
            }}
            startIcon={
              loading.email ? (
                <CircularProgress size={20} color="inherit" />
              ) : undefined
            }
          />
        </Stack>
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
    </Stack>
  );
};

export default AccountForm;
