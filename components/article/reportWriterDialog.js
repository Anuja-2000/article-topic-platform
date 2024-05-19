import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';

const ReportWriterDialog = ({ isOpen, onClose, writerId }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [username, setUsername] = useState("");
  const [customReason, setCustomReason] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username");
        if (username) {
          setUsername(username);
        } else {
          setUsername(" ");
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);

  const handleReport = async () => {
    let reason = selectedReason;
    if (selectedReason === 'Other' && customReason.trim() !== '') {
      reason = customReason.trim();
    }
    if (reason) {
      const reportId = 'report' + uuidv4();
      const reportData = {
        reportId: reportId,
        reporterName: username,
        reportedReason: reason,
        writerId: writerId,
      };
      try {
        const response = await fetch('https://article-writing-backend.onrender.com/api/reportedWriter/save', {
          method: 'POST',
          body: JSON.stringify(reportData),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          console.log('Reported for:', reason);
          setSuccessMessage('Writer reported successfully!');
          setTimeout(() => {
            setSuccessMessage('');
            onClose();
          }, 3000);
        } else {
          console.error('Failed to report writer');
        }
      } catch (error) {
        console.error('Error reporting writer:', error);
      }
    }
  };

  const handleChange = (event) => {
    setSelectedReason(event.target.value);
  };

  const handleCustomReasonChange = (event) => {
    setCustomReason(event.target.value);
  };

  const handleClose = () => {
    onClose();
    setSuccessMessage('');
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Report Writer</DialogTitle>
      <DialogContent dividers>
        <RadioGroup value={selectedReason} onChange={handleChange}>
          <FormControlLabel value="Plagiarism" control={<Radio />} label="Plagiarism" />
          <FormControlLabel value="Inappropriate Content Writer" control={<Radio />} label="Inappropriate Content Writer" />
          <FormControlLabel value="Misinformation Provider" control={<Radio />} label="Misinformation Provider" />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />
        </RadioGroup>
        {selectedReason === 'Other' && (
          <TextField
            label="Custom Reason"
            variant="outlined"
            fullWidth
            value={customReason}
            onChange={handleCustomReasonChange}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleReport}
          color="primary"
          disabled={!selectedReason || (selectedReason === 'Other' && customReason.trim() === '')}
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

export default ReportWriterDialog;
