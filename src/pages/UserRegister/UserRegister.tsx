import React from "react";
import { Grid, ListItem } from "@mui/material";
import RegisterLeftImage from "../../components/RegisterComponents/RegisterLeftImage";
import RegisterForm from "../../components/RegisterComponents/RegisterForm";

const UserRegister: React.FC = () => (
  <Grid container spacing={0} sx={{ height: "100vh", width: "100%", margin: 0, padding: 0, display: "flex" }}>  
    
    {/* Left side - Image (hidden on small screens) */}
    <Grid
      item
      xs={0}
      md={6}
      sx={{
        display: { xs: "none", md: "block" }, // Hide on xs, show on md and up
        height: "100%",
        flexGrow: 1,
      }}
    >
      <RegisterLeftImage />
    </Grid>
 
    {/* Right side - Form */}
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        padding: { xs: 2, md: 0 }, // Add padding on small screens
        
        // Background changes based on screen size
        background: {
          background: "linear-gradient(135deg, #023E8A 0%, #0077B6 50%, #00B4D8 100%)",// Gradient background for small screens
          md: "transparent" // Transparent for larger screens
        },
        // Alternative solid color background option:
        // backgroundColor: { xs: "#f5f5f5", md: "transparent" },
        
        // Optional: Add some styling for better mobile experience
        minHeight: "100vh",
        position: "relative",
        
        // Add a subtle pattern or overlay for mobile (optional)
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: {
            xs: "rgba(255, 255, 255, 0.1)", // Light overlay on mobile
            md: "none"
          },
          pointerEvents: "none",
          zIndex: 0
        }
      }}
    >
      
      <ListItem
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          justifyItems: "center",
          width: "100%",
          maxWidth: { xs: "100%", md: "none" }, // Full width on mobile
          position: "relative",
          zIndex: 1, // Ensure content is above the overlay
        }}
      >
        <RegisterForm />
      </ListItem>
    </Grid>
  </Grid>
);

export default UserRegister;