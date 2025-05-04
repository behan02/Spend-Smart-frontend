import { Grid } from "@mui/material"
import LoginLeftImage from "../../components/LoginComponents/LoginLeftImage";
import LoginIntro from "../../components/LoginComponents/LoginIntro";
import LoginForm from "../../components/LoginComponents/LoginForm";

function UserLogin() {
  return (
    <Grid container spacing={2} sx={{ height: "100vh" }}>
      <LoginLeftImage />
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
