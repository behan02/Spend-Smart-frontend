import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  ListItem,
  TextField,
  InputAdornment,
  Divider,
  Button,
  Typography,
  LinearProgress,
  CircularProgress,
} from "@mui/material";
import Image from "../../assets/images/userRegister.png";
import User from "@mui/icons-material/PermIdentity";
import MailIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo/Logo.png";

interface FormErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: FormErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // In your AdminRegister.tsx
      const response = await fetch(``, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 401) {
          throw new Error("Unauthorized access");
        } else if (response.status === 403) {
          throw new Error("Forbidden - check CORS configuration");
        }
        throw new Error(errorData.message || "Registration failed");
      }

      const data: AuthResponse = await response.json();

      // Store token and user data
      localStorage.setItem("authToken", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.id,
          name: data.name,
          email: data.email,
        })
      );

      alert("Registration successful!");
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof TypeError) {
        console.error("Network/CORS error:", err);
        alert(
          "Connection error. Please check your network or contact support."
        );
      } else {
        const error = err as Error;
        alert(`Error: ${error.message || "Unknown error"}`);
        console.error("Registration error:", error);
      }
    } finally {
      setIsLoading(false);
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
    const strengthColor = ["#ff4444", "#ffbb33", "#00C851", "#00C851"][
      strength
    ];

    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress
          variant="determinate"
          value={(strength + 1) * 25}
          sx={{
            height: 6,
            borderRadius: 3,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              backgroundColor: strengthColor,
            },
          }}
        />
        <Typography variant="caption" sx={{ color: strengthColor }}>
          Password Strength: {strengthText}
        </Typography>
      </Box>
    );
  };

  return (
    <Grid container spacing={2} sx={{ height: "100vh" }}>
      {/* Left side with image */}
      <Grid
        item
        xs={false}
        md={6}
        sx={{
          display: { xs: "none", md: "flex" },
          backgroundColor: "#023E8A",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={Image}
          alt="Register"
          style={{ maxWidth: "500px", height: "500px" }}
        />
      </Grid>

      {/* Right side with form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 0,
          minHeight: "100vh",
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{ maxWidth: "180px", height: "180px" }}
        />

        <Box sx={{ padding: 0, margin: 0, textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: { xs: "25px", md: "30px" },
              fontWeight: { xs: "200", md: "300" },
            }}
          >
            Join, Budget, Thrive!
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "14px", md: "15px" },
              marginBottom: "20px",
            }}
          >
            Sign up to simplify saving and managing your finances.
          </Typography>
        </Box>

        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "300px" }}
              fullWidth
              margin="normal"
            />
            <br />

            <TextField
              label="Email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "300px" }}
              fullWidth
              margin="normal"
            />

            <br />

            <TextField
              label="Password"
              type="password"
              placeholder=""
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "300px" }}
              fullWidth
              margin="normal"
            />
            <PasswordStrengthIndicator password={password} />

            <TextField
              label="Confirm Password"
              type="password"
              placeholder=""
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "300px" }}
              fullWidth
              margin="normal"
            />
            <br />

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                height: "45px",
                width: "300px",
                backgroundColor: "#023E8A",
                mt: 2,
                "&:hover": {
                  backgroundColor: "#022E6A",
                },
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign up"
              )}
            </Button>

            <Typography
              sx={{
                marginTop: "10px",
                textAlign: "center",
                width: "300px",
                textDecoration: "none",
                fontWeight: 200,
                cursor: "pointer",
                fontSize: "0.85rem",
              }}
            >
              Already registered?{" "}
              <Link
                to="/"
                style={{
                  textDecoration: "none",
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    color: "#023E8A",
                    opacity: 0.7,
                    fontWeight: "bold",
                    "&:hover": {
                      opacity: 1,
                    },
                  }}
                >
                  Login here
                </Typography>
              </Link>
            </Typography>
          </form>
        </ListItem>
      </Grid>
    </Grid>
  );
};

export default Register;
