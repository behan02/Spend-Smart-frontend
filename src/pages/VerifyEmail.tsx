import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import Logo from "../assets/images/logo/Logo.png";
import VerifyEmailImage from "../assets/images/verifyEmail.svg";

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [hasVerified, setHasVerified] = useState(false);

  useEffect(() => {
    const verify = async () => {
      if (hasVerified) return; // Prevent multiple calls
      
      try {
        const res = await axios.get("https://localhost:7211/api/user/auth/verify-email", {
          params: { email, token },
        });
        
        // Check if response is successful (status 200)
        if (res.status === 200) {
          setMessage("Your email has been verified successfully!");
          setStatus("success");
          setHasVerified(true);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        }
      } catch (error: any) {
        console.error("Verification error:", error);
        
        // Handle different error scenarios
        if (error.response && error.response.status === 400) {
          setMessage("Invalid verification link. Please check your email for the correct link.");
        } else {
          setMessage("An error occurred during verification. Please try again.");
        }
        setStatus("error");
        setHasVerified(true);
      }
    };

    if (!email || !token) {
      setMessage("Invalid verification link. Please check your email for the correct link.");
      setStatus("error");
    } else {
      verify();
    }
  }, [email, token, navigate, hasVerified]); // Remove dependencies to prevent re-runs

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      {/* Left Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "#023E8A",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          minHeight: "100vh",
          flexGrow: 1,

          flexDirection: "column",
        }}
      >
        <Box sx={{ textAlign: "center", p: 4, width: "100%", maxWidth: 400 }}>
          <img
            src={VerifyEmailImage}
            alt="Email Verification"
            style={{ width: "100%", height: "auto" }}
          />
          <Typography variant="h6" color="white" sx={{ mt: 4, fontWeight: 500 }}>
            Secure your account with email verification
          </Typography>
        </Box>
      </Grid>

      {/* Right Section */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          p: 4,
          minHeight: "100vh",
          flexGrow  : 1,
          flexDirection: "column",
        }}
      >
        <Box sx={{ 
          width: "100%", 
          maxWidth: 400, 
          textAlign: "center",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "100px",
              height: "auto",
              marginBottom: theme.spacing(3),
            }}
          />

          <Typography
            variant="h5"
            sx={{
              fontWeight: 600,
              color: theme.palette.primary.main,
              mb: 2,
            }}
          >
            Email Verification
          </Typography>

          {/* STATUS-BASED CONTENT */}
          {status === "loading" && (
            <>
              <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
                Verifying your email address...
              </Typography>
              <CircularProgress size={60} thickness={4} sx={{ color: theme.palette.primary.main }} />
            </>
          )}

          {status === "success" && (
            <>
              <Box sx={{ color: theme.palette.success.main, mb: 3 }}>
                <svg width="60" height="60" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                  />
                </svg>
              </Box>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {message}
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                You will be redirected to the login page in 3 seconds...
              </Typography>
              <Button
                onClick={() => navigate("/")}
                variant="contained"
                size="large"
                fullWidth
                sx={{ mt: 3 }}
              >
                Go to Login
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <Box sx={{ color: theme.palette.error.main, mb: 3 }}>
                <svg width="60" height="60" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
                  />
                </svg>
              </Box>
              <Typography variant="h6" color="error" sx={{ mb: 2 }}>
                Verification Failed
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {message}
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <Button
                    onClick={() => navigate("/register")}
                    variant="outlined"
                    size="large"
                    fullWidth
                  >
                    Back to Sign Up
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    onClick={() => window.location.reload()}
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ backgroundColor: "#023E8A", color: "#fff" }}
                  >
                    Try Again
                  </Button>
                </Grid>
              </Grid>
            </>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default VerifyEmail;