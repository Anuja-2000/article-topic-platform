import React,{ useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ArticleCard from '../../components/article/articleCard';
import { useRouter } from 'next/router';
import Link from 'next/link';


function SearchArticleBox({keyword}) {

        const [articleData, setData] = useState([]);
        const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API;
    
        useEffect(() => {
          const fetchData = async () => {
            try {
              const response = await fetch(`http://localhost:3001/api/readerArticle/search`, {
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
                        {/*articleData.map((article) => (
                            <Grid key={item.articleId} article>
                                 {<Link href={`/article?id=${item.id}`} passHref>
                                    <ArticleCard {...article}  />
                        </Link>}
                    </Grid>
                        ))*/}
                            {articleData.map((article) => (
                               <Grid key={article.id} article style={{marginTop:'20px'}}>
                                  <Link href={`/article/${article.id}`} passHref>
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