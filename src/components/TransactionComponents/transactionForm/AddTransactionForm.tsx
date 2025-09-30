import { Close } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Paper, Select, TextField, ThemeProvider, Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";
import { useEffect, useState } from "react";
import { categoryApi, Category } from "../../../api/categoryApi";
import { transactionApi } from "../../../api/transactionApi";
import { useUser } from "../../../context/UserContext";

interface TransactionFormProps {
    addTransaction: boolean;
    setAddTransaction: (clicked: boolean) => void;
    onTransactionCreated?: () => void; // Optional callback for when transaction is created
}

const AddTransactionForm: React.FC<TransactionFormProps> = ({ addTransaction, setAddTransaction, onTransactionCreated}) => {
    const { user } = useUser();
    const [type, setType] = useState("");
    const [amount, setAmount] = useState('');
    const [categoryID, setCategoryID] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);


    // function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //     setAddTransaction(false);
    //     alert("Transaction added successfully!");
    // }

    useEffect(() => {
        async function fetchCategories() {
            try{
                const result = await categoryApi.getAllCategories();
                setCategories(result);
            }catch(error){
                console.error("Error fetching categories:", error);
                setCategories([]);
            }
        }
        fetchCategories();
    },[]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!user) {
            alert("Please log in to add transactions");
            return;
        }

        setLoading(true);

        const transactionData = {
            categoryId: parseInt(categoryID),
            transactionType: type.charAt(0).toUpperCase() + type.slice(1), // Capitalize first letter
            amount: parseFloat(amount),
            description: description,
            transactionDate: date,
            isRecurring: false
        };

        try{
            const result = await transactionApi.createTransaction(user.id, transactionData);
            console.log("Transaction added successfully", result);
            
            // Check if budget was impacted
            if (result.budgetImpacts && result.budgetImpacts.length > 0) {
                console.log("Budget impacts:", result.budgetImpacts);
                const impactSummary = result.budgetImpacts.map(impact => 
                    `${impact.budgetName}: $${impact.impactAmount}`
                ).join(', ');
                alert(`Transaction added successfully! Budget impacts: ${impactSummary}`);
            } else {
                alert("Transaction added successfully!");
            }
            
            setAddTransaction(false);
            
            // Call the callback to refresh parent component (e.g., budget list)
            if (onTransactionCreated) {
                onTransactionCreated();
            }
            
            // Reset form
            setType("");
            setAmount("");
            setCategoryID("");
            setDate("");
            setDescription("");
        }catch(error){
            console.error("Error adding transaction:", error);
            alert("Failed to add transaction. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    
      

    return (
        <ThemeProvider theme={theme}>
            <Box>
                {/* Add transaction form */}
                <Modal
                    open={addTransaction}
                >
                    <Paper elevation={0} sx={{
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
                        },
                        [theme.breakpoints.between("tablet", "laptop")]: {
                            width: "60%",
                        },
                        [theme.breakpoints.between("laptop", "desktop")]: {
                            width: "50%",
                        },
                    }}>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <Typography variant="h5">Add transaction</Typography>
                            <IconButton onClick={()=>setAddTransaction(false)} aria-label="close">
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
                                    color="error"
                                    onClick={() => setType("expense")}
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
                                <InputLabel id="select-category">Category</InputLabel>
                                <Select
                                    labelId="select-category"
                                    // value={month}
                                    // onChange={handleMonth}
                                    label="Category"
                                    value={categoryID}
                                    onChange={(e) => setCategoryID(e.target.value)}
                                >
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.id}>
                                            {category.categoryName}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                id="date-input"
                                label="Date"
                                variant="outlined" 
                                type="date" 
                                size="small" 
                                required 
                                fullWidth
                                InputLabelProps={{
                                    shrink: true
                                }}
                                placeholder="Date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                            <TextField 
                                label="Description" 
                                variant="outlined" 
                                type="text" 
                                size="small" 
                                fullWidth 
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Button 
                                type="submit"
                                variant="contained"
                                disableRipple
                                disabled={loading}
                                sx={{
                                    borderRadius: "15px",
                                    bgcolor: "primary.main"
                                }}
                            >
                                {loading ? "Adding..." : "Submit"}
                            </Button>
                        </Box>
                    </Paper>
                </Modal>  
            </Box>
        </ThemeProvider>
    )
}

export default AddTransactionForm;