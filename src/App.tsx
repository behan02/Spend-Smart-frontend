import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import UserSettings from "./pages/UserSettings/UserSettings";
import Dashboard from "./pages/Dashboard/Dashboard";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./assets/styles/theme"; // Assuming you have a theme file

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<UserSettings />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
