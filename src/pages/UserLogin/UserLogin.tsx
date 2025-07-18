import { Grid } from "@mui/material";
import LoginImage from "../../assets/images/userLogin.png";
import LoginForm from "../../components/LoginComponents/LoginForm";
import LoginLeftImage from "../../components/LoginComponents/LoginLeftImage";

function UserLogin() {
  return (
    <Grid container spacing={0} sx={{ height: "100vh" }}>
      {/* Left side - Image */}
      <Grid
        item
        xs={0}
        md={6}
        sx={{
          display: { xs: "none", md: "block" },
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <LoginLeftImage imageSrc={LoginImage} altText="Login Page Image" />
      </Grid>

      {/* Right side - Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: { xs: 3, md: 0 }, 
          flexGrow: 1,
          background: {
            background:
              "linear-gradient(135deg, #023E8A 0%, #0077B6 50%, #00B4D8 100%)", // Gradient background for small screens
            md: "transparent", 
          },
         

          
          minHeight: "100vh",
          position: "relative",

          
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: {
              xs: "rgba(255, 255, 255, 0.1)", 
              md: "none",
            },
            pointerEvents: "none",
            zIndex: 0,
          },
        }}
      >
        <LoginForm />
      </Grid>
    </Grid>
  );
}

export default UserLogin;
