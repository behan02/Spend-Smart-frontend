// import { Box, Grid, ThemeProvider } from "@mui/material";
// import DashboardOverview from "../../components/dashboardOverview/DashboardOverview";
// import DashboardBargraph from "../../components/dashboardBargraph/DashboardBargraph";
// import DashboardPiechart from "../../components/dashboardPiechart/DashboardPiechart";
// import theme from "../../assets/styles/theme";

// const Dashboard = () => {
//   return (
//     <ThemeProvider theme={theme}>
//     <Box sx={{
//         margin: "30px auto",
//         width: "85%",
//       }}>
//         <DashboardOverview />
//         <Box sx={{
//             display: "flex",
//             alignItems: "stretch",
//             gap: "20px",
//             mt: "40px"
//         }}>
//             <DashboardBargraph />
//             <DashboardPiechart />
//         </Box>
        
//     </Box>
//     </ThemeProvider>
//   )
// }

// export default Dashboard;



// import { Box, Grid, ThemeProvider } from "@mui/material";
// import DashboardOverview from "../../components/dashboardOverview/DashboardOverview";
// import DashboardBargraph from "../../components/dashboardBargraph/DashboardBargraph";
// import DashboardPiechart from "../../components/dashboardPiechart/DashboardPiechart";
// import theme from "../../assets/styles/theme";

// const Dashboard = () => {
//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{
//         margin: "30px auto",
//         width: "85%",
//       }}>
//         <DashboardOverview />
//         <Grid container spacing={3} sx={{ mt: "40px"}}>
//           <Grid item mobile={12} desktop={8}>
//             <Box sx={{height: "100px"}}>
//               <DashboardBargraph />
//             </Box>
//           </Grid>
//           <Grid item mobile={12} desktop={4}>
//             <Box sx={{height: "500px"}}>
//               <DashboardPiechart />
//             </Box>
//           </Grid>
//         </Grid>
//       </Box>
//     </ThemeProvider>
//   )
// }

// export default Dashboard;



import { Box, Grid, ThemeProvider } from "@mui/material";
import DashboardOverview from "../../components/dashboardOverview/DashboardOverview";
import DashboardBargraph from "../../components/dashboardBargraph/DashboardBargraph";
import DashboardPiechart from "../../components/dashboardPiechart/DashboardPiechart";
import theme from "../../assets/styles/theme";

const Dashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        margin: "30px auto",
        width: "85%",
      }}>
        <DashboardOverview />
        <Grid container spacing={3} direction="row" sx={{ 
          mt: "40px",
        }}>
          <Grid item mobile={12} desktop={8}>
            <DashboardBargraph />
          </Grid>
          <Grid item mobile={12} desktop={4}>
            <DashboardPiechart />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

export default Dashboard;