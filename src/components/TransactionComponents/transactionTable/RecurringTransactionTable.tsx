import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Switch,
  Box,
  Avatar,
  Divider,
  FormControlLabel,
  IconButton,
  Collapse,
  Container,
  Paper,
  Stack,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery
} from '@mui/material';
import { Grid } from '@mui/material';
import {
  ExpandMore,
  ExpandLess,
  AttachMoney,
  ShoppingCart,
  Home,
  DirectionsCar,
  Restaurant,
  LocalHospital,
  School,
  TrendingUp,
  CalendarToday,
  Repeat,
  AccountBalance,
  Delete,
  DeleteOutline,
  Visibility,
  DeleteSweep
} from '@mui/icons-material';
import { JSX } from '@emotion/react/jsx-runtime';
import CategoryIcons, { iconType } from '../../../assets/categoryIcons/CategoryIcons';
import theme from '../../../assets/styles/theme';

interface RecurringTransaction {
    id: number;
    type: string;
    categoryId: number;
    categoryName: string;
    amount: number;
    description: string;
    frequency: string;
    startDate: string;
    endDate?: string;
    occurrences?: number;
    nextExecutionDate: string;
    isActive: boolean;
    generatedTransactionsCount: number;
}

interface ExecutedTransaction {
  id: number;
  type: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  userId: number;
  recurringTransactionId: number;
}

interface RecurringTransactionsDisplayProps {
  addRecurringTransactionSuccessfully: boolean;
  setAddRecurringTransactionSuccessfully: (value: boolean) => void;
  setExecutedTransactionsDeleted?: (value: boolean) => void; // Add new prop
}

