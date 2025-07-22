// import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Paper, Select, SelectChangeEvent, TextField, ThemeProvider, Tooltip, Typography } from "@mui/material";
// import { useEffect, useState } from "react";
// import dayjs, { Dayjs } from "dayjs";
// import { filterContainerStyle } from "./transactionFilterStyles";
// import theme from "../../../assets/styles/theme";
// import { Sort,FilterAltOutlined, Close } from '@mui/icons-material';
// import { add, set } from "date-fns";
// import { DateCalendar, DatePicker, DateRangeIcon, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

// interface TransactionFilterProps {
//     setTypeFilter: (value: string) => void;
//     setCategoryFilter: (value: string) => void;
//     typeFilter: string;
//     categoryFilter: string;
//     setAddfiltersuccessfully: (clicked: boolean) => void;
//     setDate: (date: string) => void;
//     setStartDate: (date: string) => void;
//     setEndDate: (date: string) => void;
//     date: string;
//     startDate: string;
//     endDate: string;
// }

// const TransactionFilter: React.FC<TransactionFilterProps> = ({ setTypeFilter, setCategoryFilter, typeFilter, categoryFilter, setAddfiltersuccessfully, setDate, setStartDate, setEndDate, date, startDate, endDate }) => {
//     // State to manage the selected month and sort option
//     // const [month, setMonth] = useState<string>("");
//     // const [sort, setSort] = useState<string>("");

//     // const [type, setType] = useState<string>("");
//     // const [cateogry, setCategory] = useState<string>("");
//     // const [date, setDate] = useState<string>("");

//     const [addFilter, setAddFilter] = useState<boolean>(false);

//     // const handleMonth = (e: SelectChangeEvent<string>) => {
//     //     setMonth(e.target.value as string);
//     // }

//     // const handleSort = (e: SelectChangeEvent<string>) => {
//     //     setSort(e.target.value as string);
//     // }

//     // const handleFilter = (e: SelectChangeEvent<string>) => {
//     //     setFilterOn(e.target.value as string);
//     // }

//     const handleType = (e: SelectChangeEvent<string>) => {
//         setTypeFilter(e.target.value as string);
//         if (e.target.value === "Income") {
//             setType("Income");
//         }
//         if (e.target.value === "Expense") {
//             setType("Expense");
//         }
//     }
//     const handleCategory = (e: SelectChangeEvent<string>) => {
//         setCategoryFilter(e.target.value as string);
//     }
//     // const handleDate = (e: SelectChangeEvent<string>) => {
//     //     setDate(e.target.value as string);
//     // }

//     const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
//     const [type, setType] = useState("");

//     useEffect(() => {
//             async function fetchCategories() {
//                 try{
//                     const response = await fetch(`https://localhost:7211/api/Category/GetCategories?type=${type}`);
//                     if(!response.ok){
//                         throw new Error("Failed to fetch categories");
//                     }
//                     const data = await response.json();
//                     setCategories(data);
//                 }catch(error){
//                     console.error("Error fetching categories:", error);
//                 }
//             }
//             fetchCategories();
//         },[type]);

//     return (
//         // <ThemeProvider theme={theme}>
//         //     {/* Filter Container */}
//         //     <Box sx={filterContainerStyle}>
//         //         {/* Month Dropdown */}
//         //         <FormControl size="small" sx={{ minWidth: 150}}>
//         //             <InputLabel id="select-month">Month</InputLabel>
//         //             <Select
//         //                 labelId="select-month"
//         //                 value={month}
//         //                 onChange={handleMonth}
//         //                 label="Month"
//         //                 sx={{
//         //                     borderRadius: "15px", // Rounded corners for the dropdown
//         //                 }}
//         //             >
//         //                 <MenuItem value="January">January</MenuItem>
//         //                 <MenuItem value="February">February</MenuItem>
//         //                 <MenuItem value="March">March</MenuItem>
//         //             </Select>
//         //         </FormControl>

//         //         {/* Sort and Filter Options */}
//         //         <Box sx={{
//         //             display: "flex",
//         //             flexDirection: "row",
//         //             alignItems: "center",
//         //             gap: "15px", // Space between dropdowns
//         //             [theme.breakpoints.between("mobile", "tablet")]: {
//         //                 width: "100%", // Full width on smaller screens
//         //                 gap: "5px" // Reduced gap for smaller screens
//         //             }
//         //         }}>

