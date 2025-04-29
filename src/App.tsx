import { BrowserRouter as Router, Routes, Route } from "react-router-dom";



import { Dashboard } from "@mui/icons-material";
import ReportOverview from "./pages/Report/ReportOverview";
import Goals from "./pages/Goals";
import Transaction from "./pages/Transaction/Transaction";

function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/report" element={<ReportOverview />} />
        <Route path="/goals" element={<Goals />} />{/* Add the route for Goals page */}
        <Route path="/transaction" element={<Transaction />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );

  

}

export default App;