const RecurringTransactionsDisplay: React.FC<RecurringTransactionsDisplayProps> = ({
  addRecurringTransactionSuccessfully, 
  setAddRecurringTransactionSuccessfully,
  setExecutedTransactionsDeleted // Add new prop
}) => {
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [recurringTransactionList, setRecurringTransactionList] = useState<RecurringTransaction[]>([]);
  const [viewingTransactions, setViewingTransactions] = useState<number | null>(null); // Track which card is showing transactions
  const [executedTransactions, setExecutedTransactions] = useState<ExecutedTransaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const isTabletOrDesktop: boolean = useMediaQuery(theme.breakpoints.down("laptop"));

  // Toggle expand/collapse for a card
  const handleExpandClick = (id: number) => {
    setExpandedCards((prev) =>
      prev.includes(id)
        ? prev.filter(cardId => cardId !== id)
        : [...prev, id]
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  let userId: number = 1;

  // Fetch executed transactions for a specific recurring transaction
  const fetchExecutedTransactions = async (recurringTransactionId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://localhost:7211/api/RecurringTransaction/transactions/${userId}/${recurringTransactionId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch executed transactions");
      }
      const data = await response.json();
      setExecutedTransactions(data);
      setViewingTransactions(recurringTransactionId);
    } catch (error) {
      console.error("Error fetching executed transactions:", error);
      alert("Failed to fetch transactions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Delete all executed transactions for a specific recurring transaction
  const deleteAllExecutedTransactions = async (recurringTransactionId: number) => {
    if (!window.confirm("Are you sure you want to delete all executed transactions for this recurring transaction?")) {
      return;
    }

    try {
      const response = await fetch(`https://localhost:7211/api/RecurringTransaction/transactions/${userId}/${recurringTransactionId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete executed transactions");
      }
      alert("All executed transactions deleted successfully!");
      
      // If we're currently viewing transactions for this recurring transaction, refresh the view
      if (viewingTransactions === recurringTransactionId) {
        await fetchExecutedTransactions(recurringTransactionId);
      }

      // Notify parent component to refresh the main transaction table
      if (setExecutedTransactionsDeleted) {
        setExecutedTransactionsDeleted(true);
      }
      
    } catch (error) {
      console.error("Error deleting executed transactions:", error);
      alert("Failed to delete transactions. Please try again.");
    }
  };

  // Delete a single executed transaction
  const deleteExecutedTransaction = async (transactionId: number) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) {
      return;
    }

    try {
      const response = await fetch(`https://localhost:7211/api/Transaction/DeleteTransaction/${userId}/${transactionId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }
      
      // Remove the deleted transaction from the local state
      setExecutedTransactions(prev => prev.filter(transaction => transaction.id !== transactionId));
      
      // Notify parent component to refresh the main transaction table
      if (setExecutedTransactionsDeleted) {
        setExecutedTransactionsDeleted(true);
      }
      
      console.log("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction. Please try again.");
    }
  };

  // Hide transactions table
  const hideTransactions = () => {
    setViewingTransactions(null);
    setExecutedTransactions([]);
  };

  useEffect(() => {
    async function fetchRecurringTransactions(){
      try{
        const response = await fetch(`https://localhost:7211/api/RecurringTransaction/active/${userId}`);
        if(!response.ok){
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setRecurringTransactionList(data);
      }catch(error){
        console.error("Error fetching transactions:", error);
      }
    }

    fetchRecurringTransactions();

    if(addRecurringTransactionSuccessfully) {
      fetchRecurringTransactions();
      setAddRecurringTransactionSuccessfully(false);
    }
  },[addRecurringTransactionSuccessfully]);

  async function deleteRecurringTransaction(id: number) {
    try{
      console.log("Deleting transaction with ID:", id);
      const response = await fetch(`https://localhost:7211/api/RecurringTransaction/DeleteRecurringTransaction/${userId}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!response.ok){
        throw new Error("Failed to delete transaction");
      }
      setRecurringTransactionList((prevList) => prevList.filter((transaction) => transaction.id !== id));
    }catch(error){
      console.error("Error deleting transaction:", error);
    }
  }

  return (
    <Box sx={{mt: "40px"}}>
      <Paper elevation={0} sx={{ mb: 4, p: 2, borderRadius: "10px", background: 'linear-gradient(135deg, #023E8A 0%, #667eea 100%)' }}>
        <Typography variant="h5" component="h1" sx={{ color: 'white', fontWeight: 'bold' }}>
          Recurring Transactions
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)'}}>
          Manage your recurring income and expenses
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {recurringTransactionList.map((transaction) => (
          <Grid size={{mobile:12, desktop:4, laptop:6}} key={transaction.id}>
            <Card 
              elevation={3}
              sx={{ 
                transition: 'all 0.3s ease',
                borderRadius: '10px',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar
                    sx={{
                      bgcolor: "#fff",
                      mr: 2,
                      width: 48,
                      height: 48
                    }}
                  >
                    {CategoryIcons.map((item: iconType, iconIndex: number) =>
                      transaction.categoryName === item.category ? (
                        <Box
                          key={iconIndex}
                          sx={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            backgroundColor: item.color,
                          }}
                        >
                          <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                        </Box>
                      ) : null
                    )}
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2">
                      {transaction.categoryName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {transaction.description}
                    </Typography>
                  </Box>
                  <Chip
                    label={transaction.type}
                    color={transaction.type === 'Income' ? 'success' : 'error'}
                    size="small"
                    sx={{ textTransform: 'capitalize' }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: transaction.type === 'Income' ? 'success.main' : 'error.main',
                    }}
                  >
                    {transaction.type === 'Income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </Typography>
                  <IconButton
                    onClick={() => handleExpandClick(transaction.id)}
                    sx={{ ml: 1 }}
                  >
                    {expandedCards.includes(transaction.id) ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                </Box>

                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      icon={<CalendarToday />}
                      label={`Next: ${formatDate(transaction.nextExecutionDate)}`}
                      variant="outlined"
                      size="small"
                    />
                    <Chip
                      icon={<Repeat />}
                      label={`${transaction.frequency}`}
                      variant="outlined"
                      size="small"
                    />
                  </Stack>
                  <IconButton onClick={() => deleteRecurringTransaction(transaction.id)}>
                    <DeleteOutline fontSize='small'/>
                  </IconButton>
                </Stack>

                {/* New Action Buttons */}
                <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<Visibility />}
                    onClick={() => fetchExecutedTransactions(transaction.id)}
                    disabled={loading}
                    sx={{ 
                      borderRadius: "15px",
                      textTransform: "none",
                      fontSize: "0.75rem"
                    }}
                  >
                    View All Transactions
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    color="error"
                    startIcon={<DeleteSweep />}
                    onClick={() => deleteAllExecutedTransactions(transaction.id)}
                    sx={{ 
                      borderRadius: "15px",
                      textTransform: "none",
                      fontSize: "0.75rem"
                    }}
                  >
                    Delete All
                  </Button>
                </Stack>

                <Collapse in={expandedCards.includes(transaction.id)} timeout="auto" unmountOnExit>
                  <Divider sx={{ my: 2 }} />
                  <Grid container spacing={2}>
                    <Grid size={{mobile:6, desktop:6, laptop:6}}>
                      <Typography variant="body2" color="text.secondary">
                        Start Date
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {formatDate(transaction.startDate)}
                      </Typography>
                    </Grid>
                    <Grid size={{mobile:6, desktop:6, laptop:6}}>
                      <Typography variant="body2" color="text.secondary">
                        End Date
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {transaction.endDate ? formatDate(transaction.endDate) : 'Ongoing'}
                      </Typography>
                    </Grid>
                    <Grid size={{mobile:6, desktop:6, laptop:6}}>
                      <Typography variant="body2" color="text.secondary">
                        Total Occurrences
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {transaction.occurrences}
                      </Typography>
                    </Grid>
                    <Grid size={{mobile:6, desktop:6, laptop:6}}>
                      <Typography variant="body2" color="text.secondary">
                        Generated Transactions
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {transaction.generatedTransactionsCount}
                      </Typography>
                    </Grid>
                  </Grid>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Executed Transactions Table */}
      {viewingTransactions && executedTransactions.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Paper elevation={0} sx={{ mb: 2, p: 2, borderRadius: "10px", background: 'linear-gradient(135deg, #023E8A 0%, #667eea 100%)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" component="h2" sx={{ color: 'white', fontWeight: 'bold' }}>
                  Executed Transactions
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)'}}>
                  All transactions executed from this recurring transaction
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={hideTransactions}
                sx={{ 
                  borderRadius: "15px",
                  backgroundColor: "#9c27b0", // Red color for the button
                  color: "white",
                  '&:hover': {
                    backgroundColor: "#7b1fa2", // Darker red on hover
                  }, 
                }}
              >
                Hide
              </Button>
            </Box>
          </Paper>

          {/* Desktop/Tablet Table */}
          <Box sx={{
            [theme.breakpoints.between("mobile","tablet")]: {
              display: "none",
            }
          }}>
            <TableContainer component={Paper} sx={{borderRadius: "15px"}}>
              <Table sx={{ minWidth: 650 }} aria-label="executed transactions table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell sx={{fontWeight: "bold"}}>Type</TableCell>
                    <TableCell sx={{fontWeight: "bold"}}>Category</TableCell>
                    <TableCell sx={{fontWeight: "bold"}}>Date</TableCell>
                    <TableCell sx={{fontWeight: "bold"}}>Description</TableCell>
                    <TableCell sx={{fontWeight: "bold"}}>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {executedTransactions.map((transaction: ExecutedTransaction, index: number) => (
                    <TableRow 
                      key={transaction.id || index} 
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell sx={{textAlign: "center"}}>
                        {CategoryIcons.map((item: iconType, iconIndex: number) => (
                          transaction.category === item.category ? (
                            <Box
                              key={iconIndex}
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                backgroundColor: item.color,
                              }}
                            >
                              <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                            </Box>
                          ) : null
                        ))}
                      </TableCell>
                      <TableCell>
                        <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">
                          {transaction.type}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">
                          {transaction.category}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">
                          {transaction.date}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{wordBreak: "break-word", whiteSpace: "normal", maxWidth: "250px"}}>
                        <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">
                          {transaction.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}>
                          <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p" sx={{
                            color: transaction.type === "Income" ? "#19A23D" : "#EE3838",
                            fontWeight: "bold",
                          }}>
                            {formatCurrency(transaction.amount)}
                          </Typography>
                          <IconButton 
                            onClick={() => deleteExecutedTransaction(transaction.id)}
                            size="small"
                            // sx={{ 
                            //   color: "error.main",
                            //   '&:hover': {
                            //     backgroundColor: "error.light",
                            //     color: "white"
                            //   }
                            // }}
                          >
                            <DeleteOutline fontSize="medium" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          {/* Mobile Table */}
          <Box sx={{
            [theme.breakpoints.between("mobile", "tablet")]: {
              display: "block",
            },
            [theme.breakpoints.up("tablet")]: {
              display: "none"
            }
          }}>
            <TableContainer component={Paper} sx={{borderRadius: "15px"}}>
              <Table aria-label="executed transactions mobile table">
                <TableBody>
                  {executedTransactions.map((transaction: ExecutedTransaction, index: number) => (
                    <TableRow key={transaction.id || index}>
                      <TableCell sx={{textAlign: "center"}}>
                        {CategoryIcons.map((item: iconType, iconIndex: number) => (
                          transaction.category === item.category ? (
                            <Box
                              key={iconIndex}
                              sx={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                backgroundColor: item.color,
                              }}
                            >
                              <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                            </Box>
                          ) : null
                        ))}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" component="p">{transaction.category}</Typography>
                        <Typography variant="body2" component="p">{transaction.type}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" component="p">{transaction.date}</Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}>
                          <Typography variant="body2" component="p" sx={{
                            color: transaction.type === "Income" ? "#19A23D" : "#EE3838",
                            fontWeight: "bold",
                          }}>
                            {formatCurrency(transaction.amount)}
                          </Typography>
                          <IconButton 
                            onClick={() => deleteExecutedTransaction(transaction.id)}
                            size="small"
                            sx={{ 
                              color: "error.main",
                              '&:hover': {
                                backgroundColor: "error.light",
                                color: "white"
                              }
                            }}
                          >
                            <DeleteOutline fontSize="small" />
                          </IconButton>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}

      {/* No transactions message */}
      {viewingTransactions && executedTransactions.length === 0 && !loading && (
        <Box sx={{ mt: 4 }}>
          <Paper elevation={0} sx={{ p: 3, borderRadius: "10px", textAlign: "center" }}>
            <Typography variant="h6" color="text.secondary">
              No executed transactions found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This recurring transaction hasn't executed any transactions yet.
            </Typography>
            <Button
              variant="outlined"
              onClick={hideTransactions}
              sx={{ mt: 2, borderRadius: "15px" }}
            >
              Close
            </Button>
          </Paper>
        </Box>
      )}
    </Box>
  );
};

export default RecurringTransactionsDisplay;