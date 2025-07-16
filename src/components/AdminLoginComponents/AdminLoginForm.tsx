import React, { useState } from "react";
import {
  Box, TextField, Typography, InputAdornment, Divider, Button, CircularProgress
} from "@mui/material";
import MailIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/LockOutlined";
import { useNavigate, Link } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
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
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
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
        sx={{ width: "300px", mb: 2 }}
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
        sx={{ width: "300px", mb: 1 }}
        fullWidth
      />

      <Typography
        variant="body2"
        sx={{ width: "300px", textAlign: "right", color: "#FF0000", fontSize: "0.8rem", mb: 2, cursor: "pointer" }}
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
          height: "45px",
          width: "300px",
          backgroundColor: "#023E8A",
          "&:hover": { backgroundColor: "#022E6A" },
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Login"}
      </Button>

      <Typography
        sx={{
          marginTop: "10px",
          textAlign: "center",
          width: "300px",
          fontSize: "0.85rem",
          fontWeight: 200,
        }}
      >
        Don't have an account yet?{" "}
        <Link to="/admin/register" style={{ textDecoration: "none" }}>
          <Typography component="span" sx={{ color: "#023E8A", opacity: 0.7, fontWeight: "bold", "&:hover": { opacity: 1 },fontSize: "0.85rem", }}>
            Sign up here
          </Typography>
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
