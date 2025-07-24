
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  Dashboard  from "./pages/Dashboard/Dashboard";
import ReportOverview from "./pages/Report/ReportOverview";
import Goals from "./pages/Goals";
import Transaction from "./pages/Transaction/Transaction";
import UserLogin from "./pages/UserLogin/UserLogin";
import UserRegister from "./pages/UserRegister/UserRegister";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import AdminRegister from "./pages/AdminRegister/AdminRegister";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import ReportGenerate from "./pages/Report/ReportGenerate";
import VerifyEmail  from "./pages/VerifyEmail";
import AdminForgetPassword from "./pages/AdminRegister/AdminForgetPassword"; 
import AdminResetPassword from "./pages/AdminRegister/AdminResetPassword";
import AdminVerifyEmail from "./pages/AdminRegister/AdminVerification"; // Ensure this import matches the file structure
import AdminDashboard from "./pages/Dashboard"
import ManageUsersPage from "./pages/ManageUsersPage";  
import SystemSettingsPage from "./pages/SystemSettingsPage";
import EmailVerification from "./pages/VerifyEmail"; // Ensure this import matches the file structure

function App() {
  return (
    <Router>
    
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/report" element={<ReportOverview />} />
        <Route path="/goals" element={<Goals />} />{/* Add the route for Goals page */}
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPasswordPage />} />
        <Route path="/reportGenerate" element={<ReportGenerate />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Add the route for Admin Site*/}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/forgetpassword" element={<AdminForgetPassword />} />
        <Route path="/admin/resetpassword" element={<AdminResetPassword />} />
        <Route path="/admin/verification" element={<AdminVerifyEmail />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* /user path for Manage Users */}
              <Route path="/user" element={<ManageUsersPage />} />
              <Route path="/admin/settings" element={<SystemSettingsPage />} />
              
              {/* Email verification route */}
              <Route path="/admin/verify-email/:token" element={<EmailVerification />} />

      </Routes>
    </Router>
  );
}

export default App;
