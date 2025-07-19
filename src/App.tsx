import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'; // Dashboard page
import ManageUsersPage from './pages/ManageUsersPage';
import SystemSettingsPage from './pages/SystemSettingsPage'; // System Settings page
import { AdminProfileProvider } from './contexts/AdminProfileContext';

function App() {
  return (
    <AdminProfileProvider>
      <Router>
        <Routes>
          {/* Root path for Dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* /user path for Manage Users */}
          <Route path="/user" element={<ManageUsersPage />} />
          <Route path="/settings" element={<SystemSettingsPage />} />
        </Routes>
      </Router>
    </AdminProfileProvider>
  );
}

export default App;
