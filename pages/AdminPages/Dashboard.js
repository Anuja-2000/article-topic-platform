import React from 'react';
import Navbar from '../../components/Navbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Dashboard() {

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
        <Typography variant="h6" noWrap component="div"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black',
              textDecoration: 'none',
              paddingLeft: '10px'
            }}>
        Welcome to your Dashboard 
          </Typography>
      
      
     
      </Box>
    </div>
  );
}

export default Dashboard;
