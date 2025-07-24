import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatStrikethrough,
  Link,
  FormatListBulleted,
  FormatListNumbered,
  Code,
  Close,
} from "@mui/icons-material";
import axios from "axios";
import { getApiBaseUrl } from "../../Utils/apiUtils";

// Emoji rating options - CUSTOMIZE: You can change these emojis or add more
const RATING_EMOJIS = [
  { value: 1, emoji: "😢", label: "Very Poor" },
  { value: 2, emoji: "😕", label: "Poor" },
  { value: 3, emoji: "😐", label: "Average" },
  { value: 4, emoji: "😊", label: "Good" },
  { value: 5, emoji: "😍", label: "Excellent" },
];

interface FeedbackFormProps {
  userId: number;
  // CUSTOMIZE: You can add more props like pageContext, featureContext etc.
}

interface FeedbackData {
  rating: number | null;
  comment: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    rating: null,
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const API_BASE_URL = getApiBaseUrl();

  // Handle emoji rating selection
  const handleRatingSelect = (rating: number) => {
    setFeedbackData((prev) => ({ ...prev, rating }));
  };

  // Handle comment input
  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFeedbackData((prev) => ({ ...prev, comment: event.target.value }));
  };

  // Format text functions for the toolbar
  const formatText = (format: string) => {
    const textarea = document.querySelector('textarea[name="feedback-comment"]') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    
    let formattedText = "";
    switch (format) {
      case "bold":
        formattedText = `**${selectedText}**`;
        break;
      case "italic":
        formattedText = `*${selectedText}*`;
        break;
      case "strikethrough":
        formattedText = `~~${selectedText}~~`;
        break;
      case "link":
        formattedText = `[${selectedText || "link text"}](url)`;
        break;
      case "bullet":
        formattedText = `• ${selectedText}`;
        break;
      case "number":
        formattedText = `1. ${selectedText}`;
        break;
      case "code":
        formattedText = `\`${selectedText}\``;
        break;
      default:
        formattedText = selectedText;
    }

    const newValue = 
      textarea.value.substring(0, start) + 
      formattedText + 
      textarea.value.substring(end);
    
    setFeedbackData((prev) => ({ ...prev, comment: newValue }));
  };

  // Submit feedback
  const handleSubmitFeedback = async () => {
    if (!feedbackData.rating) {
      setErrorMessage("Please select a rating before submitting.");
      setShowError(true);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/feedback/submit`, {
        userId: userId,
        rating: feedbackData.rating,
        comment: feedbackData.comment.trim(),
        // CUSTOMIZE: Add more context data here
        pageContext: "user-settings", // Where the feedback was submitted from
        timestamp: new Date().toISOString(),
      });

      if (response.status === 200 || response.status === 201) {
        setShowSuccess(true);
        setIsOpen(false);
        // Reset form
        setFeedbackData({ rating: null, comment: "" });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setErrorMessage("Failed to submit feedback. Please try again.");
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close modal
  const handleClose = () => {
    setIsOpen(false);
    setFeedbackData({ rating: null, comment: "" });
  };

  return (
    <>
      {/* Feedback Button */}
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button
          variant="outlined"
          onClick={() => setIsOpen(true)}
          sx={{
            borderColor: "#3e22c8ff",
            color: "#340fafff",
            "&:hover": {
              borderColor: "rgba(58, 0, 230, 1)",
              backgroundColor: "rgba(255, 140, 0, 0.04)",
            },
          }}
        >
          Share Your Feedback
        </Button>
      </Box>

      {/* Feedback Modal */}
      {isOpen && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: 3,
              p: 4,
              maxWidth: 500,
              width: "90%",
              maxHeight: "90vh",
              overflow: "auto",
              position: "relative",
              boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
            }}
          >
            {/* Close Button */}
            <IconButton
              onClick={handleClose}
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                color: "#666",
              }}
            >
              <Close />
            </IconButton>

            {/* Header */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                mb: 1,
                pr: 5, // Space for close button
              }}
            >
              Feedback
            </Typography>

            {/* Question */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 1,
                color: "#333",
              }}
            >
              {/* CUSTOMIZE: Change this question to match your needs */}
              How do you rate the quality of the user settings?
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#666",
                mb: 3,
              }}
            >
              {/* CUSTOMIZE: Change this subtitle */}
              Please rate so we can improve the quality of our service
            </Typography>

            {/* Emoji Rating */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mb: 4,
              }}
            >
              {RATING_EMOJIS.map((item) => (
                <Tooltip key={item.value} title={item.label}>
                  <Box
                    onClick={() => handleRatingSelect(item.value)}
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "2rem",
                      backgroundColor:
                        feedbackData.rating === item.value
                          ? "#ff8c00"
                          : "transparent",
                      border:
                        feedbackData.rating === item.value
                          ? "3px solid #ff8c00"
                          : "2px solid #e0e0e0",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor:
                          feedbackData.rating === item.value
                            ? "#ff8c00"
                            : "rgba(255, 140, 0, 0.1)",
                        borderColor: "#ff8c00",
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    {item.emoji}
                  </Box>
                </Tooltip>
              ))}
            </Box>

            {/* Formatting Toolbar */}
            <Box
              sx={{
                display: "flex",
                gap: 1,
                mb: 2,
                p: 1,
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
                flexWrap: "wrap",
              }}
            >
              <Tooltip title="Bold">
                <IconButton size="small" onClick={() => formatText("bold")}>
                  <FormatBold fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Italic">
                <IconButton size="small" onClick={() => formatText("italic")}>
                  <FormatItalic fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Strikethrough">
                <IconButton size="small" onClick={() => formatText("strikethrough")}>
                  <FormatStrikethrough fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Link">
                <IconButton size="small" onClick={() => formatText("link")}>
                  <Link fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Bullet List">
                <IconButton size="small" onClick={() => formatText("bullet")}>
                  <FormatListBulleted fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Numbered List">
                <IconButton size="small" onClick={() => formatText("number")}>
                  <FormatListNumbered fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Code">
                <IconButton size="small" onClick={() => formatText("code")}>
                  <Code fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Comment Input */}
            <TextField
              multiline
              rows={6}
              fullWidth
              placeholder="Add a comment..."
              value={feedbackData.comment}
              onChange={handleCommentChange}
              name="feedback-comment"
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: "#ff8c00",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ff8c00",
                  },
                },
              }}
            />

            {/* Submit Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmitFeedback}
              disabled={isSubmitting || !feedbackData.rating}
              sx={{
                backgroundColor: "#ff8c00",
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#e67e00",
                },
                "&:disabled": {
                  backgroundColor: "#ccc",
                },
              }}
            >
              {isSubmitting ? (
                <>
                  <CircularProgress size={20} color="inherit" sx={{ mr: 1 }} />
                  Sending Feedback...
                </>
              ) : (
                "Send Feedback"
              )}
            </Button>
          </Box>
        </Box>
      )}

      {/* Success Snackbar */}
      <Snackbar
        open={showSuccess}
        autoHideDuration={6000}
        onClose={() => setShowSuccess(false)}
      >
        <Alert
          onClose={() => setShowSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Thank you for your feedback! We appreciate your input.
        </Alert>
      </Snackbar>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={6000}
        onClose={() => setShowError(false)}
      >
        <Alert
          onClose={() => setShowError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default FeedbackForm;