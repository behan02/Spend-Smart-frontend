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
          background: "linear-gradient(135deg, #023E8A 0%, #0077B6 50%, #00B4D8 100%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          position: "relative",
          overflow: "hidden",
          flexGrow:1,
          maxHeight: "100%",
    }}>
  
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
