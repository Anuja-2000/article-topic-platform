import React, { useState } from 'react';
import { Button, Card, CardContent, Typography } from '@mui/material';
import ReportDialog from './reportDialog';
import ReportWriterDialog from './reportWriterDialog';

const MoreOptionsCard = ({ onReportArticleClick, onReportWriterClick}) => {
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isReportWriterDialogOpen, setIsReportWriterDialogOpen] = useState(false);

  const handleReportArticleButtonClick = () => {
    setIsReportDialogOpen(true);
    onReportArticleClick();
  };
  const handleReportWriterButtonClick = () => {
    setIsReportDialogOpen(true);
    onReportWriterClick();
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Options</Typography>
        <div>
          <Button onClick={handleReportArticleButtonClick}>Report Article</Button>
        </div>
        <div>
          <Button onClick={handleReportWriterButtonClick}>Report Author</Button>
        </div>
      </CardContent>
      <ReportDialog isOpen={isReportDialogOpen} onClose={() => setIsReportDialogOpen(false)} />
      <ReportWriterDialog isOpen={isReportWriterDialogOpen} onClose={() => setIsReportWriterDialogOpen(false)}
        />
    </Card>
  );
};

export default MoreOptionsCard;
