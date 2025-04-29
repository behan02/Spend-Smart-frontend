import { Box, ThemeProvider } from "@mui/material";
import DashboardOverview from "../../components/DashboardComponents/dashboardOverview/DashboardOverview";
import DashboardBargraph from "../../components/DashboardComponents/dashboardBargraph/DashboardBargraph";
import DashboardPiechart from "../../components/DashboardComponents/dashboardPiechart/DashboardPiechart";
import theme from "../../assets/styles/theme";
import DashboardBudget from "../../components/DashboardComponents/dashboardBudget/DashboardBudget";
import DashboardGoal from "../../components/DashboardComponents/dashboardGoals/DashboardGoal";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/header";
import DashboardTransaction from "../../components/DashboardComponents/dashboardTransaction/DashboardTransaction";
import Grid from '@mui/material/Grid';

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
            <Grid size={{mobile:12, laptop:12, desktop:12}}>
              <DashboardOverview />
            </Grid>
            <Grid size={{mobile:12, desktop:8, laptop:7}}>
              <DashboardBargraph />
            </Grid>
            <Grid size={{mobile:12, desktop:4, laptop:5}}>
              <DashboardPiechart />
            </Grid>
            <Grid size={{mobile:12, desktop:6, laptop:6}}>
              <DashboardBudget />
            </Grid>
            <Grid size={{mobile:12, desktop:6, laptop:6}}>
              <DashboardGoal />
            </Grid>
            <Grid size={{mobile:12, desktop:12}}>
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