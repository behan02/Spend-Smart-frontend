import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import UserLogin from "./pages/UserLogin/UserLogin";
import UserRegister from "./pages/UserRegister/UserRegister";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Dashboard from "./pages/Dashboard/Dashboard";
import Transaction from "./pages/Transaction/Transaction";
import theme from "./assets/styles/theme";

function App() {
  // return (
  //   <Router>
  //     <Sidebar />
  //     <Routes>
  //       <Route path="/" element={<UserLogin />} />
  //       <Route path="/register" element={<UserRegister />} />{" "}
  //       {/* Add the route for Goals page */}
  //     </Routes>
  //   </Router>
  // );

  return(
    <Box>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <Dashboard />
      {/* <Transaction /> */}
      </ThemeProvider>
    </Box>
  )
}

export default App;
