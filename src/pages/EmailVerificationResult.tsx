import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  Container,
  CircularProgress,
  Alert,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

const EmailVerificationResult: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const searchParams = new URLSearchParams(location.search);
  const success = searchParams.get("success") === "true";
  const message = searchParams.get("message") || "Unknown error occurred";

  useEffect(() => {
    // Simulate loading for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleBackToSettings = () => {
    navigate("/user-settings");
  };

  const handleBackToHome = () => {
    navigate("/dashboard");
  };

  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <CircularProgress size={60} sx={{ mb: 3 }} />
          <Typography variant="h6" color="text.secondary">
            Verifying your email...
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Box sx={{ mb: 3 }}>
          {success ? (
            <CheckCircleIcon
              sx={{
                fontSize: 80,
                color: "success.main",
                mb: 2,
              }}
            />
          ) : (
            <ErrorIcon
              sx={{
                fontSize: 80,
                color: "error.main",
                mb: 2,
              }}
            />
          )}
        </Box>

        <Typography
          variant="h4"
          gutterBottom
          color={success ? "success.main" : "error.main"}
          sx={{ fontWeight: "bold" }}
        >
          {success ? "Email Verified!" : "Verification Failed"}
        </Typography>

        <Alert
          severity={success ? "success" : "error"}
          sx={{ mb: 3, textAlign: "left" }}
        >
          {message}
        </Alert>

        {success ? (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Your email address has been successfully updated. You can now use
            your new email address to access your account.
          </Typography>
        ) : (
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            We couldn't verify your email address. This might be because the
            verification link has expired or is invalid. Please try requesting a
            new verification email.
          </Typography>
        )}

        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleBackToSettings}
            sx={{ minWidth: 140 }}
          >
            Account Settings
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={handleBackToHome}
            sx={{ minWidth: 140 }}
          >
            Go to Dashboard
          </Button>
        </Box>

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 3, display: "block" }}
        >
          If you continue to experience issues, please contact our support team.
        </Typography>
      </Paper>
    </Container>
  );
};

export default EmailVerificationResult;
