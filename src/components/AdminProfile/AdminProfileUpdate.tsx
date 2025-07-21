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
  currentPassword: string;
}

interface AdminProfileUpdateProps {
  adminId?: number;
}

interface EmailVerificationResponse {
  success: boolean;
  emailVerificationRequired?: boolean;
  pendingEmail?: string;
  message: string;
}

type MessageType = 'success' | 'error' | 'warning' | '';

const AdminProfileUpdate: React.FC<AdminProfileUpdateProps> = ({ adminId = 1 }) => {
  // State = Like temporary memory to hold form data
  const [adminData, setAdminData] = useState<AdminData>({
    name: '',
    email: '',
    password: '',
    currentPassword: ''
  });

  // Loading state = Show spinner while waiting for server response
  const [loading, setLoading] = useState<boolean>(false);
  
  // Message state = Show success or error messages to user
  const [message, setMessage] = useState<string>('');
  const [messageType, setMessageType] = useState<MessageType>(''); // 'success' or 'error'

  // Email verification states
  const [emailVerificationPending, setEmailVerificationPending] = useState<boolean>(false);
  const [pendingEmail, setPendingEmail] = useState<string>('');
  const [currentEmail, setCurrentEmail] = useState<string>('');

  // useEffect = Runs when component first loads (like page load)
  useEffect(() => {
    loadAdminData();
    checkEmailVerificationStatus();
  }, [adminId]);

  // Function to check email verification status
  const checkEmailVerificationStatus = async (): Promise<void> => {
    try {
      const response = await fetch(`http://localhost:5110/api/AdminProfile/${adminId}/email-status`);
      if (response.ok) {
        const statusData = await response.json();
        setCurrentEmail(statusData.currentEmail);
        setPendingEmail(statusData.pendingEmail || '');
        setEmailVerificationPending(statusData.hasPendingVerification);
        
        if (statusData.hasPendingVerification) {
          setMessage(`Email verification pending for: ${statusData.pendingEmail}`);
          setMessageType('warning');
        }
      }
    } catch (error) {
      console.error('Error checking email verification status:', error);
    }
  };

  // Function to load current admin data from backend
  const loadAdminData = async (): Promise<void> => {
    try {
      console.log('Loading admin data...'); // For debugging
      const adminInfo = await adminApi.getAdmin(adminId);
      
      // Fill the form with existing data
      setAdminData({
        name: adminInfo.name || '',
        email: adminInfo.email || '',
        password: '', // Never show password for security
        currentPassword: '' // Always empty for security
      });
      
      setCurrentEmail(adminInfo.email || '');
      console.log('Admin data loaded successfully:', adminInfo);
    } catch (error) {
      console.error('Error loading admin data:', error);
      setMessage('Failed to load admin information');
      setMessageType('error');
    }
  };

  // Function to handle form submission - ENHANCED FOR EMAIL VERIFICATION
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
      
      // Only include current password and new password if password is being changed
      const isPasswordChanging = adminData.password && adminData.password.trim() !== '';
      
      if (isPasswordChanging) {
        if (!adminData.currentPassword || adminData.currentPassword.trim() === '') {
          setMessage('Current password is required to change password');
          setMessageType('error');
          setLoading(false);
          return;
        }
        updatePayload.currentPassword = adminData.currentPassword;
        updatePayload.password = adminData.password;
      }
      
      // Call the backend API to update admin
      const response = await fetch(`http://localhost:5110/api/AdminProfile/${adminId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatePayload)
      });

      const responseData = await response.json();

      if (response.ok) {
        // Check if email verification is required
        if (responseData.emailVerificationRequired) {
          setMessage(responseData.message);
          setMessageType('warning');
          setPendingEmail(responseData.pendingEmail);
          setEmailVerificationPending(true);
          
          // Keep the form showing current email, not the pending one
          setAdminData(prev => ({ 
            ...prev, 
            email: currentEmail, // Revert to current email
            password: '',
            currentPassword: '' // Clear current password
          }));
        } else {
          // Normal update success
          setMessage('Admin profile updated successfully!');
          setMessageType('success');
          
          // Clear password field after successful update
          setAdminData(prev => ({ 
            ...prev, 
            password: '',
            currentPassword: ''
          }));
        }
      } else {
        // Handle error response
        setMessage(responseData.message || 'Failed to update admin profile. Please try again.');
        setMessageType('error');
      }
      
      console.log('Admin update response:', responseData);
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
    checkEmailVerificationStatus();
    setMessage('Admin data refreshed');
    setMessageType('success');
  };

  // Function to resend email verification
  const handleResendVerification = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5110/api/AdminProfile/${adminId}/resend-verification`, {
        method: 'POST'
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage(responseData.message);
        setMessageType('success');
      } else {
        setMessage(responseData.message || 'Failed to resend verification email');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error resending verification:', error);
      setMessage('Failed to resend verification email');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  // Function to cancel email change
  const handleCancelEmailChange = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5110/api/AdminProfile/${adminId}/cancel-email-change`, {
        method: 'DELETE'
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage(responseData.message);
        setMessageType('success');
        setEmailVerificationPending(false);
        setPendingEmail('');
        await loadAdminData(); // Refresh admin data
      } else {
        setMessage(responseData.message || 'Failed to cancel email change');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error canceling email change:', error);
      setMessage('Failed to cancel email change');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
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
          
          {/* Email Verification Status */}
          {emailVerificationPending && pendingEmail && (
            <div className="email-verification-status">
              <div className="verification-info">
                <small className="help-text verification-pending">
                  ⏳ <strong>Email change pending:</strong> {pendingEmail}
                  <br />
                  Please check your email and click the verification link.
                </small>
              </div>
              <div className="verification-actions">
                <button 
                  type="button" 
                  onClick={handleResendVerification}
                  disabled={loading}
                  className="resend-btn"
                >
                  📧 Resend Verification
                </button>
                <button 
                  type="button" 
                  onClick={handleCancelEmailChange}
                  disabled={loading}
                  className="cancel-btn"
                >
                  ❌ Cancel Change
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Current Password Input */}
        <div className="form-group">
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={adminData.currentPassword}
            onChange={handleChange}
            placeholder="Enter your current password"
            disabled={loading}
          />
          <small className="help-text">
            Required only when changing password
          </small>
        </div>

        {/* New Password Input */}
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
