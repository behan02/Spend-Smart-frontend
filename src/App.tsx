import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import UserLogin from "./pages/UserLogin/UserLogin";
import UserRegister from "./pages/UserRegister/UserRegister";
import Goals from "./pages/Goals/Goals";
import { Box } from "@mui/material";
import { useState } from 'react'
        
function App() {
  return(
    <Box>
      <Goals />
    </Box>
  )
}

export default App;
