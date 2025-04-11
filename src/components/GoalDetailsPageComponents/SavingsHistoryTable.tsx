import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer } from "@mui/material";

const SavingsHistoryTable: React.FC = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
            <TableCell><strong>Amount</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>2025-04-10</TableCell>
            <TableCell>Added savings</TableCell>
            <TableCell>$100</TableCell>
          </TableRow>
          {/* More rows dynamically inserted */}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SavingsHistoryTable;