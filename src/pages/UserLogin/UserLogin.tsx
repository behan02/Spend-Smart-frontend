import { Grid } from "@mui/material"
import LoginImage from "../../assets/images/userLogin.png";
import LoginIntro from "../../components/LoginComponents/LoginIntro";
import LoginForm from "../../components/LoginComponents/LoginForm";
import LoginLeftImage from "../../components/LoginComponents/LoginLeftImage";

function UserLogin() {
  return (
    <Grid container spacing={2} sx={{ height: "100vh" }}>
      <LoginLeftImage imageSrc={LoginImage} altText="Login Page Image" />
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 0,
          margin: 0,
          flexGrow: 1,
        }}
        >
          <LoginIntro/>
          <LoginForm/>
        </Grid>


      </Grid>
  )
}

export default UserLogin