//         //             {/* Sort Dropdown */}
//         //             <FormControl size="small" sx={{ minWidth: 150}}>
//         //                 <InputLabel id="select-sort">Sort</InputLabel>
//         //                 <Select
//         //                     labelId="select-sort"
//         //                     value={sort}
//         //                     onChange={handleSort}
//         //                     label="Sort"
//         //                     sx={{
//         //                         borderRadius: "15px", // Rounded corners for the dropdown
//         //                     }}
//         //                 >
//         //                     <MenuItem value="Newest">Newest first</MenuItem>
//         //                     <MenuItem value="Oldest">Oldest first</MenuItem>
//         //                     <MenuItem value="Amount">Amount</MenuItem>
//         //                 </Select>
//         //             </FormControl>

//         //             {/* Filter Dropdown */}
//         //             <FormControl size="small" sx={{ minWidth: 150}}>
//         //                 <InputLabel id="select-filter">Filter</InputLabel>
//         //                 <Select
//         //                     labelId="select-filter"
//         //                     value={filterOn}
//         //                     onChange={handleFilter}
//         //                     label="Filter"
//         //                     sx={{
//         //                         borderRadius: "15px", 
//         //                     }}
//         //                 >
//         //                     {/* <MenuItem value="Type">Type</MenuItem>
//         //                     <MenuItem value="Category">Category</MenuItem> */}
//         //                 </Select>
//         //             </FormControl>
//         //         </Box>
//         //     </Box>
//         // </ThemeProvider>
//         <Box sx={{
//             mt: "40px"
//         }}>
//             {/* <Typography variant="h5" mb="10px">Transactions List</Typography> */}
//             <Paper elevation={0} sx={{ mb: 3, p: 2, borderRadius: "10px", background: 'linear-gradient(135deg, #023E8A 0%, #667eea 100%)' }}>
//                 <Typography variant="h5" component="h1" sx={{ color: 'white', fontWeight: 'bold' }}>
//                     Transaction List
//                 </Typography>
//                 <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)'}}>
//                     Manage your income and expenses
//                 </Typography>
//             </Paper>
//             <Box sx={{
//                 display: "flex",
//                 flexDirection: "row",
//                 gap: "5px",
//                 alignItems: "center",
//             }}>
//                 <Box>
//                     <Tooltip title="Sort" placement="top" slotProps={{
//                         popper: {
//                             modifiers: [
//                                 {
//                                     name: "offset",
//                                     options: {
//                                         offset: [0,-15]
//                                     }
//                                 }
//                             ]
//                         }
//                     }}>
//                         <IconButton color="primary" size="medium">
//                             <Sort />
//                         </IconButton>
//                     </Tooltip>
//                 </Box>
//                 <Box>
//                     <Tooltip title="Filter" placement="top" slotProps={{
//                         popper: {
//                             modifiers: [
//                                 {
//                                     name: "offset",
//                                     options: {
//                                         offset: [0,-15]
//                                     }
//                                 }
//                             ]
//                         }
//                     }}>
//                         <IconButton color="primary" size="medium" onClick={() => {setAddFilter(true)}}>
//                             <FilterAltOutlined />
//                         </IconButton>
//                     </Tooltip>
//                 </Box>
//             </Box>

