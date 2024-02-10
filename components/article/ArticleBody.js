// components/article/ArticleBody.js
import React from 'react';
import { Typography } from '@mui/material';

const ArticleBody = ({ content }) => {
  return (
    <div>
      <Typography variant="body1" paragraph>
        {content}
      </Typography>
    </div>
  );
};

export default ArticleBody;
