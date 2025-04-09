import { TextField, Stack, Button } from "@mui/material";

const AccountForm = () => {
  return (
    /*<Box>
      <Typography variant="h6">Account</Typography>
      <TextField fullWidth label="" sx={{ px: 20 }}>
        <Typography> First Name </Typography>
      </TextField>
    </Box>*/
    <form>
      <Stack direction="column" spacing={3}>
        <label>
          First name
          <TextField
            type="text"
            name="firstname"
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
          Last name
          <TextField
            type="text"
            name-="lastname"
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
          Email
          <TextField
            type="email"
            name="email"
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
        <Button variant="contained" size="small" sx={{ width: 140, ml: 50 }}>
          Save Changes
        </Button>
      </Stack>
    </form>
  );
};

export default AccountForm;
