import { Close } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Paper, Select, TextField, ThemeProvider, Typography } from "@mui/material";
import theme from "../../assets/styles/theme";
import { useState } from "react";

interface TransactionFormProps {
    addTransaction: boolean;
    setAddTransaction: (clicked: boolean) => void;
}

const AddTransactionForm: React.FC<TransactionFormProps> = ({ addTransaction, setAddTransaction}) => {

    const [type, setType] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setAddTransaction(false);
        alert("Transaction added successfully!");
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
                                type="text" 
                                size="small" 
                                required 
                                fullWidth 
                            />
                            <FormControl size="small" fullWidth required>
                                <InputLabel id="select-category">Category</InputLabel>
                                <Select
                                    labelId="select-category"
                                    // value={month}
                                    // onChange={handleMonth}
                                    label="Category"
                                >
                                    <MenuItem value="Transport">Transport</MenuItem>
                                    <MenuItem value="Salary">Salary</MenuItem>
                                    <MenuItem value="Sales">Sales</MenuItem>
                                    <MenuItem value="Food">Food</MenuItem>
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
                            />
                            <TextField 
                                label="Description" 
                                variant="outlined" 
                                type="text" 
                                size="small" 
                                fullWidth 
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