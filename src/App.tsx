import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { theme } from './theme';
import Dashboard from './pages/Dashboard'; // Dashboard page
import ManageUsersPage from './pages/ManageUsersPage';
import SystemSettingsPage from './pages/SystemSettingsPage'; // System Settings page
import EmailVerification from './components/EmailVerification/EmailVerification'; // Email verification page
import { AdminProfileProvider } from './contexts/AdminProfileContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AdminProfileProvider>
        <NotificationProvider>
          <Router>
            <Routes>
              {/* Root path for Dashboard */}
              <Route path="/" element={<Dashboard />} />

              {/* /user path for Manage Users */}
              <Route path="/user" element={<ManageUsersPage />} />
              <Route path="/settings" element={<SystemSettingsPage />} />
              
              {/* Email verification route */}
              <Route path="/verify-email/:token" element={<EmailVerification />} />
            </Routes>
          </Router>
        </NotificationProvider>
      </AdminProfileProvider>
    </ThemeProvider>
  );
}

export default App;
