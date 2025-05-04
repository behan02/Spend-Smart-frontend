import React from 'react';
import { Controller } from 'react-hook-form';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from '@mui/material';

interface CurrencyOption {
  code: string;
  label: string;
}

const currencyOptions: CurrencyOption[] = [
  { code: 'LKR', label: 'Sri Lankan Rupee' },
  { code: 'USD', label: 'US Dollar' },
  { code: 'EUR', label: 'Euro' },
  { code: 'GBP', label: 'British Pound' },
  { code: 'JPY', label: 'Japanese Yen' },
  { code: 'AUD', label: 'Australian Dollar' },
  { code: 'CAD', label: 'Canadian Dollar' },
  { code: 'CHF', label: 'Swiss Franc' },
  { code: 'CNY', label: 'Chinese Yuan' },
  { code: 'SEK', label: 'Swedish Krona' },
  { code: 'NZD', label: 'New Zealand Dollar' },
];

interface CurrencyProps {
  control: any;
  name: string;
  label: string;
  error?: boolean;
  helperText?: string;
}

const Currency: React.FC<CurrencyProps> = ({
  control,
  name,
  label,
  error,
  helperText,
}) => (
  <FormControl fullWidth margin="normal" error={error}>
    <InputLabel id={`${name}-label`}>{label}</InputLabel>
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <Select labelId={`${name}-label`} label={label} {...field}>
          {currencyOptions.map((option) => (
            <MenuItem key={option.code} value={option.code}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}
    />
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

export default Currency;
