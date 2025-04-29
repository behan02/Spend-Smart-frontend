import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Sample currency options (replace with your own data later)
const currencies = [
  { code: "LKR", name: "Sri Lankan Rupees" },
  { code: "USD", name: "US Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "AUD", name: "Australian Dollar" },
];

const CurrencySelector: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");

  const handleCurrencyChange = (event: SelectChangeEvent) => {
    setSelectedCurrency(event.target.value as string);
  };

  const handleAddCurrency = () => {
    if (selectedCurrency) {
      console.log(`Currency added: ${selectedCurrency}`);
      // You'll implement the actual add functionality later
      setSelectedCurrency(""); // Reset selection
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 4, px: 2 }}>
      <Box
        sx={{
          display: "flex",
          mb: 4,
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <FormControl
          fullWidth
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          }}
        >
          <Select
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            displayEmpty
            sx={{
              borderRadius: 0,
              "& .MuiSelect-select": {
                pl: 2,
                pt: 1.5,
                pb: 1.5,
              },
            }}
            renderValue={(selected) => {
              if (!selected) {
                return <span style={{ color: "#757575" }}>Currency name</span>;
              }
              const currency = currencies.find((c) => c.code === selected);
              return currency ? currency.name : selected;
            }}
          >
            <MenuItem disabled value="">
              <em>Currency name</em>
            </MenuItem>
            {currencies.map((currency) => (
              <MenuItem key={currency.code} value={currency.code}>
                {currency.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddCurrency}
          disabled={!selectedCurrency}
          sx={{
            borderRadius: 0,
            px: 3,
            bgcolor: "#004aad",
            "&:hover": {
              bgcolor: "#003c8f",
            },
          }}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default CurrencySelector;
