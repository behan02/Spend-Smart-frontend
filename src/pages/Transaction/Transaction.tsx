import { Box, Stack, ThemeProvider } from "@mui/material";
import TransactionBanner from "../../components/TransactionComponents/transactionBanner/TransactionBanner";
import TransactionFilter from "../../components/TransactionComponents/transactionFilter/TransactionFilter";
import TransactionTable from "../../components/TransactionComponents/transactionTable/TransactionTable";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import RecurringTransactionForm from "../../components/TransactionComponents/transactionForm/RecurringTransactionForm";
import AddTransactionForm from "../../components/TransactionComponents/transactionForm/AddTransactionForm";
import Header from "../../components/header/header";
import theme from "../../assets/styles/theme";
import Sidebar from "../../components/sidebar/sidebar";

const Transaction: React.FC = () => {

    const [addTransaction, setAddTransaction] = useState<boolean>(false);
    const [recurringTransaction, setRecurringTransaction] = useState<boolean>(false);

    return (
        <ThemeProvider theme={theme}>
            <Stack direction="row">
                <Box>
                    <Sidebar />
                </Box>
            
                <Box flexGrow={1} minHeight="100vh" display="flex" flexDirection="column">
                    <Box sx={{
                        padding: "20px 60px",
                        flexGrow: 1,
                    }}>
                        <Box>
                            <Header pageName="Transactions" />
                        </Box>
                        <Box>
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
                    </Box>
                
                    <Box>
                        <Footer />
                    </Box>
                </Box>
            </Stack>
        </ThemeProvider>
    )
}

export default Transaction;