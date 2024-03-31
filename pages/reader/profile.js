import React, { useState, useEffect } from 'react';
import { Container, TextField, Typography, Button, Paper, Box, Avatar } from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from 'axios';
import Navbar from "../../components/navbarReader/Navbar";

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

const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [imgFile, setImgFile] = useState(null);
    const [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
        const name = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        if (name != null && email != null) {
            setName(name);
            setEmail(email);
        } else {
            setName("!user");
        }
        setImgUrl(localStorage.getItem("imgUrl"));
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userId = localStorage.getItem("userId");
                const response = await axios.get(`http://localhost:3001/api/user/${userId}`);
                const { username, email, imgUrl } = response.data;
               // setName(username);
                //setEmail(email);
                //setImgUrl(imgUrl);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (event) => {
        setImgFile(event.target.files?.[0]);
    };

    const handleUsernameChange = (event) => {
        setName(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
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

    return (
        <>
            <Navbar />
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
                        <TextField id="username" label="Username" variant="outlined" value={name} onChange={handleUsernameChange} color='primary' sx={{ marginTop: 2, width: '100%' }} />
                        <TextField id="email" label="Email" variant="outlined" value={email} disabled color='primary' sx={{ marginTop: 2, width: '100%' }} />
                        <TextField id="new-password" label="New Password" variant="outlined" type="password" value={newPassword} onChange={handleNewPasswordChange} color='primary' sx={{ marginTop: 2, width: '100%' }} />
                        <TextField id="confirm-password" label="Confirm New Password" variant="outlined" type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} color='primary' sx={{ marginTop: 2, width: '100%' }} />
                        <Button variant="contained" sx={{ marginTop: 4, width: '100%' }} onClick={handleSubmit}>Save Changes</Button>
                    </Box>
                </Paper>
            </Container>
        </>
    );
};

export default Profile;
