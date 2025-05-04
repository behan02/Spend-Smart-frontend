import { Routes, Route, BrowserRouter } from "react-router-dom";
import UserSettings from "./pages/UserSettings/UserSettings";


function App() {
  return (
    
      <BrowserRouter>
        <Routes>
      
          <Route path="/settings" element={<UserSettings />} />
      
        </Routes>
      </BrowserRouter>
    
  );
}

export default App;

