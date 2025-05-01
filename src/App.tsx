import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import ReportDisplay from "./pages/Report/ReportDisplay";
import ReportOverview from "./pages/Report/ReportOverview";
import Sidebar from "./components/sidebar/sidebar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transaction from "./pages/Transaction/Transaction";
import Goals from "./pages/Goals";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./assets/styles/theme";
import UserSettings from "./pages/UserSettings/UserSettings";

function App() {
  return (
    // <Router>
    //   <Sidebar />
    //   <Routes>
    //     <Route path="/" element={<ReportOverview />} />
    //     <Route path="/reportdisplay" element={<ReportDisplay />} />
    //   </Routes>
    //   <Footer />
    // </Router>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/report" element={<ReportOverview />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/settings" element={<UserSettings />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
