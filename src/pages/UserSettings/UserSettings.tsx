import UserSettingsImage from "../../assets/images/settings-header.jpg";
import { Box } from "@mui/material";
import ProfileImage from "../../assets/images/profile-photo.jpg";

const UserSettings: React.FC = () => {
  return (
    <div>
      <Box>
        <img
          src={UserSettingsImage}
          alt="settings"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "100px",
            objectFit: "cover",
          }}
        />

        <img
          src={ProfileImage}
          alt="Profile picture"
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
          }}
        />
      </Box>

      <h1>User Settings</h1>
      <p>This is your user settings page</p>
    </div>
  );
};

export default UserSettings;
