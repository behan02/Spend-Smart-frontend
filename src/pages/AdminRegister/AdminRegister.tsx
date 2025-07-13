import React from "react";
import { Grid, ListItem } from "@mui/material";
import AdminRegisterLeftImage from "../../components/AdminRegisterComponents/AdminRegisterLeftImage";
import AdminRegisterHeader from "../../components/AdminRegisterComponents/AdminRegiserHeader";
import AdminRegisterForm from "../../components/AdminRegisterComponents/AdminRegisterForm";

const AdminRegister: React.FC = () => (
  <Grid container spacing={2} sx={{ height: "100vh", width: "100%",margin: 0, padding: 0 }}>  
  
    <AdminRegisterLeftImage />
 
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
      <AdminRegisterHeader />
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
        <AdminRegisterForm />
      </ListItem>
    </Grid>
  </Grid>
);

export default AdminRegister;