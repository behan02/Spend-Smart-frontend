import React from "react";
import { Box, Typography } from "@mui/material";
import Logo from "../../assets/images/logo/Logo.png";

const RegisterHeader: React.FC = () => (
  <>
    <img src={Logo} alt="Logo" style={{ maxWidth: "150px", height: "150px" }} />
    <Box sx={{ padding: 0, margin: 0, textAlign: "center" }}>
      <Typography sx={{ fontSize: { xs: "20px", md: "25px" }, fontWeight: { xs: "200", md: "300" } }}>
        Join, Budget, Thrive!
      </Typography>
      <Typography sx={{ fontSize: { xs: "12px", md: "15px" },  }}>
        Sign up to simplify saving and managing your finances.
      </Typography>
    </Box>
  </>
);

export default RegisterHeader;
