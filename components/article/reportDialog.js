import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const ReportDialog = ({ isOpen, onClose }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleReport = () => {
    if (selectedReason) {
      console.log("Reported for:", selectedReason);
      setSuccessMessage('Article reported successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        onClose(); // Close the dialog after 3 seconds
      }, 3000);
    }
  };

  const handleChange = (event) => {
    setSelectedReason(event.target.value);
  };

  const handleClose = () => {
    onClose();
    setSuccessMessage('');
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Report Article</DialogTitle>
      <DialogContent dividers>

        <RadioGroup value={selectedReason} onChange={handleChange}>
          <FormControlLabel value="Harassment" control={<Radio />} label="Harassment" />
          <FormControlLabel value="Rules Violation" control={<Radio />} label="Rules Violation" />
          <FormControlLabel value="Spam" control={<Radio />} label="Spam" />
        </RadioGroup>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button 
          onClick={handleReport} 
          color="primary" 
          disabled={!selectedReason}
        >
          Report
        </Button>
      </DialogActions>
      {successMessage && (
        <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', textAlign: 'center' }}>
          {successMessage}
        </div>
      )}
    </Dialog>
  );
};

export default ReportDialog;
