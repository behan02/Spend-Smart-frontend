import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Select, 
  MenuItem, 
  Button, 
  CircularProgress, 
  Alert,
  FormControl,
  InputLabel,
  Stack
} from '@mui/material';
import { Download, Assessment } from '@mui/icons-material';

interface MonthlyReportCardProps {
  onReportGenerated?: (data: any) => void;
}

const MonthlyReportCard: React.FC<MonthlyReportCardProps> = ({ onReportGenerated }) => {
  const [selectedMonth, setSelectedMonth] = useState(7); // July default
  const [selectedYear, setSelectedYear] = useState(2025);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<Date | null>(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  const years = [2025, 2026, 2027]; // Updated to show 2025-2027 range

  const handleGenerateReport = async () => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch(`http://localhost:5110/api/User/monthly-report/${selectedYear}/${selectedMonth}`);
      
      if (!response.ok) {
        throw new Error(`Failed to generate report: ${response.status}`);
      }

      const reportData = await response.json();
      setLastGenerated(new Date());
      setMessage(`Report generated successfully for ${months.find(m => m.value === selectedMonth)?.label} ${selectedYear}`);
      setMessageType('success');
      
      if (onReportGenerated) {
        onReportGenerated(reportData);
      }
    } catch (error) {
      console.error('Error generating report:', error);
      setMessage('Failed to generate report. Please try again.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    setDownloading(true);
    setMessage('');

    try {
      const response = await fetch(`http://localhost:5110/api/User/download-report/${selectedYear}/${selectedMonth}`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`Failed to download report: ${response.status}`);
      }

      // Get the filename for PDF
      const filename = `SpendSmart_Monthly_Report_${selectedYear}_${selectedMonth.toString().padStart(2, '0')}.pdf`;
      
      // Create blob and download
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setMessage('PDF report downloaded successfully!');
      setMessageType('success');
    } catch (error) {
      console.error('Error downloading report:', error);
      setMessage('Failed to download PDF report. Please try again.');
      setMessageType('error');
    } finally {
      setDownloading(false);
    }
  };



  return (
    <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        <Assessment sx={{ mr: 1, verticalAlign: 'middle' }} />
        Monthly Report Generation
      </Typography>
      <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
        Generate comprehensive monthly reports for user analytics and system insights
      </Typography>

      {message && (
        <Alert severity={messageType} sx={{ mb: 2 }}>
          {message}
        </Alert>
      )}

      <Stack direction="row" spacing={2} sx={{ mb: 3, alignItems: 'center' }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            label="Month"
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {months.map((month) => (
              <MenuItem key={month.value} value={month.value}>
                {month.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 100 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            label="Year"
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleGenerateReport}
          disabled={loading || downloading}
          startIcon={loading ? <CircularProgress size={20} /> : <Assessment />}
        >
          {loading ? 'Generating...' : 'Generate Report'}
        </Button>

        <Button
          variant="outlined"
          onClick={handleDownloadReport}
          disabled={downloading || loading}
          startIcon={downloading ? <CircularProgress size={20} /> : <Download />}
        >
          {downloading ? 'Downloading PDF...' : 'Download PDF Report'}
        </Button>
      </Stack>

      {lastGenerated && (
        <Typography variant="body2" color="textSecondary">
          Last Generated: {lastGenerated.toLocaleString()}
          <Typography component="span" sx={{ ml: 2, color: 'success.main' }}>
            ✅ Ready
          </Typography>
        </Typography>
      )}
    </Box>
  );
};

export default MonthlyReportCard;