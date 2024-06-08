import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Box, Typography, Avatar, Grid, Paper } from '@mui/material';

const WriterProfile = () => {
  const router = useRouter();
  const { writerId } = router.query;
  const [writer, setWriter] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);

  useEffect(() => {
    if (writerId) {
      const fetchWriterDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/user/${writerId}`);
          setWriter(response.data);
        } catch (error) {
          console.error('Error fetching writer details:', error);
        }
      };
  
      const fetchFollowerCount = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/api/follow/count/${writerId}`);
          if (response.data && response.data.count !== undefined) {
            setFollowerCount(response.data.count);
          }
        } catch (error) {
          console.error('Error fetching follower count:', error);
        }
      };
  
      fetchWriterDetails();
      fetchFollowerCount();
    }
  }, [writerId]);

  if (!writer) {
    return <div>Loading...</div>;
  }

  const formatFollowerCount = () => {
    if (followerCount <= 1000) {
      return followerCount;
    } else {
      return `${(followerCount / 1000).toFixed(1)}k`;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "primary.main",
        padding: '20px'
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: '20px',
          maxWidth: '600px',
          width: '100%',
          backgroundColor: '#ffffff'
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            {writer.isActive ? (
              <Avatar
                alt={writer.name}
                src={writer.profileImage}
                sx={{
                  width: 150,
                  height: 150,
                  margin: '0 auto',
                  border: '5px solid #3f51b5',
                }}
              />
            ) : (
              <Avatar
                alt={writer.name}
                sx={{
                  width: 150,
                  height: 150,
                  margin: '0 auto'
                }}
              >
                {writer.name.charAt(0)}
              </Avatar>
            )}
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', color: '#3f51b5' }}
            >
              {writer.name}
            </Typography>
            <Typography variant="h6" sx={{ color: '#757575' }}>
              {writer.email}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: '10px',
                color: writer.isActive ? '#4caf50' : '#f50057',
              }}
            >
              Status: {writer.isActive ? 'Active' : 'Deactivated'}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: '10px',
                color: '#757575',
              }}
            >
              Followers: {formatFollowerCount()}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                marginTop: '10px',
                color: '#757575',
              }}
            >
              Created At: {new Date(writer.savedAt).toLocaleDateString()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default WriterProfile;
