import React, { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import ReportDialog from './reportDialog';

const MoreOptionsCard = ({ onReportArticleClick }) => {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  const handleReportArticleButtonClick = () => {
    setIsReportDialogOpen(true);
    // Close MoreOptionsCard
    onReportArticleClick();
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Options</Typography>
        <div>
          <Button onClick={handleReportArticleButtonClick}>Report Article</Button>
        </div>
        <div>
          <Button>Report Author</Button>
        </div>
      </CardContent>
      <ReportDialog isOpen={isReportDialogOpen} onClose={() => setIsReportDialogOpen(false)} />
    </Card>
  );
};

export default MoreOptionsCard;
