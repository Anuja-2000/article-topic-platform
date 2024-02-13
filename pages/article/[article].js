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
    <Container component="main" maxWidth="lg" className={styles.root} >
      <div className={styles.articleContainer}>
        <Header
          writer={article.writer}
          date={article.date}
          time={article.time}
          title={article.title}
          profilePic={article.profilePic}
        />
        <div className={styles.imageContainer} >
          <img src={article.image} alt="Article Image" className={styles.image} />
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
    title: 'I had ChatGPT guess what the Super Bowl Ads would look like',
    profilePic: '/path/to/profile.jpg',
    image: '/blogpic.jpg',
    content: 'I have come across many nervous LinkedIn posts from fellow advertising professionals about the job stealing capabilities of AI. Even though AdWeek promises that ChatGPT Is Not Going to Replace Your Creative Team, for giggles, I wanted to see, hehe, what if it did? And what if it did for the biggest ad event of the year? The audacity.I told ChatGPT it was a Creative Director making a :60 for the Super Bowl — which meant the spot had to be big, high-production value, iconic, something people would talk about. Then I asked it to come up with a spot for five different brands, using what it knew of past Super Bowl ads these guys had ran (specifically tone, tropes, storylines). I provided my ChatECD direction alluded to in early press releases, and did this exercise the first week of January to prevent accidentally tipping it off. This is the result.I didn’t make any creative choices for the AI, but I redirected if it was off-brand, and probed if it did not address the prompt. I have summarized and edited its for clarity, but it took many tries to get here.'
  };
}

async function fetchArticleSlugs() {
  // Your data fetching logic here
  return ['article1', 'article2'];
}

export default ArticlePage;
