// This component creates a form for updating admin profile information
// Now connected to your SpendSmart backend API with TypeScript types!

import React, { useState, useEffect } from 'react';
import { adminApi } from '../../services/adminApi';
import './AdminProfileUpdate.css';

// TypeScript interfaces for type safety
interface AdminData {
  name: string;
  email: string;
  password: string;
}

interface AdminProfileUpdateProps {
  adminId?: number;
}

type MessageType = 'success' | 'error' | '';

const AdminProfileUpdate: React.FC<AdminProfileUpdateProps> = ({ adminId = 1 }) => {
  // State = Like temporary memory to hold form data
  const [adminData, setAdminData] = useState<AdminData>({
    name: '',
    email: '',
    password: ''
  });

  // Loading state = Show spinner while waiting for server response
  const [loading, setLoading] = useState<boolean>(false);
  
  // Message state = Show success or error messages to user
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<MessageType>(''); // 'success' or 'error'

  // useEffect = Runs when component first loads (like page load)
  useEffect(() => {
    loadAdminData();
  }, [adminId]);

  // Function to load current admin data from backend
  const loadAdminData = async (): Promise<void> => {
    try {
      console.log('Loading admin data...'); // For debugging
      const adminInfo = await adminApi.getAdmin(adminId);
      
      // Fill the form with existing data
      setAdminData({
        name: adminInfo.name || '',
        email: adminInfo.email || '',
        password: '' // Never show password for security
      });
      
      console.log('Admin data loaded successfully:', adminInfo);
    } catch (error) {
      console.error('Error loading admin data:', error);
      setMessage('Failed to load admin information');
      setMessageType('error');
    }
  };

  // Function to handle form submission - OPTIMIZED FOR PERFORMANCE
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault(); // Prevent page refresh
    
    // Basic validation
    if (!adminData.name || !adminData.email) {
      setMessage('Name and email are required');
      setMessageType('error');
      return;
    }

    setLoading(true); // Show loading spinner
    setMessage(''); // Clear previous messages

    try {
      console.log('Updating admin with data:', adminData);
      
      // PERFORMANCE FIX: Only send data that might have changed
      // Construct update payload more efficiently
      const updatePayload: any = {
        name: adminData.name,
        email: adminData.email
      };
      
      // Only include password fields if password is being changed
      if (adminData.password && adminData.password.trim() !== '') {
        updatePayload.password = adminData.password;
        // Note: In a real app, you'd also need currentPassword for security
      }
      
      // Call the backend API to update admin
      await adminApi.updateAdmin(adminId, updatePayload);
      
      // Show success message
      setMessage('Admin profile updated successfully!');
      setMessageType('success');
      
      // Clear password field after successful update
      setAdminData(prev => ({ ...prev, password: '' }));
      
      console.log('Admin updated successfully');
    } catch (error) {
      console.error('Error updating admin:', error);
      setMessage('Failed to update admin profile. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  // Function to handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    
    // Update the form data
    setAdminData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear messages when user starts typing
    if (message) {
      setMessage('');
      setMessageType('');
    }
  };

  // Function to refresh/reload admin data
  const handleRefresh = (): void => {
    loadAdminData();
    setMessage('Admin data refreshed');
    setMessageType('success');
  };

  return (
    <div className="admin-profile-update">
      <div className="form-header">
        <h2>Update Admin Profile</h2>
        <button 
          onClick={handleRefresh} 
          className="refresh-btn"
          type="button"
        >
          🔄 Refresh Data
        </button>
      </div>

      {/* Show messages to user */}
      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="admin-form">
        {/* Name Input */}
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={adminData.name}
            onChange={handleChange}
            required
            placeholder="Enter admin name"
            disabled={loading}
          />
        </div>

        {/* Email Input */}
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={adminData.email}
            onChange={handleChange}
            required
            placeholder="Enter admin email"
            disabled={loading}
          />
        </div>

        {/* Password Input */}
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={adminData.password}
            onChange={handleChange}
            placeholder="Leave blank to keep current password"
            disabled={loading}
          />
          <small className="help-text">
            Only enter a password if you want to change it
          </small>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button 
            type="submit" 
            disabled={loading}
            className="submit-btn"
          >
            {loading ? (
              <>
                <span className="spinner">⏳</span>
                Updating...
              </>
            ) : (
              'Update Profile'
            )}
          </button>
        </div>
      </form>

      {/* Debug Info (remove in production) */}
      <div className="debug-info">
        <h4>Debug Information:</h4>
        <p><strong>Admin ID:</strong> {adminId}</p>
        <p><strong>Backend URL:</strong> http://localhost:5110/api/AdminProfile</p>
        <p><strong>Current Data:</strong> {JSON.stringify(adminData, null, 2)}</p>
      </div>
    </div>
  );
};

export default AdminProfileUpdate;
