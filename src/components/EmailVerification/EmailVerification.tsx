import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EmailVerification.css';

interface VerificationResult {
  success: boolean;
  message: string;
}

const EmailVerification: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<VerificationResult | null>(null);

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    } else {
      setResult({
        success: false,
        message: 'Invalid verification link. No token provided.'
      });
      setLoading(false);
    }
  }, [token]);

  const verifyEmail = async (verificationToken: string) => {
    try {
      const response = await fetch(`http://localhost:5110/api/AdminProfile/verify-email/${verificationToken}`);
      const data = await response.json();

      if (response.ok) {
        setResult({
          success: true,
          message: data.message || 'Email verified successfully!'
        });
      } else {
        setResult({
          success: false,
          message: data.message || 'Email verification failed.'
        });
      }
    } catch (error) {
      console.error('Verification error:', error);
      setResult({
        success: false,
        message: 'Network error. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBackToSettings = () => {
    navigate('/settings');
  };

  if (loading) {
    return (
      <div className="email-verification-page">
        <div className="verification-container">
          <div className="loading-spinner">⏳</div>
          <h2>Verifying your email...</h2>
          <p>Please wait while we verify your email address.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="email-verification-page">
      <div className="verification-container">
        <div className={`verification-result ${result?.success ? 'success' : 'error'}`}>
          <div className="icon">
            {result?.success ? '✅' : '❌'}
          </div>
          <h2>{result?.success ? 'Email Verified!' : 'Verification Failed'}</h2>
          <p>{result?.message}</p>
          
          {result?.success && (
            <div className="success-details">
              <p>Your email address has been successfully updated!</p>
              <p>You can now use your new email address to access the admin panel.</p>
            </div>
          )}
          
          <div className="action-buttons">
            <button 
              onClick={handleBackToSettings}
              className="back-btn"
            >
              Back to Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
