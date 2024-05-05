// pages/article/[article].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Button, Typography, Divider, Box } from '@mui/material';  // Updated import
import ArticleBody from '../../../components/article/ArticleBody';
import styles from '../../../styles/article.module.css';
import Navbar from '../../../components/Navbar';
import Image from 'next/image';
import url from '../../../enums/url';
import axios from 'axios';

const reviewArticlePage = () => {
  const router = useRouter();
  const [articleData, setArticleData] = useState([]);
  const articleId = router.query.article ?? null;

  
  useEffect(() => {
    const fetchData = async () => {
      if (!articleId) return;
      try {
         const response = await axios.get(`${url.BASE_URL_ARTICLE}${articleId}`);
        const jsonData = response.data.article;
        setArticleData(jsonData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, [articleId]);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Navbar>
    <Container component="main" maxWidth="lg">
        <Box display="flex" justifyContent="space-between">
      <Typography variant="h4" color="primary">
        {articleData.title}
        </Typography>
        <Typography variant="h6" color="primary.dark">
        Last updated : {new Date(articleData.updatedAt).toDateString()}
        </Typography>
        </Box>
        <div className={styles.imageContainer} >
          <Image  src={articleData.coverImage} alt="Article Image" className={articleData.image} 
          width="1000" height="500" style={{ borderRadius: '10px' }}/>
        </div>
        <ArticleBody content={articleData.content} className={styles.content} />
        <Box display="flex" justifyContent="end">
        <Button varient="contained" color="success">Approve</Button>
        </Box>
    </Container>
    </Navbar>
  );
};


export default reviewArticlePage;
