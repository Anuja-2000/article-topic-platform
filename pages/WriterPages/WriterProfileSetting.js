import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Container, Avatar, Box, Grid, Paper, IconButton } from "@mui/material";
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Navbar from "../../components/createArticleNavbar";
import AlertDialog from './AlertDialog'; 

const WriterProfileSetting = () => {
  // Initial dummy values
  const initialUsername = "dummyUser";
  const initialEmail = "dummyUser@example.com";
  const joinDate = "2022-01-01";
  const articlesCount = 10;

  const [username, setUsername] = useState(initialUsername);
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState("");
  const [isSaveButtonEnabled, setIsSaveButtonEnabled] = useState(false);
  const [open, setOpen] = useState(false);

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setIsSaveButtonEnabled(true); // Enable save button when profile picture is changed
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement submit logic here
  };

  const handleDeleteAccount = () => {
    // Open the dialog
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    // TODO: Implement delete account logic here
    setOpen(false);
  };

  const handleLogout = () => {
    // TODO: Implement logout logic here
  };

  useEffect(() => {
    if (username !== initialUsername) {
      setIsSaveButtonEnabled(true);
    } else {
      setIsSaveButtonEnabled(false);
    }
  }, [username]);

  return (
    <div
      style={{
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Navbar>
        <Container
          component="main"
          maxWidth="md"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
            padding: 3,
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: 4,
            }}
          >
            <Typography component="h1" variant="h5" gutterBottom>
              Profile Settings
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-block' }}>
              <Avatar
                sx={{ width: 150, height: 150, marginBottom: 2 }}
                src={preview || "/defaultAvatar.png"}
              />
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="profile-picture"
                type="file"
                onChange={handleProfilePictureChange}
              />
              <label htmlFor="profile-picture">
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                  sx={{ position: 'absolute', bottom: 0, right: 0 }}
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </Box>
            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              {initialEmail} {/* This will be replaced with the fetched email address */}
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3, width: '100%' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: '16.5px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    <Typography variant="subtitle1" color="textSecondary">
                      Join Date
                    </Typography>
                    <Typography variant="body1">{joinDate}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={3}
                    sx={{
                      padding: '16.5px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    <Typography variant="subtitle1" color="textSecondary">
                      Articles Created
                    </Typography>
                    <Typography variant="body1">{articlesCount}</Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                disabled={!isSaveButtonEnabled}
              >
                Save Changes
              </Button>
              <Button
                fullWidth
                variant="contained"
                color="error"
                sx={{ mt: 2, mb: 2 }}
                onClick={handleDeleteAccount}
              >
                Delete Account
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                sx={{ mb: 2 }}
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </Box>
          </Box>
        </Container>
      </Navbar>
      <AlertDialog 
        open={open}
        onClose={handleClose}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default WriterProfileSetting;

