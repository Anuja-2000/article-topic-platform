import React, { useState, useEffect } from 'react';
import {
  Typography,
  OutlinedInput,
  IconButton,
  Button,
  Avatar,
  Grid,
  styled,
  Menu,
  MenuItem,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { Send as SendIcon, Edit as EditIcon, Delete as DeleteIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import MoreOptionsCard from './MoreOptionsCard';

const CommentForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
}));

const CommentSection = ({ articleId }) => {
  const [articleData, setData] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [username, setUsername] = useState("");
  const [userImg, setuserImg] = useState(null);
  const [userId, setUserId] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [commentBeingEdited, setCommentBeingEdited] = useState(null);
  const [updateCommentID, setupdateCommentID] = useState("");
  const [selectedComment, setSelectedComment] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const commentId = "com" + uuidv4();
  const artId = articleId;


  useEffect(() => {
    const username = localStorage.getItem("username");
    const userImg = localStorage.getItem("imgUrl");
    const userId = localStorage.getItem("userId");
    if (username != null) {
      setUserId(userId);
      setUsername(username);
    } else {
      setUsername(" ");
    }
    setuserImg("/path/to/profile.jpg");
    fetchData();
  }, [artId]);

  const fetchData = async () => {
    if (!artId) return;
    try {
      const response = await fetch(`https://article-writing-backend.onrender.com/api/comment/get`, {
        method: 'POST',
          body: JSON.stringify({
            "id": artId,
          }),
          headers: {
                'Content-Type': 'application/json',
          },
      });
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (comment) => {
    const updateCommentID = comment.comId;
    setCommentBeingEdited(comment);
    setCommentText(comment.commentContent);
    setEditMode(true);
    handleClose();
    setupdateCommentID(updateCommentID);
  };

  const handleDelete = async(comment) => {
    const commentId = comment.comId;
    await DeleteComment(commentId);
    await fetchData();
  };

  const DeleteComment = async(commentId) => {
    try {
      const response = await fetch(`https://article-writing-backend.onrender.com/api/comment/delete`, {
        method: 'DELETE',
        headers: {
          id: commentId,
          'Content-Type': 'application/json',
        },
      });
      console.log(response);
      // Handle response as needed
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    
  };

  const addComment = async () => {
    try {
      const response = await fetch(`https://article-writing-backend.onrender.com/api/comment/save`, {
        method: 'POST',
        body: JSON.stringify(
          {
            comId:commentId,
            artId: artId,
            commentorName:username,
            commentContent: commentText,
            profilePic:userImg,
            userId:userId,
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

  const updateComment = async () => {
    try {
      console.log(updateCommentID);
      const response = await fetch(`https://article-writing-backend.onrender.com/api/comment/update`, {
        method: 'PUT',
        body: JSON.stringify(
          {
            comId:updateCommentID,
            commentContent: commentText,
          }
        ),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      // Handle response as needed
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (editMode && commentBeingEdited) {
      // Handle edit submission
      // Update the comment in the backend
      // Update the comment in the state
      setEditMode(false);
      setCommentBeingEdited(null);
      await updateComment();
    } else {
      // Handle new comment submission
      await addComment();
      console.log(commentText);
    }
    await fetchData();
    setCommentText('');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setSelectedComment(event.currentTarget.id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div elevation={2} style={{ padding: '16px', marginTop: '16px' }}>
      <h3>{articleData.length} Comments</h3>
    {userId!=="" && <CommentForm style={{ marginTop: '16px' }}>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar alt={username.toUpperCase()} src="/path/to/profile.jpg" />
          </Grid>
          <Grid item xs>
            <OutlinedInput
              placeholder="Add a comment..."
              fullWidth
              multiline
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              style={{ marginBottom: '8px' }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: 'auto', marginTop: '8px' }}
              endIcon={<SendIcon />}
              onClick={handleCommentSubmit}
            >
              {editMode ? 'Edit Comment' : 'Add Comment'}
            </Button>
          </Grid>
        </Grid>
      </CommentForm>}

      {articleData.map((comment, index) => (
        <div key={index}>
          <Grid container spacing={2} style={{ marginTop: '8px' }}>
            <Grid item>
              <Avatar alt={comment.commentorName.toUpperCase()} src={comment.profilePic} />
            </Grid>
            <Grid item xs style={{ marginTop: '8px' }}>
              <Typography variant="body2">
                <strong>{comment.commentorName}: {comment.time}</strong><br />{comment.commentContent}
              </Typography>
            </Grid>
           { (userId===comment.userId) && ( <IconButton
              id={comment.comId}
              onClick={handleClick}
              style={{ marginTop: '8px' }}
            >
              <MoreVertIcon />
            </IconButton> )}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl && anchorEl.id === comment.comId)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => { handleEdit(comment); handleClose(); }}>
                <EditIcon />
                &nbsp; Edit
              </MenuItem>
              <MenuItem onClick={() => { handleDelete(comment); handleClose(); }}>
                <DeleteIcon />
                &nbsp; Delete
              </MenuItem>
            </Menu>
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
