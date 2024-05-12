import React, { useState, useEffect} from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import { ThumbUp, Share, GetApp } from '@mui/icons-material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';

import { useRouter } from 'next/router';
import { Card } from '@mui/material/Card';

import CardContent from '@mui/material';
import Button from '@mui/material';
import MoreOptionsCard from './MoreOptionsCard';
import ReportDialog from './reportDialog';




const LikeShareDownload = ({ articleTitle, initialLikes, writerId, articleId}) => {
 
  const router = useRouter();
  const { article } = router.query;
  const [isShareClicked, setIsShareClicked] = useState(false);
  const [likes, setLikes] = useState(0); // Initial number of likes
  const [isLiked, setIsLiked] = useState(false);
  
  const [isMoreOptionsOpen, setIsMoreOptionsOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
 
  useEffect(() => {
    setLikes(initialLikes);
    console.log(initialLikes);
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
  const updateData = async (newLikes) => {
    try {
      await fetch(`http://localhost:3001/api/readerArticle/updateLikes`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json', // Adjust the content type if needed
        },
        body: JSON.stringify({ 
          id: article,
          likes: newLikes 
        }),
        
    });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  const handleLikeClick = () => {

    const newLikes = isLiked ? likes - 1 : likes + 1;

    setIsLiked(!isLiked);

    // Update the number of likes based on the current state
    setLikes(newLikes)
    updateData(newLikes);
    console.log(newLikes);
  };

  const handleMoreVertIconClick = () => {
    setIsMoreOptionsOpen(!isMoreOptionsOpen);
  };

  const handleReportArticleClick = () => {
    setIsReportDialogOpen(true);
    setIsMoreOptionsOpen(false); // Close MoreOptionsCard
  };

  const handleCloseReportDialog = () => {
    setIsReportDialogOpen(false);

  };

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
        
        <IconButton color="inherit" sx={{ backgroundColor: '#f5f5f5', color: 'black', marginLeft: '10px' }} onClick={handleMoreVertIconClick}>
          <MoreVertIcon />
        </IconButton>
      </Box>

      {isMoreOptionsOpen && <MoreOptionsCard onReportArticleClick={handleReportArticleClick} />}

      <ReportDialog isOpen={isReportDialogOpen} onClose={handleCloseReportDialog} writerId={writerId} articleId={articleId} />
   
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
