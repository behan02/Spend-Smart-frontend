import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Divider,
  Button,
} from "@mui/material";
import MailIcon from "@mui/icons-material/MailOutline";
import LoginLeftImage from "../../src/components/LoginComponents/LoginLeftImage";
import ForgetPasswordImg from "../../src/assets/images/ForgotPassword.png";
import Logo from "../../src/assets/images/logo/Logo.png";
import { Link } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({ email: "" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: "" };

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Email is invalid";
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
      fetch("https://localhost:7211/api/user/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || "Something went wrong");
          setSuccessMessage(data.message);
          setEmail("");
        })
        .catch((err) => {
          setErrorMessage(err.message || "Failed to send reset link");
        });
    }
  };

  return (
    <div>
      <Grid container spacing={2} sx={{ height: "100vh" }}>
        <LoginLeftImage
          imageSrc={ForgetPasswordImg}
          altText="forget password page Image"
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ padding: 0, margin: 0, textAlign: "center" }}
          >
            <Typography
              sx={{
                fontSize: { xs: "25px", md: "30px" },
                fontWeight: { xs: "200", md: "300" },
                mb: 2,
              }}
            >
              Forget Password?
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: "13px", md: "15px" },
                marginBottom: "20px",
              }}
            >
              Please enter the email address you registered with:
            </Typography>

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

            {successMessage && (
              <Typography sx={{ color: "green", mb: 1 }}>
                {successMessage}
              </Typography>
            )}
            {errorMessage && (
              <Typography sx={{ color: "red", mb: 1 }}>
                {errorMessage}
              </Typography>
            )}

            <br/>

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
              Continue
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
              <Link to="/register" style={{ textDecoration: "none" }}>
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
        </Grid>
      </Grid>
    </div>
  );
}

export default ForgetPassword;
