import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import Cards from "../../components/ReportComponents/Cards";
import PieChart from "../../components/ReportComponents/PieChart";
import BarGraph from "../../components/ReportComponents/BarGraph";
import BalanceAreaChart from "../../components/ReportComponents/Incomechart";
import ReportGoal from "../../components/ReportComponents/Reportgoal/reportgoal";
import BasicTable from "../../components/ReportComponents/Reporttable/transactiontable";
import { useEffect, useState } from "react";
import axios from "axios";

interface ReportData {
  categoryBreakdown?: any;
  monthlyData?: any;
  goals?: any;
  transactions?: any;
  totalIncome?: number;
  totalExpenses?: number;
  totalSavings?: number;
  [key: string]: any;
}

interface ReportDisplayProps {
  startDate: string;
  endDate: string;
}

function ReportDisplay({ startDate, endDate }: ReportDisplayProps) {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Skip API call for now and use dummy data
    console.log("ReportDisplay mounting with:", { startDate, endDate });
    
    // Set dummy data immediately
    setReportData({
      totalIncome: 8000,
      totalExpenses: 3500,
      totalSavings: 1500,
      budgetUtilization: 25
    });
    setLoading(false);
    
    // Comment out the API call for debugging
    /*
    axios
      .post("https://localhost:7211/api/Reports/generate", {
        startDate,
        endDate,
      })
      .then((response) => {
        setReportData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Report fetch error: " + error.message);
        setLoading(false);
      });
    */
  }, [startDate, endDate]);

  console.log("ReportDisplay render:", { loading, error, reportData });

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
        <Typography sx={{ ml: 2 }}>Loading report...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          gap: 2
        }}
      >
        <Typography color="error">{error}</Typography>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, minHeight: '100vh' }}>
      
      
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        
        {/* Row 1: Summary Cards (4 cards in one row) */}
        <Box>
          
          <Cards data={reportData} />
        </Box>

        {/* Row 2: Pie Chart and Bar Graph */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 2 }}>
            {/* <Typography variant="h6" sx={{ mb: 1 }}>Pie Chart:</Typography> */}
            <PieChart data={reportData?.categoryBreakdown} />
          </Grid>
          <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            {/* <Typography variant="h6" sx={{ mb: 1 }}>Bar Graph:</Typography> */}
            <BarGraph data={reportData?.monthlyData} />
          </Grid>
        </Grid>

        {/* Row 3: Area Chart and Goals */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {/* <Typography variant="h6" sx={{ mb: 1 }}>Income Chart:</Typography> */}
            <BalanceAreaChart data={reportData?.monthlyData} />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* <Typography variant="h6" sx={{ mb: 1 }}>Goals:</Typography> */}
            <ReportGoal data={reportData?.goals} />
          </Grid>
        </Grid>

        {/* Row 4: Transactions Table (full width) */}
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>Transaction Table:</Typography>
          <BasicTable data={reportData?.transactions} />
        </Box>
      </Box>
    </Box>
  );
}

export default ReportDisplay;