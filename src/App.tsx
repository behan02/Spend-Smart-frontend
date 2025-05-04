
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Dashboard } from "@mui/icons-material";
import ReportOverview from "./pages/Report/ReportOverview";
import Goals from "./pages/Goals";
import Transaction from "./pages/Transaction/Transaction";
import UserLogin from "./pages/UserLogin/UserLogin";
import UserRegister from "./pages/UserRegister/UserRegister";

function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<ReportOverview />} />
        <Route path="/goals" element={<Goals />} />{/* Add the route for Goals page */}
        <Route path="/transaction" element={<Transaction />} />
        
      </Routes>
    </Router>
  );
}

export default App;
