import React, { useState } from "react";
import {
  TextField,
  Stack,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  userService,
  UpdateUserNameDto,
  UpdateUserEmailDto,
} from "../../Services/userService";

interface AccountFormProps {
  userId: number;  //Pass this from parent component
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
  const [loading, setLoading] = useState({
    name: false,
    email: false,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
  });
  const [success, setSuccess] = useState({
    name: "",
    email: "",
  });

  // Handle input changes
  const handleInputChange =
    (field: "name" | "email") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
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

  // Update user email
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

    setLoading((prev) => ({ ...prev, email: true }));

    try {
      const dto: UpdateUserEmailDto = {
        userId: userId,
        email: formData.email.trim(),
      };

      const response = await userService.updateUserEmail(dto);

      setSuccess((prev) => ({
        ...prev,
        email: response.message || "Email updated successfully",
      }));

      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    } catch (error: any) {
      let errorMessage = "Failed to update email";

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.response?.status === 404) {
        errorMessage = "User not found";
      } else if (error.response?.status === 409) {
        errorMessage = "Email is already in use";
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
    <form>
      <Stack direction="column" spacing={4} sx={{ ml: 15 }}>
        {/* Name Field */}
        <div>
          <label>
            <Typography sx={{ fontSize: 15, mb: 1 }}>Name</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <TextField
                type="text"
                name="firstname"
                value={formData.name}
                onChange={handleInputChange("name")}
                error={!!errors.name}
                helperText={errors.name}
                variant="outlined"
                placeholder="Enter your name"
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
              <button
                type="button"
                onClick={handleUpdateName}
                disabled={loading.name}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#1976d2",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: loading.name ? "not-allowed" : "pointer",
                  opacity: loading.name ? 0.6 : 1,
                }}
              >
                {loading.name ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  "Update"
                )}
              </button>
            </Stack>
          </label>

          {success.name && (
            <Alert severity="success" sx={{ mt: 1, ml: 0 }}>
              {success.name}
            </Alert>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label>
            <Typography sx={{ fontSize: 15, mb: 1 }}>Email</Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
              <TextField
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange("email")}
                error={!!errors.email}
                helperText={errors.email}
                variant="outlined"
                placeholder="Enter your email address"
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
              <button
                type="button"
                onClick={handleUpdateEmail}
                disabled={loading.email}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#1976d2",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: loading.email ? "not-allowed" : "pointer",
                  opacity: loading.email ? 0.6 : 1,
                }}
              >
                {loading.email ? (
                  <CircularProgress size={16} color="inherit" />
                ) : (
                  "Update"
                )}
              </button>
            </Stack>
          </label>

          {success.email && (
            <Alert severity="success" sx={{ mt: 1, ml: 0 }}>
              {success.email}
            </Alert>
          )}
        </div>
      </Stack>
    </form>
  );
};

export default AccountForm;
