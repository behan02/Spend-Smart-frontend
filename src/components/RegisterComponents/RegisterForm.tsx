import React, { useState } from "react";
import {
  TextField,
  InputAdornment,
  Divider,
  Button,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import User from "@mui/icons-material/PermIdentity";
import MailIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/LockOutlined";
import { useNavigate, Link } from "react-router-dom";
import { useForm, Controller, useWatch } from "react-hook-form";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";
import Currency from "./Currency";

interface RegisterFormInputs {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  currency?: string;
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const password = useWatch({ control, name: "password" });

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  };

  const onSubmit = async (data: RegisterFormInputs) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://localhost:7211/api/user/auth/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      const result = await response.text(); // Accept plain text or string response

      if (!response.ok) {
        throw new Error(result || "Registration failed");
      }

      alert(result); // e.g. "Registration successful"
      navigate("/");
    } catch (err: any) {
      alert(`Registration failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Username */}
      <Controller
        name="userName"
        control={control}
        defaultValue=""
        rules={{ required: "Name is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            error={!!errors.userName}
            helperText={errors.userName?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <User />
                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                </InputAdornment>
              ),
            }}
            sx={{ width: "300px" }}
          />
        )}
      />
      <br />

      {/* Email */}
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: "Email is required",
          validate: (value) => isValidEmail(value) || "Invalid email address",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MailIcon />
                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                </InputAdornment>
              ),
            }}
            sx={{ width: "300px" }}
            margin="normal"
          />
        )}
      />
      <br />

      {/* Password */}
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required: "Password is required",
          minLength: { value: 6, message: "Min 6 characters" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Password"
            type="password"
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                </InputAdornment>
              ),
            }}
            sx={{ width: "300px" }}
            margin="normal"
          />
        )}
      />
      <br />

      <PasswordStrengthIndicator password={password || ""} />
      <br />

      {/* Confirm Password */}
      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        rules={{
          required: "Please confirm your password",
          validate: (value) =>
            value === getValues("password") || "Passwords do not match",
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Confirm Password"
            type="password"
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                  <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                </InputAdornment>
              ),
            }}
            sx={{ width: "300px" }}
            margin="normal"
          />
        )}
      />
      <br />

      {/* Currency Dropdown */}
      <Controller
        name="currency"
        control={control}
        defaultValue=""
        render={({ field, fieldState }) => (
          <Currency
            value={field.value}
            onChange={field.onChange}
            label="Preferred Currency"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <br />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="contained"
        disabled={isLoading}
        sx={{
          height: "45px",
          width: "300px",
          backgroundColor: "#023E8A",
          mt: 2,
          "&:hover": { backgroundColor: "#022E6A" },
        }}
      >
        {isLoading ? <CircularProgress size={24} color="inherit" /> : "Sign up"}
      </Button>

      <Box
        sx={{ display: "flex", justifyContent: "center", width: "100%", mt: 1 }}
      >
        <Typography sx={{ fontSize: "0.85rem" }}>
          Already registered?{" "}
          <Link
            to="/"
            style={{ color: "#023E8A", fontWeight: "bold", opacity: 0.5 }}
            onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
            onMouseOut={(e) => (e.currentTarget.style.opacity = "0.5")}
          >
            Login here
          </Link>
        </Typography>
      </Box>
    </form>
  );
};

export default RegisterForm;
