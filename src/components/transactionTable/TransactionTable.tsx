import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import theme from "../../assets/styles/theme";

interface Transaction {
  type: string;
  category: string;
  date: string;
  description: string;
  amount: number;
}

let tablelist: Transaction[] = [
  {
    type: "Expense",
    category: "Transport",
    date: "20/11/2024",
    description:
      "Travelling expenses",
    amount: 670,
  },
  {
    type: "Income",
    category: "Salary",
    date: "22/11/2024",
    description: "Salary income",
    amount: 180000,
  },
  {
    type: "Income",
    category: "Sales",
    date: "29/11/2024",
    description: "Sales",
    amount: 18000,
  },
  {
    type: "Expense",
    category: "Food",
    date: "16/11/2024",
    description: "For my lunch",
    amount: 450,
  },
  {
    type: "Income",
    category: "Salary",
    date: "30/11/2024",
    description: "Salary income",
    amount: 180000,
  }
];

const TransactionTable: React.FC = () => {

  return (
    <ThemeProvider theme={theme}>
      { /* Desktop and Tablet view */ }
      <Box mt="30px" sx={{
        [theme.breakpoints.between("mobile","tablet")]: {
          display: "none",
        }
      }}>
        <TableContainer component={Paper} sx={{borderRadius: "15px"}}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell sx={{fontWeight: "bold"}}>Type</TableCell>
                <TableCell sx={{fontWeight: "bold"}}>Category</TableCell>
                <TableCell sx={{fontWeight: "bold"}}>Date</TableCell>
                <TableCell sx={{fontWeight: "bold"}}>Description</TableCell>
                <TableCell sx={{fontWeight: "bold"}}>Amount</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tablelist.map((list: Transaction, index: number) => (
                <TableRow 
                  key={index} 
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>##</TableCell>
                  <TableCell>{list.type}</TableCell>
                  <TableCell>{list.category}</TableCell>
                  <TableCell>{list.date}</TableCell>
                  <TableCell sx={{wordBreak: "break-word", whiteSpace: "normal", maxWidth: "250px"}}>{list.description}</TableCell>
                  <TableCell sx={{
                    color: list.type === "Income" ? "#19A23D" : "#EE3838",
                    fontWeight: "bold",
                  }}>{list.amount}
                  </TableCell>
                  <TableCell align="right"><Button variant="text" sx={{color: "#000"}} onClick={() => confirm("Are you sure?")}><DeleteOutline /></Button> </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Mobile view */}
      <Box mt="30px" sx={{
        [theme.breakpoints.between("mobile", "tablet")]: {
          display: "block",
        },
        [theme.breakpoints.up("tablet")]: {
          display: "none"
        }
      }}>
        <TableContainer component={Paper} sx={{borderRadius: "15px"}}>
          <Table aria-label="simple table">
            <TableBody>
              {tablelist.map((list: Transaction, index: number) => (
                <TableRow key={index}>
                  <TableCell>##</TableCell>
                  <TableCell>
                    <Typography variant="body1" component="p">{list.category}</Typography>
                    <Typography variant="body1" component="p">{list.type}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" component="p">{list.date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body1" component="p" sx={{
                      color: list.type === "Income" ? "#19A23D" : "#EE3838",
                      fontWeight: "bold",
                    }}
                    >
                      {list.amount}
                    </Typography>
                  </TableCell>
                  <TableCell><DeleteOutline /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  )
}

export default TransactionTable;