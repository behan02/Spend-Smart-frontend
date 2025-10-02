
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import  Dashboard  from "./pages/Dashboard/Dashboard";
import ReportOverview from "./pages/Report/ReportOverview";
import Goals from "./pages/Goals/Goals";
import GoalDetailsPage from "./pages/Goals/GoalDetailsPage";
import Transaction from "./pages/Transaction/Transaction";
import UserLogin from "./pages/UserLogin/UserLogin";
import UserRegister from "./pages/UserRegister/UserRegister";
import AdminRegister from "./pages/AdminRegister/AdminRegister";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import BudgetPage from "./pages/Budgets/BudgetPage";
import BudgetDetailsPage from "./pages/Budgets/BudgetDetailsPage";
import ReportGenerate from "./pages/Report/ReportGenerate";
import VerifyEmail  from "./pages/VerifyEmail";
import AdminForgetPassword from "./pages/AdminRegister/AdminForgetPassword"; 
import AdminResetPassword from "./pages/AdminRegister/AdminResetPassword";
import AdminVerifyEmail from "./pages/AdminRegister/AdminVerification";
import AdminDashboard from "./pages/Dashboard"
import ManageUsersPage from "./pages/ManageUsersPage";  
import SystemSettingsPage from "./pages/SystemSettingsPage";
import EmailVerification from "./pages/VerifyEmail";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./assets/styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
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
            <Route path="/budget" element={<BudgetPage />} />
            <Route path="/budgets/:id" element={<BudgetDetailsPage />} />
            <Route path="/reportGenerate" element={<ReportGenerate />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* Add the route for Admin Site*/}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/register" element={<AdminRegister />} />
            <Route path="/admin/forgetpassword" element={<AdminForgetPassword />} />
            <Route path="/admin/resetpassword" element={<AdminResetPassword />} />
            <Route path="/admin/verification" element={<AdminVerifyEmail />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />

            {/* User management path for Manage Users */}
            <Route path="/user" element={<ManageUsersPage />} />
            <Route path="/admin/settings" element={<SystemSettingsPage />} />
            
            {/* Email verification route */}
            <Route path="/admin/verify-email/:token" element={<EmailVerification />} />
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
