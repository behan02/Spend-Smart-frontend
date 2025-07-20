import React, { useState } from 'react';
import { userService } from '../../Services/userService';

interface AccountFormProps {
  userId: number;
  initialName?: string;
  initialEmail?: string;
  onUpdateSuccess?: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({
  userId,
  initialName = '',
  initialEmail = '',
  onUpdateSuccess
}) => {
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [nameLoading, setNameLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [nameMessage, setNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  const handleUpdateName = async () => {
    if (!name.trim()) {
      setNameMessage('Name cannot be empty');
      return;
    }

    setNameLoading(true);
    setNameMessage('');

    try {
      const result = await userService.updateUserName({
        userId,
        userName: name.trim()
      });

      if (result.success) {
        setNameMessage('Name updated successfully!');
        onUpdateSuccess?.();
      }
    } catch (error: any) {
      setNameMessage('Failed to update name: ' + error.message);
    } finally {
      setNameLoading(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!email.trim()) {
      setEmailMessage('Email cannot be empty');
      return;
    }

    setEmailLoading(true);
    setEmailMessage('');

    try {
      const result = await userService.updateUserEmail({
        userId,
        email: email.trim()
      });

      if (result.success) {
        setEmailMessage('Email updated successfully!');
        onUpdateSuccess?.();
      }
    } catch (error: any) {
      setEmailMessage('Failed to update email: ' + error.message);
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div>
      {/* Name Section */}
      <div style={{ marginBottom: '20px' }}>
        <label>Name</label>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            disabled={nameLoading}
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              flex: 1
            }}
          />
          <button
            onClick={handleUpdateName}
            disabled={nameLoading || !name.trim()}
            style={{
              padding: '8px 16px',
              backgroundColor: nameLoading ? '#ccc' : '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: nameLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {nameLoading ? 'Updating...' : 'Update'}
          </button>
        </div>
        {nameMessage && (
          <div style={{
            marginTop: '5px',
            fontSize: '14px',
            color: nameMessage.includes('successfully') ? 'green' : 'red'
          }}>
            {nameMessage}
          </div>
        )}
      </div>

      {/* Email Section */}
      <div style={{ marginBottom: '20px' }}>
        <label>Email</label>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            disabled={emailLoading}
            style={{
              padding: '8px 12px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              flex: 1
            }}
          />
          <button
            onClick={handleUpdateEmail}
            disabled={emailLoading || !email.trim()}
            style={{
              padding: '8px 16px',
              backgroundColor: emailLoading ? '#ccc' : '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: emailLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {emailLoading ? 'Updating...' : 'Update'}
          </button>
        </div>
        {emailMessage && (
          <div style={{
            marginTop: '5px',
            fontSize: '14px',
            color: emailMessage.includes('successfully') ? 'green' : 'red'
          }}>
            {emailMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountForm;