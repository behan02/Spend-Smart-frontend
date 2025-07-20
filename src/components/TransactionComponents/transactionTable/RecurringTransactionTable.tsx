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
  Stack
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
  DeleteOutline
} from '@mui/icons-material';
import { JSX } from '@emotion/react/jsx-runtime';
import CategoryIcons, { iconType } from '../../../assets/categoryIcons/CategoryIcons';
import { add } from 'date-fns';

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
    occurrences: number;
    autoDeduction: boolean;
    userId: number;
    nextExecutionDate: string;
    isActive: boolean;
}

interface RecurringTransactionsDisplayProps {
  addRecurringTransactionSuccessfully: boolean;
  setAddRecurringTransactionSuccessfully: (value: boolean) => void;
}

const RecurringTransactionsDisplay: React.FC<RecurringTransactionsDisplayProps> = ({addRecurringTransactionSuccessfully, setAddRecurringTransactionSuccessfully}) => {
  // Store expanded card IDs in an array
  const [expandedCards, setExpandedCards] = useState<number[]>([]);
  const [recurringTransactionList, setRecurringTransactionList] = useState<RecurringTransaction[]>([]);

  // Toggle expand/collapse for a card
  const handleExpandClick = (id: number) => {
    setExpandedCards((prev) =>
      prev.includes(id)
        ? prev.filter(cardId => cardId !== id) // Collapse if already expanded
        : [...prev, id] // Expand if not expanded
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

  useEffect(() => {
      async function fetchRecurringTransactions(){
        try{
          const response = await fetch(`https://localhost:7211/api/RecurringTransaction/GetRecurringTransactions`);
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
        setAddRecurringTransactionSuccessfully(false); // Reset the flag after fetching
      }
      
    },[addRecurringTransactionSuccessfully]);

    async function deleteRecurringTransaction(id: number) {
    try{
      console.log("Deleting transaction with ID:", id);
      const response = await fetch(`https://localhost:7211/api/RecurringTransaction/DeleteRecurringTransaction/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!response.ok){
        throw new Error("Failed to delete transaction");
      }
      // Update the transaction list after deletion
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
          // <Grid item xs={12} md={6} lg={4} key={transaction.id}>
          <Grid size={{mobile:12, desktop:4, laptop:6}} key={transaction.id}>
            <Card 
              elevation={3}
              sx={{ 
                // height: '100%',
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
                      // bgcolor: getCategoryColor(transaction.category),
                      bgcolor: "#fff",
                      mr: 2,
                      width: 48,
                      height: 48
                    }}
                  >
                    {/* {getCategoryIcon(transaction.category)} */}
                    {CategoryIcons.map((item: iconType, iconIndex: number) => (
                      transaction.categoryName === item.category ? <item.icon key={iconIndex} sx={{color: item.color}}/> : null
                    ))}
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
                      // fontWeight: 'bold',
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
                      // label={`${transaction.occurrences} times`}
                      label={`${transaction.frequency}`}
                      variant="outlined"
                      size="small"
                    />
                  </Stack>
                  <IconButton onClick={() => deleteRecurringTransaction(transaction.id)}>
                    <DeleteOutline fontSize='small'/>
                  </IconButton>
                </Stack>

                {/* <FormControlLabel
                  control={
                    <Switch
                      checked={transaction.autoDeduct}
                      onChange={() => handleAutoDeductToggle(transaction.id)}
                      color="primary"
                    />
                  }
                  label="Auto Deduct"
                /> */}

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
                        Auto Deduct
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        {transaction.autoDeduction ? 'Enabled' : 'Disabled'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    {/* </Container> */}
    </Box>
  );
};

export default RecurringTransactionsDisplay;