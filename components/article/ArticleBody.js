import React from 'react';
import { Typography } from '@mui/material';

const ArticleBody = ({ content }) => {
  return (
    <div>
      <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default ArticleBody;
