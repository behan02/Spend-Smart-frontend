import {
  Box,
  useTheme,
  Alert,
  Snackbar,
  Typography,
  Button
} from "@mui/material";
import Header from "../../components/header/header";
import CustomDatePicker from "../../components/ReportComponents/DatePicker";
import ReportDisplay from "./ReportDisplay";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Sidebar from "../../components/sidebar/sidebar";

const SIDEBAR_WIDTH = 240;

const ReportGenerate: React.FC = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [isReportVisible, setIsReportVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const handleGenerate = async (): Promise<void> => {
    try {
      setIsLoading(true);

      if (!startDate || !endDate) {
        setError("Please select both start and end dates");
        return;
      }
      if (endDate.isBefore(startDate)) {
        setError("End date cannot be before start date");
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 500));

      setIsReportVisible(true);
      setError(null);
    } catch (err) {
      setError("An error occurred while generating the report");
      console.error("Report generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseError = () => setError(null);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
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
          width: { xs: "calc(100% - 60px)", md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
        }}
      >
        <Header pageName="Craft Your Custom Report" sx={{ mb: 3, textAlign: "center" }} />

        <Box
          sx={{
            mb: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <CustomDatePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
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
              }}
            >
              <Typography variant="h6" gutterBottom>
                No report generated yet
              </Typography>
              <Typography variant="body1">
                Select dates and click "Generate Report" to view your data
              </Typography>
              <Button
                variant="outlined"
                onClick={handleGenerate}
                sx={{ mt: 2 }}
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate Report"}
              </Button>
            </Box>
          )}
        </Box>

        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={handleCloseError}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert onClose={handleCloseError} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default ReportGenerate;
