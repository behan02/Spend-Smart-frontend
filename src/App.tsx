import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserSettings from "./pages/UserSettings/UserSettings";
import Sidebar from "../src/components/sidebar/sidebar";
import Footer from "../src/components/footer/Footer";

function App() {
  return (
    <Router>
      <div style={{ display: "flex", flexDirection: "row", minHeight: "100vh" }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<UserSettings />} />
            </Routes>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;

