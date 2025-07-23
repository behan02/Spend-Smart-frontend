import { Box, Stack, ThemeProvider, Typography } from "@mui/material";
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
import Sidebar from "../../components/sidebar/sidebar";
import { useEffect, useState } from "react";

const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  let userId: Number = 2;

  useEffect(() => {
    async function fetchDashboardData(){
      try{
        const response = await fetch(`https://localhost:7211/api/Dashboard/${userId}`);
        if(!response.ok){
          throw new Error("Failed to fetch dashboard data");
        }
        const data = await response.json();
        setDashboardData(data);
      }catch(error: any){
        console.error(error);
      }finally{
        setLoading(false);
      }
    }
    fetchDashboardData();
  },[])

  if(loading){
    return(
      <Typography variant="h6">Loading Dashboard...</Typography>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row">
        <Box>
          <Sidebar />
        </Box>

        <Box 
        //   sx={{
        //     margin: "50px auto",
        //     width: "85%",
        //     [theme.breakpoints.between("mobile","tablet")]: {
        //       margin: "30px auto",
        //     },
        // }}
          flexGrow={1}
        >
          <Box sx={{
            padding: "20px 40px"
          }}>
            <Box>
              <Header pageName="Dashboard" />
            </Box>

            <Grid container rowSpacing={{mobile: 3, tablet: 4, laptop: 4, desktop: 4}} columnSpacing={3} direction="row" sx={{mt: 5}}>
              {dashboardData && (
                <>
              <Grid size={{mobile:12, laptop:12, desktop:12}}>
                <DashboardOverview data={dashboardData}/>
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
                <DashboardTransaction data={dashboardData.recentTransactions}/>
              </Grid>
                </>
              )}

            </Grid>
          </Box>
            <Box>
              <Footer />
            </Box>
          
        </Box>
      </Stack>
    </ThemeProvider>
  )
}

export default Dashboard;