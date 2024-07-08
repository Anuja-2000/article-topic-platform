import React, { useState, useEffect } from 'react';
import { IconButton, Typography, Box, Menu, MenuItem } from '@mui/material';
import { ThumbUp, Share, GetApp } from '@mui/icons-material';
import { MoreVert as MoreVertIcon } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { Card } from '@mui/material/Card';
import { v4 as uuidv4 } from 'uuid';
import CardContent from '@mui/material';
import Button from '@mui/material';
import ReportDialog from './reportDialog';
import ReportWriterDialog from './reportWriterDialog';
import ViewCounter from './viewCounter';
import ReportIcon from '@mui/icons-material/Report';
import ReportProblem from '@mui/icons-material/ReportProblem';
const LikeShareDownload = ({ articleTitle, initialLikes, writerId, articleId, view, readerId }) => {

  const router = useRouter();
  const { article } = router.query;
  const [isShareClicked, setIsShareClicked] = useState(false);
  const [likes, setLikes] = useState(0); // Initial number of likes
  const [isLiked, setIsLiked] = useState(false);
  const [userId, setUserId] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isReportWriterDialogOpen, setIsReportWriterDialogOpen] = useState(false);


  //const [readerId, setReaderId] = useState("");
  console.log(readerId);
  const likeId = "like" + uuidv4();

  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    console.log(userId);
    if(userId!==null && username!==null){
      setUserId(userId);
    }else{
      setUserId("");
    }
    setLikes(initialLikes);
    const getLikes = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/like/get`, {
          method: 'POST',
          body:JSON.stringify({
            readerId: readerId,
            articleId:articleId
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.status == 200) {
          setIsLiked(true);
        }

        // Handle response as needed
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    getLikes();
  },[initialLikes]);


  const likeArticle = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/like/save`, {
        method: 'POST',
        body: JSON.stringify(
          {
            id:likeId,
            readerId: readerId,
            articleId:articleId
          }
        ),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Handle response as needed
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const unlikeArticle = async() => {
    try {
      const response = await fetch(`http://localhost:3001/api/like/delete`, {
        method: 'DELETE',
        body: JSON.stringify(
          {
            readerId: readerId,
            articleId:articleId
          }
        ),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
        },
      });
      console.log(response);
      // Handle response as needed
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

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
    let newLikes = likes;
    if(isLiked){
      newLikes = likes - 1 ;
      unlikeArticle();
    }else{
      newLikes = likes + 1;
      likeArticle();
    }
    setIsLiked(!isLiked);

    // Update the number of likes based on the current state
    setLikes(newLikes)
    updateData(newLikes);
    console.log(newLikes);
  };

  const handleMoreVertIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReportArticleClick = () => {
    setIsReportDialogOpen(true);
    handleMenuClose();
  };

  const handleCloseReportDialog = () => {
    setIsReportDialogOpen(false);
  };

  const handleReportWriterClick = () => {
    setIsReportWriterDialogOpen(true);
    handleMenuClose();
  };

  const handleCloseReportWriterDialog = () => {
    setIsReportWriterDialogOpen(false);
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="flex-start" mt={3}>
        <Box display="flex" alignItems="center" mr={2}>
          <IconButton color="inherit" sx={{ backgroundColor: '#f5f5f5', color: isLiked ? 'blue' : 'black' }} onClick={handleLikeClick} disabled={userId === ""}>
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

        <ViewCounter articleId={articleId} view={view} readerId={readerId} />
      </Box>

      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleReportArticleClick}>
          <ReportProblem style={{ marginRight: '8px' }} />
          Report Article
        </MenuItem>
        <MenuItem onClick={handleReportWriterClick}>
          <ReportIcon style={{ marginRight: '8px' }} />
          Report Author</MenuItem>
      </Menu>

      <ReportDialog isOpen={isReportDialogOpen} onClose={handleCloseReportDialog} writerId={writerId} articleId={articleId} />
      <ReportWriterDialog isOpen={isReportWriterDialogOpen} onClose={handleCloseReportWriterDialog} writerId={writerId} />

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
