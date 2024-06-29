import React,{ useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ArticleCard from '../../components/article/articleCard';
import Link from 'next/link';


function PopularArticleBox() {
    const [articleData, setData] = useState([]);
   
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://article-writing-backend.onrender.com/api/readerArticle/popular-articles`, {
            headers: {
              'Content-Type': 'application/json', 
            },
        });
          const jsonData = await response.json();
          setData(jsonData);
          console.log(articleData);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
    


    return (
      <div style={{marginTop:'20px', width:'100%'}}>
          <Grid sx={{ flexGrow: 1 }}>
            <Grid item xs={12}>
              <Grid container justifyContent="center" spacing={3}>
                        {articleData.map((article) => (
                           <Grid key={article.articleId} article style={{marginTop:'20px'}}>
                              <Link href={`/article/${article.articleId}`} passHref>
                                    <ArticleCard {...article}  />
                              </Link>
                            </Grid>
                         ))}
              </Grid>
            </Grid>
          </Grid>
            
      </div>
        
    );
}


export default PopularArticleBox;