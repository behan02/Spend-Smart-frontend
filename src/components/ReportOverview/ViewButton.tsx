
import { Button, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ViewButton() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      alignItems="center"
      justifyContent="center"
      sx={{ gap: 1 }} // adds spacing between the button and the icon
    >
      <Button
        sx={{
          mt: 2,
          bgcolor: 'primary.main',
          color: 'white',
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
        onClick={() => alert('View button clicked!')}
      >
        View
      </Button>
      <DeleteIcon sx={{ color: 'red', mt: 2 }} />
    </Box>
  );
}

export default ViewButton;
