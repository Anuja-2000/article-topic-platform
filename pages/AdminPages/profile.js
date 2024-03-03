import { Container, TextField } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import Navbar from "../../components/Navbar";
import Box from '@mui/material/Box';
import * as React from 'react';

export default function Profile() {

    const [name, setName] = React.useState(" ");

    React.useEffect(() => {
        const name = localStorage.getItem("username");
        if (name != null) {
            setName(name);
        } else {
            setName("!user");
        }
    });

    return (
        <>
            <Navbar>
                <Container maxWidth="sm">
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Avatar alt={name} src="/static/images/avatar/1.jpg" sx={{ width: 100, height: 100, marginBottom:5 }} />
                        <TextField id="username" label="Username" variant="standard" value={name} disabled/>
                    </Box>
                </Container>
            </Navbar>
        </>
    )
}