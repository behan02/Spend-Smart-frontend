import React, { useState, useEffect } from "react";
import userService from "../../Services/userService";

interface AccountFormProps {
  userId: number;
  initialName?: string;
  initialEmail?: string;
  onUpdateSuccess?: () => void;
}

const AccountForm: React.FC<AccountFormProps> = ({
  userId,
  initialName = "",
  initialEmail = "",
  onUpdateSuccess,
}) => {
  // Add CSS animation styles
  const slideInStyle = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  // Inject styles if not already present
  useEffect(() => {
    const styleId = "account-form-animations";
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = slideInStyle;
      document.head.appendChild(style);
    }
  }, []);

  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [nameLoading, setNameLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [nameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [pendingEmailChange, setPendingEmailChange] = useState<any>(null);
  const [emailSuccessMessage, setEmailSuccessMessage] = useState("");

  // Update email when initialEmail prop changes (e.g., after successful verification)
  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  // Check for pending email change on component mount
  useEffect(() => {
    checkPendingEmailChange();

    // Check for email verification success from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("emailChanged") === "true") {
      setEmailSuccessMessage(
        "Email updated successfully! Your email address has been changed."
      );

      // Clear any pending email change state
      setPendingEmailChange(null);

      // Clear the URL parameter after showing the message
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);

      // Clear success message after 5 seconds
      setTimeout(() => {
        setEmailSuccessMessage("");
      }, 5000);

      // Trigger parent component refresh if callback provided
      if (onUpdateSuccess) {
        onUpdateSuccess();
      }
    }
  }, [onUpdateSuccess, initialEmail]);

  const checkPendingEmailChange = async () => {
    try {
      const result = await userService.checkPendingEmailChange(userId);
      if (result.success && result.hasPendingChange) {
        setPendingEmailChange(result);
      } else {
        setPendingEmailChange(null);
      }
    } catch (error) {
      console.error("Error checking pending email change:", error);
    }
  };

  const handleUpdateName = async () => {
    if (!name.trim()) {
      setNameMessage("Name cannot be empty");
      return;
    }

    setNameLoading(true);
    setNameMessage("");

    try {
      const result = await userService.updateUserName({
        userId,
        userName: name.trim(),
      });

      if (result.success) {
        setNameMessage("Name updated successfully!");
        onUpdateSuccess?.();
      }
    } catch (error: any) {
      setNameMessage("Failed to update name: " + error.message);
    } finally {
      setNameLoading(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!email.trim()) {
      setEmailMessage("Email cannot be empty");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setEmailMessage("Please enter a valid email address");
      return;
    }

    setEmailLoading(true);
    setEmailMessage("");

    try {
      const result = await userService.updateUserEmail({
        newEmail: email.trim(),
        userId: userId,
      });

      if (result.success) {
        setEmailMessage(
          "Verification email sent! Please check your inbox and click the verification link."
        );
        // Refresh pending email status
        await checkPendingEmailChange();
      }
    } catch (error: any) {
      setEmailMessage(error.message);
    } finally {
      setEmailLoading(false);
    }
  };

  const handleCancelEmailChange = async () => {
    setEmailLoading(true);
    try {
      const result = await userService.cancelEmailChange(userId);
      if (result.success) {
        setEmailMessage("Email change request cancelled.");
        setPendingEmailChange(null);
      }
    } catch (error: any) {
      setEmailMessage("Failed to cancel email change: " + error.message);
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div>
      {/* Name Section */}
      <div style={{ marginBottom: "20px" }}>
        <label>Name</label>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            disabled={nameLoading}
            style={{
              padding: "8px 12px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              flex: 1,
            }}
          />
          <button
            onClick={handleUpdateName}
            disabled={nameLoading || !name.trim()}
            style={{
              padding: "8px 16px",
              backgroundColor: nameLoading ? "#ccc" : "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: nameLoading ? "not-allowed" : "pointer",
            }}
          >
            {nameLoading ? "Updating..." : "Update"}
          </button>
        </div>
        {nameMessage && (
          <div
            style={{
              marginTop: "5px",
              fontSize: "14px",
              color: nameMessage.includes("successfully") ? "green" : "red",
            }}
          >
            {nameMessage}
          </div>
        )}
      </div>

      {/* Email Section */}
      <div style={{ marginBottom: "20px" }}>
        <label>Email</label>

        {/* Email Input Field - Always visible */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your new email address"
            disabled={emailLoading || pendingEmailChange?.hasPendingChange}
            style={{
              padding: "8px 12px",
              border: pendingEmailChange?.hasPendingChange
                ? "1px solid #4caf50"
                : "1px solid #ccc",
              borderRadius: "4px",
              flex: 1,
              backgroundColor: pendingEmailChange?.hasPendingChange
                ? "#e8f5e8"
                : "white",
            }}
          />
          <button
            onClick={handleUpdateEmail}
            disabled={
              emailLoading ||
              !email.trim() ||
              pendingEmailChange?.hasPendingChange
            }
            style={{
              padding: "8px 16px",
              backgroundColor:
                emailLoading || pendingEmailChange?.hasPendingChange
                  ? "#ccc"
                  : "#1976d2",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor:
                emailLoading || pendingEmailChange?.hasPendingChange
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {emailLoading ? "Sending..." : "Update"}
          </button>
        </div>

        {/* Verification Notice - Shown below email field when pending */}
        {pendingEmailChange?.hasPendingChange && (
          <div
            style={{
              marginTop: "12px",
              border: "1px solid #4caf50",
              borderRadius: "8px",
              padding: "16px",
              backgroundColor: "#e8f5e8",
              boxShadow: "0 2px 4px rgba(76, 175, 80, 0.1)",
              animation: "slideIn 0.3s ease-out",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "#4caf50",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "8px",
                  fontSize: "12px",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                ✓
              </div>
              <p
                style={{
                  margin: "0",
                  fontSize: "14px",
                  color: "#2e7d32",
                  fontWeight: "500",
                }}
              >
                Email Verification Sent
              </p>
            </div>

            <p
              style={{
                margin: "0 0 16px 0",
                fontSize: "14px",
                color: "#388e3c",
                lineHeight: "1.4",
              }}
            >
              Please check your new email for the verification link to complete
              the email change.
            </p>

            <button
              onClick={handleCancelEmailChange}
              disabled={emailLoading}
              style={{
                padding: "10px 20px",
                backgroundColor: emailLoading ? "#ccc" : "#388e3c",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: emailLoading ? "not-allowed" : "pointer",
                fontSize: "14px",
                fontWeight: "500",
                transition: "all 0.2s ease",
                boxShadow: "0 1px 3px rgba(56, 142, 60, 0.3)",
              }}
              onMouseOver={(e) => {
                if (!emailLoading) {
                  const target = e.target as HTMLButtonElement;
                  target.style.backgroundColor = "#2e7d32";
                  target.style.transform = "translateY(-1px)";
                }
              }}
              onMouseOut={(e) => {
                if (!emailLoading) {
                  const target = e.target as HTMLButtonElement;
                  target.style.backgroundColor = "#388e3c";
                  target.style.transform = "translateY(0)";
                }
              }}
            >
              {emailLoading ? "Cancelling..." : "Cancel Email Change"}
            </button>
          </div>
        )}

        {/* Email Success Message - Shown when email verification is completed */}
        {emailSuccessMessage && (
          <div
            style={{
              marginTop: "12px",
              border: "1px solid #4caf50",
              borderRadius: "8px",
              padding: "16px",
              backgroundColor: "#e8f5e8",
              boxShadow: "0 2px 4px rgba(76, 175, 80, 0.2)",
              animation: "slideIn 0.3s ease-out",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: "#4caf50",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px",
                  fontSize: "16px",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                ✓
              </div>
              <p
                style={{
                  margin: "0",
                  fontSize: "16px",
                  color: "#2e7d32",
                  fontWeight: "600",
                }}
              >
                Success!
              </p>
            </div>

            <p
              style={{
                margin: "0",
                fontSize: "14px",
                color: "#388e3c",
                lineHeight: "1.5",
              }}
            >
              {emailSuccessMessage}
            </p>
          </div>
        )}

        {emailMessage && (
          <div
            style={{
              marginTop: "5px",
              fontSize: "14px",
              color:
                emailMessage.includes("sent") ||
                emailMessage.includes("cancelled")
                  ? "green"
                  : "red",
            }}
          >
            {emailMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountForm;
