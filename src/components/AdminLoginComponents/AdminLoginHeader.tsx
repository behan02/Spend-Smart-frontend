
import { Box, Typography } from "@mui/material";
import Logo from "../../assets/images/logo/Logo.png";

const AdminLoginHeader = () => (
  <>
    <img src={Logo} alt="Logo" style={{ maxWidth: "200px", height: "200px" }} />
    <Box sx={{ padding: 0, margin: 0, textAlign: "center" }}>
      <Typography sx={{ fontSize: { xs: "25px", md: "30px" }, fontWeight: { xs: "200", md: "300" } }}>
        Welcome Back!
      </Typography>
      <Typography sx={{ fontSize: { xs: "13px", md: "15px" }, marginBottom: "20px" }}>
      Take change and oversee your system with ease.
      </Typography>
    </Box>
  </>
);

export default AdminLoginHeader;