//             {/* Model for Transaction Filter */}
//             <Modal
//                 open={addFilter}
//                 onClose={() => setAddFilter(false)}
//             >
//                 <Paper elevation={0} sx={{
//                         width: "30%",
//                         margin: "auto",
//                         padding: "30px 40px 40px",
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         transform: "translate(-50%, -50%)",
//                         borderRadius: "15px",
//                         [theme.breakpoints.between("mobile", "tablet")]: {
//                             width: "80%",                        
//                         },
//                         [theme.breakpoints.between("tablet", "laptop")]: {
//                             width: "50%",
//                         },
//                         [theme.breakpoints.between("laptop", "desktop")]: {
//                             width: "50%",
//                         },
//                     }}
//                 >
//                     <Box sx={{
//                         display: "flex",
//                         flexDirection: "column",
//                         gap: "10px",
//                     }}>
//                         <Box sx={{
//                             display: "flex",
//                             flexDirection: "row",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             // gap: "25px"
//                         }}>
//                             <Typography variant="body1">Type</Typography>
//                             <FormControl size="small" sx={{width: "250px"}}>
//                                 <Select
//                                     value={typeFilter}
//                                     onChange={handleType}
//                                     sx={{
//                                         borderRadius: "5px", 
//                                     }}
//                                 >
//                                     <MenuItem value="">None</MenuItem>
//                                     <MenuItem value="Income">Income</MenuItem>
//                                     <MenuItem value="Expense">Expense</MenuItem>
//                                 </Select>
//                             </FormControl>
//                         </Box>
//                         <Box sx={{
//                             display: "flex",
//                             flexDirection: "row",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             gap: "25px"
//                         }}>
//                             <Typography variant="body1">Category</Typography>
//                             <FormControl size="small" sx={{width: "250px"}}>
//                                 <Select
//                                     value={categoryFilter}
//                                     onChange={handleCategory}
//                                     sx={{
//                                         borderRadius: "5px", 
//                                     }}
//                                 >
//                                     <MenuItem value="">None</MenuItem>
//                                     {categories.map((category) => (
//                                         <MenuItem key={category.id} value={category.name}>
//                                             {category.name}
//                                         </MenuItem>
//                                     ))}
//                                 </Select>
//                             </FormControl>
//                         </Box>
//                         <Box sx={{
//                             display: "flex",
//                             flexDirection: "row",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             gap: "20px"
//                         }}>
//                             <Typography variant="body1">Date</Typography>
//                             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                 <DemoContainer components={['DatePicker']}>
//                                     <DatePicker 
//                                         label="Date"
//                                         value={date ? dayjs(date) : null}
//                                         onChange={(newValue) => setDate(newValue ? dayjs(newValue).format("YYYY-MM-DD") : "")}
//                                         slotProps={{
//                                             textField: {
//                                                 size: "small",
//                                                 sx: { width: "250px", borderRadius: "10px" }
//                                             }
//                                         }}
//                                     />
//                                 </DemoContainer>
//                             </LocalizationProvider>
//                         </Box>
//                         <Box sx={{
//                             display: "flex",
//                             flexDirection: "row",
//                             justifyContent: "space-between",
//                             alignItems: "center",
//                             gap: "20px"
//                         }}>
//                             <Typography variant="body1">Date Range</Typography>
//                             {/* <TextField 
//                                 type="date"
//                                 variant="outlined"
//                                 size="small"
//                                 sx={{
//                                     width: "200px"
//                                 }}
//                                 slotProps={{
//                                     input: {
//                                         style: {
//                                             borderRadius: "10px"
//                                         }
//                                     }
//                                 }}
//                             /> */}
//                             <LocalizationProvider dateAdapter={AdapterDayjs}>
//                                 <Box sx={{
//                                     display: "flex",
//                                     flexDirection: "row",
//                                     gap: "10px",
//                                     alignItems: "center"
//                                 }}>
//                                 <DatePicker 
//                                     label="Start Date"
//                                     value={startDate ? dayjs(startDate) : null}
//                                     onChange={(newValue) => setStartDate(newValue ? dayjs(newValue).format("YYYY-MM-DD") : "")}
//                                     slotProps={{
//                                         textField: {
//                                             size: "small",
//                                             sx: { width: "150px", borderRadius: "10px" }
//                                         }
//                                     }}
//                                 />
//                                 <DatePicker
//                                     label="End Date"
//                                     value={endDate ? dayjs(endDate) : null}
//                                     onChange={(newValue) => setEndDate(newValue ? dayjs(newValue).format("YYYY-MM-DD") : "")}
//                                     slotProps={{
//                                         textField: {
//                                             size: "small",
//                                             sx: { width: "150px", borderRadius: "10px" }
//                                         }
//                                     }}
//                                 />
//                                 </Box>
//                             </LocalizationProvider>
//                         </Box>
//                         <Box sx={{
//                             display: "flex",
//                             flexDirection: "row",
//                             alignItems: "center",
//                             gap: "5px"
//                         }}>
//                             <Button
//                                 type="submit"
//                                 variant="contained"
//                                 // onSubmit={() => setAddfiltersuccessfully(true)}
//                                 onClick={() => {
//                                     setAddfiltersuccessfully(true);
//                                     setAddFilter(false);
//                                 }}
//                                 fullWidth
//                                 disableRipple
//                                 sx={{
//                                     borderRadius: "15px",
//                                     bgcolor: "primary.main",
//                                     mt: "10px"
//                                 }}
//                             >
//                                 Apply
//                             </Button>
//                             <Button
//                                 type="reset"
//                                 variant="contained"
//                                 onClick={() => {
//                                     setTypeFilter("");
//                                     setCategoryFilter("");
//                                     setDate("");
//                                     setStartDate("");
//                                     setEndDate("");
//                                 }}
//                                 fullWidth
//                                 disableRipple
//                                 sx={{
//                                     borderRadius: "15px",
//                                     bgcolor: "primary.main",
//                                     mt: "10px"
//                                 }}
//                             >
//                                 Reset
//                             </Button>
//                         </Box>
//                     </Box>
//                 </Paper>
//             </Modal>
//         </Box>
//     )
// }

