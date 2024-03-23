import Navbar from "../../components/Navbar"
import { Container, Divider, Typography } from "@mui/material"
import * as React from 'react';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';


export default function Settings() {

    const [state, setState] = React.useState({
        gilad: true,
        jason: false,
        antoine: true,
    });

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    return (
        <>
            <Navbar>
                <Container maxWidth="lg">
                    <Typography variant="h4" color={"primary"} style={{ fontWeight: 550, marginBottom: '8px' }}>Settings</Typography>
                    <Divider />
                    <FormControl component="fieldset" variant="standard">
                        <FormLabel component="legend">Assign responsibility</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch checked={state.gilad} onChange={handleChange} name="gilad" />
                                }
                                label="Gilad Gray"
                            />
                        </FormGroup>
                        <FormHelperText>Be careful</FormHelperText>
                    </FormControl>
                </Container>
            </Navbar>
        </>
    )
}