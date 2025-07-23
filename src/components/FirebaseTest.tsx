import React, { useState } from "react";
import { Button, Box, Typography, Alert } from "@mui/material";
import { uploadPDFToFirebase } from "../Services/firebaseService";

const FirebaseTest: React.FC = () => {
  const [status, setStatus] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const testFirebaseConnection = async () => {
    setLoading(true);
    setStatus("Testing Firebase connection...");

    try {
      // Create a small test PDF blob
      const testContent = "Test PDF content for Firebase upload";
      const blob = new Blob([testContent], { type: "application/pdf" });

      // Test upload with user ID 1
      const result = await uploadPDFToFirebase(blob, "firebase-test.pdf", 2);

      setStatus(`✅ Success! File uploaded to: ${result}`);
    } catch (error: any) {
      setStatus(`❌ Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        🔥 Firebase Connection Test
      </Typography>

      <Button
        variant="contained"
        onClick={testFirebaseConnection}
        disabled={loading}
        sx={{ mb: 2 }}
      >
        {loading ? "Testing..." : "Test Firebase Upload"}
      </Button>

      {status && (
        <Alert severity={status.includes("✅") ? "success" : "error"}>
          {status}
        </Alert>
      )}
    </Box>
  );
};

export default FirebaseTest;
