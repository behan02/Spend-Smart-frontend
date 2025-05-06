import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";

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
    <FormControl fullWidth margin="normal" error={error}>
      <InputLabel>{label}</InputLabel>
      <Select label={label} value={value} onChange={onChange}>
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
