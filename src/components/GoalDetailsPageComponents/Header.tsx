import React from "react";
import { Typography } from "@mui/material";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return <Typography variant="h4" align="center">{title}</Typography>;
};

export default Header;