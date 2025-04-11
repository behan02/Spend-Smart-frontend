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
import Image from "../../assets/images/regitser1.png";
import User from "@mui/icons-material/PermIdentity";
import MailIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo/Logo.png";

const Register: React.FC = () => {
  // 🔧 State variables
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Here you would send data to the backend
    console.log("Registering user:", { name, email, password });
  };

  return (
    <Grid container spacing={2} sx={{ height: "100vh" }}>
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
          backgroundColor: {
            xs: "#023E8A",
            md: "transparent",
          },
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{ maxWidth: "200px", height: "200px" }}
        />
        <Box
          sx={{
            padding: 0,
            margin: 0,
            textAlign: "center",
            color: {
              xs: "white",
              md: "black",
            },
          }}
        >
          <Typography
                        sx={{
                          fontSize: {
                            xs: "25px",
                            md: "30px",
                          },
                          fontWeight:{
                            xs:"200",
                            md:"300"
                          }
                        }}
                      >Join, Budget, Thrive!</Typography>
          
          <Typography
            sx={{
              fontSize:{
                xs:"14px",
                md:"15px"
              },
              marginBottom:"20px"
            }}>
            Sign up to simplify saving and managing your finances.
          </Typography>
        </Box>

        <ListItem
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: {
              xs: "white",
              md: "black",
            },
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User
                      sx={{
                        color: {
                          xs: "white",
                          md: "black",
                        },
                      }}
                    />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "300px",
                "& .MuiInputBase-input": {
                  color: {
                    xs: "white",
                    md: "black",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: {
                    xs: "white",
                    md: "black",
                  },
                },
              }}
            />
            <br />
            <br />

            <TextField
              label="Email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailIcon
                      sx={{
                        color: {
                          xs: "white",
                          md: "black",
                        },
                      }}
                    />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "300px",
                "& .MuiInputBase-input": {
                  color: {
                    xs: "white",
                    md: "black",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: {
                    xs: "white",
                    md: "black",
                  },
                },
              }}
            />
            <br />
            <br />

            <TextField
              label="Password"
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon
                      sx={{
                        color: {
                          xs: "white",
                          md: "black",
                        },
                      }}
                    />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "300px",
                "& .MuiInputBase-input": {
                  color: {
                    xs: "white",
                    md: "black",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: {
                    xs: "white",
                    md: "black",
                  },
                },
              }}
            />
            <br />
            <br />

            <TextField
              label="Confirm Password"
              type="password"
              placeholder="**********"
              value={confirmPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon
                      sx={{
                        color: {
                          xs: "white",
                          md: "black",
                        },
                      }}
                    />
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: "300px",
                "& .MuiInputBase-input": {
                  color: {
                    xs: "white",
                    md: "black",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: {
                    xs: "white",
                    md: "black",
                  },
                },
              }}
            />
            <br />
            <br />

            <Button
              type="submit"
              variant="contained"
              sx={{
                height: "45px",
                width: "300px",
                backgroundColor: {
                  xs: "#007FFF",
                  md: "#023E8A",
                },
              }}
            >
              Sign up
            </Button>
            <br />
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
                  color: "#1976d2",
                  textDecoration: "none",
                  opacity: "50%",
                  fontWeight: "bold",
                }}
              >
                <Typography
                  component="span"
                  sx={{
                    color: {
                      xs: "#7CB9E8",
                      md: "#1976d2",
                    },
                    opacity: 0.7,
                    fontWeight: "bold",
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
