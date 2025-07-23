import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Paper, Select, SelectChangeEvent, TextField, ThemeProvider, Tooltip, Typography, Chip, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { filterContainerStyle } from "./transactionFilterStyles";
import theme from "../../../assets/styles/theme";
import { Sort, FilterAltOutlined, Close, TuneOutlined, SwapVertOutlined } from '@mui/icons-material';
import { add, set } from "date-fns";
import { DateCalendar, DatePicker, DateRangeIcon, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import CategoryIcons, { iconType } from "../../../assets/categoryIcons/CategoryIcons";

interface TransactionFilterProps {
    setTypeFilter: (value: string) => void;
    setCategoryFilter: (value: string) => void;
    typeFilter: string;
    categoryFilter: string;
    setAddfiltersuccessfully: (clicked: boolean) => void;
    setDate: (date: string) => void;
    setStartDate: (date: string) => void;
    setEndDate: (date: string) => void;
    date: string;
    startDate: string;
    endDate: string;
    setSortOption: (option: string) => void;
    sortOption: string;
    setSortApplied: (applied: boolean) => void;
}

const TransactionFilter: React.FC<TransactionFilterProps> = ({ 
    setTypeFilter, 
    setCategoryFilter, 
    typeFilter, 
    categoryFilter, 
    setAddfiltersuccessfully, 
    setDate, 
    setStartDate, 
    setEndDate, 
    date, 
    startDate, 
    endDate,
    setSortOption,
    sortOption,
    setSortApplied
}) => {
    const [addFilter, setAddFilter] = useState<boolean>(false);
    const [addSort, setAddSort] = useState<boolean>(false);
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [type, setType] = useState("");

    const handleType = (e: SelectChangeEvent<string>) => {
        setTypeFilter(e.target.value as string);
        if (e.target.value === "Income") {
            setType("Income");
        }
        if (e.target.value === "Expense") {
            setType("Expense");
        }
    }

    const handleCategory = (e: SelectChangeEvent<string>) => {
        setCategoryFilter(e.target.value as string);
    }

    const handleSortChange = (e: SelectChangeEvent<string>) => {
        setSortOption(e.target.value as string);
    }

    const handleSortApply = () => {
        setSortApplied(true);
        setAddSort(false);
    }

    const handleSortReset = () => {
        setSortOption("");
        setSortApplied(false);
        setAddfiltersuccessfully(true); // Trigger table refresh
    }

    // Get active filter count
    const getActiveFilterCount = () => {
        let count = 0;
        if (typeFilter) count++;
        if (categoryFilter) count++;
        if (date) count++;
        if (startDate && endDate) count++;
        return count;
    };

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

    return (
        <Box sx={{ mt: "40px" }}>
            {/* Header Section */}
            <Paper elevation={0} sx={{ 
                mb: 3, 
                p: 2, 
                borderRadius: "15px", 
                background: 'linear-gradient(135deg, #023E8A 0%, #667eea 100%)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, transparent 100%)',
                    pointerEvents: 'none'
                }
            }}>
                <Typography variant="h5" component="h1" sx={{ 
                    color: 'white', 
                    fontWeight: 'bold',
                    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}>
                    Transaction List
                </Typography>
                <Typography variant="body1" sx={{ 
                    color: 'rgba(255,255,255,0.9)',
                }}>
                    Manage your income and expenses
                </Typography>
            </Paper>

            {/* Control Buttons */}
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                gap: 2,
                mb: 3
            }}>
                <Button
                    variant="outlined"
                    startIcon={<SwapVertOutlined />}
                    onClick={() => setAddSort(true)}
                    sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        minWidth: "120px",
                        borderColor: sortOption ? "primary.main" : "grey.300",
                        color: sortOption ? "primary.main" : "text.secondary",
                        backgroundColor: sortOption ? "primary.50" : "transparent"
                    }}
                >
                    Sort {sortOption && `(${sortOption.replace('-', ' ')})`}
                </Button>
                
                <Button
                    variant="outlined"
                    startIcon={<TuneOutlined />}
                    onClick={() => setAddFilter(true)}
                    sx={{
                        borderRadius: "12px",
                        textTransform: "none",
                        minWidth: "120px",
                        borderColor: getActiveFilterCount() > 0 ? "primary.main" : "grey.300",
                        color: getActiveFilterCount() > 0 ? "primary.main" : "text.secondary",
                        backgroundColor: getActiveFilterCount() > 0 ? "primary.50" : "transparent"
                    }}
                >
                    Filter {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
                </Button>
            </Box>

            {/* Active Filters Display */}
            {(typeFilter || categoryFilter || date || (startDate && endDate) || sortOption) && (
                <Paper elevation={1} sx={{ 
                    p: 2, 
                    mb: 3, 
                    borderRadius: "12px",
                    border: '1px solid rgba(0,0,0,0.1)'
                }}>
                    <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 'medium', color: 'text.secondary' }}>
                        Active Filters & Sorting
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {typeFilter && (
                            <Chip
                                label={`Type: ${typeFilter}`}
                                onDelete={() => {
                                    setTypeFilter("");
                                    setAddfiltersuccessfully(true); // Trigger table refresh
                                }}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        )}
                        {categoryFilter && (
                            <Chip
                                label={`Category: ${categoryFilter}`}
                                onDelete={() => {
                                    setCategoryFilter("");
                                    setAddfiltersuccessfully(true); // Trigger table refresh
                                }}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        )}
                        {date && (
                            <Chip
                                label={`Date: ${date}`}
                                onDelete={() => {
                                    setDate("");
                                    setAddfiltersuccessfully(true); // Trigger table refresh
                                }}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        )}
                        {startDate && endDate && (
                            <Chip
                                label={`Range: ${startDate} to ${endDate}`}
                                onDelete={() => {
                                    setStartDate("");
                                    setEndDate("");
                                    setAddfiltersuccessfully(true); // Trigger table refresh
                                }}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        )}
                        {sortOption && (
                            <Chip
                                label={`Sort: ${sortOption.replace('-', ' ')}`}
                                onDelete={() => {
                                    setSortOption("");
                                    setSortApplied(false);
                                    setAddfiltersuccessfully(true); // Trigger table refresh
                                }}
                                size="small"
                                color="secondary"
                                variant="outlined"
                            />
                        )}
                    </Stack>
                </Paper>
            )}

            {/* Enhanced Sort Modal */}
            <Modal
                open={addSort}
                onClose={() => setAddSort(false)}
            >
                <Paper elevation={24} sx={{
                    width: "400px",
                    maxWidth: "90vw",
                    maxHeight: "80vh",
                    margin: "auto",
                    padding: "32px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "20px",
                    '&::-webkit-scrollbar': {
                        display: 'none'
                    },
                    scrollbarWidth: 'none'
                }}>
                    <Box sx={{ position: 'relative' }}>
                        
                        <Typography variant="h5" sx={{ 
                            mb: 3, 
                            textAlign: "center",
                            fontWeight: 'bold',
                            color: 'primary.main'
                        }}>
                            Sort Transactions
                        </Typography>
                        
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 'medium' }}>
                                Sort By
                            </Typography>
                            <FormControl fullWidth>
                                <Select
                                    value={sortOption}
                                    onChange={handleSortChange}
                                    displayEmpty
                                    sx={{
                                        borderRadius: "12px"
                                    }}
                                >
                                    <MenuItem value="">
                                        Select sorting option
                                    </MenuItem>
                                    <MenuItem value="newest">📅 Newest First</MenuItem>
                                    <MenuItem value="oldest">📅 Oldest First</MenuItem>
                                    <MenuItem value="higher-amount">💰 Higher Amounts First</MenuItem>
                                    <MenuItem value="lower-amount">💰 Lower Amounts First</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        
                        <Stack direction="row" spacing={2}>
                            <Button
                                variant="contained"
                                onClick={handleSortApply}
                                fullWidth
                                sx={{
                                    borderRadius: "12px",
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontWeight: 'medium'
                                }}
                            >
                                Apply Sort
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleSortReset}
                                fullWidth
                                sx={{
                                    borderRadius: "12px",
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontWeight: 'medium'
                                }}
                            >
                                Reset
                            </Button>
                        </Stack>
                    </Box>
                </Paper>
            </Modal>

            {/* Enhanced Filter Modal */}
            <Modal
                open={addFilter}
                onClose={() => setAddFilter(false)}
            >
                <Paper elevation={24} sx={{
                    width: "500px",
                    maxWidth: "90vw",
                    maxHeight: "80vh",
                    margin: "auto",
                    padding: "32px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderRadius: "20px",
                    overflow: "hidden"
                }}>
                    <Box sx={{ 
                        position: 'relative',
                        maxHeight: 'calc(80vh - 64px)',
                        overflow: 'auto',
                        '&::-webkit-scrollbar': {
                            display: 'none'
                        },
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none'
                    }}>
                        
                        <Typography variant="h5" sx={{ 
                            mb: 4, 
                            textAlign: "center",
                            fontWeight: 'bold',
                            color: 'primary.main'
                        }}>
                            Filter Transactions
                        </Typography>
                        
                        <Stack spacing={3}>
                            {/* Type Filter */}
                            <Box>
                                <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'medium' }}>
                                    Transaction Type
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        value={typeFilter}
                                        onChange={handleType}
                                        displayEmpty
                                        sx={{
                                            borderRadius: "12px"
                                        }}
                                    >
                                        <MenuItem value="">
                                            All Types
                                        </MenuItem>
                                        <MenuItem value="Income">💰 Income</MenuItem>
                                        <MenuItem value="Expense">💸 Expense</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            
                            {/* Category Filter */}
                            <Box>
                                <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'medium' }}>
                                    Category
                                </Typography>
                                <FormControl fullWidth>
                                    <Select
                                        value={categoryFilter}
                                        onChange={handleCategory}
                                        displayEmpty
                                        sx={{
                                            borderRadius: "12px"
                                        }}
                                    >
                                        <MenuItem value="">
                                            All Categories
                                        </MenuItem>
                                        {categories.map((category) => {
                                            const iconObj = CategoryIcons.find(icon => icon.category === category.name);
                                            return (
                                                <MenuItem key={category.id} value={category.name}>
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
                            </Box>
                            
                            {/* Date Filter */}
                            <Box>
                                <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'medium' }}>
                                    Specific Date
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker 
                                        label="Select Date"
                                        value={date ? dayjs(date) : null}
                                        onChange={(newValue) => setDate(newValue ? dayjs(newValue).format("YYYY-MM-DD") : "")}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                sx: { 
                                                    borderRadius: "12px"
                                                }
                                            }
                                        }}
                                    />
                                </LocalizationProvider>
                            </Box>
                            
                            {/* Date Range Filter */}
                            <Box>
                                <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 'medium' }}>
                                    Date Range
                                </Typography>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <Stack direction="row" spacing={2}>
                                        <DatePicker 
                                            label="Start Date"
                                            value={startDate ? dayjs(startDate) : null}
                                            onChange={(newValue) => setStartDate(newValue ? dayjs(newValue).format("YYYY-MM-DD") : "")}
                                            slotProps={{
                                                textField: {
                                                    sx: { 
                                                        borderRadius: "12px"
                                                    }
                                                }
                                            }}
                                        />
                                        <DatePicker
                                            label="End Date"
                                            value={endDate ? dayjs(endDate) : null}
                                            onChange={(newValue) => setEndDate(newValue ? dayjs(newValue).format("YYYY-MM-DD") : "")}
                                            slotProps={{
                                                textField: {
                                                    sx: { 
                                                        borderRadius: "12px"
                                                    }
                                                }
                                            }}
                                        />
                                    </Stack>
                                </LocalizationProvider>
                            </Box>
                        </Stack>
                        
                        <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
                            <Button
                                variant="contained"
                                onClick={() => {
                                    setAddfiltersuccessfully(true);
                                    setAddFilter(false);
                                }}
                                fullWidth
                                sx={{
                                    borderRadius: "12px",
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontWeight: 'medium'
                                }}
                            >
                                Apply Filters
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => {
                                    setTypeFilter("");
                                    setCategoryFilter("");
                                    setDate("");
                                    setStartDate("");
                                    setEndDate("");
                                    setAddfiltersuccessfully(true); // Trigger table refresh
                                }}
                                fullWidth
                                sx={{
                                    borderRadius: "12px",
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontWeight: 'medium'
                                }}
                            >
                                Clear All
                            </Button>
                        </Stack>
                    </Box>
                </Paper>
            </Modal>
        </Box>
    )
}

export default TransactionFilter;