import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  Divider,
  Button,
  CircularProgress,
  Fade,
  Slide,
  Paper,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MailIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/LockOutlined";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../../assets/images/logo/Logo.png";

const LoginForm = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "", password: "" };

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
      const response = await fetch("https://localhost:7211/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/dashboard");
    } catch (err: any) {
      alert(`Error: ${err.message}`);
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
            <Box sx={{ textAlign: "center" }}>
              <img
                src={Logo}
                alt="Logo"
                style={{
                  maxWidth: isMobile ? "100px" : "130px",
                  height: isMobile ? "100px" : "130px",
                  filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                }}
              />
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

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}
        >
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
            placeholder="Enter your Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon />
                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: "300px", width: "100%", mb: 2 }}
            fullWidth
          />

          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
            placeholder="**********"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                </InputAdornment>
              ),
            }}
            sx={{ maxWidth: "300px", width: "100%", mb: 1 }}
            fullWidth
          />

          <Typography
            variant="body2"
            sx={{
              maxWidth: "300px",
              width: "100%",
              textAlign: "right",
              color: "#FF0000",
              fontSize: "0.8rem",
              mb: 2,
              cursor: "pointer",
            }}
            component={Link}
            to="/admin/forgetpassword"
          >
            Forgot password?
          </Typography>

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
                              <Typography>Login...</Typography>
                            </Box>
                          ) : (
                            "Login"
                          )}
                        </Button>

          <Typography
            sx={{
              marginTop: "10px",
              textAlign: "center",
              maxWidth: "300px",
              width: "100%",
              fontSize: "0.85rem",
              fontWeight: 200,
            }}
          >
            Don't have an account yet?{" "}
            <Link to="/admin/register" style={{ textDecoration: "none" }}>
              <Typography
                component="span"
                sx={{
                  color: "#023E8A",
                  opacity: 0.7,
                  fontWeight: "bold",
                  "&:hover": { opacity: 1 },
                  fontSize: "0.85rem",
                }}
              >
                Sign up here
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Fade>
  );
};

export default LoginForm;
