import { Box, Grid } from "@mui/material";
import Cards from "../../components/ReportComponents/Cards";
import PieChart from "../../components/ReportComponents/PieChart";
import BarGraph from "../../components/ReportComponents/BarGraph";
import BalanceAreaChart from "../../components/ReportComponents/Incomechart";

function ReportDisplay() {
  return (
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
          <Grid sx={{ ml: 1.8 }}>
            <Grid item xs={12} md={6}>
              <BalanceAreaChart />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default ReportDisplay;
