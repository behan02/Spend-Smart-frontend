
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Goals from './pages/Goals'; // Import the GoalsPage component
import UserLogin from "./pages/UserLogin/UserLogin";






function App() {
  return (
    
      
      <Router>
        <Routes>

          <Route path="/" element={<UserLogin />} />
          <Route path="/goals" element={<Goals/>} /> {/* Add the route for Goals page */}

        </Routes>
      </Router>
    
  );
}

export default App;
