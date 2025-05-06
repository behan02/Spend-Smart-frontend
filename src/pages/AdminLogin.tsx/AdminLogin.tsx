import { Grid } from "@mui/material"
import AdminLoginLeftImage from "../../components/AdminLoginComponents/AdminLoginLeftImage";
import AdminLoginHeader from "../../components/AdminLoginComponents/AdminLoginHeader";
import AdminLoginForm from "../../components/AdminLoginComponents/AdminLoginForm";

function AdminLogin() {
  return (
    <Grid container spacing={2} sx={{ height: "100vh" }}>
      <AdminLoginLeftImage />
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
          <AdminLoginHeader/>
          <AdminLoginForm/>
        </Grid>


      </Grid>
  )
}

export default AdminLogin
