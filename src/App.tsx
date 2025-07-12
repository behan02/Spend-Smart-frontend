
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Dashboard  from "./pages/Dashboard/Dashboard";
import ReportOverview from "./pages/Report/ReportOverview";
import Goals from "./pages/Goals/Goals";
import GoalDetailsPage from "./pages/Goals/GoalDetailsPage";
import Transaction from "./pages/Transaction/Transaction";
import UserLogin from "./pages/UserLogin/UserLogin";
import UserRegister from "./pages/UserRegister/UserRegister";
import AdminRegister from "./pages/AdminRegister/AdminRegister";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import BudgetPage from "./pages/Budgets/BudgetPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<ReportOverview />} />
        <Route path="/goals" element={<Goals />} />{/* Add the route for Goals page */}
        <Route path="/goals/:id" element={<GoalDetailsPage />} />{/* Add the route for Goal Details page */}
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />
        <Route path="/budgets" element={<BudgetPage />} />

        
        <Route path="/admin/register" element={<AdminRegister/>}/>
        
      </Routes>
    </Router>
  );
}

export default App;
