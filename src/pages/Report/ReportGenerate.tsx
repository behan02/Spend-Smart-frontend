import { Box, useTheme, Alert, Snackbar } from "@mui/material";
import Header from "../../components/header/header";
import CustomDatePicker from "../../components/ReportComponents/DatePicker";
import ReportDisplay from "./ReportDisplay";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Sidebar from "../../components/sidebar/sidebar";
import axios from "axios";

const SIDEBAR_WIDTH = 240;

const ReportGenerate: React.FC = () => {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [isReportVisible, setIsReportVisible] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const theme = useTheme();

  const handleGenerate = (): void => {
    try {
      if (!startDate || !endDate) {
        setError("Please select both start and end dates");
        return;
      }
      if (endDate.isBefore(startDate)) {
        setError("End date cannot be before start date");
        return;
      }
      setIsReportVisible(true);
      setError(null);
    } catch (err) {
      setError("An error occurred while generating the report");
      console.error("Report generation error:", err);
    }
  };

  const handleCloseError = () => setError(null);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      {/* Sidebar - Fixed position */}
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
          transition: theme.transitions.create("width"),
        }}
      >
        <Sidebar />
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          p: { xs: 1, md: 3 },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          ml: { xs: "60px", md: `${SIDEBAR_WIDTH}px` }, // Add margin to prevent overlap
          width: { xs: "calc(100% - 60px)", md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          transition: theme.transitions.create(["margin-left", "width"]),
        }}
      >
        <Header pageName="Craft Your Custom Report" />

        {/* Date Picker Section */}
        <Box sx={{ mb: 3 }}>
          <CustomDatePicker
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            onGenerate={handleGenerate}
          />
        </Box>

        {/* Report Display Area - Scrollable content */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            pr: { xs: 1, md: 2 },
            mr: { xs: -1, md: -2 },
          }}
        >
          {isReportVisible && <ReportDisplay />}
        </Box>

        {/* Error Snackbar */}
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