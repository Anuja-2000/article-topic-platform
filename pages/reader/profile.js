import React, { useState, useEffect } from 'react';
import { Container, TextField, Typography, Button, Paper, Box, Avatar } from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Navbar from "../../components/navbarReader/Navbar";
import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import { useForm } from 'react-hook-form';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const ShowHideButton = styled('button')({
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
  });

const Profile = () => {
    const {
        register,
      } = useForm({ mode: 'onChange' });
    const [username, setUserName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [imgUrl, setImgUrl] = useState("");
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);
    const [openMissMatchAlert, setOpenMissMatchAlert] = useState(false);
 
    const handleSuccessAlertClose = () => {
        setOpenSuccessAlert(false);
    };

    const handleErrorAlertClose = () => {
        setOpenErrorAlert(false);
    };

    const handleMissMatchAlertClose = () => {
        setOpenMissMatchAlert(false);
    };
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
                const {name,displayName,email,imgUrl } = response.data;
                if (name != null && email != null) {
                    setUserName(name);
                    setName(displayName);
                    setEmail(email);
                } else {
                    setUserName("");
                    setName("!user");
                }
                setImgUrl(imgUrl);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    },[]);

    const sendFileToServer = async () => {
        const formData = new FormData();
        formData.append('file', imgFile);
        if(changePassword()=="password does not match"){
            return;
        };
        await axios.post('http://localhost:3001/api/file/setUserId', {
            userId: localStorage.getItem("userId"),
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });

        await axios.put('http://localhost:3001/api/user/updateName', {
                userId: localStorage.getItem("userId"),
                name: name,
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });

        await axios.post('http://localhost:3001/api/file/upload',formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response);
            localStorage.removeItem("imgUrl");
            reFreshProfileimg();
        }).catch((error) => {
            console.log(error);
        });

       
    }

    const handleChange = (event) => {
        setImgFile(event.target.files?.[0]);
    };

    const handleDisplayChange = (event) => {
        setName(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async () => {
        // Implement logic to update username, password, and/or profile picture
        console.log("Submitted!");
    };
    const changePassword = async() => {
        if(newPassword == ""){
            return;
        }
        if (newPassword !== confirmPassword) {
            setOpenMissMatchAlert(true);
            return "password does not match";
          }
      
          const requestBody = {
            userId: localStorage.getItem("userId"),
            newPass: newPassword
          };
      
          try {
            const response = await fetch(`http://localhost:3001/api/user/updatePassword`, {
              method: 'PATCH',
              body: JSON.stringify(requestBody),
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (response.ok) {
              console.log(response);
              setOpenSuccessAlert(true);
              setNewPassword("");
              setConfirmPassword("");
            } else {
                console.error('An error occurred:', error);
                setOpenErrorAlert(true);
            }
          } catch (error) {
            console.error('An error occurred:', error);
            setOpenErrorAlert(true);
            // Handle error
          }
    }

    return (
        <>
            <Navbar />
            <>
                <Snackbar
                open={openSuccessAlert}
                autoHideDuration={5000}
                onClose={handleSuccessAlertClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                 >
                    <Alert onClose={handleSuccessAlertClose} severity="success" sx={{ width: '100%' }}>
                    Password is reset
                    </Alert>
                 </Snackbar>
                <Snackbar
                    open={openMissMatchAlert}
                    autoHideDuration={5000}
                    onClose={handleMissMatchAlertClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={handleMissMatchAlertClose} severity="error" sx={{ width: '100%' }}>
                    Passwords dosen't match
                    </Alert>
                </Snackbar>
                <Snackbar
                    open={openErrorAlert}
                    autoHideDuration={5000}
                    onClose={handleErrorAlertClose}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={handleErrorAlertClose} severity="error" sx={{ width: '100%' }}>
                    Error occurred. Please try again.
                    </Alert>
                </Snackbar>
            </>
            <Container maxWidth="sm" sx={{ marginTop: 8 }}>
                <Paper elevation={3} sx={{ padding: 4 }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Avatar alt={name.toUpperCase()} src={imgUrl!=""?imgUrl:"/path/to/profile.jpg"} sx={{ width: 100, height: 100, marginBottom: 4 }} />
                        <Button
                            component="label"
                            variant="contained"
                        >
                            Upload New Picture
                            <VisuallyHiddenInput type="file" onChange={handleChange} />
                        </Button>
                        <Typography variant="h5" sx={{ marginTop: 3 }}>Edit Profile</Typography>
                        <TextField id="username" label="Username" variant="outlined" value={username} disabled color='primary' 
                        sx={{ marginTop: 2, width: '100%' }} />
                        <TextField id="display-name" label="Display Name" variant="outlined" value={name} onChange={handleDisplayChange} color='primary' 
                        sx={{ marginTop: 2, width: '100%' }} />
                        <TextField id="email" label="Email" variant="outlined" value={email} disabled color='primary' 
                        sx={{ marginTop: 2, width: '100%' }} />
                        <TextField 
                            id="new-password" 
                            label="New Password" 
                            variant="outlined"
                            name="new password"
                            onChange={handleNewPasswordChange} 
                            color='primary' 
                            sx={{ marginTop: 2, width: '100%', fontFamily: 'FontAwesome' }} 
                            type={showPassword ? 'text' : 'password'}
                            {...register('new password', { required: true })}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <ShowHideButton type="button" onClick={togglePasswordVisibility}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </ShowHideButton>
                                </InputAdornment>
                              ),
                            }}
                        />
                        <TextField 
                            id="confirm-password" 
                            label="Confirm New Password" 
                            variant="outlined" 
                            name="confirm password"
                            onChange={handleConfirmPasswordChange} 
                            color='primary' 
                            sx={{ marginTop: 2, width: '100%', fontFamily: 'FontAwesome' }} 
                            type={showPassword ? 'text' : 'password'}
                            {...register('confirm password', { required: true })}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <ShowHideButton type="button" onClick={togglePasswordVisibility}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </ShowHideButton>
                                </InputAdornment>
                              ),
                            }}
                        />
                        <Button variant="contained" sx={{ marginTop: 4, width: '100%' }} onClick={sendFileToServer}>Save Changes</Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default Profile;
