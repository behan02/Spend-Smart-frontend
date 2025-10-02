import { Close } from "@mui/icons-material";
import { Box, Button, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Modal, Paper, Select, TextField, ThemeProvider, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import theme from "../../../assets/styles/theme";
import { categoryApi, Category } from "../../../api/categoryApi";
import { transactionApi } from "../../../api/transactionApi";
import { useUser } from "../../../context/UserContext";

interface RecurringTransactionProps {
    recurringTransaction: boolean;
    setRecurringTransaction: (value: boolean) => void;
    onTransactionCreated?: () => void;
}

const RecurringTransactionForm: React.FC<RecurringTransactionProps> = ({
    recurringTransaction, 
    setRecurringTransaction,
    onTransactionCreated
}) => {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    const [categoryID, setCategoryID] = useState('');
    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    
    const [frequency, setFrequency] = useState("Monthly");
    const [endDate, setEndDate] = useState("");
    const [occurrences, setOccurrences] = useState("");
    const [autoDeduct, setAutoDeduct] = useState(false);

    const [type, setType] = useState("");
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        if (recurringTransaction) {
            fetchCategories();
        }
    }, [recurringTransaction]);

    const fetchCategories = async () => {
        try {
            const result = await categoryApi.getAllCategories();
            setCategories(result);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([]);
        }
    };

    const resetForm = () => {
        setType("");
        setAmount("");
        setCategoryID("");
        setDate("");
        setDescription("");
        setFrequency("Monthly");
        setEndDate("");
        setOccurrences("");
        setAutoDeduct(false);
    };

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!user) {
            alert("Please log in to add transactions");
            return;
        }

        if (!type || !amount || !date || !categoryID) {
            alert("Please fill in all required fields");
            return;
        }

        setLoading(true);

        try {
            const transactionData = {
                categoryId: parseInt(categoryID),
                transactionType: type.charAt(0).toUpperCase() + type.slice(1) as 'Income' | 'Expense',
                amount: parseFloat(amount),
                description: description,
                transactionDate: date,
                isRecurring: true,
                recurringFrequency: frequency as 'Daily' | 'Weekly' | 'Monthly' | 'Annually',
                recurringEndDate: endDate || undefined
            };

            const result = await transactionApi.createTransaction(user.id, transactionData);
            console.log("Recurring transaction added successfully", result);
            
            // Check if budget was impacted
            if (result.budgetImpacts && result.budgetImpacts.length > 0) {
                console.log("Budget impacts:", result.budgetImpacts);
                const impactSummary = result.budgetImpacts.map(impact => 
                    `${impact.budgetName}: $${impact.impactAmount}`
                ).join(', ');
                alert(`Recurring transaction added successfully! Budget impacts: ${impactSummary}`);
            } else {
                alert("Recurring transaction added successfully!");
            }
            
            setRecurringTransaction(false);
            resetForm();
            
            // Call the callback to refresh parent component
            if (onTransactionCreated) {
                onTransactionCreated();
            }
        } catch (error) {
            console.error("Error adding recurring transaction:", error);
            alert("Failed to add recurring transaction. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <ThemeProvider theme={theme}>
        <Box>
            <Modal 
                open={recurringTransaction}
            >
                <Paper 
                    elevation={0} 
                    sx={{ 
                        width: "30%",
                        margin: "auto", 
                        padding: "20px 40px 40px 40px", 
                        position: "absolute", 
                        top: "50%", 
                        left: "50%", 
                        transform: "translate(-50%, -50%)", 
                        borderRadius: "15px",
                        [theme.breakpoints.between("mobile", "tablet")]: {
                            width: "80%",
                            height: "auto",
                            padding: "20px",
                        },
                        [theme.breakpoints.between("tablet", "laptop")]: {
                            width: "75%",
                        },
                        [theme.breakpoints.between("laptop", "desktop")]: {
                            width: "50%",
                        }
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="h5" sx={{
                            [theme.breakpoints.between("mobile", "tablet")]: {
                                fontSize: "20px",
                            }
                        }}>
                            Add Recurring Transaction
                        </Typography>
                        <IconButton onClick={() => {setRecurringTransaction(false); resetForm();}} aria-label="close">
                            <Close />
                        </IconButton>
                    </Box>
                    <Box 
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ 
                            display: "flex", 
                            flexDirection: "column", 
                            gap: "20px", 
                            mt: "20px",
                        }}
                    >
                        <Box sx={{
                            margin: "auto",
                            mb: "10px"
                        }}>
                            <Button 
                                type="button" 
                                variant= {type==="income" ? "contained" : "outlined"}
                                size="medium"
                                color="success"
                                onClick={() => setType("income")}
                                sx={{
                                    borderRadius: "15px 0 0 15px",
                                }}
                            >
                                Income
                            </Button>
                            <Button 
                                type="button" 
                                variant= {type==="expense" ? "contained" : "outlined"}
                                size="medium"
                                onClick={() => setType("expense")}
                                color="error"
                                sx={{
                                    borderRadius: "0 15px 15px 0",
                                }}
                            >
                                Expense
                            </Button>
                        </Box>
                        <TextField 
                            label="Amount" 
                            variant="outlined" 
                            type="number" 
                            size="small" 
                            required 
                            fullWidth 
                            value={amount} 
                            onChange={(e) => setAmount(e.target.value)} 
                        />
                        <FormControl size="small" fullWidth required>
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select 
                                labelId="category-label" 
                                value={categoryID} 
                                onChange={(e) => setCategoryID(e.target.value)} 
                                label="Category"
                            >
                                {categories
                                    .filter(cat => 
                                        type ? cat.type.toLowerCase() === type.toLowerCase() : true
                                    )
                                    .map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.categoryName}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                        <FormControl size="small" fullWidth required>
                            <InputLabel id="frequency-label">Frequency</InputLabel>
                            <Select labelId="frequency-label" value={frequency} onChange={(e) => setFrequency(e.target.value)} label="Frequency">
                                <MenuItem value="Daily">Daily</MenuItem>
                                <MenuItem value="Weekly">Weekly</MenuItem>
                                <MenuItem value="Monthly">Monthly</MenuItem>
                                <MenuItem value="Annually">Annually</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField 
                            id="start-date" 
                            label="Start Date" 
                            variant="outlined" 
                            type="date" 
                            size="small" 
                            required 
                            fullWidth 
                            value={date} 
                            onChange={(e) => setDate(e.target.value)} 
                            InputLabelProps={{ shrink: true }} 
                        />
                        <TextField 
                            id="end-date" 
                            label="End Date (optional)" 
                            variant="outlined" 
                            type="date" 
                            size="small" 
                            fullWidth 
                            value={endDate} 
                            onChange={(e) => setEndDate(e.target.value)} 
                            InputLabelProps={{ shrink: true }} 
                        />
                        <TextField 
                            label="Description (optional)" 
                            variant="outlined" 
                            type="text" 
                            size="small" 
                            fullWidth 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                        <FormControlLabel 
                            control={<Checkbox checked={autoDeduct} onChange={(e) => setAutoDeduct(e.target.checked)} />} 
                            label="Enable Auto-Deduction" 
                        />
                        <Button 
                            variant="contained"
                            type="submit" 
                            disableRipple 
                            disabled={loading}
                            sx={{ 
                                borderRadius: "15px",
                                bgcolor: "primary.main", 
                            }}
                        >
                            {loading ? "Adding..." : "Submit"}
                        </Button>
                    </Box>
                </Paper>
            </Modal>
        </Box>
        </ThemeProvider>
    );
};

export default RecurringTransactionForm;