import UserSettingsImage from "../../assets/images/settings-header.jpg";
import { Box, Avatar, Button, Stack, Typography, Divider } from "@mui/material";
import ProfileImage from "../../assets/images/profile-photo.jpg";
import AccountForm from "../../components/UserSettings-Forms/AccountForm";
import Passwordchange from "../../components/UserSettings-Forms/Passwordchange";
import PageButton from "../../components/Button/PageButton";
import ResetPwdImage from "../../assets/images/Reset password-bro.png";

const UserSettings: React.FC = () => {
  return (
    <div>
      <Box
        sx={{
          minHeight: "0",
          backgroundColor: "#F6F6F8",
        }}
      >
        <Box>
          <Box
            sx={{
              position: "relative",
              height: 100,
              backgroundImage: `url(${UserSettingsImage})`,
              backgroundSize: "cover",
              backgroundposition: "center",
            }}
          >
            <Avatar
              src={ProfileImage}
              alt="profile-picture"
              sx={{
                width: 110,
                height: 110,
                position: "absolute",
                bottom: -50,
                left: 30,
                border: "4px solid white",
              }}
            />
          </Box>
          <Box sx={{ mt: 2, ml: 25 }}>
            <Stack direction="row" spacing={5}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => alert("Change picture clicked")}
              >
                Change Picture
              </Button>
              <Button
                variant="outlined"
                color="error"
                size="small"
                onClick={() => alert("Picture Deleted")}
              >
                Delete Picture
              </Button>
            </Stack>
          </Box>
          <Typography>
            <h2>Lakshan Rajapaksha</h2>
          </Typography>
        </Box>
        <Divider sx={{ mt: 2 }} />
        <Typography>
          <h2>Profile Settings</h2>
        </Typography>

        <Box
          sx={{
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
            my: 2,
            mx: 5,
            padding: 2,
            height: 380,
          }}
        >
          <Typography sx={{ mb: 1 }}>
            <h3>Account</h3>
          </Typography>
          <AccountForm />
          <PageButton
            text="Save Changes"
            onClick={() => alert("Changes saved!")}
            type={"button"}
          />
        </Box>

        <Box
          sx={{
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
            mt: 2,
            my: 2,
            mx: 5,
            //padding: 2,
            height: 650,
          }}
        >
          <Typography sx={{ ml: 2 }}>
            <h3>Password</h3>
          </Typography>
          <Passwordchange />

          <Box sx={{ borderRadius: "10px", backgroundColor: "#FFFFFF" }}>
            <Box
              component="img"
              src={ResetPwdImage}
              alt="pwd Reset"
              sx={{ maxWidth: "300px", height: "300px", ml: 120 }}
            />
          </Box>

          <PageButton
            text="Save Changes"
            onClick={() => alert("Changes saved!")}
            type={"button"}
          />
        </Box>
      </Box>
    </div>
  );
};

export default UserSettings;
