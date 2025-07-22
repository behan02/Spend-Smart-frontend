import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { useUser } from "../../context/UserContext";

const modalStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

interface AddGoalModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (goal: any) => void;
  initialData?: any;
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({
  open,
  onClose,
  onSave,
  initialData,
}) => {
  const { userId } = useUser();

  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState<number | "">("");
  const [currentAmount, setCurrentAmount] = useState<number | "">("");
  const [deadlineDate, setDeadlineDate] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isEditMode = Boolean(initialData);

  useEffect(() => {
    if (isEditMode && initialData) {
      setName(initialData.name || "");
      setTargetAmount(initialData.targetAmount || "");
      setCurrentAmount(initialData.currentAmount || "");
      setDeadlineDate(initialData.endDate?.split("T")[0] || "");
      setDescription(initialData.description || "");
    } else {
      setName("");
      setTargetAmount("");
      setCurrentAmount("");
      setDeadlineDate("");
      setDescription("");
    }
    setError("");
  }, [initialData, isEditMode, open]);

  const handleClose = () => {
    setName("");
    setTargetAmount("");
    setCurrentAmount("");
    setDeadlineDate("");
    setDescription("");
    setError("");
    setLoading(false);
    onClose();
  };

  const handleSave = async () => {
    // Basic validation
    if (!name.trim()) {
      setError("Goal name is required");
      return;
    }
    if (!targetAmount || parseFloat(targetAmount.toString()) <= 0) {
      setError("Target amount must be greater than 0");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const parsedUserId = userId ?? 0;
      if (!parsedUserId || parsedUserId === 0) {
        setError("Invalid user session. Please log in again.");
        return;
      }

      // Prepare data for API call
      const now = new Date();
      const endDate = deadlineDate ? new Date(deadlineDate) : new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days from now if no deadline

      let response;
      
      if (isEditMode && initialData?.id) {
        // UPDATE - Use PUT with ID in URL
        const updateData = {
          name: name.trim(),
          targetAmount: parseFloat(targetAmount.toString()),
          currentAmount: parseFloat(currentAmount.toString()) || 0,
          endDate: endDate.toISOString(),
          description: description.trim(),
        };
        
        response = await axios.put(`https://localhost:7211/api/Goals/${userId}`, updateData);
        console.log("Goal updated:", response.data);
      } else {
        // CREATE - Use POST
        const createData = {
          userId: parsedUserId,
          name: name.trim(),
          targetAmount: parseFloat(targetAmount.toString()),
          currentAmount: parseFloat(currentAmount.toString()) || 0,
          startDate: now.toISOString(),
          endDate: endDate.toISOString(),
          description: description.trim(),
        };
        
        response = await axios.post("https://localhost:7211/api/Goals", createData);
        console.log("Goal created:", response.data);
      }

      onSave(response.data);
      handleClose();
    } catch (error: any) {
      console.error("❌ Error saving goal:", error);
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data) {
        // If the backend returns validation errors
        const backendError = typeof error.response.data === 'string' 
          ? error.response.data 
          : JSON.stringify(error.response.data);
        setError(backendError);
      } else if (error.response?.status === 400) {
        setError("Please check your input data and try again.");
      } else if (error.response?.status >= 500) {
        setError("Server error. Please try again later.");
      } else {
        setError("Failed to save goal. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" mb={2}>
          {isEditMode ? "Edit Goal" : "Add New Goal"}
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Stack spacing={2}>
          <TextField
            label="Goal Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
            required
          />
          <TextField
            label="Target Amount"
            type="number"
            fullWidth
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value === "" ? "" : parseFloat(e.target.value))}
            disabled={loading}
            required
            inputProps={{ min: 0, step: 0.01 }}
          />
          <TextField
            label="Current Amount"
            type="number"
            fullWidth
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value === "" ? "" : parseFloat(e.target.value))}
            disabled={loading}
            inputProps={{ min: 0, step: 0.01 }}
          />
          <TextField
            label="Deadline"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={deadlineDate}
            onChange={(e) => setDeadlineDate(e.target.value)}
            disabled={loading}
          />
          <TextField
            label="Description"
            multiline
            rows={3}
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={handleClose} color="inherit" disabled={loading}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave} 
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={16} /> : null}
            >
              {loading ? "Saving..." : (isEditMode ? "Update" : "Save")}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddGoalModal;