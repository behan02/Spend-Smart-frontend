import { Box } from "@mui/material";
import Header from "../../components/header/header";
import CustomDatePicker from "../../components/ReportComponents/DatePicker";
import ReportDisplay from "./ReportDisplay";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

function ReportGenerate() {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());
  const [isReportVisible, setIsReportVisible] = useState(false);

  const handleGenerate = () => {
    if (!startDate || !endDate) return;

    // You can add data fetch or report logic here if needed
    console.log("Generating report from:", startDate.format("YYYY-MM-DD"), "to", endDate.format("YYYY-MM-DD"));

    setIsReportVisible(true);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Header pageName="Craft Your Custom Report" />
      <CustomDatePicker
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        onGenerate={handleGenerate}
      />

      {isReportVisible && (
        <Box >
          <ReportDisplay />
        </Box>
      )}
    </Box>
  );
}

export default ReportGenerate;
