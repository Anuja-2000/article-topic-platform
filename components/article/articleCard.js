import React, { useState, useEffect} from 'react';
import { Card, CardContent, Typography, CardActions, Button, CardMedia, Avatar, Box, Chip } from '@mui/material';


const ArticleCard = ({ title, updatedAt ,coverImage,userId, tags }) => {
  const [imgUrl, setImgUrl] = useState("");
  const [writer, setWriter] = useState("");
  const createdDate = new Date(updatedAt).toLocaleDateString();     
 
  useEffect(() => {
     const fetchData = async () => {
      if (!userId) return;
      try {
         const response = await fetch(`https://article-writing-backend.onrender.com/api/user/${userId}`, {
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
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [userId]);
  
  
  return (
    <Card style={{ border: '1px solid #ddd', borderRadius: '10px', width: 300, height: '100%', backgroundColor: '#f5f5f5', margin: '10px' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar
              alt={writer.toUpperCase()}
              src={imgUrl!=""?imgUrl:"/path/to/profile.jpg"}
              style={{ width: '30px', height: '30px', marginRight: '8px' }}
            />
            <Typography color="text.primary" variant="subtitle1" style={{ fontWeight: 600, fontSize: 12, height:20,marginRight:5 }}>
              {writer}
            </Typography>
          </Box>
          <Typography color="text.secondary" variant="body2" style={{ fontSize: 10 }}>
            {createdDate}
          </Typography>
        </Box>
        <Typography variant="h6" component="div" style={{ marginTop: '10px', fontWeight: 700,fontSize: 20, height:45 }}>
          {title}
        </Typography>
        {/*<Box marginTop="10px">
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" style={{ marginRight: '8px', backgroundColor: '#f6e58d'}} />
          ))}
        </Box>*/}
      </CardContent>
      <CardMedia
        component="img"
        height="160"
        src={`${coverImage != null ?(coverImage):''}`}
        alt={title}
        style={{ marginTop: '4px', borderRadius: '5px', height:200 }}
      />
      </Card>
  );
};

export default ArticleCard;