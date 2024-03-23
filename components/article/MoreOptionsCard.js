import React, { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import ReportDialog from './reportDialog';

const MoreOptionsCard = ({ onReportAuthorClick }) => {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  const handleReportAuthorButtonClick = () => {
    setIsReportDialogOpen(true);
    // Close MoreOptionsCard
    onReportAuthorClick();
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Options</Typography>
        <div>
          <Button onClick={handleReportAuthorButtonClick}>Report Author</Button>
        </div>
        <div>
          <Button>Report Article</Button>
        </div>
      </CardContent>
      <ReportDialog isOpen={isReportDialogOpen} onClose={() => setIsReportDialogOpen(false)} />
    </Card>
  );
};

export default MoreOptionsCard;
