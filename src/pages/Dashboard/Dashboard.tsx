import { Box, Grid, ThemeProvider } from "@mui/material";
import DashboardOverview from "../../components/dashboardOverview/DashboardOverview";
import DashboardBargraph from "../../components/dashboardBargraph/DashboardBargraph";
import DashboardPiechart from "../../components/dashboardPiechart/DashboardPiechart";
import theme from "../../assets/styles/theme";
import DashboardBudget from "../../components/dashboardBudget/DashboardBudget";
import DashboardGoal from "../../components/dashboardGoals/DashboardGoal";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/header";
import DashboardTransaction from "../../components/dashboardTransaction/DashboardTransaction";

const Dashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Box sx={{
          margin: "50px auto",
          width: "85%",
          [theme.breakpoints.between("mobile","tablet")]: {
            margin: "30px auto",
          },
        }}>
          <Box>
            <Header pageName="Dashboard" />
          </Box>

          <Grid container rowSpacing={{mobile: 3, tablet: 4, laptop: 4, desktop: 4}} columnSpacing={3} direction="row" sx={{mt: 5}}>
            <Grid item mobile={12} desktop={12}>
              <DashboardOverview />
            </Grid>
            <Grid item mobile={12} desktop={8} laptop={7}>
              <DashboardBargraph />
            </Grid>
            <Grid item mobile={12} desktop={4} laptop={5}>
              <DashboardPiechart />
            </Grid>
            <Grid item mobile={12} desktop={6} laptop={6}>
              <DashboardBudget />
            </Grid>
            <Grid item mobile={12} desktop={6} laptop={6}>
              <DashboardGoal />
            </Grid>
            <Grid item mobile={12} desktop={12}>
              <DashboardTransaction />
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Footer />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Dashboard;