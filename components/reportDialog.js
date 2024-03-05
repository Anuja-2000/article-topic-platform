import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const ReportDialog = ({ isOpen, onClose, onSuccess }) => {
  const [selectedReason, setSelectedReason] = useState('');

  const handleReport = (reason) => {
    // Handle report logic here
    console.log("Reported for:", reason);
    onSuccess(`Article reported for: ${reason}`);
    onClose();
  };

  const handleChange = (event) => {
    setSelectedReason(event.target.value);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Report Article</DialogTitle>
      <DialogContent dividers>
        <RadioGroup value={selectedReason} onChange={handleChange}>
          <FormControlLabel value="Harassment" control={<Radio />} label="Harassment" />
          <FormControlLabel value="Rules Violation" control={<Radio />} label="Rules Violation" />
          <FormControlLabel value="Spam" control={<Radio />} label="Spam" />
          <FormControlLabel value="Block Author" control={<Radio />} label="Also block the author of this story" />
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button 
          onClick={() => handleReport(selectedReason)} 
          color="primary" 
          disabled={!selectedReason}
        >
          Report
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportDialog;
