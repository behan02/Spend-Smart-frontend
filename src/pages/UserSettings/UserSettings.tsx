import React from "react";
import {
  Box,
  Avatar,
  Typography,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import UserSettingsImage from "../../assets/images/settings-header.jpg";
import ProfileImage from "../../assets/images/profile-photo.jpg";
import ResetPwdImage from "../../assets/images/Reset password-bro.png";

import Sidebar from "../../components/sidebar/sidebar";
import ProfilePictureUpload from "../../components/UserSettings-Forms/ProfilepictureUpload";
import AccountForm from "../../components/UserSettings-Forms/AccountForm";
import Passwordchange from "../../components/UserSettings-Forms/Passwordchange";
import CurrencySelector from "../../components/UserSettings-Forms/Addcurencyform";
import PageButton from "../../components/Button/PageButton";

const UserSettings: React.FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = React.useState<string | undefined>(
    ProfileImage
  );

  return (
    <Box display="flex">
      {/* Sidebar */}
      {!isSmallScreen && <Sidebar />}

      {/* Main content */}
      <Box
        flex={1}
        sx={{
          backgroundColor: "#F6F6F8",
          p: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {/* Header with Background Image */}
        <Box
          sx={{
            position: "relative",
            height: 120,
            backgroundImage: `url(${UserSettingsImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
          }}
        >
          <Avatar
            ref={fileInputRef}
            alt="profile-picture"
            src={profileImage}
            sx={{
              width: 100,
              height: 100,
              position: "absolute",
              bottom: -40,
              left: 24,
              border: "4px solid white",
            }}
          />
        </Box>

        {/* Profile Upload */}
        <Box sx={{ mt: 6 }}>
          <ProfilePictureUpload />
        </Box>

        {/* User name */}
        <Typography variant="h6" mt={2} ml={1}>
          Lakshan Rajapaksha
        </Typography>

        {/* Divider */}
        <Divider sx={{ my: 2 }} />

        {/* Profile Settings Heading */}
        <Typography variant="h6" mb={2}>
          Profile Settings
        </Typography>

        {/* Account Section */}
        <Box
          sx={{
            borderRadius: 2,
            backgroundColor: "#FFFFFF",
            mb: 3,
            p: 2,
          }}
        >
          <Typography variant="subtitle1" mb={2}>
            Account
          </Typography>
          <AccountForm />
          <PageButton
            text="Save Changes"
            onClick={() => alert("Changes saved!")}
            type="button"
          />
        </Box>

        {/* Password Section */}
        <Box
          sx={{
            borderRadius: 2,
            backgroundColor: "#FFFFFF",
            mb: 3,
            p: 2,
          }}
        >
          <Typography variant="subtitle1" mb={2}>
            Password
          </Typography>
          <Passwordchange />

          <Box
            component="img"
            src={ResetPwdImage}
            alt="pwd Reset"
            sx={{
              width: "100%",
              maxWidth: 250,
              height: "auto",
              mx: "auto",
              my: 4,
              display: "block",
            }}
          />

          <PageButton
            text="Save Changes"
            onClick={() => alert("Password updated!")}
            type="button"
          />
        </Box>

        {/* Currency Section */}
        <Box
          sx={{
            borderRadius: 2,
            backgroundColor: "#FFFFFF",
            p: 2,
            mb: 4,
          }}
        >
          <Typography variant="subtitle1" mb={1}>
            Currencies
          </Typography>
          <Typography variant="body2" mb={2}>
            Add a new currency
          </Typography>
          <CurrencySelector />
        </Box>
      </Box>
    </Box>
  );
};

export default UserSettings;
