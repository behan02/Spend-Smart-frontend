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
import Currency from "./Currency";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import PasswordStrengthIndicator from "./PasswordStrengthIndicator";

interface FormErrors {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  currency?: { message: string };
}

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { control } = useForm();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    let valid = true;
    const newErrors: FormErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords don't match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const response = await fetch(``, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("user", JSON.stringify(data));
      alert("Registration successful!");
      navigate("/dashboard");
    } catch (err: any) {
      alert(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        error={!!errors.name}
        helperText={errors.name}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <User />
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            </InputAdornment>
          ),
        }}
        sx={{ width: "300px" }}
        margin="normal"
      />
      <br />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        helperText={errors.email}
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
      <br />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        helperText={errors.password}
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
      <br />
      <PasswordStrengthIndicator password={password} />
      <TextField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
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
      <br />
      <Currency
        control={control}
        name="currency"
        label="Preferred Currency"
        error={!!errors.currency}
        helperText={errors.currency?.message}
      />
      <br />
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
