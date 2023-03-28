import * as React from 'react';
import Grid from '@mui/material/Grid';
import ArticleCard from '../../components/articleCard';

function TrendingArticleBox() {
 
  return (
    <div style={{marginTop:'20px', width:'100%'}}>
        <Grid sx={{ flexGrow: 1 }}>
            <Grid item xs={12}>
                <Grid container justifyContent="center" spacing={3}>
                {[0, 1, 2,3,4,5,6,7].map((value) => (
                    <Grid key={value} item>
                        <ArticleCard />
                    </Grid>
                ))}
                </Grid>
            </Grid>
        </Grid>
    </div>
    
  );
}

export default TrendingArticleBox;