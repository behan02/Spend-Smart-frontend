import React, { useState } from "react";
import { Button, Alert, CircularProgress, Box } from "@mui/material";
import userService from "../Services/userService";

const ConnectionTest: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setResult(null);

    try {
      // Test connection using existing method
      const response = await userService.checkPendingEmailChange(1);
      setResult({
        success: true,
        message: `✅ Connection successful! API is responding.`,
      });
    } catch (error: any) {
      let errorMessage = "❌ Connection failed: ";

      if (error.code === "ERR_NETWORK") {
        errorMessage +=
          "Network error - Check if backend is running and CORS is configured";
      } else if (error.response?.status) {
        errorMessage += `Server responded with ${error.response.status} - ${error.response.statusText}`;
      } else {
        errorMessage += error.message || "Unknown error";
      }

      setResult({
        success: false,
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 2, border: "1px solid #ccc", borderRadius: 2, mb: 2 }}>
      <h3>🔧 API Connection Test</h3>
      <p>Current API URL: {import.meta.env.VITE_API_URL || "Not configured"}</p>

      <Button
        onClick={testConnection}
        disabled={loading}
        variant="contained"
        startIcon={loading ? <CircularProgress size={16} /> : null}
        sx={{ mb: 2 }}
      >
        {loading ? "Testing..." : "Test Connection"}
      </Button>

      {result && (
        <Alert severity={result.success ? "success" : "error"}>
          {result.message}
        </Alert>
      )}
    </Box>
  );
};

export default ConnectionTest;
