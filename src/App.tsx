import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar/sidebar";
import UserLogin from "./pages/UserLogin/UserLogin";
import UserRegister from "./pages/UserRegister/UserRegister";

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />{" "}
        {/* Add the route for Goals page */}
      </Routes>
    </Router>
  );

  

}

export default App;
