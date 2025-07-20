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
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [nameLoading, setNameLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [nameMessage, setNameMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [pendingEmailChange, setPendingEmailChange] = useState<any>(null);

  // Check for pending email change on component mount
  useEffect(() => {
    checkPendingEmailChange();
  }, []);

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

        {pendingEmailChange?.hasPendingChange ? (
          <div
            style={{
              border: "1px solid #orange",
              borderRadius: "4px",
              padding: "15px",
              backgroundColor: "#fff3cd",
            }}
          >
            <p style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
              <strong>Current Email:</strong> {pendingEmailChange.currentEmail}
            </p>
            <p style={{ margin: "0 0 10px 0", fontSize: "14px" }}>
              <strong>Pending Email:</strong> {pendingEmailChange.pendingEmail}
            </p>
            <p
              style={{
                margin: "0 0 15px 0",
                fontSize: "14px",
                color: "#856404",
              }}
            >
              Please check your new email for the verification link. The link
              will expire at{" "}
              {new Date(pendingEmailChange.expiresAt).toLocaleString()}.
            </p>
            <button
              onClick={handleCancelEmailChange}
              disabled={emailLoading}
              style={{
                padding: "8px 16px",
                backgroundColor: emailLoading ? "#ccc" : "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: emailLoading ? "not-allowed" : "pointer",
              }}
            >
              {emailLoading ? "Cancelling..." : "Cancel Email Change"}
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your new email address"
              disabled={emailLoading}
              style={{
                padding: "8px 12px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                flex: 1,
              }}
            />
            <button
              onClick={handleUpdateEmail}
              disabled={emailLoading || !email.trim()}
              style={{
                padding: "8px 16px",
                backgroundColor: emailLoading ? "#ccc" : "#1976d2",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: emailLoading ? "not-allowed" : "pointer",
              }}
            >
              {emailLoading ? "Sending..." : "Update"}
            </button>
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
