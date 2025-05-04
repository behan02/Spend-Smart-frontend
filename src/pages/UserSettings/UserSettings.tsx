import UserSettingsImage from "../../assets/images/settings-header.jpg";
import { Box, Avatar, Button, Stack, Typography, Divider } from "@mui/material";
import ProfileImage from "../../assets/images/profile-photo.jpg";
import AccountForm from "../../components/UserSettings-Forms/AccountForm";
import Passwordchange from "../../components/UserSettings-Forms/Passwordchange";
import PageButton from "../../components/Button/PageButton";
import ResetPwdImage from "../../assets/images/Reset password-bro.png";
import CurrencySelector from "../../components/UserSettings-Forms/Addcurencyform";
import Sidebar from "../../components/sidebar/sidebar";

const UserSettings: React.FC = () => {
  return (
    
    <div>
      <Sidebar/>
      <Box
        sx={{
          minHeight: "0",
          backgroundColor: "#F6F6F8",
          ml: 34,
          mt: -141,
          mr: -1
        
        }}
      >
        <Box>
          <Box
            sx={{
              position: "relative",
              height: 100,
              backgroundImage: `url(${UserSettingsImage})`,    //Header Image
              backgroundSize: "cover",
              backgroundposition: "center",
              width: "100%",
            }}
          >
            
            <Avatar
              src={ProfileImage}       //Profile Image
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
            height: 380, //Acount form box
          }}
        >
          <Typography sx={{ mb: 2 }}>
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
            height: 650, //Password change form box
          }}
        >
          <Typography sx={{ ml: 2, mb: 2 }}>
            <h3>Password</h3>
          </Typography>
          <Passwordchange />

          <Box
            sx={{
              borderRadius: "10px",
              backgroundColor: "#023E8A80",
              width: 900,
              height: 220,
              alignContent: "center",
              ml: 35,
              mt: 3, //Pasword Requirements box
            }}
          >
            <Typography sx={{ ml: 3, mt: 2, color: "white" }}>
              Password Requirements Your Password needs to have
            </Typography>
            <Typography sx={{ ml: 3, mt: 1, color: "white" }}>
              Your Password needs to have
            </Typography>
            <Typography sx={{ ml: 7, mt: 1, color: "white" }}>
              At least 8 characters
            </Typography>
            <Typography sx={{ ml: 7, mt: 1, color: "white" }}>
              At least 1 uppercase letter
            </Typography>
            <Typography sx={{ ml: 7, mt: 1, color: "white" }}>
              At least one number
            </Typography>
            <Typography sx={{ ml: 7, mt: 1, color: "white" }}>
              At least one special character
            </Typography>
            <Box
              component="img"
              src={ResetPwdImage}
              alt="pwd Reset"
              sx={{
                maxWidth: "250px",
                height: "250px",
                ml: 82,
                mt: -26.4,
              }}
            />
          </Box>

          <Box sx={{ mt: 7 }}>
            <PageButton
              text="Save Changes"
              onClick={() => alert("Changes saved!")}
              type={"button"}
            />
          </Box>
        </Box>
        <Box
          sx={{
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
            my: 2,
            mx: 5,
            padding: 2,
            height: 380, //Acount form box
          }}
        >
          <Typography sx={{ ml: 2, mb: 2 }}>
            <h3>Currencies</h3>
          </Typography>
          <Typography>Add a new currency</Typography>

          <CurrencySelector />
        </Box>
      </Box>
    </div>
  

  );
};

export default UserSettings;
