import { Stack, TextField, Typography } from "@mui/material";

const Passwordchange = () => {
  return (
    <form>
      <Stack direction="column" spacing={3}>
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
            name-="newpwd"
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
          <Typography sx={{ fontSize: 15, ml: 2 }}>
            Re Enter New Password
          </Typography>
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
