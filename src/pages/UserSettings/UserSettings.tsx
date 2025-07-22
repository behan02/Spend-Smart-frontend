import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
  ThemeProvider,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

import UserSettingsImage from "../../assets/images/settings-header.jpg";
import ResetPwdImage from "../../assets/images/Reset password-bro.png";

import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/Footer";
import ProfilePictureUpload from "../../components/UserSettings-Forms/ProfilepictureUpload";
import AccountForm from "../../components/UserSettings-Forms/AccountForm";
import Passwordchange, {
  PasswordChangeData,
} from "../../components/UserSettings-Forms/Passwordchange";
import PageButton from "../../components/Button/PageButton";
import { getApiBaseUrl } from "../../Utils/apiUtils";
import {
  passwordService,
  ChangePasswordRequest,
} from "../../Services/passwordService";

interface UserData {
  userId: number;
  name: string;
  email: string;
}

const UserSettings: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(
    theme.breakpoints.down("md" as import("@mui/material/styles").Breakpoint)
  );

  // ✅ FIX: Proper ref type for Avatar (should be HTMLDivElement or remove if not used)
  const fileInputRef = React.useRef<HTMLDivElement>(null);
  const [profileImageUrl, setProfileImageUrl] = useState<string | undefined>(
    undefined
  );

  const API_BASE_URL = getApiBaseUrl();
  const currentUserId = 2;

  const [userData, setUserData] = useState<UserData>({
    userId: 2,
    name: "",
    email: "",
  });

  // Password change state
  const [passwordData, setPasswordData] = useState<PasswordChangeData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordError, setPasswordError] = useState<string>("");
  const [passwordSuccess, setPasswordSuccess] = useState<string>("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    loadProfilePicture();
  }, []);

  const loadProfilePicture = async () => {
    try {
      const url = `${API_BASE_URL}/ProfilePicture/url/${currentUserId}`;
      console.log("Loading profile picture from URL:", url);
      const response = await axios.get(url);
      if (response.data.profilePictureUrl) {
        setProfileImageUrl(response.data.profilePictureUrl);
      }
    } catch (error) {
      console.warn(
        "Could not load profile picture from server, using default:",
        error
      );
      // Gracefully handle the error - don't break the UI
      setProfileImageUrl(undefined);
    }
  };

  const handleProfilePictureUpdate = (newImageUrl: string | null) => {
    setProfileImageUrl(newImageUrl || undefined);
  };

  const handleUpdateSuccess = () => {
    console.log("User data updated successfully!");
  };

  // Password change handlers
  const handlePasswordDataChange = (data: PasswordChangeData) => {
    setPasswordData(data);
    // Clear previous messages when user types
    if (passwordError) setPasswordError("");
    if (passwordSuccess) setPasswordSuccess("");
  };

  const handlePasswordValidationChange = (isValid: boolean) => {
    setIsPasswordValid(isValid);
  };

  const handlePasswordChange = async () => {
    if (!isPasswordValid) {
      setPasswordError("Please fix the validation errors before submitting.");
      return;
    }

    setIsChangingPassword(true);
    setPasswordError("");
    setPasswordSuccess("");

    try {
      const request: ChangePasswordRequest = {
        userId: currentUserId,
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
        confirmPassword: passwordData.confirmPassword,
      };

      console.log("🔐 Attempting password change for user:", currentUserId);
      const response = await passwordService.changePassword(request);

      if (response.success) {
        setPasswordSuccess(
          response.message || "Password changed successfully!"
        );
        // Clear the form
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        console.log("🔐 Password change successful");
      } else {
        setPasswordError(response.message || "Failed to change password.");
        console.log("🔐 Password change failed:", response.message);
      }
    } catch (error) {
      console.error("🔐 Password change error:", error);
      setPasswordError("An unexpected error occurred. Please try again.");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box display="flex" sx={{ margin: 0, padding: 0 }}>
        {!isSmallScreen && <Sidebar />}

        <Box
          flex={1}
          sx={{
            backgroundColor: "#F6F6F8",
            p: 0,
          }}
        >
          <Box
            sx={{
              position: "relative",
              height: 120,
              backgroundImage: `url(${UserSettingsImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: 0,
            }}
          >
            <Avatar
              ref={fileInputRef}
              alt="profile-picture"
              src={profileImageUrl}
              sx={{
                width: 100,
                height: 100,
                position: "absolute",
                bottom: -40,
                left: 24,
                border: "4px solid white",
                backgroundColor: profileImageUrl ? "transparent" : "#e0e0e0",
                color: "#666",
                fontSize: "14px",
              }}
            >
              {!profileImageUrl && "👤"}
            </Avatar>
          </Box>

          <Box sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
            <Box sx={{ mt: 6 }}>
              <ProfilePictureUpload
                onImageUpdate={handleProfilePictureUpdate}
              />
            </Box>

            <Typography variant="h6" mt={2} ml={1}>
              {userData.name}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" mb={2}>
              Profile Settings
            </Typography>

            <Box
              sx={{ borderRadius: 2, backgroundColor: "#FFFFFF", mb: 3, p: 2 }}
            >
              <Typography variant="subtitle1" mb={2}>
                Account
              </Typography>
              <AccountForm
                userId={userData.userId}
                initialName={userData.name}
                initialEmail={userData.email}
                onUpdateSuccess={handleUpdateSuccess}
              />
            </Box>

            <Box
              sx={{ borderRadius: 2, backgroundColor: "#FFFFFF", mb: 3, p: 2 }}
            >
              <Typography variant="subtitle1" mb={2}>
                Password
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 3,
                  alignItems: "flex-start",
                  flexDirection: { xs: "column", lg: "row" },
                  minHeight: { lg: "350px" },
                }}
              >
                <Box
                  sx={{
                    flex: { xs: 1, lg: "1 1 60%" },
                    minWidth: { lg: "400px" },
                  }}
                >
                  <Passwordchange
                    onPasswordDataChange={handlePasswordDataChange}
                    onValidationChange={handlePasswordValidationChange}
                    error={passwordError}
                    success={passwordSuccess}
                  />
                </Box>

                <Box
                  sx={{
                    flex: { xs: 1, lg: "1 1 40%" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: {
                      xs: "200px",
                      sm: "250px",
                      md: "300px",
                      lg: "350px",
                    },
                    width: "100%",
                  }}
                >
                  <Box
                    component="img"
                    src={ResetPwdImage}
                    alt="pwd Reset"
                    sx={{
                      width: "100%",
                      maxWidth: { xs: 250, sm: 300, md: 350, lg: 400 },
                      height: 350,
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>

              <PageButton
                text={isChangingPassword ? "Changing..." : "Save Changes"}
                onClick={handlePasswordChange}
                type="button"
                disabled={!isPasswordValid || isChangingPassword}
                startIcon={
                  isChangingPassword ? (
                    <CircularProgress size={16} color="inherit" />
                  ) : undefined
                }
              />
            </Box>
          </Box>

          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserSettings;
