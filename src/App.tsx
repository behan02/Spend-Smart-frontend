import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportDisplay from "./pages/Report/ReportDisplay";
import ReportOverview from "./pages/Report/ReportOverview";
import Sidebar from "./components/sidebar/sidebar";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<ReportOverview />} />
        <Route path="/reportdisplay" element={<ReportDisplay />} />
      </Routes>
      <Footer />
    </Router>
  );

  

}

export default App;
