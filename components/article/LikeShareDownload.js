import React, { useState, useEffect} from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import { ThumbUp, Share, GetApp } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Head from 'next/head';

const LikeShareDownload = ({ articleTitle, initialLikes}) => {
  //const initalLikes = Number(like);
  const router = useRouter();
  const { article } = router.query;
  const [likes, setLikes] = useState(0); // Initial number of likes
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setLikes(initialLikes);
  }, [initialLikes]);
  const handleShareClick = async () => {
    try {
      setIsShareClicked(true);

      if (navigator.share) {
        await navigator.share({
          title: articleTitle,
          text: 'Brief description of your article...',
          url: window.location.href,
        });
      } else {
        console.log('Web Share API not supported');
        // You can implement a fallback share functionality here
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Handle errors here
    } finally {
      setIsShareClicked(false);
    }
  };
  useEffect(() => {
  
    const updateData = async () => {
      try {
        await fetch(`http://localhost:3001/api/readerArticle/update`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json', // Adjust the content type if needed
          },
          body: JSON.stringify({ 
            id: article,
            likes: likes 
          }),
          
      });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    updateData();
  }, [likes]);
   

  
  const handleLikeClick = () => {
    // Toggle the like state
    setIsLiked(!isLiked);

    // Update the number of likes based on the current state
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    
  };

  console.log('initalLikes prop:', initialLikes);
  console.log('useState value (likes):', likes);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="flex-start" mt={3}>
        <Box display="flex" alignItems="center" mr={2}>
          <IconButton color="inherit" sx={{ backgroundColor: '#f5f5f5', color: isLiked ? 'blue' : 'black' }} onClick={handleLikeClick}>
            <ThumbUp />
          </IconButton>
          <Typography variant="subtitle2" color="textSecondary">
              {likes} Likes
           </Typography>
        </Box>
        <IconButton color="inherit" sx={{ backgroundColor: '#f5f5f5', color: 'black', marginLeft: '10px' }} onClick={handleShareClick}>
          <Share />
        </IconButton>
        <IconButton color="inherit" sx={{ backgroundColor: '#f5f5f5', color: 'black', marginLeft: '10px' }}>
          <GetApp />
        </IconButton>
      </Box>
      {/*isShareClicked && (
        <Head>
          <meta property="og:title" content={articleTitle} />
          <meta property="og:description" content="Brief description of your article..." />
          <meta property="og:url" content={window.location.href} />
          <meta property="og:image" content="https://example.com/your-image-url.jpg" />
        
          <meta property="og:site_name" content="Your Site Name" />
          <meta property="og:type" content="article" />
        </Head>
      )*/}
    </>
  );
};

export default LikeShareDownload;
