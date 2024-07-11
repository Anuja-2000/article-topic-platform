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
import axios from 'axios';
const ReportDialog = ({ isOpen, onClose, writerId, articleId }) => {
  const [selectedReason, setSelectedReason] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [username, setUsername] = useState("");
  const [customReason, setCustomReason] = useState('');
  const [axiosConfig, setAxiosConfig] = useState({
    headers: {
        Authorization: "",
    },
});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        console.log("token",token);
        if (token) {
            setAxiosConfig({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
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
        articleId: articleId,
        writerId: writerId,
      };
      try {
        const response = await axios.post('http://localhost:3001/api/reportArticle/save', reportData, axiosConfig);
        if (response.status === 201) {
          console.log('Reported for:', reason);
          setSuccessMessage('Article reported successfully!');
          setTimeout(() => {
            setSuccessMessage('');
            handleClose();
          }, 3000);
        } else {
          console.error('Failed to report article');
        }
      } catch (error) {
        console.error('Error reporting article:', error);
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
    setSelectedReason('');
    setCustomReason('');
    setSuccessMessage('');
  };

  const handleOpen = () => {
    setSelectedReason('');
    setCustomReason('');
    setSuccessMessage('');
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} onEnter={handleOpen} maxWidth="sm" fullWidth>
      <DialogTitle>Report Article</DialogTitle>
      <DialogContent dividers>
        <RadioGroup value={selectedReason} onChange={handleChange}>
          <FormControlLabel value="Harassment" control={<Radio />} label="Harassment" />
          <FormControlLabel value="Rules Violation" control={<Radio />} label="Rules Violation" />
          <FormControlLabel value="Spam" control={<Radio />} label="Spam" />
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

export default ReportDialog;
