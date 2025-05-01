import { Routes, Route, BrowserRouter } from "react-router-dom";

import ReportOverview from "./pages/Report/ReportOverview";

import Dashboard from "./pages/Dashboard/Dashboard";
import Transaction from "./pages/Transaction/Transaction";
import Goals from "./pages/Goals";

import UserSettings from "./pages/UserSettings/UserSettings";
import ReportGenerate from "./pages/Report/ReportGenerate";

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
    
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/report" element={<ReportOverview />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/settings" element={<UserSettings />} />
      
          <Route path="/reportGenerate" element={<ReportGenerate />} />
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
