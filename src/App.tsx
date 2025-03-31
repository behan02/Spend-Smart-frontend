import React from "react";
import { Box } from "@mui/material";
import Footer from "./components/footer/Footer";
import UserSettings from "./pages/UserSettings/UserSettings";
function App() {
  return (
    <Box>
      <UserSettings />
      <Footer />
    </Box>
  );
}

export default App;

//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
