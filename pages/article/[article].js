// pages/article/[article].js
import React from 'react';
import { useRouter } from 'next/router';
import { Container, Button, Typography } from '@mui/material';  // Updated import
import Header from '../../components/article/Header';
import ArticleBody from '../../components/article/ArticleBody';
import CommentSection from '../../components/article/CommentSection';
import LikeShareDownload from '../../components/article/LikeShareDownload';
import styles from '../../styles/article.module.css';

const ArticlePage = ({ article }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Container component="main" maxWidth="lg" className={styles.root}>
      {/* Use a plain div instead of Paper for a simpler look */}
      <div className={styles.articleContainer}>
        <Header
          writer={article.writer}
          date={article.date}
          time={article.time}
          title={article.title}
          profilePic={article.profilePic}
        />
        <div className={styles.imageContainer}>
          <img src={article.image} alt="Article Image" className={styles.image} />
          <div className={styles.overlay}>
            <Typography variant="h5" className={styles.title}>
              {article.title}
            </Typography>
          </div>
        </div>
        <ArticleBody content={article.content} className={styles.content} />
        <LikeShareDownload />
        <CommentSection />
      </div>
    </Container>
  );
};

export async function getStaticProps({ params }) {
  const { article } = params;

  const articleData = await fetchArticleBySlug(article);

  return {
    props: {
      article: articleData,
    },
  };
}

export async function getStaticPaths() {
  const articleSlugs = await fetchArticleSlugs();

  return {
    paths: articleSlugs.map((slug) => ({ params: { article: slug.toString() } })),
    fallback: 'blocking',
  };
}

async function fetchArticleBySlug(slug) {
  // Your data fetching logic here
  return {
    writer: 'Author Name',
    date: '2023-01-01',
    time: '12:00',
    title: 'Sample Article',
    profilePic: '/path/to/profile.jpg',
    image: '/path/to/image.jpg',
    content: 'Article content goes here.',
  };
}

async function fetchArticleSlugs() {
  // Your data fetching logic here
  return ['article1', 'article2'];
}

export default ArticlePage;
