import React from "react";
import { Box, Grid } from "@mui/material";

interface UserLeftImageProps {
  imageSrc: string;
  altText?: string;
  maxWidth?: string;
  height?: string;
}

const LoginLeftImage: React.FC<UserLeftImageProps> = ({
  imageSrc,
  altText = "Image",
  maxWidth = "500px",
  height = "500px",
}) => (
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
        src={imageSrc}
        alt={altText}
        style={{ maxWidth: maxWidth, height: height }}
      />
    </Box>
  </Grid>
);

export default LoginLeftImage;
