// components/article/Header.js
import React, { useState, useEffect} from 'react';
import { Avatar, Typography, Box, Divider } from '@mui/material';
import FollowButton from '../../components/article/FollowButton';


const Header = ({ writerId, date, title}) => {
  const [userId, setUserId] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [writer, setWriter] = useState("");
  const createdDate = new Date(date).toLocaleDateString();     
  const createdTime = new Date(date).toLocaleTimeString();
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    console.log(userId);
    if(userId!==null && username!==null){
      setUserId(userId);
    }else{
      setUserId("");
    }

    const fetchData = async () => {
      if (!writerId) return;
      try {
         const response = await fetch(`http://localhost:3001/api/user/${writerId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
        },
      });
      const jsonData = await response.json();

      console.log(jsonData);
      const {name,displayName,imgUrl} = jsonData;
      if (name != null) {
          setWriter(name);
          console.log(writer);
      } else {
          setWriter("!user");
          console.log("!user");
      }
    
      setImgUrl(imgUrl);
      
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
     };
    fetchData();

  }, [writerId]);


  
  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="flex-start" >
        <Box display="flex" width="1000px">
          <Box display="flex" width="500px">
            <Avatar src={imgUrl!=""?imgUrl:"/path/to/profile.jpg"} alt={writer} sx={{ marginRight: 1 }} />
            <Box>
              <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>{writer}</Typography>
              <Typography variant="caption" color="textSecondary" >
                {createdDate} &nbsp; {createdTime}
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
