// components/article/Header.js
import React from 'react';
import { Avatar, Typography, Box, Divider } from '@mui/material';

const Header = ({ writer, date, time, title, profilePic }) => {
  return (
    
    <Box display="flex" flexDirection="column" alignItems="flex-start">
      <Box display="flex" alignItems="center">
        <Avatar src={profilePic} alt="Author Avatar" sx={{ marginRight: 1 }} />
        <Box>
          <Typography variant="subtitle2">{writer}</Typography>
          <Typography variant="caption" color="textSecondary" >
            {date} | {time}
          </Typography>
        </Box>
      </Box>
      <Box >
      <Divider style={{ margin: '10px 0' }} />
      <Typography variant="h4" mt={2} mb={1}>
        {title}
      </Typography>
      </Box>
    </Box>
  );
};

export default Header;
