import React from "react";
import { Grid, ListItem } from "@mui/material";
import RegisterLeftImage from "../../components/RegisterComponents/RegisterLeftImage";
import RegisterHeader from "../../components/RegisterComponents/RegisterHeader";
import RegisterForm from "../../components/RegisterComponents/RegisterForm";

const UserRegister: React.FC = () => (
  <Grid container spacing={2} sx={{ height: "100%", width: "100%",margin: 0, padding: 0 }}>  
    
    <RegisterLeftImage />
 
    <Grid
      item
      xs={12}
      md={6}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        
      }}
    >
      <RegisterHeader />
      <ListItem
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          justifyItems: "center",
       
        }}
      >
        <RegisterForm />
      </ListItem>
    </Grid>
  </Grid>
);

export default UserRegister;