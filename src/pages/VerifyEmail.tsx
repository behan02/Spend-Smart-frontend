import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Grid,
} from "@mui/material";
import Logo from "../assets/images/logo/Logo.png";
import VerifyEmailImage from "../assets/images/verifyEmail.svg";

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  useEffect(() => {
    const verify = async () => {
  try {
   const res= await axios.get("https://localhost:7211/api/user/auth/verify-email", {
  params: {
    email,
    token,
  },

    });
    setMessage(res.data || "Email verified successfully!");
    setStatus("success");
  } catch (error) {
    console.error("Verification error:", error);
    let errMsg = "Email verification failed.";
    if (axios.isAxiosError(error)) {
      errMsg = error.response?.data?.message || error.message || errMsg;
    } else if (error instanceof Error) {
      errMsg = error.message || errMsg;
    }
    setMessage(errMsg);
    setStatus("error");
  }
};


    if (email && token) {
      verify();
    } else {
      setMessage("Invalid verification link.");
      setStatus("error");
    }
  }, [email, token]);

  return (
    <Grid container sx={{ minHeight: "100vh", width: "100vw", m: 0, p: 0 }}>
      {/* Left Half */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: "#0d47a1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          p: { xs: 4, md: 0 },
        }}
      >
        <img
          src={VerifyEmailImage}
          alt="Verification Animation"
          style={{
            width: "80%",
            maxWidth: "400px",
            height: "auto",
            margin: "auto",
            display: "block",
          }}
        />
      </Grid>

      {/* Right Half */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          px: { xs: 2, md: 8 },
          py: { xs: 4, md: 0 },
          backgroundColor: "#fff",
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{ maxWidth: "180px", height: "180px", marginBottom: 32 }}
        />
        <Box textAlign="center" mt={4}>
          {status === "loading" && (
            <>
              <CircularProgress role="status" aria-label="Loading" />
              <Typography mt={2}>Verifying your email...</Typography>
            </>
          )}
          {status === "success" && (
            <>
              <Typography variant="h5" sx={{ color: "success.main" }}>
                {message}
              </Typography>
              <Button
                onClick={() => navigate("/")}
                variant="contained"
                sx={{ mt: 2 }}
              >
                Go to Login
              </Button>
            </>
          )}
          {status === "error" && (
            <Typography variant="h5" color="error">
              {message}
            </Typography>
          )}
        </Box>
      </Grid>
    </Grid>
  );
};

export default VerifyEmail;
