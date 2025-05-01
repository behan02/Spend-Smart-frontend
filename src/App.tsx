import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReportDisplay from "./pages/Report/ReportDisplay";
import Sidebar from "./components/sidebar/sidebar";
import Footer from "./components/footer/Footer";
import BudgetPage from "./pages/Budget/Budget";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<BudgetPage />} />
        <Route path="/reportdisplay" element={<ReportDisplay />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
