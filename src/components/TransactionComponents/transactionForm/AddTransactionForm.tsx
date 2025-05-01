import { Close } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Paper, Select, TextField, ThemeProvider, Typography } from "@mui/material";
import theme from "../../../assets/styles/theme";
import { useEffect, useState } from "react";

interface TransactionFormProps {
    addTransaction: boolean;
    setAddTransaction: (clicked: boolean) => void;
}

const AddTransactionForm: React.FC<TransactionFormProps> = ({ addTransaction, setAddTransaction}) => {

    const [type, setType] = useState("");
    const [amount, setAmount] = useState('');
    const [categoryID, setCategoryID] = useState('');
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);


    // function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //     setAddTransaction(false);
    //     alert("Transaction added successfully!");
    // }

    useEffect(() => {
        async function fetchCategories() {
            try{
                const response = await fetch("http://localhost:5110/api/Category/GetCategories");
                if(!response.ok){
                    throw new Error("Failed to fetch categories");
                }
                const data = await response.json();
                setCategories(data);
            }catch(error){
                console.error("Error fetching categories:", error);
            }
        }
        fetchCategories();
    },[]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const transactionData = {
            type: type,
            categoryID: categoryID,
            amount: parseFloat(amount),
            date: date,
            description: description,
            userId: 1,
        };

        try{
            const response = await fetch("http://localhost:5110/api/Transaction/CreateTransaction", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(transactionData),
            });
            if(!response.ok){
                throw new Error("Failed to add transaction");
            }
            const data = await response.json();
            console.log("Transaction added successfully:", data);
            alert("Transaction added successfully!");
            setAddTransaction(false);
        }catch(error){
            console.error("Error adding transaction:", error);
            alert("Failed to add transaction. Please try again.");
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
                                    variant= {type==="Income" ? "contained" : "outlined"} 
                                    size="medium"
                                    color="success"
                                    onClick={() => setType("Income")}
                                    sx={{
                                        borderRadius: "15px 0 0 15px",
                                    }}
                                >
                                    Income
                                </Button>
                                <Button 
                                    type="button" 
                                    variant= {type==="Expense" ? "contained" : "outlined"}
                                    size="medium"
                                    color="error"
                                    onClick={() => setType("Expense")}
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
                                            {category.name}
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
                                sx={{
                                    borderRadius: "15px",
                                    bgcolor: "primary.main"
                                }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Paper>
                </Modal>  
            </Box>
        </ThemeProvider>
    )
}

export default AddTransactionForm;