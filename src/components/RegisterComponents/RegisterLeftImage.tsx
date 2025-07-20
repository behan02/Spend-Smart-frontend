import React from "react";
import { Box, Grid } from "@mui/material";
import Image from "../../assets/images/userRegister.png";

const RegisterLeftImage: React.FC = () => (
  <Grid
    item
    xs={false}
    md={6}
    sx={{
          background: "linear-gradient(135deg, #023E8A 0%, #0077B6 50%, #00B4D8 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          flexGrow:1,
          maxHeight: "100%",
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
