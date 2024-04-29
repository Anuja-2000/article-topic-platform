// components/article/Header.js
import React, { useState, useEffect} from 'react';
import { Avatar, Typography, Box, Divider } from '@mui/material';
import FollowButton from '../../components/article/FollowButton';

const Header = ({ writerId,writer, date, time, title, profilePic }) => {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if(userId!==null){
      setUserId(userId);
    }else{
      setUserId("");
    }
  }, []);
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="flex-start" >
        <Box display="flex" width="1000px">
          <Box display="flex" width="500px">
            <Avatar src={profilePic} alt="Author Avatar" sx={{ marginRight: 1 }} />
            <Box>
              <Typography variant="subtitle2">{writer}</Typography>
              <Typography variant="caption" color="textSecondary" >
                {date} | {time}
              </Typography>
            </Box>
          </Box>
          <Box display="flex"  alignItems="center" width="500px" justifyContent="right">
          {userId!=="" &&  <FollowButton writerId={writerId}/>}
          </Box>
        </Box>
        <Box >
        <Divider style={{ margin: '10px 0', width:1100 }} />
        <Typography variant="h4" mt={2} mb={1}>
          {title}
        </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Header;
