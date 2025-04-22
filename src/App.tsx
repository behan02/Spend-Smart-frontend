import { CssBaseline } from '@mui/material';
import { ThemeProvider } from "@mui/material";
import theme from "./assets/styles/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportGenerate from "./pages/Report/ReportGenerate";
function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          
          <Route path="/" element={<ReportGenerate/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  )

}

export default App;