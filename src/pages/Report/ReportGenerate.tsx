import { Box, useTheme } from "@mui/material";
import Header from "../../components/header/header";
import CustomDatePicker from "../../components/ReportComponents/DatePicker";
import ReportDisplay from "./ReportDisplay";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import Sidebar from "../../components/sidebar/sidebar";

function ReportGenerate() {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [isReportVisible, setIsReportVisible] = useState(false);
  const theme = useTheme();

  const handleGenerate = () => {
    if (!startDate || !endDate) return;
    console.log("Generating report from:", startDate.format("YYYY-MM-DD"), "to", endDate.format("YYYY-MM-DD"));
    setIsReportVisible(true);
  };

  return (
    <Box sx={{ display: 'flex' ,pl:3}}>
      {/* Sidebar - Fixed width */}
      <Box sx={{ 
        width: 240, 
        flexShrink: 0,
        borderRight: `1px solid ${theme.palette.divider}`
      }}>
        <Sidebar />
      </Box>

      {/* Main Content Area */}
      <Box sx={{ 
        flexGrow: 1,
        p: 3,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
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
        <Box sx={{ 
          flex: 1,
          overflowY: 'auto',
          pr: 2 // Add some padding so scrollbar doesn't overlap content
        }}>
          {isReportVisible && <ReportDisplay />}
        </Box>
      </Box>
    </Box>
  );
}

export default ReportGenerate;