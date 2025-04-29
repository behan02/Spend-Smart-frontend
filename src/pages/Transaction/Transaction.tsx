import { Box, ThemeProvider } from "@mui/material";
import TransactionBanner from "../../components/TransactionComponents/transactionBanner/TransactionBanner";
import TransactionFilter from "../../components/TransactionComponents/transactionFilter/TransactionFilter";
import TransactionTable from "../../components/TransactionComponents/transactionTable/TransactionTable";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import RecurringTransactionForm from "../../components/TransactionComponents/transactionForm/RecurringTransactionForm";
import AddTransactionForm from "../../components/TransactionComponents/transactionForm/AddTransactionForm";
import Header from "../../components/header/header";
import theme from "../../assets/styles/theme";

const Transaction: React.FC = () => {

    const [addTransaction, setAddTransaction] = useState<boolean>(false);
    const [recurringTransaction, setRecurringTransaction] = useState<boolean>(false);

    return (
        <ThemeProvider theme={theme}>
        <Box>
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
                <TransactionTable />
                <AddTransactionForm
                    addTransaction={addTransaction} 
                    setAddTransaction={setAddTransaction} 
                />
                <RecurringTransactionForm 
                    recurringTransaction={recurringTransaction} 
                    setRecurringTransaction={setRecurringTransaction}
                />
            </Box>
            <Box>
                <Footer />
            </Box>
        </Box>
        </ThemeProvider>
    )
}

export default Transaction;