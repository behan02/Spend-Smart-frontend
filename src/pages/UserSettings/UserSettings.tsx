import UserSettingsImage from "../../assets/images/settings-header.jpg";
import { Box, Avatar, Button, Stack, Typography, Divider } from "@mui/material";
import ProfileImage from "../../assets/images/profile-photo.jpg";
import AccountForm from "../../components/UserSettings-Forms/AccountForm";
import Passwordchange from "../../components/UserSettings-Forms/Passwordchange";
import PageButton from "../../components/Button/PageButton";
import ResetPwdImage from "../../assets/images/Reset password-bro.png";
import CurrencySelector from "../../components/UserSettings-Forms/Addcurencyform";
import Sidebar from "../../components/sidebar/sidebar";
import React from "react";
import ProfilePictureUpload from "../../components/UserSettings-Forms/ProfilepictureUpload";


const UserSettings: React.FC = () => {
 // const [profileImage, setProfileImage] = useState<string | undefined>(ProfileImage); 
  //const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = React.useState<string | undefined>(ProfileImage);


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
    backgroundImage: `url(${UserSettingsImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
  }}
>
  <Avatar
    
    ref={fileInputRef}       // profile Picture
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

<ProfilePictureUpload />

{/*<Box sx={{ mt: 2, ml: 25 }}>
  <Stack direction="row" spacing={5}>
    <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={() => fileInputRef.current?.click()}    // Upload picture Button
    >
      Upload Picture
    </Button>
    <Button
      variant="outlined"
      color="error"
      size="small"
      onClick={() => {
        setProfileImage(undefined);   // Reset to no image or default
        // TODO: call delete API here if you want
      }}
    >
      Delete Picture
    </Button>
  </Stack>
</Box> */}

{/* Hidden file input */}
{/*<input
  type="file"
  accept="image/*"
  ref={fileInputRef}
  style={{ display: "none" }}
  onChange={(e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      // TODO: call upload API here with 'file'
    }
  }}
/> */}

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
              component="img"
              src={ResetPwdImage}
              alt="pwd Reset"
              sx={{
                maxWidth: "250px",
                height: "250px",
                alignContent: "center",
                ml: 50,
                mt: 10,
              }}
            />
        

          <Box sx={{ mt: -3 }}>
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
