import { Stack, TextField, Typography } from "@mui/material";

const Passwordchange = () => {
  return (
    <form>
      <Stack direction="column" spacing={3}>
        <label>
          <Typography sx={{ fontSize: 15 }}>Current Password</Typography>
          <TextField
            type="password"
            name="currentpwd"
            sx={{ width: 500, mb: 2, mx: 2 }}
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
          <Typography>New Password</Typography>
          <TextField
            type="password"
            name-="newpwd"
            sx={{ width: 500, mb: 2, mx: 2 }}
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
          <Typography>Re Enter New Password</Typography>
          <TextField
            type="password"
            name="reenterpwd"
            sx={{ width: 500, mb: 2, ml: 5.5 }}
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
