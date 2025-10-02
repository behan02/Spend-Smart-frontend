import React, { useState } from 'react';
import { 
  Button, 
  Select, 
  MenuItem, 
  FormControl, 
  SelectChangeEvent,
  Box,
  Typography,
  styled
} from '@mui/material';

// Types for available export formats
type ExportFormat = 'PDF' | 'CSV' | 'XLSX';

// Styles for the Dropdown
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 100,
  backgroundColor: '#E2E8F0',
  borderRadius: theme.shape.borderRadius,
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.shape.borderRadius,
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
}));
// Styles for the Download Button
const DownloadButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#0A4C8F',
  color: 'white',
  borderRadius: theme.shape.borderRadius,
  padding: '8px 20px',
  textTransform: 'none',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: '#083c72',
  },
}));

interface ExportButtonsProps {
  onExport: (format: ExportFormat) => void;
  availableFormats?: ExportFormat[];
  defaultFormat?: ExportFormat;
  buttonText?: string;
}


// Download Botton Components
const ExportButtons: React.FC<ExportButtonsProps> = ({
  onExport,
  availableFormats = ['PDF', 'CSV', 'XLSX'],
  defaultFormat = 'PDF',
  buttonText = 'Download Report'
}) => {
  const [format, setFormat] = useState<ExportFormat>(defaultFormat);

  const handleFormatChange = (event: SelectChangeEvent<string>) => {
    setFormat(event.target.value as ExportFormat);
  };

  const handleExport = () => {
    onExport(format);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 130, mt: 3, mb: 2 }}>  {/* Drop down and Button Component */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ mr: 1 }}>
          Export As
        </Typography>
        <StyledFormControl size="small">
          <Select
            value={format}
            onChange={handleFormatChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Export format' }}
            sx={{ py: 0.5, pl: 1 }}
          >
            {availableFormats.map((fmt) => (
              <MenuItem key={fmt} value={fmt}>
                {fmt}
              </MenuItem>
            ))}
          </Select>
        </StyledFormControl>
      </Box>
      
      <DownloadButton
        variant="contained"
        onClick={handleExport}
      >
        {buttonText}
      </DownloadButton>
    </Box>
  );
};

export default ExportButtons;