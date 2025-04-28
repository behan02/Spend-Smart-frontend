import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportDisplay from "./pages/Report/ReportDisplay";
import ReportOverview from "./pages/Report/ReportOverview";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReportOverview />} />
        <Route path="/reportdisplay" element={<ReportDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
