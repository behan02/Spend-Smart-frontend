import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserSettings from "./pages/UserSettings/UserSettings";
import EmailVerificationResult from "./pages/EmailVerificationResult";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import theme from "./assets/styles/theme"; // Assuming you have a theme file

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/settings" element={<UserSettings />} />
          <Route path="/user-settings" element={<UserSettings />} />
          <Route
            path="/email-verification-result"
            element={<EmailVerificationResult />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
