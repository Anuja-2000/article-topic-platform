// components/article/CommentSection.js
import React from 'react';
import { Typography, TextField, Button, Divider } from '@mui/material';

const CommentSection = () => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>
      {/* Display comments or a message if there are no comments */}
      {/* ... */}
      <Divider style={{ margin: '16px 0' }} />
      <Typography variant="h6" gutterBottom>
        Add a Comment
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Your comment..."
        fullWidth
        multiline
        rows={4}
        margin="normal"
      />
      <Button variant="contained" color="primary" style={{ marginTop: 16 }}>
        Post Comment
      </Button>
    </div>
  );
};

export default CommentSection;
