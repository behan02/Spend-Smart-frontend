import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

function transactionData(
  date: string,
  category: string,
  amount: string | number,
  type: string
) {
  return { date, category, amount, type };
}

const rows = [
  transactionData("12/02/2024", "Foods", "LKR 500", "Expense"),
  transactionData("05/10/2025", "Grocery", "LKR 300", "Expense"),
  transactionData("15/03/2024", "Transport", "LKR 200", "Expense"),
  transactionData("23/01/2024", "Transport", "LKR 450", "Income"),
  transactionData("12/06/2023", "Foods", "LKR 800", "Expense"),
  transactionData("25/04/2025", "Entertainment", "LKR 1000", "Income"),
];

export default function BasicTable() {
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 2,
        width: "100%",
        padding: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography sx={{ m: 2, fontWeight: "bold" }}>
        Transaction Summary
      </Typography>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.date}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
