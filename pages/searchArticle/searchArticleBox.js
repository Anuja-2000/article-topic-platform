import React,{ useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ArticleCard from '../../components/article/articleCard';
import { useRouter } from 'next/router';
import Link from 'next/link';


function SearchArticleBox(props) {
        const url = `/api/searchApi?keyword=${props.keyword}`;
        const method = 'GET';
        const [data, setData] = useState([]);
        const option = {
            method: method,
            
        }
        useEffect(() => {
            const fetchData = async () => {
            console.log("response1");
            try{
                    const response  = await fetch(url, option);
                    const finalData = await response.json();
                    setData(finalData);
                    console.log("response");
            }catch(error){

                    console.error(error);
                    console.log("responseee");
            }
           
          }
          fetchData()
          
        }, [props.keyword]) 

       console.log(data);
       const articles = Array.from({ length: 10 }, (_, index) => ({
        title: `Exploring the World of Web Development`,
        date: '2024-02-16',
        writer: `Author ${index + 1}`,
        writerImage: `https://via.placeholder.com/30x30?text=${(index + 1).toString()}`,
        articleImage: `https://via.placeholder.com/300x140?text=Image${index + 1}`,
        category: 'Web Development',
        tags: ['React', 'JavaScript', 'CSS'],
      }));

        return (
            <div style={{marginTop:'20px', width:'100%'}}>
                <Grid sx={{ flexGrow: 1 }}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={3}>
                        {/*data.map((item) => (
                            <Grid key={item.articleId} item>
                                 {/*<Link href={`/article?id=${item.articleId}`} passHref>
                                    <ArticleCard name={item.title}  />
                        </Link>}
                                <ArticleCard name={item.title}  />
                            </Grid>
                        ))*/}
                            {articles.map((article, index) => (
                                 <ArticleCard key={index} {...article} />
                             ))}
                        </Grid>
                    </Grid>
                        </Grid>
                
            </div>
            
        );
}

export default SearchArticleBox;