import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function ImgMediaCard() {
  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://images.idgesg.net/images/article/2019/05/java_binary_code_gears_programming_coding_development_by_bluebay2014_gettyimages-1040871468_2400x1600-100795798-large.jpg?auto=webp&quality=85,70"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Java
        </Typography>
        <Typography variant="body2" color="text.secondary">
        One of the most widely used programming languages, Java is used as the server-side language for most back-end development projects, including those involving big data and Android development. Java is also commonly used for desktop computing, other mobile computing, games, and numerical computing.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>

  
    </div>
    
    
  );
}
