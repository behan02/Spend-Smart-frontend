import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography, Switch, FormControlLabel, Select, MenuItem, Button, TextField, Avatar, Stack, Alert } from '@mui/material';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';
import MonthlyReportCard from '../components/MonthlyReportCard/MonthlyReportCard';
import { adminApi } from '../services/adminApi';
import { useAdminProfile } from '../contexts/AdminProfileContext';

const SystemSettingsPage = () => {
  const { profilePictureUrl, updateProfilePicture, loadAdminProfile } = useAdminProfile();
  
  // State for admin profile form
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Separate state for name update input (empty by default)
  const [nameUpdateInput, setNameUpdateInput] = useState('');
  
  // Separate state for email update input (empty by default)
  const [emailUpdateInput, setEmailUpdateInput] = useState('');
  
  // Additional clean email state to force fresh input
  const [cleanEmailInput, setCleanEmailInput] = useState('');
  
  const [currentAdminId, setCurrentAdminId] = useState<number | null>(null); // Track which admin we're working with
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  
  // Email verification states
  const [emailVerificationPending, setEmailVerificationPending] = useState(false);
  const [pendingEmail, setPendingEmail] = useState('');
  
  // Profile picture state (now using context)
  // const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null); // Removed - using context
  const [uploadingPicture, setUploadingPicture] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load admin data when component mounts
  useEffect(() => {
    // Reset all form fields when component mounts (including navigation)
    console.log('SystemSettings: Resetting form fields on mount');
    setAdminData(prev => ({
      ...prev,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }));
    setNameUpdateInput('');
    setEmailUpdateInput('');
    setCleanEmailInput(''); // Clear the clean email input too
    setMessage('');
    setMessageType('');
    
    loadAdminData(); // Re-enabled automatic loading
  }, []);

  // Additional effect to ensure email field is cleared when admin data changes
  useEffect(() => {
    if (currentAdminId) {
      console.log('SystemSettings: Admin ID changed, clearing email input');
      setEmailUpdateInput('');
      setNameUpdateInput('');
      setCleanEmailInput(''); // Clear clean email too
      
      // Force a second clear after a small delay to handle any async state updates
      setTimeout(() => {
        console.log('SystemSettings: Force clearing email input again');
        setEmailUpdateInput('');
        setNameUpdateInput('');
        setCleanEmailInput(''); // Clear clean email too
      }, 200);
    }
  }, [currentAdminId]);

  // Force clear email field whenever adminData.email changes - DISABLED FOR EMAIL VERIFICATION
  // useEffect(() => {
  //   console.log('SystemSettings: Admin email loaded, ensuring update field stays empty');
  //   setEmailUpdateInput('');
  //   setCleanEmailInput(''); // Clear clean email too
  // }, [adminData.email]);

  const loadAdminData = async () => {
    try {
      // First, get all admins to find the first available one
      const allAdmins = await adminApi.getAllAdmins();
      
      if (allAdmins.length === 0) {
        setMessage('No admin found. Please create an admin first.');
        setMessageType('error');
        return;
      }

      // Use the first admin found
      const firstAdmin = allAdmins[0];
      setCurrentAdminId(firstAdmin.id);
      
      // Load the admin's data
      const adminInfo = await adminApi.getAdmin(firstAdmin.id);
      setAdminData(prev => ({
        ...prev,
        name: adminInfo.name || '',
        email: adminInfo.email || '',
        // Explicitly keep password fields empty
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      // Profile picture is automatically loaded by the context
    } catch (error: any) {
      console.error('Error loading admin data:', error);
      console.error('Error details:', error.response?.data || error.message);
      setMessage(`Failed to load admin information: ${error.response?.status || 'Network Error'}`);
      setMessageType('error');
    }
  };

  // Function to load profile picture
  const loadProfilePicture = async (adminId: number) => {
    try {
      const profilePicture = await adminApi.getProfilePicture(adminId);
      updateProfilePicture(profilePicture.base64Image || null);
    } catch (error) {
      // No profile picture exists - this is normal
      updateProfilePicture(null);
    }
  };

  // Function to handle picture upload
  const handleChangePicture = () => {
    fileInputRef.current?.click();
  };

  // Function to handle file selection
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentAdminId) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      setMessage('Invalid file type. Only JPEG, PNG, and WebP images are allowed.');
      setMessageType('error');
      return;
    }

    // Validate file size (2MB max instead of 5MB for better performance)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      setMessage('File size too large. Maximum size is 2MB.');
      setMessageType('error');
      return;
    }

    try {
      setUploadingPicture(true);
      
      // Create local preview immediately for better UX
      const localImageUrl = URL.createObjectURL(file);
      updateProfilePicture(localImageUrl);
      
      // Check if profile picture already exists
      const hasExistingPicture = profilePictureUrl !== null;
      
      if (hasExistingPicture) {
        await adminApi.updateProfilePicture(currentAdminId, file);
        setMessage('Profile picture updated successfully!');
      } else {
        await adminApi.uploadProfilePicture(currentAdminId, file);
        setMessage('Profile picture uploaded successfully!');
      }
      
      setMessageType('success');
      
      // Refresh the context to get the latest profile picture from backend
      await loadAdminProfile();
      
      // Clean up the temporary object URL
      URL.revokeObjectURL(localImageUrl);
      
    } catch (error: any) {
      console.error('Upload error:', error);
      const errorMessage = error.response?.data?.error || 'Failed to upload profile picture. Please try again.';
      setMessage(errorMessage);
      setMessageType('error');
      
      // Reload the actual picture on error to reset state
      if (currentAdminId) {
        await loadProfilePicture(currentAdminId);
      }
    } finally {
      setUploadingPicture(false);
      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Function to handle picture deletion
  const handleDeletePicture = async () => {
    if (!currentAdminId || !profilePictureUrl) return;

    const confirmDelete = window.confirm('Are you sure you want to delete your profile picture?');
    if (!confirmDelete) return;

    try {
      setUploadingPicture(true);
      await adminApi.deleteProfilePicture(currentAdminId);
      
      // Refresh the context to update the profile picture globally
      await loadAdminProfile();
      
      setMessage('Profile picture deleted successfully!');
      setMessageType('success');
    } catch (error: any) {
      console.error('Delete error:', error);
      const errorMessage = error.response?.data?.error || 'Failed to delete profile picture. Please try again.';
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setUploadingPicture(false);
    }
  };

  const handleInputChange = (field: string) => (event: any) => {
    setAdminData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    // Clear messages when user starts typing
    if (message) {
      setMessage('');
      setMessageType('');
    }
  };

  const handleSave = async () => {
    // Check if admin ID is available
    if (!currentAdminId) {
      setMessage('No admin selected. Please refresh the page.');
      setMessageType('error');
      return;
    }

    // Check if there are any changes to make
    const isChangingName = nameUpdateInput.trim() !== '';
    const isChangingEmail = cleanEmailInput.trim() !== '';
    const isChangingPassword = !!adminData.newPassword;
    
    if (!isChangingName && !isChangingEmail && !isChangingPassword) {
      setMessage('No changes to save');
      setMessageType('error');
      return;
    }

    if (adminData.newPassword && adminData.newPassword !== adminData.confirmPassword) {
      setMessage('New passwords do not match');
      setMessageType('error');
      return;
    }

    // Security validation: Require current password only for password changes
    if (isChangingPassword && !adminData.currentPassword) {
      setMessage('Current password is required when changing password');
      setMessageType('error');
      return;
    }

    setLoading(true);
    try {
      // PERFORMANCE FIX: Build update data without fetching current admin data
      // Use existing state data instead of making an extra API call
      const updateData = {
        name: isChangingName ? nameUpdateInput.trim() : adminData.name,
        email: isChangingEmail ? cleanEmailInput.trim() : adminData.email,
        ...(isChangingPassword && adminData.currentPassword && { currentPassword: adminData.currentPassword }),
        ...(adminData.newPassword && { password: adminData.newPassword })
      };

      // Single API call - now handles email verification response
      const response = await adminApi.updateAdmin(currentAdminId, updateData);
      
      // Check if email verification is required
      if (response.emailVerificationRequired) {
        setEmailVerificationPending(true);
        setPendingEmail(response.pendingEmail || cleanEmailInput.trim());
        setMessage(`Email verification sent to ${response.pendingEmail || cleanEmailInput.trim()}. Please check your email to verify the new address.`);
        setMessageType('info');
      } else {
        setMessage(response.message || 'Admin profile updated successfully!');
        setMessageType('success');
        
        // Update displayed name and email if they were changed (only if no verification required)
        if (isChangingName) {
          setAdminData(prev => ({
            ...prev,
            name: nameUpdateInput.trim()
          }));
        }
        
        if (isChangingEmail) {
          setAdminData(prev => ({
            ...prev,
            email: cleanEmailInput.trim()
          }));
        }
      }
      
      // Clear form fields after successful update (only if no verification pending)
      if (!response.emailVerificationRequired) {
        setNameUpdateInput(''); // Clear name update input
        setEmailUpdateInput(''); // Clear email update input
        setCleanEmailInput(''); // Clear clean email input
      }
      setAdminData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    } catch (error: any) {
      console.error('Error updating admin:', error);
      console.error('Full error details:', error.response?.data || error.message);
      console.error('Status code:', error.response?.status);
      
      let errorMessage = 'Failed to update admin profile. Please try again.';
      if (error.response?.status === 404) {
        errorMessage = 'Admin not found. Please create an admin first.';
      } else if (error.response?.status === 400) {
        // Handle specific validation errors from backend
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else {
          errorMessage = 'Invalid data provided. Please check your input.';
        }
      }
      
      setMessage(errorMessage);
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9f9f9' }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
        <Topbar />
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>

          {/* System Maintenance */}
          <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: 3, mb: 4}}>
            <Typography variant="h6" gutterBottom>System Maintenance</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Enable maintenance mode to temporarily restrict user access while performing system updates.
            </Typography>
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Enable Maintenance Mode"
            />
          </Box>

                   {/* Monthly Report Generation */}
          <MonthlyReportCard onReportGenerated={(data) => console.log('Report generated:', data)} />

          {/* Profile Settings - Now Connected to Backend! */}
          <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: 3 }}>
            <Typography variant="h6" gutterBottom>Admin Profile Settings</Typography>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
              Update your admin profile information
            </Typography>

            {/* Show success/error messages */}
            {message && (
              <Alert severity={messageType === 'success' ? 'success' : 'error'} sx={{ mb: 2 }}>
                {message}
              </Alert>
            )}

            {/* Profile Header with Name Display */}
            <Stack spacing={2} sx={{ mb: 3 }}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  alt="Admin User"
                  src={profilePictureUrl || "https://i.pravatar.cc/150?img=3"}
                  sx={{ width: 80, height: 80 }}
                />
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#333' }}>
                  {adminData.name || 'Loading...'}
                </Typography>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleChangePicture}
                  disabled={uploadingPicture}
                >
                  {uploadingPicture ? 'Uploading...' : 'Change Picture'}
                </Button>
                <Button 
                  variant="contained" 
                  color="error" 
                  onClick={handleDeletePicture}
                  disabled={uploadingPicture || !profilePictureUrl}
                >
                  Delete Picture
                </Button>
              </Stack>
              
              {/* Hidden file input for picture upload */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/jpeg,image/jpg,image/png,image/webp"
                style={{ display: 'none' }}
              />
            </Stack>

            <Stack spacing={3}>
              <TextField 
                key={`name-update-${currentAdminId}`}
                fullWidth 
                label="Update Admin Name" 
                variant="outlined" 
                value={nameUpdateInput}
                onChange={(e) => {
                  setNameUpdateInput(e.target.value);
                  // Clear messages when user starts typing
                  if (message) {
                    setMessage('');
                    setMessageType('');
                  }
                }}
                disabled={loading}
                placeholder="Enter new admin name..."
              />
              <TextField 
                key={`email-update-clean-${Date.now()}`}
                fullWidth 
                label="Update Email Address" 
                variant="outlined" 
                type="email"
                value={cleanEmailInput}
                defaultValue=""
                onChange={(e) => {
                  setCleanEmailInput(e.target.value);
                  setEmailUpdateInput(e.target.value); // Keep both in sync
                  // Clear messages when user starts typing
                  if (message) {
                    setMessage('');
                    setMessageType('');
                  }
                }}
                disabled={loading}
                placeholder="Enter new email address..."
                inputProps={{
                  autoComplete: 'new-email',
                  'data-form-type': 'other'
                }}
              />
              
              {/* Email Verification Status */}
              {emailVerificationPending && (
                <Alert severity="info" sx={{ mt: 1 }}>
                  Email verification pending for: <strong>{pendingEmail}</strong>
                  <br />
                  Please check your email to verify the new address.
                </Alert>
              )}
              
              <TextField 
                fullWidth 
                label="Current Password" 
                variant="outlined" 
                type="password"
                value={adminData.currentPassword}
                onChange={handleInputChange('currentPassword')}
                disabled={loading}
              />
              <TextField 
                fullWidth 
                label="New Password" 
                variant="outlined" 
                type="password"
                value={adminData.newPassword}
                onChange={handleInputChange('newPassword')}
                disabled={loading}
              />
              <TextField 
                fullWidth 
                label="Re-enter New Password" 
                variant="outlined" 
                type="password"
                value={adminData.confirmPassword}
                onChange={handleInputChange('confirmPassword')}
                disabled={loading}
              />
              <Box textAlign="right">
                <Button 
                  variant="contained" 
                  sx={{ mt: 2, px: 5, py: 1.5 }} 
                  color="primary"
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? 'Saving to Database...' : 'Save Admin Profile'}
                </Button>
              </Box>
            </Stack>

          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default SystemSettingsPage;
