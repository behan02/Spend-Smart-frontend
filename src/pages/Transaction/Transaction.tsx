import { Box, ThemeProvider } from "@mui/material";
import TransactionBanner from "../../components/TransactionComponents/transactionBanner/TransactionBanner";
import TransactionFilter from "../../components/TransactionComponents/transactionFilter/TransactionFilter";
import TransactionTable from "../../components/TransactionComponents/transactionTable/TransactionTable";
import Footer from "../../components/footer/Footer";
import { useState, useCallback } from "react";
import RecurringTransactionForm from "../../components/TransactionComponents/transactionForm/RecurringTransactionForm";
import AddTransactionForm from "../../components/TransactionComponents/transactionForm/AddTransactionForm";
import Header from "../../components/header/header";
import theme from "../../assets/styles/theme";
import Sidebar from "../../components/sidebar/sidebar"; 

const Transaction: React.FC = () => {
    const [addTransaction, setAddTransaction] = useState<boolean>(false);
    const [recurringTransaction, setRecurringTransaction] = useState<boolean>(false);
    const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

    // Callback to refresh transactions after a transaction is created or deleted
    const handleTransactionChange = useCallback(() => {
        console.log("Transaction changed, refreshing data...");
        setRefreshTrigger(prev => prev + 1);
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <Box display="flex">
                <Sidebar />
        <Box sx={{flexGrow: 1}}>
            <Box sx={{
                margin: "30px auto",
                width: "85%",
                [theme.breakpoints.between("mobile", "laptop")]: {  
                    width: "90%",
                },
            }}>
                <Header pageName="Transactions" />
                <TransactionBanner 
                    setAddTransaction={setAddTransaction} 
                    setRecurringTransaction={setRecurringTransaction} 
                />
                <TransactionFilter />
                <TransactionTable 
                    key={`transaction-table-${refreshTrigger}`}
                    onTransactionDeleted={handleTransactionChange}
                />
                <AddTransactionForm
                    addTransaction={addTransaction} 
                    setAddTransaction={setAddTransaction}
                    onTransactionCreated={handleTransactionChange}
                />
                <RecurringTransactionForm 
                    recurringTransaction={recurringTransaction} 
                    setRecurringTransaction={setRecurringTransaction}
                    onTransactionCreated={handleTransactionChange}
                />
            </Box>
            <Box>
                <Footer />
            </Box>
        </Box>
        </Box>
        </ThemeProvider>
    );
};

export default Transaction;