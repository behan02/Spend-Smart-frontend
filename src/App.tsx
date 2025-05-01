import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ReportOverview from "./pages/Report/ReportOverview";

import ReportGenerate from "./pages/Report/ReportGenerate";

function App() {
  return (
    <Router>
  
      <Routes>
        <Route path="/" element={<ReportOverview />} />
        <Route path="/reportGenerate" element={<ReportGenerate />} />
      </Routes>
     
    </Router>
  );
}

export default App;
