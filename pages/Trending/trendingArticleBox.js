import React,{ useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import ArticleCard from '../../components/articleCard';
import Link from 'next/link';


function TrendingArticleBox(props) {
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

  

        return (
            <div style={{marginTop:'20px', width:'100%'}}>
                <Grid sx={{ flexGrow: 1 }}>
                    <Grid item xs={12}>
                        <Grid container justifyContent="center" spacing={3}>
                        {data.map((item) => (
                            <Grid key={item.articleId} item>
                                 <Link href={`/article?id=${item.articleId}`} passHref>
                                    <ArticleCard name={item.title}  />
                                </Link>
                               
                            
                            </Grid>
                        ))}
                        </Grid>
                    </Grid>
                        </Grid>
                
            </div>
            
        );
}


export default TrendingArticleBox;