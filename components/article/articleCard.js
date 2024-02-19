import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, CardMedia, Avatar, Box, Chip } from '@mui/material';

const ArticleCard = ({ title, date, writer, profilePic,image, tags }) => {
  return (
    <Card style={{ border: '1px solid #ddd', borderRadius: '8px', width: 300, height: '100%', backgroundColor: '#f5f5f5', margin: '10px' }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <Avatar
              alt={writer}
              src={profilePic}
              style={{ width: '30px', height: '30px', marginRight: '8px' }}
            />
            <Typography color="text.primary" variant="subtitle1" style={{ fontWeight: 600, fontSize: 12 }}>
              {writer}
            </Typography>
          </Box>
          <Typography color="text.secondary" variant="body2" style={{ fontSize: 10 }}>
            {date}
          </Typography>
        </Box>
        <Typography variant="h6" component="div" style={{ marginTop: '12px', fontWeight: 700,fontSize: 20 }}>
          {title}
        </Typography>
        <Box marginTop="10px">
          {/*tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" style={{ marginRight: '8px', backgroundColor: '#f6e58d'}} />
          ))*/}
        </Box>
      </CardContent>
      <CardMedia component="img" height="140" src={image} alt={title} style={{marginBottom: '15px',borderRadius: '4px' }} />
    </Card>
  );
};

export default ArticleCard;