import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Divider,
  Button,
  Typography,
  CircularProgress,
  Box,
  Paper,
  Fade,
  Slide,
  IconButton,
  Alert,
  LinearProgress,
  Chip,
  Grow,
  useTheme,
  useMediaQuery
} from "@mui/material";
import User from "@mui/icons-material/PermIdentity";
import MailIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Logo from "../../assets/images/logo/Logo.png"
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

interface RegisterFormInputs {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInputs>();

  const watchedPassword = watch("password", "");

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

  const passwordStrength = getPasswordStrength(watchedPassword);

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(
        "https://localhost:7211/api/admin/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Registration failed");
      }

      setSuccessMessage(result.message || "Registration successful! Please check your email to verify");
     
    } catch (err: any) {
      setErrorMessage(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fade in timeout={600}>
      <Paper
        elevation={20}
        sx={{
          padding: 4,
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "420px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <Slide direction="down" in timeout={800}>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            
              
            <Box sx={{ textAlign: "center",}}>
                <Slide direction="down" in timeout={600}>
                  <img
                    src={Logo}
                    alt="Logo"
                    style={{ 
                      maxWidth: isMobile ? "100px" : "130px", 
                      height: isMobile ? "100px" : "130px",
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
                
              }}
            >
              Step In as Admin
            </Typography>
            
            <Typography
              variant="body2"
              sx={{
                color: "rgba(0, 0, 0, 0.6)", 
                fontSize: "14px",
                lineHeight: 1.5,
              }}
            >
              Your leadership begins here—sign up as an admin today.
            </Typography>
          </Box>
        </Slide>

        <Slide direction="up" in timeout={1000}>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ width: "100%" }}>
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
                    fullWidth
                    sx={{
                      mb: 2,
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
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email format",
                },
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
                    fullWidth
                    sx={{
                      mb: 2,
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
                    fullWidth
                    sx={{
                      mb: 2,
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
                  />
                </Grow>
              )}
            />

            {watchedPassword && (
              <Fade in timeout={300}>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Typography variant="caption" sx={{ color: "rgba(0, 0, 0, 0.6)", mr: 1 }}>
                      Password strength:
                    </Typography>
                    <Chip
                      label={getStrengthText(passwordStrength)}
                      size="small"
                      sx={{
                        backgroundColor: getStrengthColor(passwordStrength),
                        color: "white",
                        fontSize: "10px",
                        height: "20px",
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
                validate: (value, formValues) =>
                  value === formValues.password || "Passwords do not match",
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
                    fullWidth
                    sx={{
                      mb: 3,
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
                  />
                </Grow>
              )}
            />

            {successMessage && (
              <Fade in timeout={300}>
                <Alert
                  icon={<CheckCircleIcon />}
                  severity="success"
                  sx={{
                    mb: 2,
                    borderRadius: 2,
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
              <Fade in timeout={300}>
                <Alert
                  icon={<ErrorIcon />}
                  severity="error"
                  sx={{
                    mb: 2,
                    borderRadius: 2,
                    "& .MuiAlert-icon": {
                      color: "#f44336",
                    },
                  }}
                >
                  {errorMessage}
                </Alert>
              </Fade>
            )}

            <Grow in timeout={1400}>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{
                  height: 50,
                  width: "100%",
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #023E8A, #0466C8)",
                  boxShadow: "0 8px 20px rgba(2, 62, 138, 0.3)",
                  fontSize: "16px",
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
                    <Typography>Creating Account...</Typography>
                  </Box>
                ) : (
                  "Create Account"
                )}
              </Button>
            </Grow>

            <Fade in timeout={1600}>
              <Box sx={{ textAlign: "center"}}>
                <Typography sx={{ fontSize: "14px", color: "rgba(0, 0, 0, 0.6)" }}>
                  Already have an account?{" "}
                  <Link
                    to="/admin/login"
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
              </Box>
            </Fade>
          </Box>
        </Slide>
      </Paper>
    </Fade>
  );
};

export default RegisterForm;