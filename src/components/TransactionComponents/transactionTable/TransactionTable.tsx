import React, { useState, useEffect } from 'react';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography, useMediaQuery, CircularProgress } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import theme from "../../../assets/styles/theme";
import { transactionApi, TransactionView } from '../../../api/transactionApi';
import { useUser } from '../../../context/UserContext';

// Interface for our local transaction type
interface Transaction {
  id: number;
  type: string;
  category: string;
  date: string;
  description?: string;
  amount: number;
  userId?: number;
}

interface TransactionTableProps {
  onTransactionDeleted?: () => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({ onTransactionDeleted }) => {
  const { user } = useUser();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const isTabletOrDesktop: boolean = useMediaQuery(theme.breakpoints.down("laptop"));

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  const fetchTransactions = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const result = await transactionApi.getUserTransactions(user.id);
      console.log("Fetched transactions:", result);
      
      // Map API response to our Transaction interface
      const mappedTransactions: Transaction[] = result.map(t => ({
        id: t.id,
        type: t.type,
        category: t.category,
        date: t.date,
        description: t.description,
        amount: t.amount,
        userId: t.userId
      }));
      
      setTransactions(mappedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setError("Failed to load transactions. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTransaction = async (transactionId: number) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      await transactionApi.deleteTransaction(transactionId);
      // Remove from local state
      setTransactions(transactions.filter(t => t.id !== transactionId));
      // Notify parent component
      if (onTransactionDeleted) {
        onTransactionDeleted();
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (e) {
      return dateString;
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR',
      currencyDisplay: 'code'
    }).format(amount).replace('LKR', 'LKR');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
        <Typography>{error}</Typography>
        <Box mt={2}>
          <button onClick={fetchTransactions}>Try Again</button>
        </Box>
      </Box>
    );
  }

  if (transactions.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', color: 'text.secondary' }}>
        <Typography>No transactions found.</Typography>
      </Box>
    );
  }

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
                <TableCell sx={{fontWeight: "bold"}}>ID</TableCell>
                <TableCell sx={{fontWeight: "bold"}}>Type</TableCell>
                <TableCell sx={{fontWeight: "bold"}}>Category</TableCell>
                <TableCell sx={{fontWeight: "bold"}}>Date</TableCell>
                <TableCell sx={{fontWeight: "bold"}}>Description</TableCell>
                <TableCell sx={{fontWeight: "bold"}}>Amount</TableCell>
                <TableCell sx={{fontWeight: "bold"}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction: Transaction) => (
                <TableRow 
                  key={transaction.id} 
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>
                    <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">{transaction.type}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">{transaction.category}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">{formatDate(transaction.date)}</Typography>
                  </TableCell>
                  <TableCell sx={{wordBreak: "break-word", whiteSpace: "normal", maxWidth: "250px"}}>
                    <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">{transaction.description || 'N/A'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p" sx={{
                      color: transaction.type.toLowerCase() === "income" ? "#19A23D" : "#EE3838",
                      fontWeight: "bold",
                    }}>
                      {formatAmount(transaction.amount)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleDeleteTransaction(transaction.id)}>
                      <DeleteOutline fontSize="medium"/>
                    </IconButton>
                  </TableCell>
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
              {transactions.map((transaction: Transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>
                    <Typography variant="body2" component="p">{transaction.category}</Typography>
                    <Typography variant="body2" component="p">{transaction.type}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" component="p">{formatDate(transaction.date)}</Typography>
                    <Typography variant="body2" component="p">{transaction.description || 'N/A'}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                      <Typography variant="body2" component="p" sx={{
                        color: transaction.type.toLowerCase() === "income" ? "#19A23D" : "#EE3838",
                        fontWeight: "bold",
                      }}>
                        {formatAmount(transaction.amount)}
                      </Typography>
                      <IconButton onClick={() => handleDeleteTransaction(transaction.id)}>
                        <DeleteOutline fontSize="small"/>
                      </IconButton>
                    </Box>  
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ThemeProvider>
  );
};

export default TransactionTable;