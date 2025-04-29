import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import { Dashboard } from "@mui/icons-material";
import ReportOverview from "./pages/Report/ReportOverview";
import Goals from "./pages/Goals";
import Transaction from "./pages/Transaction/Transaction";
import AdminRegister from "./pages/AdminRegister/AdminRegister";

function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<AdminRegister />} />
        
      </Routes>
    </Router>
  );

  

}

export default App;
