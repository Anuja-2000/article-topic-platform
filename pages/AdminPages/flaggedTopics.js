import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import TableContainer from "@mui/material/TableContainer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import axios from 'axios';
import Navbar from '../../components/Navbar'; // Import the Navbar component

const FlaggedTopics = () => {
    const [uniqueTopics, setUniqueTopics] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/flaggedTopics/get');
                setUniqueTopics(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div>
                <Navbar>
                    <div className="App" style={{ marginTop: "60px" }}>
                        <h2 style={{ textAlign: "center" }}>Flagged Topics</h2>
                        {/* Render the Navbar component */}

                        <Grid container spacing={1}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={10}>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    <h4 style={{ color: 'white' }}>Topic Name</h4>
                                                </TableCell>
                                                <TableCell>
                                                    <h4 style={{ color: 'white' }}>Reasons</h4>
                                                </TableCell>
                                                <TableCell>
                                                    <h4 style={{ color: 'white' }}>Count</h4>
                                                </TableCell>
                                                <TableCell>
                                                    <h4 style={{ color: 'white' }}>Actions</h4>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>

                                            {uniqueTopics.map(topic => (
                                                <TableRow key={topic.topicId}>
                                                    <TableCell>{topic.topicName}</TableCell>
                                                    <TableCell><ul>
                                                        {topic.reasons.map((reason, index) => (
                                                            <li key={index}>{reason}</li>
                                                        ))}
                                                    </ul></TableCell>
                                                    <TableCell>{topic.count}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Grid>
                        </Grid>


                    </div>
                </Navbar>
            </div>
        </>
    );
};

export default FlaggedTopics; // Changed component name to PascalCase
