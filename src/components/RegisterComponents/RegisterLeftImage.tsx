import React from "react";
import { Box, Grid } from "@mui/material";
import Image from "../../assets/images/userRegister.png";

const RegisterLeftImage: React.FC = () => (
  <Grid
    item
    xs={false}
    md={6}
    sx={{
      display: { xs: "none", md: "flex" },
      backgroundColor: "#023E8A",
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      margin: 0,
      padding: 0,
    }}
  >
    <Box>
      <img
        src={Image}
        alt="Register"
        style={{ maxWidth: "500px", height: "500px" }}
      />
    </Box>
  </Grid>
);

export default RegisterLeftImage;
