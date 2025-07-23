import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { UserConfig } from "../../config/userConfig";
import {
  getStoredReports,
  deleteStoredReport,
  StoredReport,
} from "../../Services/reportsService";

const ReportTable: React.FC = () => {
  const [reports, setReports] = useState<StoredReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<StoredReport | null>(
    null
  );
  const [deleting, setDeleting] = useState(false);

  const userId = UserConfig.getCurrentUserId(); // Get from centralized configuration

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedReports = await getStoredReports(userId);
      setReports(fetchedReports);
    } catch (err) {
      setError("Failed to fetch reports. Please try again.");
      console.error("Error fetching reports:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewReport = (report: StoredReport) => {
    // Open the Firebase URL in a new tab
    window.open(report.firebaseUrl, "_blank");
  };

  const handleDeleteClick = (report: StoredReport) => {
    setReportToDelete(report);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!reportToDelete) return;

    try {
      setDeleting(true);
      await deleteStoredReport(reportToDelete.id);

      // Remove from local state
      setReports(reports.filter((r) => r.id !== reportToDelete.id));

      setDeleteDialogOpen(false);
      setReportToDelete(null);
    } catch (err) {
      setError("Failed to delete report. Please try again.");
      console.error("Error deleting report:", err);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setReportToDelete(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Loading reports...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="stored reports table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Report Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Date Range</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Generated Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Box sx={{ py: 4 }}>
                    <Typography variant="h6" color="text.secondary">
                      No reports found
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 1 }}
                    >
                      Generate and download a report to see it here
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ) : (
              reports.map((report) => (
                <TableRow key={report.id} hover>
                  <TableCell>
                    <Typography variant="body1">{report.reportName}</Typography>
                    {report.description && (
                      <Typography variant="body2" color="text.secondary">
                        {report.description}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{report.dateRange}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {formatDate(report.dateGenerated)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Box
                      sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                    >
                      <Button
                        variant="contained"
                        startIcon={<ViewIcon />}
                        onClick={() => handleViewReport(report)}
                        size="small"
                        sx={{ minWidth: 80 }}
                      >
                        VIEW
                      </Button>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(report)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Report</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete "{reportToDelete?.reportName}"? This
            action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} disabled={deleting}>
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            variant="contained"
            disabled={deleting}
            startIcon={deleting ? <CircularProgress size={16} /> : null}
          >
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReportTable;
