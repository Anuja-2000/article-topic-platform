import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import TableContainer from "@mui/material/TableContainer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Navbar from '../../components/Navbar';
import axios from 'axios';
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from '@mui/material/DialogActions';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
const FlaggedTopics = () => {
    const [uniqueTopics, setUniqueTopics] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [deleteSuccessfulAlertOpen, setDeleteSuccessfulAlertOpen] = useState(false);
    const [showDeleteIgnoreConfirmation, setShowDeleteIgnoreConfirmation] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/flaggedTopics/get');
                console.log(response.data);
                // Iterate over flagged topics and fetch details
                const topicsWithDetails = await Promise.all(response.data.map(async (topic) => {
                    console.log(topic.topicId, topic.topicName); // Access topicId, topicName directly from flagged topics
                    // Fetch topic details by topicId
                    const topicResponse = await axios.get(`http://localhost:3001/api/topics/getByTopic/${topic.topicId}`);
                    const { keywordId, topicDomainId } = topicResponse.data; // Destructure response.data
                    console.log(topicResponse);
                    // Fetch keyword name
                    const keywordResponse = await axios.get(`http://localhost:3001/api/keywords/get/GetByKeyword/${keywordId}`);
                    const keywordName = keywordResponse.data.keywordName;
                    // Fetch topic domain name
                    const topicDomainResponse = await axios.get(`http://localhost:3001/api/topicDomains/get/${topicDomainId}`);
                    const topicDomainName = topicDomainResponse.data.topicDomainName;
                    // Return topic details with additional data
                    return {
                        topicId: topic.topicId, // Include topicId in the returned object
                        topicName: topic.topicName,
                        keywordName,
                        topicDomainName,
                        reasons: topic.reasons,
                        count: topic.count
                    };
                }));

                // Update state with topics including additional details
                setUniqueTopics(topicsWithDetails);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleDeleteClick = (topicId) => {
        setDeleteTargetId(topicId);
        setShowDeleteConfirmation(true);
    };
    const handleIgnoreClick = (topicId) => {
        setDeleteTargetId(topicId);
        setShowDeleteIgnoreConfirmation(true);
    };
    const handleConfirmDelete = async () => {
        try {
            // Delete the topic
            await axios.delete(`http://localhost:3001/api/topics/delete/${deleteTargetId}`);
            // Delete flagged topics related to the deleted topic
            await axios.delete(`http://localhost:3001/api/flaggedTopics/delete/${deleteTargetId}`);
            // Update the state to remove the deleted topic from the UI
            setUniqueTopics(uniqueTopics.filter(item => item.topicId !== deleteTargetId));
            setShowDeleteConfirmation(false);
            setDeleteSuccessfulAlertOpen(true);
            setTimeout(() => {
                setDeleteSuccessfulAlertOpen(false);
            }, 20000);
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const handleCloseDeleteSuccessfulAlertOpen = () => {
        setDeleteSuccessfulAlertOpen(false);
    };

    const handleConfirmIgnore = async () => {
        try {
            // Delete flagged topics related to the topic ID
            await axios.delete(`http://localhost:3001/api/flaggedTopics/delete/${deleteTargetId}`);

            // Update the state to remove the ignored topic from the UI
            setUniqueTopics(uniqueTopics.filter(item => item.topicId !== deleteTargetId));
            setShowDeleteIgnoreConfirmation(false);
            setDeleteSuccessfulAlertOpen(true);
            setTimeout(() => {
                setDeleteSuccessfulAlertOpen(false);
            }, 20000);
        } catch (error) {
            console.error("Error ignoring flagged topic:", error);
        }
    };

    const handleCloseIgnoreConfirmation = () => {
        setShowDeleteIgnoreConfirmation(false);
    };

    return (
        <>
            <div>
                <Navbar>
                    <div className="App" style={{ marginTop: "60px" }}>
                        <Grid container spacing={1}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={10}>
                                <Typography variant="h4" marginBottom={2} color={"primary.dark"} marginTop={2}> Flagged Topics Management </Typography>
                                <Typography variant="body1" marginBottom={2} color={"primary.dark"} marginTop={2}>  Manage Flagged Topics  </Typography>
                                <Divider />
                                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                                    <Typography variant="h5" marginBottom={2} color={"primary.dark"} marginTop={2}> Flagged Topics</Typography>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>
                                                        <h4 style={{ color: 'white' }}>Topic Name</h4>
                                                    </TableCell>
                                                    <TableCell>
                                                        <h4 style={{ color: 'white' }}>Keyword</h4>
                                                    </TableCell>
                                                    <TableCell>
                                                        <h4 style={{ color: 'white' }}>Topic Domain</h4>
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
                                                        <TableCell>{topic.keywordName}</TableCell>
                                                        <TableCell>{topic.topicDomainName}</TableCell>
                                                        <TableCell>
                                                            <ul>
                                                                {topic.reasons?.map((reason, index) => (
                                                                    <li key={index}>{reason}</li>
                                                                ))}
                                                            </ul>
                                                        </TableCell>
                                                        <TableCell>{topic.count}</TableCell>
                                                        <TableCell>
                                                            <Box sx={{ display: 'flex', gap: '8px' }}>
                                                                <Button variant="contained" color="error" onClick={() => handleDeleteClick(topic.topicId)}>Delete</Button>
                                                                <Button variant="contained" color="primary" onClick={() => handleIgnoreClick(topic.topicId)}>Ignore</Button>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </Grid>
                        </Grid>
                        {deleteSuccessfulAlertOpen && (
                            <div style={{ backgroundColor: '#1E1E3C', color: 'white', padding: '10px', marginTop: '10px' }}>
                                Topic deleted successfully.
                            </div>
                        )}
                    </div>
                </Navbar>
            </div>
            <Dialog open={showDeleteConfirmation} onClose={() => setShowDeleteConfirmation(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete this topic?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setShowDeleteConfirmation(false)} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error">Delete</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={showDeleteIgnoreConfirmation} onClose={handleCloseIgnoreConfirmation}>
                <DialogTitle>Confirm Ignore</DialogTitle>
                <DialogContent>Are you sure you want to ignore this flagged topic?</DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseIgnoreConfirmation} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmIgnore} color="primary">Ignore</Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default FlaggedTopics;
