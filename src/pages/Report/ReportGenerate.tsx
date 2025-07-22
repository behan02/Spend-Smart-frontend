import {
  Box,
  useTheme,
  Alert,
  Snackbar,
  Typography,
  Button,
  TextField,
  Paper,
  Chip,
} from "@mui/material";
import Header from "../../components/header/header";
import CustomDatePicker from "../../components/ReportComponents/DatePicker";
import ReportDisplay from "./ReportDisplay";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Sidebar from "../../components/sidebar/sidebar";
import axios from "axios";
import { useUser } from "../../context/UserContext"; // ✅ added import

// API Configuration
const API_BASE_URL = "https://localhost:7211/api";

const SIDEBAR_WIDTH = 240;

const ReportGenerate: React.FC = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(
    dayjs().subtract(6, "months")
  ); // Default to last 6 months
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [isReportVisible, setIsReportVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();
  const { userId } = useUser(); // ✅ using user ID from sessionStorage

  // API Functions
  const testConnection = async (): Promise<{
    success: boolean;
    message: string;
  }> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/Reports/test`, {
        timeout: 10000,
      });
      return {
        success: true,
        message: response.data.message || "API connection successful",
      };
    } catch (error: any) {
      console.error("API connection test failed:", error);
      let errorMessage = "API connection failed";

      if (error.code === "ECONNREFUSED") {
        errorMessage = "Connection refused. Backend server is not running.";
      } else if (error.response) {
        errorMessage = `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage =
          "Network error. Check if backend is running on https://localhost:7211";
      }

      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  const handleGenerate = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Validate dates
      if (!startDate || !endDate) {
        setError("Please select both start and end dates");
        return;
      }

      if (endDate.isBefore(startDate)) {
        setError("End date cannot be before start date");
        return;
      }

      // Check date range (prevent too large ranges)
      const daysDifference = endDate.diff(startDate, "days");
      if (daysDifference > 730) {
        // 2 years max
        setError("Date range cannot exceed 2 years (730 days)");
        return;
      }

      // Test API connection before generating report
      console.log("Testing API connection...");
      const connectionTest = await testConnection();
      if (!connectionTest.success) {
        setError(`Connection failed: ${connectionTest.message}`);
        return;
      }

      console.log("API connection successful, generating report...");

      // Small delay to show loading state
      await new Promise((resolve) => setTimeout(resolve, 500));

      setIsReportVisible(true);
      console.log("Report generation triggered for user:", userId);
    } catch (err: any) {
      console.error("Report generation error:", err);
      setError(err.message || "An error occurred while generating the report");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseError = () => setError(null);

  const handleResetReport = () => {
    setIsReportVisible(false);
    setError(null);
  };

  const handleQuickDateRange = (range: string) => {
    const now = dayjs();
    switch (range) {
      case "last30days":
        setStartDate(now.subtract(30, "days"));
        setEndDate(now);
        break;
      case "last3months":
        setStartDate(now.subtract(3, "months"));
        setEndDate(now);
        break;
      case "last6months":
        setStartDate(now.subtract(6, "months"));
        setEndDate(now);
        break;
      case "last12months":
        setStartDate(now.subtract(12, "months"));
        setEndDate(now);
        break;
      case "thisyear":
        setStartDate(now.startOf("year"));
        setEndDate(now);
        break;
      default:
        break;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          width: { xs: 60, md: SIDEBAR_WIDTH },
          flexShrink: 0,
          bgcolor: "background.paper",
          borderRight: `1px solid ${theme.palette.divider}`,
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          zIndex: 1200,
          flexGrow: 1,
          flexDirection: "column",
        }}
      >
        <Sidebar />
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 2, md: 4 },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          ml: { xs: "60px", md: `${SIDEBAR_WIDTH}px` },
          width: {
            xs: "calc(100% - 60px)",
            md: `calc(100% - ${SIDEBAR_WIDTH}px)`,
          },
        }}
      >
        <Header
          pageName="Craft Your Custom Report"
          sx={{ mb: 3, textAlign: "center" }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            flexGrow: 1,
            paddingLeft:30
          }}
        >
          {/* Date Selection */}
          <Box
            sx={{
              mb: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Quick Date Range Buttons */}

            <Paper
              elevation={1}
              sx={{
                p: 2,
                mb: 2,
                width: "100%",
                maxWidth: "800px",
                mx: "auto",
                backgroundColor: "grey.50",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  mb: 1.5,
                  fontWeight: 500,
                  textAlign: "center",
                  color: "text.secondary",
                }}
              >
                Quick Date Ranges:
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Chip
                  label="Last 30 Days"
                  variant="outlined"
                  clickable
                  onClick={() => handleQuickDateRange("last30days")}
                  sx={{
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                      borderColor: "primary.main",
                    },
                  }}
                />

                <Chip
                  label="Last 3 Months"
                  variant="outlined"
                  clickable
                  onClick={() => handleQuickDateRange("last3months")}
                  sx={{
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                      borderColor: "primary.main",
                    },
                  }}
                />

                <Chip
                  label="Last 6 Months"
                  variant="outlined"
                  clickable
                  onClick={() => handleQuickDateRange("last6months")}
                  sx={{
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                      borderColor: "primary.main",
                    },
                  }}
                />

                <Chip
                  label="Last 12 Months"
                  variant="outlined"
                  clickable
                  onClick={() => handleQuickDateRange("last12months")}
                  sx={{
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                      borderColor: "primary.main",
                    },
                  }}
                />

                <Chip
                  label="This Year"
                  variant="outlined"
                  clickable
                  onClick={() => handleQuickDateRange("thisyear")}
                  sx={{
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                      borderColor: "primary.main",
                    },
                  }}
                />
              </Box>
            </Paper>

            {/* Custom Date Picker */}
            <CustomDatePicker
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />

            {/* Additional Info */}
            <Box sx={{ mt: 2, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Selected Range: {startDate?.format("MMM DD, YYYY")} to{" "}
                {endDate?.format("MMM DD, YYYY")}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                ({endDate?.diff(startDate, "days")} days)
              </Typography>
            </Box>

            {/* Reset button when report is visible */}
            {isReportVisible && (
              <Button
                variant="outlined"
                onClick={handleResetReport}
                sx={{ mt: 2 }}
              >
                Generate New Report
              </Button>
            )}
          </Box>

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              p: 2,
              backgroundColor: theme.palette.background.paper,
              borderRadius: 1,
              boxShadow: theme.shadows[1],
              display: "flex",
              justifyContent: "center",
            }}
          >
            {isReportVisible ? (
              <ReportDisplay
                startDate={startDate?.format("YYYY-MM-DD") ?? ""}
                endDate={endDate?.format("YYYY-MM-DD") ?? ""}
                key={`${startDate?.format("YYYY-MM-DD")}-${endDate?.format(
                  "YYYY-MM-DD"
                )}-${userId}`} // ✅ uses authenticated user ID
              />
            ) : (
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  color: theme.palette.text.secondary,
                  textAlign: "center",
                  gap: 2,
                }}
              >
                <Typography variant="h6" gutterBottom>
                  📊 No report generated yet
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  Select your desired date range and click "Generate Report" to
                  view your financial data
                </Typography>
                <Typography
                  variant="body2"
                  color="text.disabled"
                  sx={{ mb: 2 }}
                >
                  Current selection: {startDate?.format("MMM DD, YYYY")} to{" "}
                  {endDate?.format("MMM DD, YYYY")}
                </Typography>
              </Box>
            )}
          </Box>

          <Snackbar
            open={!!error}
            autoHideDuration={8000}
            onClose={handleCloseError}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseError}
              severity="error"
              sx={{ width: "100%" }}
            >
              <Typography variant="subtitle2">Error</Typography>
              {error}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Box>
  );
};

export default ReportGenerate;
