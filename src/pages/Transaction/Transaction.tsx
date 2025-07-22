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
import RecurringTransactionsDisplay from "../../components/TransactionComponents/transactionTable/RecurringTransactionTable";

const Transaction: React.FC = () => {

    const [addTransaction, setAddTransaction] = useState<boolean>(false);
    const [recurringTransaction, setRecurringTransaction] = useState<boolean>(false);

    const [typeFilter, setTypeFilter] = useState<string>("");
    const [categoryFilter, setCategoryFilter] = useState<string>("");
    const [addfiltersuccessfully, setAddfiltersuccessfully] = useState<boolean>(false);
    const [addtransactionsuccessfully, setAddtransactionsuccessfully] = useState<boolean>(false);
    const [date, setDate] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [sortOption, setSortOption] = useState<string>("");
    const [sortApplied, setSortApplied] = useState<boolean>(false);
    const [addRecurringTransactionSuccessfully, setAddRecurringTransactionSuccessfully] = useState<boolean>(false);

    return (
        <ThemeProvider theme={theme}>
            <Stack direction="row">
                <Box>
                    <Sidebar />
                </Box>
            
                <Box flexGrow={1} minHeight="100vh" display="flex" flexDirection="column">
                    <Box sx={{
                        padding: "30px 40px",
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
                        <TransactionFilter 
                            setTypeFilter={setTypeFilter} 
                            setCategoryFilter={setCategoryFilter}
                            typeFilter={typeFilter}
                            categoryFilter={categoryFilter}
                            setAddfiltersuccessfully={setAddfiltersuccessfully}
                            setDate={setDate}
                            setStartDate={setStartDate}
                            setEndDate={setEndDate}
                            date={date}
                            startDate={startDate}
                            endDate={endDate}
                            setSortOption={setSortOption}
                            sortOption={sortOption}
                            setSortApplied={setSortApplied}
                        />
                        <TransactionTable 
                            typeFilter={typeFilter}
                            categoryFilter={categoryFilter}
                            addfiltersuccessfully={addfiltersuccessfully}
                            setAddfiltersuccessfully={setAddfiltersuccessfully}
                            addtransactionsuccessfully={addtransactionsuccessfully}
                            setAddtransactionsuccessfully={setAddtransactionsuccessfully}
                            date={date}
                            startDate={startDate}
                            endDate={endDate}
                            sortApplied={sortApplied}
                            setSortApplied={setSortApplied}
                            sortOption={sortOption}
                            addRecurringTransactionSuccessfully={addRecurringTransactionSuccessfully}
                            setAddRecurringTransactionSuccessfully={setAddRecurringTransactionSuccessfully}
                        />
                        <RecurringTransactionsDisplay 
                            addRecurringTransactionSuccessfully={addRecurringTransactionSuccessfully}
                            setAddRecurringTransactionSuccessfully={setAddRecurringTransactionSuccessfully}
                        />
                        <AddTransactionForm
                            addTransaction={addTransaction} 
                            setAddTransaction={setAddTransaction} 
                            addtransactionsuccessfully={addtransactionsuccessfully}
                            setAddtransactionsuccessfully={setAddtransactionsuccessfully}
                        />
                        <RecurringTransactionForm 
                            recurringTransaction={recurringTransaction} 
                            setRecurringTransaction={setRecurringTransaction}
                            setAddRecurringTransactionSuccessfully={setAddRecurringTransactionSuccessfully}
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