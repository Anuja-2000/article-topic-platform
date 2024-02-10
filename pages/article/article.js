import React, { useState, useEffect } from 'react';
import styles from '../styles/article.module.css'
import Image from 'next/image'
import Head from "next/head"
import { AppBar, Toolbar, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {TextField, IconButton, InputAdornment} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import moment from 'moment';
import { useRouter } from 'next/router';





function Article(){

  const router = useRouter();
  const { id } = router.query;
  
  const [article, setArticle] = React.useState(null);
  const [likeCount, setLikeCount] = React.useState(100);
  const [commentCount, setCommentCount] = React.useState(10);
  const [htmlToPdf, setHtmlToPdf] = useState(null);
  


  const url = `/api/articleApi?id=${id}`;
  const method = 'GET';
  const option = {
      method: method,
      
  }

 
  React.useEffect(() => {
      const fetchData = async () => {
      
      try{
              const response  = await fetch(url, option);
              const finalData = await response.json();
              setArticle(finalData);
             
              
      }catch(error){

              console.error(error);
              console.log("responseee");
      }
     
    }
    fetchData()
    
  }, [id]) 

  const handleLike = () => {
    // Logic to handle the like functionality (for example, send a request to the server)
    // For demonstration purposes, let's just increment the like count locally
    setLikeCount(likeCount + 1);
  };

  const handleShare = () => {
    const shareUrl = `https://example.com/article/${id}`; // Replace with your actual article URL
    const whatsappUrl = `whatsapp://send?text=${shareUrl}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;

    // Open the respective sharing platform based on the user's device
    
    if (navigator.share) {
      navigator.share({
        title: 'Article Title',
        text: 'Check out this article!',
        url: shareUrl,
      })
      .then(() => console.log('Shared successfully'))
      .catch((error) => console.error('Error sharing:', error));
    } else if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Open WhatsApp on mobile devices
      window.open(whatsappUrl);
    } else {
      // Open Facebook on desktop devices
      window.open(facebookUrl);
    }
  };

  
  useEffect(() => {
    import('html2pdf.js').then((module) => {
      setHtmlToPdf(module.default);
    });
  }, []);

  // const handleDownload = () => {
  //   if (htmlToPdf) {
  //     // Get the article content as an HTML element
  //     const articleContent = document.getElementById('article-content');

  //     // Options for generating the PDF
  //     const options = {
  //       margin: 10,
  //       filename: 'article.pdf',
  //       image: { type: 'jpeg', quality: 0.98 },
  //       html2canvas: { scale: 2 },
  //       jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
  //     };

  //     // Generate the PDF from the article content
  //     htmlToPdf().from(articleContent).set(options).outputPdf();

  //     alert('Downloading...');
  //   } else {
  //     console.error('html2pdf.js not loaded');
  //   }
  // };


  

 

  if (!article) {
    return <div>Loading...</div>;
  }

return(

        <div>
            <Head>
                <title>Article</title>
                <meta name="description" content="created by team"  />

                <link rel="icon" href="/favicon.ico"/> 
            </Head>
           
            <div className={styles.box1}>
            <AppBar position="fixed" sx={{backgroundColor: '#0082e6'}}>
                    <Toolbar>
                    <Typography variant="h6" noWrap component="div"
                        sx={{
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          letterSpacing: '.3rem',
                          color: '#9399f7',
                          textDecoration: 'none',
                        }}>
                        Writer
                    </Typography>
                    <Typography variant="h6" noWrap component="div"
                        sx={{
                          fontFamily: 'monospace',
                          fontWeight: 700,
                          letterSpacing: '.3rem',
                          color: 'inherit',
                          textDecoration: 'none',
                          paddingLeft: '10px'
                        }}>
                        GATE
                    </Typography>
                        <div style={{ flexGrow: 1 }}></div>
                        <IconButton
                        size="large"
                        color="white"
                        aria-label="search"
                        >
                        </IconButton>
                        <IconButton
                        size="large"
                        color="white" // this don't work
                        aria-label="notifications"
                        >
                        <NotificationsIcon />
                        </IconButton>
                        <IconButton
                        size="large"
                        color="white" // this don't work
                        aria-label="account"
                        >
                        <AccountCircleIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
            <div className={styles.box2}>
                <div>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" 
                    sx={{ width: 60, height: 60,marginLeft: '70px'}}/>
                </div>
                <div className={styles.innerBox}>
                    <h1>{article.writerName}</h1>
                    <div className={styles.dateTimeFollow}>
                        <div className={styles.time}>{moment(article.postAt).format('HH:mm:ss')}</div>
                        <div className={styles.date}>{moment(article.postAt).format('YYYY-MM-DD')}</div>
                        <div className={styles.follow}>Follow</div>
                    </div>
                   
                </div>
            </div>
            <div className={styles.box3} id="article-content">
                <h1 className={styles.title}>{article.title}</h1>
                <div className={styles.articleBody}>{article.content}</div>
            </div>
            <div className={styles.box4}>
                <div className={styles.like}>
                <IconButton onClick={handleLike}>
                    <ThumbUpIcon />
                </IconButton> 
                <p>{likeCount}</p>
                </div>
                <div className={styles.comment}>
                <IconButton>
                    <CommentIcon />
                </IconButton> 
                <p>{commentCount}</p>
                </div>
                <div className={styles.download}>
                {/* <IconButton onClick={handleDownload}>
                    <DownloadIcon />
                </IconButton>  */}
                </div>
                <div className={styles.share}>
                { <IconButton onClick={handleShare}>
                    <ShareIcon />
                     </IconButton>  }
                </div>
            </div>
            <div className={styles.box5}>
                <div className={styles.img3} style={{display: 'flex'}}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" 
                    sx={{ width: 40, height: 40, marginLeft:'70px',padding:0}}/>
                    <div  className={styles.text}><TextField id="standard-basic"  variant="standard"  
                     sx={{ mt:1,ml:1, width: '100ch',fontSize: '16px'}} /></div>
                </div>
            </div>
        </div>
    );
}

export default Article;
