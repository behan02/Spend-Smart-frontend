import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";

const PasswordStrengthIndicator: React.FC<{ password: string }> = ({ password }) => {
  const getStrength = (): number => {
    if (!password) return 0;
    if (password.length < 6) return 1;
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return 3;
    return 2;
  };

  const strength = getStrength();
  const strengthText = ["Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["#ff4444", "#ffbb33", "#00C851", "#00C851"][strength];

  return (
    <Typography sx={{ color: strengthColor, ml: 24, mt: 1 }}>
      Strength: {strengthText}
    </Typography>
  );
};

const Passwordchange = () => {
  const [newPassword, setNewPassword] = useState("");

  return (
    <form>
      <Stack direction="column" spacing={3} sx={{ ml: 15 }}>
        <label>
          <Typography sx={{ fontSize: 15, ml: 2 }}>Current Password</Typography>
          <TextField
            type="password"
            name="currentpwd"
            sx={{ width: 500, mb: 2, ml: 24, mt: -2.5 }}
            slotProps={{
              input: {
                sx: {
                  height: 30,
                },
              },
            }}
          />
        </label>

        <label>
          <Typography sx={{ fontSize: 15, ml: 2 }}>New Password</Typography>
          <TextField
            type="password"
            name="newpwd"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            sx={{ width: 500, mb: 2, ml: 24, mt: -2.5 }}
            slotProps={{
              input: {
                sx: {
                  height: 30,
                },
              },
            }}
          />
          <PasswordStrengthIndicator password={newPassword} />
        </label>

        <label>
          <Typography sx={{ fontSize: 15, ml: 2 }}>Re Enter New Password</Typography>
          <TextField
            type="password"
            name="reenterpwd"
            sx={{ width: 500, mb: 2, ml: 24, mt: -2.5 }}
            slotProps={{
              input: {
                sx: {
                  height: 30,
                },
              },
            }}
          />
        </label>
      </Stack>
    </form>
  );
};

export default Passwordchange;
