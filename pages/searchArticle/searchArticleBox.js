import React,{ useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ArticleCard from '../../components/article/articleCard';
import { useRouter } from 'next/router';
import Link from 'next/link';
import urls from '../../enums/url';


function SearchArticleBox({keyword}) {

        const [articleData, setData] = useState([]);
        
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch(`${urls.BASE_URL_READER_ARTICLE}search`, {
                headers: {
                  'Content-Type': 'application/json', // Adjust the content type if needed
                  'text':keyword, // Add your custom data in headers
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
        }, [keyword]);
        
  

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

export default SearchArticleBox;