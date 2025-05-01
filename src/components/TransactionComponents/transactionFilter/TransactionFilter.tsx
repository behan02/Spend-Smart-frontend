import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { filterContainerStyle } from "./transactionFilterStyles";
import theme from "../../../assets/styles/theme";

const TransactionFilter: React.FC = () => {
    // State to manage the selected month, sort option, and filter option
    const [month, setMonth] = useState<string>("");
    const [sort, setSort] = useState<string>("");
    const [filter, setFilter] = useState<string>("");

    const handleMonth = (e: SelectChangeEvent<string>) => {
        setMonth(e.target.value as string);
    }

    const handleSort = (e: SelectChangeEvent<string>) => {
        setSort(e.target.value as string);
    }

    const handleFilter = (e: SelectChangeEvent<string>) => {
        setFilter(e.target.value as string);
    }

    return (
        <ThemeProvider theme={theme}>
            {/* Filter Container */}
            <Box sx={filterContainerStyle}>
                {/* Month Dropdown */}
                <FormControl size="small" sx={{ minWidth: 150}}>
                    <InputLabel id="select-month">Month</InputLabel>
                    <Select
                        labelId="select-month"
                        value={month}
                        onChange={handleMonth}
                        label="Month"
                        sx={{
                            borderRadius: "15px", // Rounded corners for the dropdown
                        }}
                    >
                        <MenuItem value="January">January</MenuItem>
                        <MenuItem value="February">February</MenuItem>
                        <MenuItem value="March">March</MenuItem>
                    </Select>
                </FormControl>

                {/* Sort and Filter Options */}
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "15px", // Space between dropdowns
                    [theme.breakpoints.between("mobile", "tablet")]: {
                        width: "100%", // Full width on smaller screens
                        gap: "5px" // Reduced gap for smaller screens
                    }
                }}>

                    {/* Sort Dropdown */}
                    <FormControl size="small" sx={{ minWidth: 150}}>
                        <InputLabel id="select-sort">Sort</InputLabel>
                        <Select
                            labelId="select-sort"
                            value={sort}
                            onChange={handleSort}
                            label="Sort"
                            sx={{
                                borderRadius: "15px", // Rounded corners for the dropdown
                            }}
                        >
                            <MenuItem value="Newest">Newest first</MenuItem>
                            <MenuItem value="Oldest">Oldest first</MenuItem>
                            <MenuItem value="Amount">Amount</MenuItem>
                        </Select>
                    </FormControl>

                    {/* Filter Dropdown */}
                    <FormControl size="small" sx={{ minWidth: 150}}>
                        <InputLabel id="select-filter">Filter</InputLabel>
                        <Select
                            labelId="select-filter"
                            value={filter}
                            onChange={handleFilter}
                            label="Filter"
                            sx={{
                                borderRadius: "15px", // Rounded corners for the dropdown
                            }}
                        >
                            <MenuItem value="Type">Type</MenuItem>
                            <MenuItem value="Category">Category</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default TransactionFilter;