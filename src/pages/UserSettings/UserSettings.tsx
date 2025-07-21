import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
  ThemeProvider,
} from "@mui/material";
import axios from "axios";

import UserSettingsImage from "../../assets/images/settings-header.jpg";
import ResetPwdImage from "../../assets/images/Reset password-bro.png";

import Sidebar from "../../components/sidebar/sidebar";
import Footer from "../../components/footer/Footer";
import ProfilePictureUpload from "../../components/UserSettings-Forms/ProfilepictureUpload";
import AccountForm from "../../components/UserSettings-Forms/AccountForm";
import Passwordchange from "../../components/UserSettings-Forms/Passwordchange";
import PageButton from "../../components/Button/PageButton";

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

  const API_BASE_URL = "https://localhost:7211/api";
  const currentUserId = 1;

  const [userData, setUserData] = useState<UserData>({
    userId: 1, // TEMPORARY: Changed from 8 to 1 to match currentUserId used for profile picture
    name: "",
    email: "",
  });

  useEffect(() => {
    loadProfilePicture();
  }, []);

  const loadProfilePicture = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/ProfilePicture/url/${currentUserId}`
      );
      if (response.data.profilePictureUrl) {
        setProfileImageUrl(response.data.profilePictureUrl);
      }
    } catch (error) {
      console.error("Error loading profile picture:", error);
    }
  };

  const handleProfilePictureUpdate = (newImageUrl: string | null) => {
    setProfileImageUrl(newImageUrl || undefined);
  };

  const handleUpdateSuccess = async () => {
    console.log("User data updated successfully!");
    // TODO: In a real app, you would fetch updated user data from API
    // For now, we'll let the AccountForm handle the email display update
    // through its internal state management and the URL parameter handling
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
                  {/* TEMPORARY: Pass userId = 1 for development (same as currentUserId used for profile picture) */}
                  <Passwordchange userId={1} />
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

              {/* Remove duplicate Save Changes button - Passwordchange component has its own submit button */}
              {/* <PageButton
                text="Save Changes"
                onClick={() => alert("Password updated!")}
                type="button"
              /> */}
            </Box>
          </Box>

          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default UserSettings;
