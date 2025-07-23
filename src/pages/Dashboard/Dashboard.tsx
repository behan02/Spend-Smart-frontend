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
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0); // Add refresh trigger
  let userId: Number = 1;

  // Function to fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`https://localhost:7211/api/Dashboard/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }
      const data = await response.json();
      setDashboardData(data);
    } catch (error: any) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [refreshTrigger]); // Re-fetch when refreshTrigger changes

  // Handle transaction deletion
  const handleDeleteTransaction = async (id: number) => {
    try {
      const response = await fetch(`https://localhost:7211/api/Transaction/DeleteTransaction/${userId}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" }
      });
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }
      
      // Trigger a complete dashboard refresh
      setRefreshTrigger(prev => prev + 1);
      
      console.log("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6">Loading Dashboard...</Typography>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row">
        <Box>
          <Sidebar />
        </Box>

        <Box flexGrow={1}>
          <Box sx={{ padding: "20px 40px" }}>
            <Box>
              <Header pageName="Dashboard" />
            </Box>

            <Grid container rowSpacing={{ mobile: 3, tablet: 4, laptop: 4, desktop: 4 }} columnSpacing={3} direction="row" sx={{ mt: 5 }}>
              {dashboardData && (
                <>
                  <Grid size={{ mobile: 12, laptop: 12, desktop: 12 }}>
                    <DashboardOverview data={dashboardData} />
                  </Grid>
                  <Grid size={{ mobile: 12, desktop: 8, laptop: 7 }}>
                    <DashboardBargraph dashboardData={dashboardData} />
                  </Grid>
                  <Grid size={{ mobile: 12, desktop: 4, laptop: 5 }}>
                    <DashboardPiechart dashboardData={dashboardData} />
                  </Grid>
                  <Grid size={{ mobile: 12, desktop: 6, laptop: 6 }}>
                    <DashboardBudget />
                  </Grid>
                  <Grid size={{ mobile: 12, desktop: 6, laptop: 6 }}>
                    <DashboardGoal />
                  </Grid>
                  <Grid size={{ mobile: 12, desktop: 12 }}>
                    <DashboardTransaction 
                      data={dashboardData.recentTransactions}
                      onDelete={handleDeleteTransaction} // Pass delete handler
                    />
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
  );
}

export default Dashboard;