import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Divider,
  Button,
  Typography,
  CircularProgress,
  Box,
  Alert,
  Paper,
  Fade,
  Slide,
  IconButton,
  LinearProgress,
  Chip,
  Grow,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import User from "@mui/icons-material/PermIdentity";
import MailIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import { Link } from "react-router-dom";
import { useForm, Controller, useWatch } from "react-hook-form";
import axios from "axios";
import { useSnackbar } from "notistack";
import Logo from "../../assets/images/logo/Logo.png";

interface RegisterFormInputs {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  currency?: string;
}

const RegisterForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const { enqueueSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const password = useWatch({ control, name: "password" });

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  };

  // Password strength calculation
  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    if (password.match(/[a-z]/)) score += 20;
    if (password.match(/[A-Z]/)) score += 20;
    if (password.match(/[0-9]/)) score += 20;
    if (password.match(/[^a-zA-Z0-9]/)) score += 20;
    return Math.min(score, 100);
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 30) return "#f44336";
    if (strength < 60) return "#ff9800";
    if (strength < 80) return "#ffeb3b";
    return "#4caf50";
  };

  const getStrengthText = (strength: number) => {
    if (strength < 30) return "Weak";
    if (strength < 60) return "Fair";
    if (strength < 80) return "Good";
    return "Strong";
  };

  const passwordStrength = getPasswordStrength(password || "");

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    setAlert(null);

    try {
      const response = await axios.post(
        "https://localhost:7211/api/user/auth/register",
        data
      );
      setAlert({
        type: "success",
        message: "Registration successful! Please check your email to verify.",
      });
    } catch (err: any) {
      const errorMessage =
        err.response?.data || err.message || "Registration failed";
      setAlert({
        type: "error",
        message: `Registration failed: ${errorMessage}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fade in timeout={600}>
      <Paper
        elevation={20}
        sx={{
          padding: { xs: 2, sm: 3, md: 0 },
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: { xs: "350px", sm: "400px", md: "420px" },
          margin: "0 auto",
          position: "relative",
        }}
      >
        <Slide direction="down" in timeout={800}>
          <Box sx={{ textAlign: "center", mb: 1 }}>
            <Box sx={{ 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center",
              mb: 2
            }}>
              <Slide direction="down" in timeout={600}>
                <img
                  src={Logo}
                  alt="Logo"
                  style={{
                    maxWidth: isMobile ? "80px" : isTablet ? "110px" : "130px",
                    height: isMobile ? "80px" : isTablet ? "110px" : "130px",
                    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                  }}
                />
              </Slide>
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                background: "linear-gradient(135deg, #023E8A, #0466C8)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                mb: 1,
                textAlign: "center",
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
              }}
            >
              Join, Budget, Thrive!
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "rgba(0, 0, 0, 0.6)",
                fontSize: { xs: "12px", sm: "13px", md: "14px" },
                lineHeight: 1,
                textAlign: "center",
                mt: 0,
                px: { xs: 1, sm: 0 },
              }}
            >
              Sign up to simplify saving and managing your finances.
            </Typography>
          </Box>
        </Slide>

        <Slide direction="up" in timeout={1000}>
          <Box 
            component="form" 
            onSubmit={handleSubmit(onSubmit)} 
            sx={{ 
              display: "flex", 
              flexDirection: "column", 
              alignItems: "center", 
              width: "100%",
              gap: { xs: 1.5, sm: 2 },
              mt: 1,
            }}
          >
            {alert && (
              <Fade in timeout={300}>
                <Alert
                  icon={alert.type === "success" ? <CheckCircleIcon /> : <ErrorIcon />}
                  severity={alert.type}
                  onClose={() => setAlert(null)}
                  sx={{
                    maxWidth: { xs: "100%", sm: "280px", md: "300px" },
                    width: "100%",
                    borderRadius: 2,
                    fontSize: { xs: "0.8rem", sm: "0.875rem" },
                    "& .MuiAlert-icon": {
                      color: alert.type === "success" ? "#4caf50" : "#f44336",
                    },
                  }}
                >
                  {alert.message}
                </Alert>
              </Fade>
            )}

            <Controller
              name="userName"
              control={control}
              defaultValue=""
              rules={{ required: "Name is required" }}
              render={({ field }) => (
                <Grow in timeout={600}>
                  <TextField
                    {...field}
                    label="Full Name"
                    error={!!errors.userName}
                    helperText={errors.userName?.message}
                    placeholder="Enter your full name"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <User sx={{ color: "#023E8A" }} />
                          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      maxWidth: { xs: "100%", sm: "280px", md: "300px" },
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#023E8A",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#023E8A",
                        },
                      },
                    }}
                    fullWidth
                  />
                </Grow>
              )}
            />

            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: "Email is required",
                validate: (value) => isValidEmail(value) || "Invalid email address",
              }}
              render={({ field }) => (
                <Grow in timeout={800}>
                  <TextField
                    {...field}
                    label="Email Address"
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    placeholder="Enter your email address"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MailIcon sx={{ color: "#023E8A" }} />
                          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      maxWidth: { xs: "100%", sm: "280px", md: "300px" },
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#023E8A",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#023E8A",
                        },
                      },
                    }}
                    fullWidth
                  />
                </Grow>
              )}
            />

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: "Password is required",
                minLength: { value: 6, message: "Min 6 characters" },
              }}
              render={({ field }) => (
                <Grow in timeout={1000}>
                  <TextField
                    {...field}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    placeholder="Create a strong password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "#023E8A" }} />
                          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      maxWidth: { xs: "100%", sm: "280px", md: "300px" },
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#023E8A",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#023E8A",
                        },
                      },
                    }}
                    fullWidth
                  />
                </Grow>
              )}
            />

            {password && (
              <Fade in timeout={300}>
                <Box sx={{ maxWidth: { xs: "100%", sm: "280px", md: "300px" }, width: "100%" }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography variant="caption" sx={{ color: "rgba(0, 0, 0, 0.6)", mr: 1, fontSize: { xs: "0.7rem", sm: "0.75rem" } }}>
                      Password strength:
                    </Typography>
                    <Chip
                      label={getStrengthText(passwordStrength)}
                      size="small"
                      sx={{
                        backgroundColor: getStrengthColor(passwordStrength),
                        color: "white",
                        fontSize: { xs: "9px", sm: "10px" },
                        height: { xs: "18px", sm: "20px" },
                      }}
                    />
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={passwordStrength}
                    sx={{
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: getStrengthColor(passwordStrength),
                        borderRadius: 2,
                      },
                    }}
                  />
                </Box>
              </Fade>
            )}

            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{
                required: "Please confirm your password",
                validate: (value) =>
                  value === getValues("password") || "Passwords do not match",
              }}
              render={({ field }) => (
                <Grow in timeout={1200}>
                  <TextField
                    {...field}
                    label="Confirm Password"
                    type={showConfirmPassword ? "text" : "password"}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    placeholder="Confirm your password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon sx={{ color: "#023E8A" }} />
                          <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                          >
                            {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      maxWidth: { xs: "100%", sm: "280px", md: "300px" },
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#023E8A",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#023E8A",
                        },
                      },
                    }}
                    fullWidth
                  />
                </Grow>
              )}
            />

           

            <Grow in timeout={1400}>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{
                  height: { xs: 45, sm: 48, md: 50 },
                  maxWidth: { xs: "100%", sm: "280px", md: "300px" },
                  width: "100%",
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #023E8A, #0466C8)",
                  boxShadow: "0 8px 20px rgba(2, 62, 138, 0.3)",
                  fontSize: { xs: "14px", sm: "15px", md: "16px" },
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": {
                    background: "linear-gradient(135deg, #022E6A, #0353A4)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 12px 30px rgba(2, 62, 138, 0.4)",
                  },
                  "&:disabled": {
                    background: "rgba(0, 0, 0, 0.12)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    <Typography sx={{ fontSize: { xs: "14px", sm: "15px", md: "16px" } }}>Creating Account...</Typography>
                  </Box>
                ) : (
                  "Create Account"
                )}
              </Button>
            </Grow>

            <Fade in timeout={1600}>
              <Typography
                sx={{
                  textAlign: "center",
                  maxWidth: { xs: "100%", sm: "280px", md: "300px" },
                  width: "100%",
                  fontSize: { xs: "0.8rem", sm: "0.85rem" },
                  fontWeight: 200,
                  px: { xs: 1, sm: 0 },
                }}
              >
                Already have an account?{" "}
                <Link
                  to="/"
                  style={{
                    color: "#023E8A",
                    fontWeight: 600,
                    textDecoration: "none",
                    borderBottom: "1px solid transparent",
                    transition: "all 0.3s ease",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderBottom = "1px solid #023E8A";
                    e.currentTarget.style.color = "#0466C8";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderBottom = "1px solid transparent";
                    e.currentTarget.style.color = "#023E8A";
                  }}
                >
                  Sign in here
                </Link>
              </Typography>
            </Fade>
          </Box>
        </Slide>
      </Paper>
    </Fade>
  );
};

export default RegisterForm;