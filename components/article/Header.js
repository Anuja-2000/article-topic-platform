// components/article/Header.js
import React from 'react';
import { Avatar, Typography, Box } from '@mui/material';

const Header = ({ writer, date, time, title, profilePic }) => {
  return (
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Box display="flex" alignItems="center">
        <Avatar src={profilePic} alt="Author Avatar" sx={{ marginRight: 1 }} />
        <Typography variant="subtitle2">{writer}</Typography>
      </Box>
      <Typography variant="caption" color="textSecondary">
        {date} | {time}
      </Typography>
      <Typography variant="h4" mt={1} mb={2}>
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
