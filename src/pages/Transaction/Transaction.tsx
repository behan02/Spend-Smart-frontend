import { Box } from "@mui/material";
import TransactionBanner from "../../components/transactionBanner/TransactionBanner";
import TransactionFilter from "../../components/transactionFilter/TransactionFilter";
import TransactionTable from "../../components/transactionTable/TransactionTable";
import Footer from "../../components/footer/Footer";
import { useState } from "react";
import RecurringTransactionForm from "../../components/transactionForm/RecurringTransactionForm";
import AddTransactionForm from "../../components/transactionForm/AddTransactionForm";
import Header from "../../components/header/Header";

const Transaction: React.FC = () => {

    const [addTransaction, setAddTransaction] = useState<boolean>(false);
    const [recurringTransaction, setRecurringTransaction] = useState<boolean>(false);

    return (
        <Box>
            <Box sx={{
                margin: "30px auto",
                width: "85%",
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
    )
}

export default Transaction;