import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  
  Box,
  useMediaQuery,
  useTheme,
  Breakpoint,
  Typography,
} from "@mui/material";

function CustomDatePicker() {
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs());

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm" as Breakpoint));

  return (
    <Box>
      <Typography
        sx={{
          fontSize: {
            xs: "1.2rem",
            md: "2.5rem",
          },
          fontWeight: 600,
          color: "primary.main",
          opacity: 0.8,
          mb: 2,
        }}
      >
        Choose the period you want to generate reports for
      </Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box
          display="flex"
          flexDirection="row"
          gap={2}
          justifyContent="space-between"
          flexWrap="wrap"
         
        >
          <Box flex="1 1 300px">
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(newValue) =>
                setStartDate(newValue ? dayjs(newValue) : null)
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                } as any,
              }}
            />
          </Box>

          <Box flex="1 1 300px">
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(newValue) =>
                setEndDate(newValue ? dayjs(newValue) : null)
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                } as any,
              }}
            />
          </Box>

          <Box
            component="button"
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.common.white,
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
              fontSize: isMobile ? "0.8rem" : "1rem",
            }}
            onClick={() => {
              // Handle button click, e.g., submit the selected dates
              console.log("Start Date:", startDate?.format("YYYY-MM-DD"));
              console.log("End Date:", endDate?.format("YYYY-MM-DD"));
            }}
          >
            Generate Report
          </Box>
        </Box>
      </LocalizationProvider>
    </Box>
  );
}

export default CustomDatePicker;
