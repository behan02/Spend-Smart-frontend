import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportDisplay from "./pages/Report/ReportDisplay";
import ReportOverview from "./pages/Report/ReportOverview";
import Sidebar from "./components/sidebar/sidebar";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<ReportOverview />} />
        <Route path="/reportdisplay" element={<ReportDisplay />} />
      </Routes>
    </Router>
  );
}

export default App;
