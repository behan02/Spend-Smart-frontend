

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import UserLogin from "./pages/UserLogin/UserLogin";
import UserRegister from "./pages/UserRegister/UserRegister";






function App() {
  return (
  
    

      <Router>
        <Routes>

          <Route path="/" element={<UserLogin/>} />
          <Route path="/register" element={<UserRegister/>} /> {/* Add the route for Goals page */}

        </Routes>
      </Router>
 
  );
}

export default App;
