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
      <Grid container spacing={2} sx={{ maxWidth: "100%", height: "auto" }}>
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
            style={{ maxWidth: "700px", height: "700px" }}
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
          }}
        >
          <Box
            component="img"
            src={Logo}
            alt="Logo"
            sx={{ maxWidth: { xs: "200px", md: "250px" }, height: { xs: "200px", md: "250px" } }}
          />

          <Box
            sx={{
              padding: 0,
              margin: 0,
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "30px",
                  md: "40px",
                },
                fontWeight: {
                  xs: "200",
                  md: "300",
                },
              }}
            >
              Welcome Back!
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: "15px",
                  md: "19px",
                },
                marginBottom: "20px",
              }}
            >
              Let’s make managing your finances easy and stress-free.
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
              }}
            >
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
                      <MailIcon />
                      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ width:{xs:"300px",md:"400px"}, marginBottom: "16px" }}
              />

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
                      <LockIcon />
                      <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ width:{xs:"300px",md:"400px"}, marginBottom: "16px" }}
              />

              
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    height: "45px",
                    width:{xs:"300px",md:"400px"} ,
                    backgroundColor: "#023E8A",
                    fontSize: {xs:"1rem",md:"1.2rem"},
                  }}
                >
                  Login
                </Button>
             

             

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
                  fontSize: {xs:".8rem",md:"1rem"},
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
                  fontSize: {xs:".8rem",md:"1rem"},
                }}
              >
                Don’t have an account yet?{" "}
                
                  <span>
                    <Link
                      to="/register"
                      style={{
                        textDecoration: "none",
                        color: "#023E8A",
                        opacity: 0.7,
                        fontWeight: "bold",
                      }}
                    >
                      Sign up here
                    </Link>
                  </span>
                </Typography>
             
            </Box>
          </ListItem>
        </Grid>
      </Grid>
    </div>
  );
}

export default UserLogin;
