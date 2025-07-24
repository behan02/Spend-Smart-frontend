import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Button,
  Card,
  CardContent,
  Fade,
  Slide,
  Alert,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MailIcon from "@mui/icons-material/MailOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LoginLeftImage from "../components/LoginComponents/LoginLeftImage";
import ForgetPasswordImg from "../assets/images/ForgotPassword.png";
import Logo from "../assets/images/logo/Logo.png";
import { Link } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setIsLoading(true);

    if (validateForm()) {
      try {
        const response = await fetch("https://localhost:7211/api/user/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.message || "Something went wrong");
        }

        setSuccessMessage(data.message);
        setShowSuccess(true);
        setEmail("");
      } catch (err: any) {
        setErrorMessage(err.message || "Failed to send reset link");
      }
    }
    setIsLoading(false);
  };

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      display: "flex",
      alignItems: "center"
    }}>
      <Grid container spacing={0} sx={{ height: "100vh", flexGrow: 1, flexDirection: { xs: "column", md: "row" } }}>
        {/* Left side - Image (hidden on small screens) */}
        <Grid
          item
          xs={0}
          md={6}
          sx={{
            display: { xs: "none", md: "block", flexGrow: 1 }, // Hide on xs, show on md and up
          }}
        >
          <LoginLeftImage
            imageSrc={ForgetPasswordImg}
            altText="forget password page Image"
          />
        </Grid>
        
        {/* Right side - Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: { xs: 2, md: 4 },
            position: "relative",
            overflow: "hidden",
            flexGrow: 1,
            
            // Background changes based on screen size
            background: {
              xs: "linear-gradient(135deg, #023E8A 0%, #0077B6 50%, #00B4D8 100%)", // Custom gradient for small screens
              md: "transparent" // Transparent for larger screens
            },
            
            // Optional: Add some styling for better mobile experience
            minHeight: "100vh",
            
            // Add a subtle pattern or overlay for mobile (optional)
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: {
                xs: "rgba(255, 255, 255, 0.1)", // Light overlay on mobile
                md: "none"
              },
              pointerEvents: "none",
              zIndex: 0
            }
          }}
        >
          {/* Background decoration (hidden on mobile) */}
          <Box
            sx={{
              position: "absolute",
              top: -50,
              right: -50,
              width: 200,
              height: 200,
              borderRadius: "50%",
              background: "linear-gradient(45deg, #023E8A20, #0277BD20)",
              zIndex: 0,
              display: { xs: "none", md: "block" }, // Hide decorative element on mobile
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -100,
              left: -100,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: "linear-gradient(45deg, #023E8A15, #0277BD15)",
              zIndex: 0,
              display: { xs: "none", md: "block" }, // Hide decorative element on mobile
            }}
          />

          <Fade in timeout={800}>
            <Box sx={{ position: "relative", zIndex: 1, width: "100%", maxWidth: { xs: 350, sm: 400, md: 400 }, mt: 0 }}>
              {/* Logo with animation */}
              <Box sx={{ textAlign: "center", mb: 4, mt: 0 }}>
                <Slide direction="down" in timeout={600}>
                  <img
                    src={Logo}
                    alt="Logo"
                    style={{ 
                      maxWidth: isMobile ? "120px" : isTablet ? "150px" : "180px", 
                      height: isMobile ? "120px" : isTablet ? "150px" : "180px",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                      marginTop: 0
                    }}
                  />
                </Slide>
              </Box>

              {/* Main Card */}
              <Slide direction="up" in timeout={800}>
                <Card
                  elevation={12}
                  sx={{
                    borderRadius: 4,
                    overflow: "visible",
                    background: "rgba(255, 255, 255, 0.95)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 2,
                      background: "linear-gradient(90deg, #023E8A, #0277BD, #023E8A)",
                      borderRadius: "16px 16px 0 0",
                    },
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, sm: 3, md: 2 } }}>
                    <Box component="form" onSubmit={handleSubmit}>
                      {/* Header */}
                      <Box sx={{ textAlign: "center", mb: 3 }}>
                        <Typography
                          variant="h4"
                          sx={{
                            fontSize: { xs: "1.5rem", sm: "1.8rem", md: "2.2rem" },
                            fontWeight: 600,
                            color: "#023E8A",
                            mb: 1,
                            background: "linear-gradient(45deg, #023E8A, #0277BD)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          Forgot Password?
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                            lineHeight: 1.6,
                            px: { xs: 1, sm: 0 },
                          }}
                        >
                          No worries! Enter your email and we'll send you a reset link
                        </Typography>
                      </Box>

                      {/* Email Field */}
                      <TextField
                        label="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={!!errors.email}
                        helperText={errors.email}
                        placeholder="Enter your email address"
                        fullWidth
                        sx={{
                          mb: { xs: 2, sm: 3 },
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 2,
                            transition: "all 0.3s ease",
                            "&:hover": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#023E8A",
                              },
                            },
                            "&.Mui-focused": {
                              "& .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#023E8A",
                                borderWidth: 2,
                              },
                            },
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "#023E8A",
                          },
                        }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <MailIcon sx={{ color: "#023E8A" }} />
                              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                            </InputAdornment>
                          ),
                        }}
                      />

                      {/* Success/Error Messages */}
                      {successMessage && (
                        <Fade in={showSuccess}>
                          <Alert
                            icon={<CheckCircleIcon />}
                            severity="success"
                            sx={{
                              mb: { xs: 1.5, sm: 2 },
                              borderRadius: 2,
                              fontSize: { xs: "0.8rem", sm: "0.875rem" },
                              "& .MuiAlert-icon": {
                                color: "#4caf50",
                              },
                            }}
                          >
                            {successMessage}
                          </Alert>
                        </Fade>
                      )}
                      
                      {errorMessage && (
                        <Fade in={!!errorMessage}>
                          <Alert
                            severity="error"
                            sx={{
                              mb: { xs: 1.5, sm: 2 },
                              borderRadius: 2,
                              fontSize: { xs: "0.8rem", sm: "0.875rem" },
                            }}
                          >
                            {errorMessage}
                          </Alert>
                        </Fade>
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isLoading}
                        sx={{
                          height: { xs: 48, sm: 52, md: 56 },
                          borderRadius: 2,
                          fontSize: { xs: "1rem", sm: "1.05rem", md: "1.1rem" },
                          fontWeight: 600,
                          textTransform: "none",
                          background: "linear-gradient(45deg, #023E8A, #0277BD)",
                          boxShadow: "0 4px 15px rgba(2, 62, 138, 0.4)",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            background: "linear-gradient(45deg, #022E6A, #01579B)",
                            boxShadow: "0 6px 20px rgba(2, 62, 138, 0.6)",
                            transform: "translateY(-2px)",
                          },
                          "&:active": {
                            transform: "translateY(0)",
                          },
                          "&:disabled": {
                            background: "#e0e0e0",
                            boxShadow: "none",
                          },
                        }}
                        endIcon={
                          isLoading ? (
                            <CircularProgress size={20} color="inherit" />
                          ) : (
                            <ArrowForwardIcon />
                          )
                        }
                      >
                        {isLoading ? "Sending..." : "Send Reset Link"}
                      </Button>

                      {/* Footer */}
                      <Box sx={{ textAlign: "center", mt: { xs: 2, sm: 3 } }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "text.secondary",
                            fontSize: { xs: "0.8rem", sm: "0.9rem" },
                            px: { xs: 1, sm: 0 },
                          }}
                        >
                          Don't have an account yet?{" "}
                          <Link
                            to="/register"
                            style={{
                              textDecoration: "none",
                              color: "#023E8A",
                              fontWeight: 600,
                              transition: "all 0.3s ease",
                            }}
                          >
                            Sign up here
                          </Link>
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Slide>
            </Box>
          </Fade>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ForgetPassword;