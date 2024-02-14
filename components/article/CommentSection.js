import React from 'react';
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

const CommentForm = styled('form')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
}));

const CommentSection = () => {
  // Sample comments data
  const comments = [
    { id: 1, user: 'John Doe', text: 'Great article!', time: '2 hours ago' },
    { id: 2, user: 'Alice Smith', text: 'I learned a lot. Thanks for sharing!', time: '1 day ago' },
  ];

  return (
    <div elevation={2} sx={{ padding: (theme) => theme.spacing(3), marginTop: (theme) => theme.spacing(3) }}>
       {/* Comment input form */}
       <CommentForm>
        <Grid container spacing={2}>
          <Grid item>
            <Avatar alt="User" src="/path/to/avatar.jpg" />
          </Grid>
          <Grid item xs>
            <OutlinedInput
              placeholder="Add a comment..."
              fullWidth
              multiline
              rows={3}
              sx={{ marginBottom: (theme) => theme.spacing(2) }}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              sx={{ marginLeft: 'auto', marginTop: (theme) => theme.spacing(1) }}
              endIcon={<SendIcon />}
            >
              Comment
            </Button>
          </Grid>
        </Grid>
      </CommentForm>
      {/* Display comments */}
      {comments.map((comment) => (
        <div key={comment.id}>
          <Grid container spacing={2} mt={1}>
            <Grid item>
              <Avatar alt={comment.user} src={`/path/to/${comment.user.toLowerCase()}.jpg`} />
            </Grid>
            <Grid item xs mt={1}>
              <Typography variant="body2">
                <strong>{comment.user}: {comment.time}</strong><br />{comment.text}
              </Typography>
            </Grid>
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default CommentSection;
