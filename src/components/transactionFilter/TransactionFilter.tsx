import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { filterContainerStyle } from "./transactionFilterStyles";
import theme from "../../assets/styles/theme";

const TransactionFilter: React.FC = () => {
    
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
            <Box sx={filterContainerStyle}>
                <FormControl size="small" sx={{ minWidth: 150}}>
                    <InputLabel id="select-month">Month</InputLabel>
                    <Select
                        labelId="select-month"
                        value={month}
                        onChange={handleMonth}
                        label="Month"
                        sx={{
                            borderRadius: "15px",
                        }}
                    >
                        <MenuItem value="January">January</MenuItem>
                        <MenuItem value="February">February</MenuItem>
                        <MenuItem value="March">March</MenuItem>
                    </Select>
                </FormControl>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "15px",
                    [theme.breakpoints.between("mobile", "tablet")]: {
                        width: "100%",
                        gap: "5px"
                    }
                }}>
                    <FormControl size="small" sx={{ minWidth: 150}}>
                        <InputLabel id="select-sort">Sort</InputLabel>
                        <Select
                            labelId="select-sort"
                            value={sort}
                            onChange={handleSort}
                            label="Sort"
                            sx={{
                                borderRadius: "15px",
                            }}
                        >
                            <MenuItem value="Newest">Newest first</MenuItem>
                            <MenuItem value="Oldest">Oldest first</MenuItem>
                            <MenuItem value="Amount">Amount</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl size="small" sx={{ minWidth: 150}}>
                        <InputLabel id="select-filter">Filter</InputLabel>
                        <Select
                            labelId="select-filter"
                            value={filter}
                            onChange={handleFilter}
                            label="Filter"
                            sx={{
                                borderRadius: "15px",
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