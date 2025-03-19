import React from "react";
import {
  Box,
  Grid,
  ListItem,
  TextField,
  InputAdornment,
  Divider,
  Button,
} from "@mui/material";
import Image from "../../assets/images/userRegister.png"
import User from "@mui/icons-material/PermIdentity";
import MailIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/LockOutlined";


const Register: React.FC = () => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Form submitted"); // Add actual form handling logic
  };

  return (
    <Grid container spacing={2} sx={{ height: "100vh" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "#023E8A",
          display: "flex",
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
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          alignItems: "center",
          justifyContent: "center",
         display:"flex",
         flexDirection:"column"
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <h1 style={{ marginBottom: 0 }}>Join, Budget, Thrive!</h1>
          <p style={{ marginTop: 0, marginBottom: "30px" }}>
            Sign up to simplify saving and managing your finances.
          </p>
        </Box>

        <ListItem sx={{ flexDirection: "column", alignItems: "center" }}>
          <form onSubmit={handleSubmit}>
            <TextField
              id="name"
              label="Name"
              placeholder="Enter your name"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "300px" }}
            />
            <br /><br />

            <TextField
              id="email"
              label="Email"
              placeholder="Enter your Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "300px" }}
            />
            <br /><br />

            <TextField
              id="password"
              label="Password"
              type="password"
              placeholder="**********"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "300px" }}
            />
            <br /><br />

            <TextField
              id="confirm-password"
              label="Confirm Password"
              type="password"
              placeholder="**********"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: "300px" }}
            />
            <br /><br />

            <Button
              type="submit"
              variant="contained"
              sx={{
                height: "45px",
                width: "300px",
                backgroundColor: "#023E8A",
              }}
            >
              Sign up
            </Button>
          </form>

          <p style={{ marginTop: "1rem", fontSize: "0.9rem", textAlign: "center",display:"flex",flexDirection:"row" }}>
            Already registered?{" "}
            <p style={{color:"#1976d2"}}>Login here </p>
          </p>
        </ListItem>
      </Grid>
    </Grid>
  );
};

export default Register;
