import { TextField, Stack, Typography } from "@mui/material";

const AccountForm = () => {
  return (
    <form>
      <Stack direction="column" spacing={3} sx={{ ml: 15}}>
        <label>
          <Typography sx={{ fontSize: 15 }}>Name</Typography>
          <TextField
            type="text"
            name="firstname"
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
          <Typography sx={{ fontSize: 15 }}>Email</Typography>
          <TextField
            type="email"
            name="email"
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

export default AccountForm;
