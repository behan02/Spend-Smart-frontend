import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import Footer from "./components/footer/Footer";
import UserSettings from "./pages/UserSettings/UserSettings";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/settings" element={<UserSettings />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
