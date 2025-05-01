import { Box, Grid } from "@mui/material";
import Cards from "../../components/ReportComponents/Cards";
import PieChart from "../../components/ReportComponents/PieChart";
import BarGraph from "../../components/ReportComponents/BarGraph";
import BalanceAreaChart from "../../components/ReportComponents/Incomechart";
import ReportGoal from "../../components/ReportComponents/Reportgoal/reportgoal";
import BasicTable from "../../components/ReportComponents/Reporttable/transactiontable";
import Footer from "../../components/footer/Footer";
import ExportButtons from "../../components/ReportComponents/downloadbutton";

function ReportDisplay() {
  return (
    <Box>
      <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        p: 3,
      }}
    >
      
      <Cards />
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2} sx={{ width: "100%", margin: 0 }}>
          <Grid item xs={12} md={6}>
            <PieChart />
          </Grid>

          <Grid item xs={12} md={6}>
            <BarGraph />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2} sx={{ width: "100%", margin: 0 }}>
            <Grid item xs={12} md={6}>
              <BalanceAreaChart />
            </Grid>

            <Grid item xs={12} md={6}>
              <ReportGoal />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box>
        <BasicTable />
      </Box>
      <ExportButtons onExport={function (format: "PDF" | "CSV" | "XLSX"): void {
          throw new Error("Function not implemented.");
        }} />
      <Footer/>
    </Box></Box>
    
  );
}

export default ReportDisplay;
