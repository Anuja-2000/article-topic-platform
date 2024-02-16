// components/article/LikeShareDownload.js
import React from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import { ThumbUp, Share, GetApp } from '@mui/icons-material';

const LikeShareDownload = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-start" mt={3}>
      <Box display="flex" alignItems="center" mr={2}>
        <IconButton color="inherit" sx={{ backgroundColor: '#f5f5f5', color: 'black' }}>
          <ThumbUp />
        </IconButton>
        <Typography variant="subtitle2" color="textSecondary">
          123 Likes
        </Typography>
      </Box>
      <IconButton color="inherit" sx={{ backgroundColor: '#f5f5f5', color: 'black', marginLeft:'10px' }} >
        <Share />
      </IconButton>
      <IconButton color="inherit" sx={{ backgroundColor: '#f5f5f5', color: 'black', marginLeft:'10px' }}>
        <GetApp />
      </IconButton>
    </Box>
  );
};

export default LikeShareDownload;
