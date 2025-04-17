import { CssBaseline } from '@mui/material';
import { ThemeProvider } from "@mui/material";
import theme from "./assets/styles/theme";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";// make sure this is 'react-router-dom'

import AdminLogin from './pages/AdminLogin/AdminLogin';

function App() {
  


  return (
    <Router>
    <Routes>
    
      <Route path="/" element={<AdminLogin/>}/>
    </Routes>
  </Router>
  );
}

export default App;
