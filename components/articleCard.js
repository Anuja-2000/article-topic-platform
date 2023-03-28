import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Avatar from '@mui/material/Avatar';

function ArticleCard() {
  return (
    <Card sx={{ width: 320,height:350,borderRadius: 4, backgroundColor: '#eee',boxShadow:4 }}>
      <CardActionArea>
        <CardContent>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" 
          sx={{ width: 25, height: 25, marginTop:1,marginBottom:2}}/>
          <Typography gutterBottom variant="h5" component="div" 
          style={{color: '#111', fontWeight:600,height:70,fontSize:20, fontFamily:'ubuntu'}}>
            CSS Nesting is now available with Vanilla CSS
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          height="170"
          width="300"
          image="css.jpg"
          alt="green iguana"
          style={{paddingRight:10,paddingLeft:10,borderRadius:22}}
        />
      </CardActionArea>
    </Card>
  );
}

export default ArticleCard;