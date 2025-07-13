import { Box, Grid, CircularProgress, Typography } from "@mui/material";
import Cards from "../../components/ReportComponents/Cards";
import PieChart from "../../components/ReportComponents/PieChart";
import BarGraph from "../../components/ReportComponents/BarGraph";
import BalanceAreaChart from "../../components/ReportComponents/Incomechart";
import ReportGoal from "../../components/ReportComponents/Reportgoal/reportgoal";
import BasicTable from "../../components/ReportComponents/Reporttable/transactiontable";
import { useEffect, useState } from "react";
import axios from "axios";

// Define types for reportData
interface ReportData {
  categoryBreakdown?: any;
  monthlyData?: any;
  goals?: any;
  transactions?: any;
  [key: string]: any;
}

function ReportDisplay() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .post("https://localhost:7211/api/Reports/generate", {
        startDate: "2025-07-01",
        endDate: "2025-07-10",
      })
      .then((response) => {
        setReportData(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Report fetch error: " + error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Cards data={reportData} />
      <Box sx={{ mt: 2 }}>
        <Grid container spacing={2} sx={{ width: "100%", margin: 0 }}>
          <Grid item xs={12} md={6}>
            <PieChart data={reportData?.categoryBreakdown} />
          </Grid>

          <Grid item xs={12} md={6}>
            <BarGraph data={reportData?.monthlyData} />
          </Grid>
        </Grid>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2} sx={{ width: "100%", margin: 0 }}>
            <Grid item xs={12} md={6}>
              <BalanceAreaChart data={reportData?.monthlyData} />
            </Grid>

            <Grid item xs={12} md={6}>
              <ReportGoal data={reportData?.goals} />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box>
        <BasicTable data={reportData?.transactions} />
      </Box>
    </Box>
  );
}

export default ReportDisplay;
