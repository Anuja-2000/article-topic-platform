// pages/article/[article].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Container, Button, Typography, Divider } from '@mui/material';  // Updated import
import Header from '../../components/article/Header';
import ArticleBody from '../../components/article/ArticleBody';
import CommentSection from '../../components/article/CommentSection';
import LikeShareDownload from '../../components/article/LikeShareDownload';
import styles from '../../styles/article.module.css';
import Navbar from '../../components/navbarReader/Navbar';
import Image from 'next/image';
import cookie from 'js-cookie';

const ArticlePage = () => {
  const router = useRouter();
  const [articleData, setData] = useState([]);
  const articleId = router.query.article ?? null;

  
  useEffect(() => {
    const fetchData = async () => {
      if (!articleId) return;
      try {
         const response = await fetch(`http://localhost:3001/api/readerArticle/get`, {
          headers: {
            'Content-Type': 'application/json', // Adjust the content type if needed
            'id': articleId, // Add your custom data in headers
          },
      });
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData.likes);

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
    <Container component="main" maxWidth="lg" className={styles.root} >
      <div>
        <Navbar />
      </div>
      <div className={styles.articleContainer}>
        <Header
          writerId = {articleData.userId}
          date={articleData.updatedAt}
          title={articleData.title}
        />
        <div className={styles.imageContainer} >
          <img  src={articleData.coverImage} alt="Article Image" className="Cover Image" 
          width="1000" height="500" style={{ borderRadius: '10px' }}/>
        </div>
        <ArticleBody content={articleData.content} className={styles.content} />
        <LikeShareDownload articleTitle={articleData.title} initialLikes={articleData.likes} />
        <Divider sx={{ marginY: 2 }}/>
        <CommentSection articleId={articleData.articleId}/>
      </div>
    </Container>
  );
};


export default ArticlePage;
