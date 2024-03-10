import { Container, TextField } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Navbar from "../../components/Navbar";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';


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


export default function Profile() {

    const [name, setName] = React.useState(" ");
    const [email, setEmail] = React.useState(" ");
    const [imgPath, setImgPath] = React.useState("sample.jpg");

    React.useEffect(() => {
        const name = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        if (name != null && email != null) {
            setName(name);
            setEmail(email);
        } else {
            setName("!user");
        }
    });


    const handleChange = (event) => {
        setImgPath(event.target.value);
    }

    return (
        <>
            <Navbar>
                <Container maxWidth="sm">
                    <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Avatar alt={name} src={{ imgPath }} sx={{ width: 100, height: 100, marginBottom: 5 }} />
                            <Button
                                component="label"
                                role={undefined}
                                variant="contained"
                            >
                                Upload image
                                <VisuallyHiddenInput type="file" onClick={handleChange} />
                            </Button>
                            <TextField id="username" label="Username" variant="standard" value={name} disabled color='primary' sx={{ marginTop: "20px" }} />
                            <TextField id="email" label="Email" variant="standard" value={email} disabled color='primary' sx={{ marginTop: "20px" }} />
                        </Box>
                    </Paper>
                </Container>
            </Navbar>
        </>
    )
}