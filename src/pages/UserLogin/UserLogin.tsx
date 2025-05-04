import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  ListItem,
  TextField,
  Typography,
  CircularProgress
} from "@mui/material";
import userLoginImage from "../../assets/images/userLogin.png";
import MailIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo/Logo.png";


interface AuthResponse {
  id: string;
  name: string;
  email: string;
  token: string;
}

const UserLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors = {
      email: "",
      password: ""
    };

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
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);

    try {
      const response = await fetch("", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data: AuthResponse = await response.json();

      // Store token and user data
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify({
        id: data.id,
        name: data.name,
        email: data.email
      }));

      // Redirect to dashboard or previous location
      navigate("/dashboard");
    } catch (err) {
      const error = err as Error;
      alert(`Error: ${error.message || "Unknown error"}`);
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
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
          src={userLoginImage}
          alt="Login"
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
          style={{ maxWidth: "200px", height: "200px" }}
        />

        <Box sx={{ padding: 0, margin: 0, textAlign: "center" }}>
          <Typography
            sx={{
              fontSize: { xs: "25px", md: "30px" },
              fontWeight: { xs: "200", md: "300" }
            }}
          >
            Welcome Back!
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "13px", md: "15px" },
              marginBottom: "20px"
            }}
          >
            Let's make managing your finances easy and stress-free.
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%"
            }}
          >
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
              sx={{ width: "300px", mb: 2 }}
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              placeholder="**********"
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
              sx={{ width: "300px", mb: 1 }}
              fullWidth
            />

            <Typography
              variant="body2"
              sx={{
                width: "300px",
                textAlign: "right",
                color: "#FF0000",
                textDecoration: "none",
                fontWeight: 200,
                cursor: "pointer",
                fontSize: "0.8rem",
                mb: 2
              }}
            >
              Forgot password?
            </Typography>

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                height: "45px",
                width: "300px",
                backgroundColor: "#023E8A",
                "&:hover": {
                  backgroundColor: "#022E6A"
                }
              }}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
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
              Don't have an account yet?{" "}
              <Link
                to="/register"
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
                      opacity: 1
                    }
                  }}
                >
                  Sign up here
                </Typography>
              </Link>
            </Typography>
          </Box>
        </ListItem>
      </Grid>
    </Grid>
  );
};

export default UserLogin;