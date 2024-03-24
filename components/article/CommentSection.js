import React,{useState,useEffect} from 'react';
import {
  Typography,
  OutlinedInput,
  Paper,
  Button,
  Avatar,
  Divider,
  Grid,
  styled,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';

const CommentForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
}));

const CommentSection = ({articleId}) => {
  const [articleData, setData] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [username, setusername] = useState(" ");
  const [userImg, setuserImg] = useState(null);
  const commentId = "com" + uuidv4();

  useEffect(() => {
    const username = localStorage.getItem("username");
    const userImg = localStorage.getItem("imgUrl");
    if (username != null) {
      setusername(username);
    } else {
        setName(" ");
    }
    setuserImg("/path/to/profile.jpg");
    //console.log(localStorage.getItem("imgUrl"));
   /* if (userImg != null) {
      setuserImg(userImg);
    } else {
      setuserImg("/path/to/profile.jpg");
    }*/
    const fetchData = async () => {
      if (!articleId) return;
      try {
        const response = await fetch(`http://localhost:3001/api/comment/get`, {
          headers: {
            'Content-Type': 'application/json', // Adjust the content type if needed
            'artId': articleId, // Add your custom data in headers
          },
      });
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData);
        console.log(articleData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [articleId]);
  console.log(userImg);

  const requestBody = {
    comId:commentId,
    artId: articleId,
    commentorName:username,
    commentContent: commentText,
    profilePic:userImg,
  };

  const addComment = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/comment/save`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json',
        },
    });
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
      console.log(articleData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  
  const handleCommentSubmit = () => {
    // Handle the comment submission here, you can send the comment to the server or update the state as needed
    console.log('Comment user:', username);
    console.log('Comment submitted:', commentText);
    addComment();
    // Clear the comment input after submission if needed
    setCommentText('');
  };
  // Sample comments data
  // const comments = [
  //   { id: 1, user: 'John Doe', text: 'Great article!', time: '2 hours ago' },
  //   { id: 2, user: 'Alice Smith', text: 'I learned a lot. Thanks for sharing!', time: '1 day ago' },
  // ];

  return (
    <div elevation={2} sx={{ padding: (theme) => theme.spacing(3), marginTop: (theme) => theme.spacing(3) }}>
       {/* Comment input form */}
       <CommentForm>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar alt="User" src={userImg} />
          </Grid>
          <Grid item xs>
            <OutlinedInput
              placeholder="Add a comment..."
              fullWidth
              multiline
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)} 
              sx={{ marginBottom: (theme) => theme.spacing(2) }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ marginLeft: 'auto', marginTop: (theme) => theme.spacing(1) }}
              endIcon={<SendIcon />}
              onClick={handleCommentSubmit}
            >
              Comment
            </Button>
          </Grid>
        </Grid>
      </CommentForm>
      {/* Display comments */}
      {articleData.map((comment) => (
        <div key={comment.id}>
          <Grid container spacing={2} mt={1}>
            <Grid item>
              <Avatar alt={comment.commentorName} src={comment.profilePic} />
            </Grid>
            <Grid item xs mt={1}>
              <Typography variant="body2">
                <strong>{comment.commentorName}: {comment.time}</strong><br />{comment.commentContent}
              </Typography>
            </Grid>
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
