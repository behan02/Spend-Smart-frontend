import {
  Box,
  Button,
  Divider,
  Grid,
  InputAdornment,
  ListItem,
  TextField,
  Typography,
} from "@mui/material";
import userLoginImage from "../../assets/images/userLogin.png";
import MailIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../../assets/images/logo/Logo.png";

function UserLogin() {
  // State for email and password
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // connect backend API
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div>
      <Grid container spacing={2} sx={{ height: "100vh" }}>
        //side image
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

        
        //right side form
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
          //logo
          <img
            src={Logo}
            alt="Logo"
            style={{ maxWidth: "200px", height: "200px" }}
          />

          //form input fields
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
            >
              Welcome Back!
            </Typography>

            <Typography
            sx={{
              fontSize:{
                xs:"14px",
                md:"15px"
              },
              marginBottom:"20px"
            }}>
            Let’s make managing your finances easy and stress-free.
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
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                color: {
                  xs: "white",
                  md: "black",
                },
              }}
            >
              //email
              <TextField
                id="email"
                label="Email"
                placeholder="Enter your Email"
                multiline
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
              //password
              <TextField
                id="password"
                label="Password"
                type="password"
                placeholder="**********"
                multiline
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

              //submit button
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
                Login
              </Button>
              <br />

              //forgot password
              <Typography
                variant="body2"
                sx={{
                  marginTop: "10px",
                  textAlign: "right",
                  width: "300px",
                  color: " #FF0000",
                  textDecoration: "none",
                  fontWeight: 200,
                  cursor: "pointer",
                  fontSize: "0.8rem",
                }}
              >
                Forgot password?
              </Typography>

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
                Don’t have an account yet?{" "}
                <Link to="/register" style={{ textDecoration: "none" }}>
                  <Typography
                    component="span"
                    sx={{
                      color: {
                        xs: "#7CB9E8",
                        md: "#1976d2",
                      },
                      opacity: 0.5,
                      fontWeight: "bold",
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
    </div>
  );
}

export default UserLogin;
