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
    let userId = localStorage.getItem("userId");

    // TEMP: Log or fallback for dev
    console.log("userId from localStorage:", userId);

    if (!userId) {
      // Optional: Temporary fallback (for development/testing only)
      // userId = "your-test-user-id-here";
      setError("User not logged in. Please log in first.");
      setLoading(false);
      return;
    }

    setLoading(true);

    axios
      .post("https://localhost:7211/api/Reports/generate", {
        startDate,
        endDate,
        userId,
      })
      .then((response) => {
        setReportData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Report fetch error: " + error.message);
        setLoading(false);
      });
  }, [startDate, endDate]);

  const handleDownloadCSV = () => {
    const csvData = new Blob([JSON.stringify(reportData, null, 2)], {
      type: "text/csv;charset=utf-8;",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(csvData);
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPDF = () => {
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write("<html><head><title>Report PDF</title></head><body><pre>");
      printWindow.document.write(JSON.stringify(reportData, null, 2));
      printWindow.document.write("</pre></body></html>");
      printWindow.document.close();
      printWindow.print();
    }
  };

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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {/* Summary Cards */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
        <Cards data={reportData} />
      </Box>

      {/* Pie and Bar Graph */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <PieChart data={reportData?.categoryBreakdown} />
        </Grid>
        <Grid item xs={12} md={6}>
          <BarGraph data={reportData?.monthlyData} />
        </Grid>
      </Grid>

      {/* Area Chart and Goals */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <BalanceAreaChart data={reportData?.monthlyData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ReportGoal data={reportData?.goals} />
        </Grid>
      </Grid>

      {/* Transactions Table */}
      <Box>
        <BasicTable data={reportData?.transactions} />
      </Box>

      {/* Export Buttons */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, gap: 1 }}>
        <Button variant="outlined" onClick={handleDownloadCSV}>
          Download CSV
        </Button>
        <Button variant="outlined" onClick={handleDownloadPDF}>
          Download PDF
        </Button>
      </Box>
    </Box>
  );
}

export default ReportDisplay;
