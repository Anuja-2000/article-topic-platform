import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const ReportDialog = ({ isOpen, onClose }) => {
  const handleReport = (reason) => {
    // Handle report logic here
    console.log("Reported for:", reason);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Report Aricle</DialogTitle>
      <DialogContent dividers>
        <ul>
          <li>
            <Button onClick={() => handleReport('Harassment')}>Harassment</Button>
          </li>
          <li>
            <Button onClick={() => handleReport('Rules Violation')}>Rules Violation</Button>
          </li>
          <li>
            <Button onClick={() => handleReport('Spam')}>Spam</Button>
          </li>
          <li>
            <Button onClick={() => handleReport('Block Author')}>Also block the author of this story</Button>
          </li>
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReportDialog;

/*
import React, { useState } from 'react';
import ReportDialog from './ReportDialog';

const MainComponent = () => {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  const handleReportClick = () => {
    setIsReportDialogOpen(true);
  };

  const handleCloseReportDialog = () => {
    setIsReportDialogOpen(false);
  };

  return (
    <div>
      <button onClick={handleReportClick}>Report</button>
      <ReportDialog isOpen={isReportDialogOpen} onClose={handleCloseReportDialog} />
    </div>
  );
};

export default MainComponent;

*/


