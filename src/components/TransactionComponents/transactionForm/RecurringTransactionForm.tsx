import { Close } from "@mui/icons-material";
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Paper, Select, TextField, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import theme from "../../../assets/styles/theme";

import { useUser } from "../../../context/UserContext";

import CategoryIcons, { iconType } from "../../../assets/categoryIcons/CategoryIcons";



interface RecurringTransactionProps {
    recurringTransaction: boolean;
    setRecurringTransaction: (value: boolean) => void;
    setAddRecurringTransactionSuccessfully: (value: boolean) => void;
}

const RecurringTransactionForm: React.FC<RecurringTransactionProps> = ({recurringTransaction, setRecurringTransaction, setAddRecurringTransactionSuccessfully}) => {
    // State variables to manage form inputs
    const [startDate, setStartDate] = useState("");
    const [amount, setAmount] = useState("");    
    const [frequency, setFrequency] = useState("");
    const [endDate, setEndDate] = useState("");
    const [occurrences, setOccurrences] = useState("");
    const [type, setType] = useState("");
    const [categoryID, setCategoryID] = useState('');
    const [description, setDescription] = useState("");

    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);


    let userId = 1;


    useEffect(() => {
        async function fetchCategories() {
            try{
                const response = await fetch(`https://localhost:7211/api/Category/GetCategories?type=${type}`);
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
    },[type]);

    // Validation function for end date based on frequency
    const validateEndDate = (startDate: string, endDate: string, frequency: string): boolean => {
        if (!startDate || !endDate) return true; // Skip validation if either is empty

        const start = new Date(startDate);
        const end = new Date(endDate);

        // Calculate minimum end date based on frequency
        const minEndDate = new Date(start);

        switch (frequency) {
            case "Daily":
                minEndDate.setDate(start.getDate() + 1); // At least next day
                break;
            case "Weekly":
                minEndDate.setDate(start.getDate() + 7); // At least 1 week later
                break;
            case "Monthly":
                minEndDate.setMonth(start.getMonth() + 1); // At least 1 month later
                break;
            case "Yearly":
                minEndDate.setFullYear(start.getFullYear() + 1); // At least 1 year later
                break;
            default:
                return true;
        }

        return end >= minEndDate;
    };

    // Get error message for invalid end date
    const getEndDateErrorMessage = (startDate: string, endDate: string, frequency: string): string => {
        if (!startDate || !endDate) return "";

        const start = new Date(startDate);
        const minEndDate = new Date(start);

        switch (frequency) {
            case "Daily":
                minEndDate.setDate(start.getDate() + 1);
                return `End date must be at least 1 day after start date for daily frequency`;
            case "Weekly":
                minEndDate.setDate(start.getDate() + 7);
                return `End date must be at least 1 week after start date for weekly frequency`;
            case "Monthly":
                minEndDate.setMonth(start.getMonth() + 1);
                return `End date must be at least 1 month after start date for monthly frequency`;
            case "Yearly":
                minEndDate.setFullYear(start.getFullYear() + 1);
                return `End date must be at least 1 year after start date for yearly frequency`;
            default:
                return "";
        }
    };

    // Check if current end date is valid
    const isEndDateValid = validateEndDate(startDate, endDate, frequency);
    const endDateError = !isEndDateValid ? getEndDateErrorMessage(startDate, endDate, frequency) : "";

    // Handle form submission
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Ensure either endDate or occurrences is filled
        if (!endDate && !occurrences) {
            alert("Please fill either End Date or Occurrences.");
            return;
        }

        // Validate end date if provided
        if (endDate && !validateEndDate(startDate, endDate, frequency)) {
            alert(getEndDateErrorMessage(startDate, endDate, frequency));
            return;
        }

        const recurringTransactionData = {
            type: type,
            categoryID: categoryID,
            amount: parseFloat(amount),
            description: description,
            frequency: frequency,
            startDate: startDate,
            endDate: endDate ? endDate : null,
            occurrences: occurrences ? parseInt(occurrences) : null,

        };

        try{
            const response = await fetch(`https://localhost:7211/api/RecurringTransaction/CreateRecurringTransaction/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(recurringTransactionData),
            });
            if(!response.ok){
                throw new Error("Failed to add transaction");
            }
            const data = await response.json();
            console.log("Transaction added successfully:", data);
            alert("Recurring Transaction added successfully!");
            setAddRecurringTransactionSuccessfully(true); // Notify parent component
            setRecurringTransaction(false); // Close the modal
        }catch(error){
            console.error("Error adding transaction:", error);
            alert("Failed to add transaction. Please try again.");
        }

    }     

    return (
        <ThemeProvider theme={theme}>
        <Box>
            {/* Modal for Recurring Transaction Form */}
            <Modal 
                open={recurringTransaction}
            >
                <Paper 
                    elevation={0} 
                    sx={{ 
                        width: "30%",
                        maxHeight: "90vh",
                        overflowY: "auto",
                        margin: "auto", 
                        padding: "20px 40px 40px 40px", 
                        position: "absolute", 
                        top: "50%", 
                        left: "50%", 
                        transform: "translate(-50%, -50%)", 
                        borderRadius: "15px",
                        scrollbarWidth: "none",
                        [theme.breakpoints.between("mobile", "tablet")]: {
                            width: "80%",
                            maxHeight: "95vh",
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

                    {/* Header Section */}
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

                    {/* Form Section */}
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
                        {/* Transaction Type Buttons */}
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
                                onClick={() => setType("Expense")}
                                color="error"
                                sx={{
                                    borderRadius: "0 15px 15px 0",
                                }}
                            >
                                Expense
                            </Button>
                        </Box>

                        {/* Amount Input */}
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

                        {/* Description Input */}
                        <TextField 
                            label="Description" 
                            variant="outlined" 
                            type="text" 
                            size="small" 
                            fullWidth 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        {/* Frequency Dropdown */}
                        <FormControl size="small" fullWidth required>
                            <InputLabel id="frequency-label">Frequency</InputLabel>
                            <Select labelId="frequency-label" value={frequency} onChange={(e) => setFrequency(e.target.value)} label="Frequency">
                                <MenuItem value="Daily">Daily</MenuItem>
                                <MenuItem value="Weekly">Weekly</MenuItem>
                                <MenuItem value="Monthly">Monthly</MenuItem>
                                <MenuItem value="Yearly">Yearly</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Category Dropdown with Icons */}
                        <FormControl size="small" fullWidth required>
                            <InputLabel id="select-category">Category</InputLabel>
                            <Select
                                labelId="select-category"
                                label="Category"
                                value={categoryID}
                                onChange={(e) => setCategoryID(e.target.value)}
                            >
                                {categories.map((category) => {
                                    // Find the icon for this category name
                                    const iconObj = CategoryIcons.find(icon => icon.category === category.name);
                                    return (
                                        <MenuItem key={category.id} value={category.id}>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                <Box
                                                    sx={{
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        width: 32,
                                                        height: 32,
                                                        borderRadius: "50%",
                                                        fontSize: "1.1rem",
                                                        marginRight: "12px",
                                                        backgroundColor: iconObj ? iconObj.color : "gray",
                                                    }}
                                                >
                                                    {iconObj ? iconObj.icon : "📦"}
                                                </Box>
                                                {category.name}
                                            </Box>
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>

                        {/* Start Date Input */}
                        <TextField 
                            id="start-date" 
                            label="Start Date" 
                            variant="outlined" 
                            type="date" 
                            size="small" 
                            required 
                            fullWidth 
                            value={startDate} 
                            onChange={(e) => setStartDate(e.target.value)} 
                            InputLabelProps={{ shrink: true }} 
                        />

                        {/* End Date Input */}
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
                            disabled={!!occurrences}
                            error={!!endDateError}
                            helperText={endDateError}
                            sx={{
                                '& .MuiFormHelperText-root': {
                                    color: 'error.main'
                                }
                            }}
                        />

                        {/* Occurrences Input */}
                        <TextField 
                            label="Occurrences (optional)" 
                            variant="outlined" 
                            type="number" 
                            size="small" 
                            fullWidth 
                            value={occurrences} 
                            onChange={(e) => setOccurrences(e.target.value)} 
                            disabled={!!endDate}
                            inputProps={{
                                min: 1,
                                step: 1,
                                pattern: "[0-9]*"
                            }}
                            onKeyPress={(e) => {
                                // Prevent decimal point and negative sign
                                if (e.key === '.' || e.key === '-' || e.key === '+' || e.key === 'e' || e.key === 'E') {
                                    e.preventDefault();
                                }
                            }}
                            helperText="Enter a whole number only"
                        />

                        {/* Submit Button - disabled if validation fails */}
                        <Button 
                            variant="contained"
                            type="submit" 
                            disableRipple 
                            disabled={!!endDateError || (!endDate && !occurrences)} // Disable if validation fails
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