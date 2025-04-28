import React, { useState } from "react";
import {
  Box,
  Grid,
  ListItem,
  TextField,
  InputAdornment,
  Divider,
  Button,
  Typography,
} from "@mui/material";
import Image from "../../assets/images/userRegister.png";
import User from "@mui/icons-material/PermIdentity";
import MailIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo/Logo.png";

const UserRegister: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch("", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      alert("Registered successfully!");
      // Navigate to login page if needed
    } else {
      const error = await response.text();
      alert(`Error: ${error}`);
    }
  };

  return (
    <Grid
    container
    sx={{
      minHeight: "100vh", // Ensures the container always fills the viewport height
      overflowX: "hidden", // Prevents horizontal scrolling
      flexDirection: { xs: "column", md: "row" }, // Stacks items vertically on small screens, horizontally on medium+
      alignItems: { xs: "center", md: "stretch" }, // Centers items on small screens
      justifyContent: { xs: "flex-start", md: "space-between" }, // Adjusts spacing based on screen size
    }}
  >
      {/* Left Image Side - Hidden on small screens (xs) */}
      <Grid
        item
        xs={false}
        sm={false} 
        md={6}
        sx={{
          display: { xs: "none", md: "flex" }, 
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#023E8A",
          p: 2,
        }}
      >
        <img
          src={Image}
          alt="Register"
          style={{ 
            width: "80%", 
            maxWidth: "400px", 
            height: "auto",
            objectFit: "contain" 
          }}
        />
      </Grid>

      {/* Right Form Side - Full width on small screens */}
      <Grid
        item
        xs={12} 
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: { xs: "flex-start", md: "center" }, 
          p: { xs: 3, md: 2 }, 
          overflowY: "auto", 
        }}
      >
        {/* Logo with responsive sizing */}
        <Box sx={{ 
          width: "100%", 
          display: "flex", 
          justifyContent: "center",
          mt: { xs: 4, md: 0 } 
        }}>
          <img
            src={Logo}
            alt="Logo"
            style={{
              width: "clamp(150px, 50%, 200px)",
              height: "auto",
            }}
          />
        </Box>

        {/* Heading with responsive typography */}
        <Box textAlign="center" sx={{ width: "100%", mt: 2 }}>
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            Join, Budget, Thrive!
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: "0.875rem", md: "1rem" },
              mt: 1,
              color: "text.secondary",
            }}
          >
            Sign up to simplify saving and managing your finances.
          </Typography>
        </Box>

        {/* Form container */}
        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "400px",
            p: 0, 
            mt: { xs: 2, md: 4 },
          }}
        >
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            {/* Name Field */}
            <TextField
              label="Name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{
                shrink: true, 
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="small"
              fullWidth
              margin="normal"
              sx={{ mt: 2 }}
            />

            {/* Email Field */}
            <TextField
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="small"
              fullWidth
              margin="normal"
              sx={{ mt: 2 }}
            />

            {/* Password Field */}
            <TextField
              label="Password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="small"
              fullWidth
              margin="normal"
              sx={{ mt: 2 }}
            />

            {/* Confirm Password Field */}
            <TextField
              label="Confirm Password"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              size="small"
              fullWidth
              margin="normal"
              sx={{ mt: 2 }}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                height: "45px",
                mt: 3,
                backgroundColor: "#023E8A",
                ":hover": { backgroundColor: "#0353A4" },
                fontSize: { xs: "0.875rem", md: "1rem" },
              }}
            >
              Sign up
            </Button>

            {/* Login Link */}
            <Typography
              sx={{
                mt: 2,
                textAlign: "center",
                fontSize: { xs: "0.875rem", md: "0.9rem" },
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
                    fontWeight: "bold",
                    "&:hover": { textDecoration: "underline" },
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

export default UserRegister;