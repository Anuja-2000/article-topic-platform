import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MultilineTextFields from './MultilineTextFields'; // Import the MultilineTextFields component

function ButtonPage() {
  return (
    <Box>
      <Button sx={{ mr: 2 }} variant="contained" color="primary" >
        Submit For Admin Approval
      </Button>
      <Button sx={{ mr: 2 }} variant="contained" color="secondary">
        Save
      </Button>
      <MultilineTextFields /> {/* Add the MultilineTextFields component */}
    </Box>
  );
}

export default ButtonPage;
