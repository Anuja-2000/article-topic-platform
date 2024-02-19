import React from 'react';
import { useRouter } from 'next/router';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const ReportPage = () => {
  const router = useRouter();

  const handleReport = () => {
    // Handle reporting logic here
    console.log('Report submitted');
    // Redirect back to the previous page
    router.back();
  };

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Report Story</Typography>
        <Typography variant="subtitle1">Please select a reason for reporting:</Typography>
        <Typography variant="subtitle1">
          <input type="radio" name="reason" value="Harassment" /> Harassment
        </Typography>
        <Typography variant="subtitle1">
          <input type="radio" name="reason" value="Rules Violation" /> Rules Violation
        </Typography>
        <Typography variant="subtitle1">
          <input type="radio" name="reason" value="Spam" /> Spam
        </Typography>
        <Typography variant="subtitle1">
          <input type="radio" name="reason" value="Block Author" /> Also block the author of this story
        </Typography>
        <Button variant="contained" color="primary" onClick={handleReport} style={{ marginTop: '20px' }}>Report</Button>
      </Grid>
    </Grid>
  );
};

export default ReportPage;
