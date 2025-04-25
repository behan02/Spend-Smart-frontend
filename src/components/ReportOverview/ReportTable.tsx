import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ViewButton from "./ViewButton";

type RowData = {
  reportName: string;
  dateRange: string;
};

function createData(reportName: string, dateRange: string): RowData {
  return { reportName, dateRange };
}

const rows: RowData[] = [
  createData("Sales Report", "2025-01-01 to 2025-02-01"),
  createData("Inventory Summary", "2025-02-01 to 2025-03-01"),
  createData("Revenue Trends", "2025-03-01 to 2025-04-01"),
  createData("Customer Insights", "2025-04-01 to 2025-04-20"),
  createData("Marketing Overview", "2025-04-01 to 2025-04-15"),
];

const ReportTable: React.FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="report table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Report Name</TableCell>
            <TableCell sx={{ fontWeight: "bold" }}>Date Range</TableCell>
            <TableCell sx={{ fontWeight: "bold" }} align="center">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.reportName}</TableCell>
              <TableCell>{row.dateRange}</TableCell>
              <TableCell align="center">
                <ViewButton />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportTable;