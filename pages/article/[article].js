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

const ArticlePage = () => {
  const router = useRouter();
  const { article } = router.query; 
  const [articleData, setData] = useState([]);
  const backendApiUrl = process.env.NEXT_PUBLIC_BACKEND_API;
  console.log(article);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/readerArticle/get`, {
          headers: {
            'Content-Type': 'application/json', // Adjust the content type if needed
            'id': article, // Add your custom data in headers
          },
      });
        const jsonData = await response.json();
        setData(jsonData);
        console.log(backendApiUrl);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
          writer={articleData.writer}
          date={articleData.date}
          time={articleData.time}
          title={articleData.title}
          profilePic={articleData.profilePic}
        />
        <div className={styles.imageContainer} >
          <img  src={articleData.image} alt="Article Image" className={articleData.image} />
        </div>
        <ArticleBody content={articleData.content} className={styles.content} />
        <LikeShareDownload />
        <Divider sx={{ marginY: 2 }}/>
        <CommentSection />
      </div>
    </Container>
  );
};

/*export async function getStaticProps({ params }) {
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
    content: `<p>I have come across many nervous LinkedIn posts from fellow advertising professionals about the job stealing capabilities of AI. 
    Even though AdWeek promises that ChatGPT Is Not Going to Replace Your Creative Team, for giggles, 
    I wanted to see, hehe, what if it did? And what if it did for the biggest ad event of the year? The audacity.
    I told ChatGPT it was a Creative Director making a :60 for the Super Bowl— which meant the spot had to be big, high-production value, iconic,
    something people would talk about. Then I asked it to come up with a spot for five different brands, 
    using what it knew of past Super Bowl ads these guys had ran (specifically tone, tropes, storylines). 
    I provided my ChatECD direction alluded to in early press releases, and did this exercise the first week of January to prevent accidentally 
    tipping it off. This is the result.I didn\’t make any creative choices for the AI, but I redirected if it was off-brand, 
    and probed if it did not address the prompt. I have summarized and edited its for clarity, but it took many tries to get here.</p>
    <br /><h2>The AI Spot:</h2>
    <p>The famous spokescandies are at a celebration in a whimsical laboratory, filled with people of all ages and backgrounds. 
    They announce everyone belongs — even new, out of this world flavors. Intro the Flavor Fusion Machine! It pumps out exotic, 
    fruity, savory flavors of M&Ms that revolutionize the snacking experience. Narrator: (Voiceover) “In the M&M\’S universe, 
    everyone is invited to create their own colorful moments." Cut to a vibrant street festival where M&M\’S Flavor Fusion are 
    enjoyed by all — in various unique and creative ways — as the spokescandies lead the parade. Cameo by Danny Trejo and Betty White. Viewers are invited 
    to visit the website to join the flavor celebration. End: “M&M\’ S invites you to taste the sweetness of connection.</p>
    `
  };
}

async function fetchArticleSlugs() {
  // Your data fetching logic here
  return ['article1', 'article2'];
}*/

export default ArticlePage;
