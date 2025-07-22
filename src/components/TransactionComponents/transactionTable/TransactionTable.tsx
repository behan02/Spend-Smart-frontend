import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ThemeProvider, Typography, useMediaQuery } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import theme from "../../../assets/styles/theme";
import { useEffect, useState } from "react";
import CategoryIcons, { iconType } from "../../../assets/categoryIcons/CategoryIcons";
import { set } from "date-fns";

interface Transaction {
  id: number;
  type: string;
  category: string;
  amount: number;
  date: string;
  description: string;
  userId: number;  
}

interface TransactionTableProps {
  typeFilter: string;
  categoryFilter: string;
  addfiltersuccessfully: boolean;
  setAddfiltersuccessfully: (clicked: boolean) => void;
  addtransactionsuccessfully: boolean;
  setAddtransactionsuccessfully: (clicked: boolean) => void;
  date: string;
  startDate: string;
  endDate: string;
  sortApplied: boolean;
  setSortApplied: (clicked: boolean) => void;
  sortOption: string;
  addRecurringTransactionSuccessfully: boolean;
  setAddRecurringTransactionSuccessfully: (clicked: boolean) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  typeFilter, 
  categoryFilter, 
  addfiltersuccessfully, 
  setAddfiltersuccessfully, 
  addtransactionsuccessfully, 
  setAddtransactionsuccessfully, 
  date, 
  startDate, 
  endDate, 
  sortApplied, 
  setSortApplied, 
  sortOption, 
  addRecurringTransactionSuccessfully, 
  setAddRecurringTransactionSuccessfully}) => {
    
  // Media query to check if the screen width is less than or equal to "laptop"
  const isTabletOrDesktop: boolean = useMediaQuery(theme.breakpoints.down("laptop"));

  // State to store the list of transactions
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);

  // State to control how many transactions to show
  const [showAll, setShowAll] = useState<boolean>(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR'
    }).format(amount);
  };

  let userId: number = 1; // Assuming a static user ID for now

  // Fetch transactions from the API
  useEffect(() => {
    async function fetchTransactions(){
      try{
        const response = await fetch(`https://localhost:7211/api/Transaction/GetTransaction/${userId}?type=${typeFilter}&category=${categoryFilter}&date=${date}&startDate=${startDate}&endDate=${endDate}&sorting=${sortOption}`);
        if(!response.ok){
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactionList(data);
      }catch(error){
        console.error("Error fetching transactions:", error);
      }
    }

    fetchTransactions();

    if(addtransactionsuccessfully || addfiltersuccessfully || sortApplied) {
      fetchTransactions();
      setAddtransactionsuccessfully(false);
      setAddfiltersuccessfully(false);
      setSortApplied(false);
      setAddRecurringTransactionSuccessfully(false);
    }
  },[addtransactionsuccessfully, addfiltersuccessfully, sortApplied, addRecurringTransactionSuccessfully]);

  // useEffect(() => {
  //   async function fetchTransactions(){
  //     try{
  //       const response = await fetch(`https://localhost:7211/api/Transaction/GetTransaction?filterOn=${filterOn}&filterQuery=Expense`);
  //       if(!response.ok){
  //         throw new Error("Failed to fetch transactions");
  //       }
  //       const data = await response.json();
  //       setTransactionList(data);
  //     }catch(error){
  //       console.error("Error fetching transactions:", error);
  //     }
  //   }

  //   fetchTransactions();
  // },[]);

  // Function to delete a transaction by ID
  async function deleteTransaction(id: number) {
    try{
      console.log("Deleting transaction with ID:", id);
      const response = await fetch(`https://localhost:7211/api/Transaction/DeleteTransaction/${userId}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if(!response.ok){
        throw new Error("Failed to delete transaction");
      }
      // Update the transaction list after deletion
      setTransactionList((prevList) => prevList.filter((transaction) => transaction.id !== id));
    }catch(error){
      console.error("Error deleting transaction:", error);
    }
  }
  // Get the transactions to display (limit to 10 if showAll is false)
  const getTransactionsToDisplay = () => {
    return showAll ? transactionList : transactionList.slice(0, 8);
  };

  // Toggle view more/less
  const handleViewToggle = () => {
    setShowAll(!showAll);
  };

  const transactionsToDisplay = getTransactionsToDisplay();

  return (
    <ThemeProvider theme={theme}>
      { /* Desktop and Tablet view */ }
      <Box sx={{
        [theme.breakpoints.between("mobile","tablet")]: {
          display: "none", // Hide table for mobile view
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
              </TableRow>
            </TableHead>
            <TableBody>
              {transactionsToDisplay.map((list: Transaction, index: number) => (
                <TableRow 
                  key={index} 
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  {/* Category Icon */}
                  {/* <TableCell sx={{textAlign: "center"}}>{CategoryIcons.map((item: iconType, iconIndex: number) => (
                    list.category === item.category ? <item.icon key={iconIndex} sx={{color: item.color}}/> : null
                  ))}</TableCell> */}
                  <TableCell sx={{textAlign: "center"}}>
                    {CategoryIcons.map((item: iconType, iconIndex: number) => (
                      list.category === item.category ? (
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
                  {/* Transaction Type */}
                  <TableCell>
                    <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">{list.type}</Typography>
                  </TableCell>
                  {/* Transaction Category */}
                  <TableCell>
                    <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">{list.category}</Typography>
                  </TableCell>
                  {/* Transaction Date */}
                  <TableCell>
                    <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">{list.date}</Typography>
                  </TableCell>
                  {/* Transaction Description */}
                  <TableCell sx={{wordBreak: "break-word", whiteSpace: "normal", maxWidth: "250px"}}>
                    <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p">{list.description}</Typography>
                  </TableCell>
                  {/* Transaction Amount and Delete Button */}
                  <TableCell>
                    <Box sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                      <Typography variant={isTabletOrDesktop ? "body2" : "body1"} component="p" sx={{
                        color: list.type === "Income" ? "#19A23D" : "#EE3838",
                        fontWeight: "bold",
                      }}
                      >
                        {/* {list.amount} */}
                        {formatCurrency(list.amount)}
                      </Typography>
                      <IconButton onClick={() => deleteTransaction(list.id)}>
                        <DeleteOutline fontSize="medium"/>
                      </IconButton>
                    </Box>  
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* View More/Less Button for Desktop/Tablet */}
        {transactionList.length > 8 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button 
              variant="outlined" 
              onClick={handleViewToggle}
              disableRipple
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                px: 3,
                py: 1
              }}
            >
              {showAll ? "View Less" : `View More (${transactionList.length - 8} more)`}
            </Button>
          </Box>
        )}
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
              {transactionList.map((list: Transaction, index: number) => (
                <TableRow key={index}>
                  {/* <TableCell sx={{textAlign: "center"}}>{CategoryIcons.map((item: iconType, iconIndex: number) => (
                    list.category === item.category ? <span key={iconIndex} style={{ fontSize: "1.5rem" }}>{item.icon}</span> : null
                  ))}
                  </TableCell> */}
                  <TableCell sx={{textAlign: "center"}}>
                    {CategoryIcons.map((item: iconType, iconIndex: number) => (
                      list.category === item.category ? (
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
                    <Typography variant="body2" component="p">{list.category}</Typography>
                    <Typography variant="body2" component="p">{list.type}</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" component="p">{list.date}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}>
                      <Typography variant="body2" component="p" sx={{
                        color: list.type === "Income" ? "#19A23D" : "#EE3838",
                        fontWeight: "bold",
                      }}
                      >
                        {list.amount}
                      </Typography>
                      <IconButton onClick={() => deleteTransaction(list.id)}>
                        <DeleteOutline fontSize="small"/>
                      </IconButton>
                    </Box>  
                  </TableCell>
                  {/* <TableCell><DeleteOutline /></TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {/* View More/Less Button for Mobile */}
        {transactionList.length > 10 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button 
              variant="outlined" 
              onClick={handleViewToggle}
              sx={{
                borderRadius: "20px",
                textTransform: "none",
                px: 3,
                py: 1
              }}
            >
              {showAll ? "View Less" : `View More (${transactionList.length - 10} more)`}
            </Button>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  )
}

export default TransactionTable;