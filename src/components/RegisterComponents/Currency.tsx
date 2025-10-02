import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
  InputAdornment,
  Divider,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

interface CurrencyOption {
  code: string;
  label: string;
}

const currencyOptions: CurrencyOption[] = [
  { code: "LKR", label: "Sri Lankan Rupee" },
  { code: "USD", label: "US Dollar" },
  { code: "EUR", label: "Euro" },
  { code: "GBP", label: "British Pound" },
  { code: "JPY", label: "Japanese Yen" },
  { code: "AUD", label: "Australian Dollar" },
  { code: "CAD", label: "Canadian Dollar" },
  { code: "CHF", label: "Swiss Franc" },
  { code: "CNY", label: "Chinese Yuan" },
  { code: "SEK", label: "Swedish Krona" },
  { code: "NZD", label: "New Zealand Dollar" },
];

interface CurrencyProps {
  value: string;
  onChange: (event: SelectChangeEvent<string>) => void;
  label: string;
  error?: boolean;
  helperText?: string;
}

const Currency: React.FC<CurrencyProps> = ({
  value,
  onChange,
  label,
  error,
  helperText,
}) => {
  return (
    <FormControl fullWidth error={error} >
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        onChange={onChange}
        startAdornment={
          <InputAdornment position="start">
            <AttachMoneyIcon sx={{ color: "#023E8A" }} />
            <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
          </InputAdornment>
        }
        sx={{
          height: "50px",
          borderRadius: 2,
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: 2,
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#023E8A",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#023E8A",
          },
        }}
      >
        {currencyOptions.map((option) => (
          <MenuItem key={option.code} value={option.code}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default Currency;