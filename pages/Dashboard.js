import React from 'react';
import Navbar from '../components/Navbar';
import { Button, Alert,Box } from '@mui/material';

function Dashboard() {
  const [showClearAlert, setClearAlert] = React.useState(false);

  const handleClearButtonClick = () => {
    setClearAlert(true);
    setTimeout(() => {
      setClearAlert(false);
    }, 2000);
  };

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          padding: '20px',
          marginTop: '2px',
          marginLeft: '300px',
          marginRight: '260px',
          backgroundColor: 'white',
          color: 'white',
        }}
      >
      <h1>DashBoard</h1>
      {showClearAlert && (
        <Alert severity="success">This is a success alert — check it out!</Alert>
      )}
      <Button variant="contained" color="primary" onClick={handleClearButtonClick}>
        Clear
      </Button>
     
      </Box>
    </div>
  );
}

export default Dashboard;
