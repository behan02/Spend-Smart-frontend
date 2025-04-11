import React from "react";
import { Button } from "@mui/material";

const BackButton: React.FC = () => {
  return (
    <Button variant="contained" color="secondary" onClick={() => window.history.back()}>
      Back
    </Button>
  );
};

export default BackButton;