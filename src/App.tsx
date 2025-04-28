import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'; // Dashboard page
import ManageUsersPage from './pages/ManageUsersPage';
import SystemSettingsPage from './pages/SystemSettingsPage'; // <- ADD THIS // Manage Users page

function App() {
  return (
    <Router>
      <Routes>
        {/* Root path for Dashboard */}
        <Route path="/" element={<Dashboard />} />

        {/* /user path for Manage Users */}
        <Route path="/user" element={<ManageUsersPage />} />
        <Route path="/settings" element={<SystemSettingsPage />} /> {/* <- ADD THIS */}
      </Routes>
    </Router>
  );
}

export default App;
