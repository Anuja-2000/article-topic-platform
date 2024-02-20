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
        
      /* const articles = Array.from({ length: 10 }, (_, index) => ({
        title: `Exploring the World of Web Development`,
        date: '2024-02-16',
        writer: `Author ${index + 1}`,
        writerImage: `https://via.placeholder.com/30x30?text=${(index + 1).toString()}`,
        articleImage: '/articlePic.jpg',
        category: 'Web Development',
        tags: ['React', 'JavaScript', 'CSS'],
      }));*/

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
                                 <ArticleCard {...article} />
                             ))}
                        </Grid>
                    </Grid>
                        </Grid>
                
            </div>
            
        );
}

export default SearchArticleBox;