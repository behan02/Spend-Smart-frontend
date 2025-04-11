import { Close } from "@mui/icons-material";
import { Box, Button, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Modal, Paper, Select, TextField, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";
import theme from "../../assets/styles/theme";


interface RecurringTransactionProps {
    recurringTransaction: boolean;
    setRecurringTransaction: (value: boolean) => void;
}

const RecurringTransactionForm: React.FC<RecurringTransactionProps> = ({recurringTransaction, setRecurringTransaction}) => {

    const [date, setDate] = useState("");
    const [amount, setAmount] = useState("");
    
    const [frequency, setFrequency] = useState("Monthly");
    const [endDate, setEndDate] = useState("");
    const [occurrences, setOccurrences] = useState("");
    const [autoDeduct, setAutoDeduct] = useState(false);

    const [type, setType] = useState("");

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setRecurringTransaction(false);
        alert("Transaction added successfully!");
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
                        <IconButton onClick={() => {setRecurringTransaction(false); setType("")}}aria-label="close">
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
                            <InputLabel id="frequency-label">Frequency</InputLabel>
                            <Select labelId="frequency-label" value={frequency} onChange={(e) => setFrequency(e.target.value)} label="Frequency">
                                <MenuItem value="Daily">Daily</MenuItem>
                                <MenuItem value="Weekly">Weekly</MenuItem>
                                <MenuItem value="Bi-Weekly">Bi-Weekly</MenuItem>
                                <MenuItem value="Monthly">Monthly</MenuItem>
                                <MenuItem value="Yearly">Yearly</MenuItem>
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
                            label="Occurrences (optional)" 
                            variant="outlined" 
                            type="number" 
                            size="small" 
                            fullWidth 
                            value={occurrences} 
                            onChange={(e) => setOccurrences(e.target.value)} 
                        />
                        <FormControlLabel 
                            control={<Checkbox checked={autoDeduct} onChange={(e) => setAutoDeduct(e.target.checked)} />} 
                            label="Enable Auto-Deduction" 
                        />
                        <Button 
                            variant="contained"
                            type="submit" 
                            disableRipple 
                            sx={{ 
                                borderRadius: "15px",
                                bgcolor: "primary.main", 
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

export default RecurringTransactionForm;