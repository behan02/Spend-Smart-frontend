import { Box, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import Button from "@mui/material/Button";

interface CustomDatePickerProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  setStartDate: (date: Dayjs | null) => void;
  setEndDate: (date: Dayjs | null) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onGenerate,
  isLoading,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        alignItems: 'center',
        mb: 2
      }}>
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
      <Button
        variant="contained"
        onClick={onGenerate}
        disabled={isLoading}
        sx={{
          px: 4,
          py: 1.5,
          alignSelf: 'center'
        }}
      >
        {isLoading ? 'Generating...' : 'Generate Report'}
      </Button>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;