// export default TransactionFilter;


//---------------------------------------------------------------------

import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Paper, Select, SelectChangeEvent, TextField, ThemeProvider, Tooltip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { filterContainerStyle } from "./transactionFilterStyles";
import theme from "../../../assets/styles/theme";
import { Sort,FilterAltOutlined, Close } from '@mui/icons-material';
import { add, set } from "date-fns";
import { DateCalendar, DatePicker, DateRangeIcon, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

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
    // Add sorting props
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
    const [addSort, setAddSort] = useState<boolean>(false); // New state for sort modal
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

    // Handle sort option change
    const handleSortChange = (e: SelectChangeEvent<string>) => {
        setSortOption(e.target.value as string);
    }

    // Handle sort apply
    const handleSortApply = () => {
        setSortApplied(true);
        setAddSort(false);
    }

    // Handle sort reset
    const handleSortReset = () => {
        setSortOption("");
        setSortApplied(false);
    }

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
        <Box sx={{
            mt: "40px"
        }}>
            <Paper elevation={0} sx={{ 
                                    mb: 3, 
                                    p: 2, 
                                    borderRadius: "10px", 
                                    background: 'linear-gradient(135deg, #023E8A 0%, #667eea 100%)' }}>
                <Typography variant="h5" component="h1" sx={{ color: 'white', fontWeight: 'bold' }}>
                    Transaction List
                </Typography>
                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)'}}>
                    Manage your income and expenses
                </Typography>
            </Paper>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                gap: "5px",
                alignItems: "center",
            }}>
                <Box>
                    <Tooltip title="Sort" placement="top" slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name: "offset",
                                    options: {
                                        offset: [0,-15]
                                    }
                                }
                            ]
                        }
                    }}>
                        <IconButton 
                            color="primary" 
                            size="medium"
                            onClick={() => setAddSort(true)} // Open sort modal
                        >
                            <Sort />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box>
                    <Tooltip title="Filter" placement="top" slotProps={{
                        popper: {
                            modifiers: [
                                {
                                    name: "offset",
                                    options: {
                                        offset: [0,-15]
                                    }
                                }
                            ]
                        }
                    }}>
                        <IconButton color="primary" size="medium" onClick={() => {setAddFilter(true)}}>
                            <FilterAltOutlined />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            {/* Sort Modal */}
            <Modal
                open={addSort}
                onClose={() => setAddSort(false)}
            >
                <Paper elevation={0} sx={{
                        width: "30%",
                        margin: "auto",
                        padding: "30px 40px 40px",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "15px",
                        [theme.breakpoints.between("mobile", "tablet")]: {
                            width: "80%",                        
                        },
                        [theme.breakpoints.between("tablet", "laptop")]: {
                            width: "50%",
                        },
                        [theme.breakpoints.between("laptop", "desktop")]: {
                            width: "50%",
                        },
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                    }}>
                        <Typography variant="h6" sx={{ mb: 1 }} textAlign={"center"}>
                            Sort Transactions
                        </Typography>
                        
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <Typography variant="body1">Sort By</Typography>
                            <FormControl size="small" sx={{width: "250px"}}>
                                <Select
                                    value={sortOption}
                                    onChange={handleSortChange}
                                    sx={{
                                        borderRadius: "5px", 
                                    }}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="newest">Newest First</MenuItem>
                                    <MenuItem value="oldest">Oldest First</MenuItem>
                                    <MenuItem value="higher-amount">Higher Amounts First</MenuItem>
                                    <MenuItem value="lower-amount">Lower Amounts First</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "5px"
                        }}>
                            <Button
                                type="submit"
                                variant="contained"
                                onClick={handleSortApply}
                                fullWidth
                                disableRipple
                                sx={{
                                    borderRadius: "15px",
                                    bgcolor: "primary.main",
                                    mt: "10px"
                                }}
                            >
                                Apply
                            </Button>
                            <Button
                                type="reset"
                                variant="contained"
                                onClick={handleSortReset}
                                fullWidth
                                disableRipple
                                sx={{
                                    borderRadius: "15px",
                                    bgcolor: "primary.main",
                                    mt: "10px"
                                }}
                            >
                                Reset
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Modal>

            {/* Filter Modal */}
            <Modal
                open={addFilter}
                onClose={() => setAddFilter(false)}
            >
                <Paper elevation={0} sx={{
                        width: "35%",
                        // minHeight: "400px",
                        margin: "auto",
                        padding: "30px 40px 40px",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "15px",
                        [theme.breakpoints.between("mobile", "tablet")]: {
                            width: "80%",                        
                        },
                        [theme.breakpoints.between("tablet", "laptop")]: {
                            width: "50%",
                        },
                        [theme.breakpoints.between("laptop", "desktop")]: {
                            width: "50%",
                        },
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                    }}>
                        <Typography variant="h6" sx={{ mb: 1 }} textAlign={"center"}>
                            Filter Transactions
                        </Typography>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}>
                            <Typography variant="body1">Type</Typography>
                            <FormControl size="small" sx={{width: "250px"}}>
                                <Select
                                    value={typeFilter}
                                    onChange={handleType}
                                    sx={{
                                        borderRadius: "5px", 
                                    }}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    <MenuItem value="Income">Income</MenuItem>
                                    <MenuItem value="Expense">Expense</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "25px"
                        }}>
                            <Typography variant="body1">Category</Typography>
                            <FormControl size="small" sx={{width: "250px"}}>
                                <Select
                                    value={categoryFilter}
                                    onChange={handleCategory}
                                    sx={{
                                        borderRadius: "5px", 
                                    }}
                                >
                                    <MenuItem value="">None</MenuItem>
                                    {categories.map((category) => (
                                        <MenuItem key={category.id} value={category.name}>
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "20px"
                        }}>
                            <Typography variant="body1">Date</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker 
                                        label="Date"
                                        value={date ? dayjs(date) : null}
                                        onChange={(newValue) => setDate(newValue ? dayjs(newValue).format("YYYY-MM-DD") : "")}
                                        slotProps={{
                                            textField: {
                                                size: "small",
                                                sx: { width: "250px", borderRadius: "10px" }
                                            }
                                        }}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: "20px"
                        }}>
                            <Typography variant="body1">Date Range</Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                    gap: "10px",
                                    alignItems: "center"
                                }}>
                                <DatePicker 
                                    label="Start Date"
                                    value={startDate ? dayjs(startDate) : null}
                                    onChange={(newValue) => setStartDate(newValue ? dayjs(newValue).format("YYYY-MM-DD") : "")}
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            sx: { width: "150px", borderRadius: "10px" }
                                        }
                                    }}
                                />
                                <DatePicker
                                    label="End Date"
                                    value={endDate ? dayjs(endDate) : null}
                                    onChange={(newValue) => setEndDate(newValue ? dayjs(newValue).format("YYYY-MM-DD") : "")}
                                    slotProps={{
                                        textField: {
                                            size: "small",
                                            sx: { width: "150px", borderRadius: "10px" }
                                        }
                                    }}
                                />
                                </Box>
                            </LocalizationProvider>
                        </Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "5px"
                        }}>
                            <Button
                                type="submit"
                                variant="contained"
                                onClick={() => {
                                    setAddfiltersuccessfully(true);
                                    setAddFilter(false);
                                }}
                                fullWidth
                                disableRipple
                                sx={{
                                    borderRadius: "15px",
                                    bgcolor: "primary.main",
                                    mt: "10px"
                                }}
                            >
                                Apply
                            </Button>
                            <Button
                                type="reset"
                                variant="contained"
                                onClick={() => {
                                    setTypeFilter("");
                                    setCategoryFilter("");
                                    setDate("");
                                    setStartDate("");
                                    setEndDate("");
                                }}
                                fullWidth
                                disableRipple
                                sx={{
                                    borderRadius: "15px",
                                    bgcolor: "primary.main",
                                    mt: "10px"
                                }}
                            >
                                Reset
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Modal>
        </Box>
    )
}

export default TransactionFilter;