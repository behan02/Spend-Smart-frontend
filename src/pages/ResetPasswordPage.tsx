import React, { useState } from "react";
import {
  Grid,
  Box,
  TextField,
  InputAdornment,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/LockOutlined";
import UserLeftImage from "../components/LoginComponents/LoginLeftImage";
import Logo from "../assets/images/logo/Logo.png";
import ResetPassword from "../assets/images/ResetPassword.png";
import { useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    let valid = true;
    const newErrors = { password: "", confirmPassword: "" };

    if (!password.trim()) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    if (validateForm()) {
      fetch("https://localhost:7211/api/user/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Something went wrong");
          setSuccessMessage(data.message || "Password reset successfully.");
          setPassword("");
          setConfirmPassword("");
        })
        .catch((err) => {
          setErrorMessage(err.message || "Failed to reset password.");
        });
    }
  };

  return (
    <Grid container spacing={2} sx={{ height: "100vh" }}>
      <UserLeftImage
        imageSrc={ResetPassword}
        altText="Reset Password Page Image"
      />

      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
          margin: 0,
          flexGrow: 1,
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
              fontWeight: { xs: "200", md: "300" },
            }}
          >
            Set New Password
          </Typography>
          <Typography
            sx={{ fontSize: { xs: "13px", md: "15px" }, marginBottom: "20px" }}
          >
            Your new password must be different from previously used passwords.
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "300px", mt: 2 }}>
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
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            placeholder="**********"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                </InputAdornment>
              ),
            }}
            fullWidth
            sx={{ mb: 2 }}
          />

          {successMessage && (
            <Typography sx={{ color: "green", mb: 2 }}>
              {successMessage}
            </Typography>
          )}
          {errorMessage && (
            <Typography sx={{ color: "red", mb: 2 }}>
              {errorMessage}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            sx={{
              height: "45px",
              width: "300px",
              backgroundColor: "#023E8A",
              "&:hover": { backgroundColor: "#022E6A" },
            }}
          >
            Reset Password
          </Button>
        </Box>
        <Box>
         <Link to="/" style={{ textDecoration: "none" }}>
          <Typography component="span" sx={{ color: "#023E8A", opacity: 0.7, fontWeight: "bold", "&:hover": { opacity: 1 },fontSize: "0.85rem", }}>
            Go back to login
          </Typography>
        </Link>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ResetPasswordPage;
