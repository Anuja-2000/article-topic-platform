import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
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
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from '../../components/TablePaginationActions';
import Divider from "@mui/material/Divider";
const DeactivateArticles = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [uniqueReportedArticles, setUniqueReportedArticles] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [deleteSuccessfulAlertOpen, setDeleteSuccessfulAlertOpen] = useState(false);
    const [showDeleteIgnoreConfirmation, setShowDeleteIgnoreConfirmation] = useState(false);
    const [reportedArticles, setReportedArticles] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/reportArticle/get');
                console.log(response.data);

                // Iterate over reported articles and fetch details
                const reportedArticlesWithDetails = await Promise.all(response.data.map(async (article) => {
                    console.log(article);
                    console.log("articleId", article.articleId); // Access topicId, topicName directly from flagged topics
                    // Fetch article details by articleId
                    const reportedArticleResponse = await axios.get(`http://localhost:3001/api/readerArticle/getById/${article.articleId}`);
                    const {articleId, title, userId } = reportedArticleResponse.data; // Destructure response.data
                    console.log("for test", reportedArticleResponse.data)
                    console.log(title);

                    const articleWriterResponse = await axios.get(`http://localhost:3001/api/user/${userId}`);
                    console.log(userId);
                    const { name } = articleWriterResponse.data; // Destructure response.data
                    console.log("for user test", articleWriterResponse.data)
                    console.log(name);

                    // Count unique reasons
                    const reasonCounts = {};
                    article.reasons.forEach(reason => {
                        if (reasonCounts[reason]) {
                            reasonCounts[reason]++;
                        } else {
                            reasonCounts[reason] = 1;
                        }
                    });
                    const uniqueReasonsWithCounts = Object.entries(reasonCounts).map(([reason, count]) => ({ reason, count }));

                    // Return article details with additional data
                    return {
                        articleId: articleId,
                        writerName: name,
                        title: title,
                        userId: userId,
                        reasons: uniqueReasonsWithCounts,
                        count: article.count
                    };
                }));
                console.log(reportedArticlesWithDetails);
                // Sort reported articles in descending alphabetical order based on title
                const sortedArticles = reportedArticlesWithDetails.slice().sort((a, b) => {
                    return a.title.localeCompare(b.title);
                });
                // Update state with reportedArticles including additional details
                setUniqueReportedArticles(sortedArticles);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        const fetchReportedArticles = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/article/reportedArticles/get');
                console.log("Reported response.data", response.data);

                const reportedArticlesWithDetails = await Promise.all(response.data.reportedArticles.map(async (reportedArticle) => {
                    const reportedArticleResponse = await axios.get(`http://localhost:3001/api/article/${reportedArticle.articleId}`);
                    console.log("article", reportedArticleResponse.data.article)
                    const { articleId, title } = reportedArticleResponse.data.article;
                    return {
                        title: title,
                        articleId: articleId,
                    };
                }));

                setReportedArticles(reportedArticlesWithDetails);
                console.log('Reported Articles', reportedArticlesWithDetails);
            } catch (error) {
                console.error('Error fetching reported articles:', error);
            }
        };
        fetchData();
        fetchReportedArticles();
    }, []);

    const handleDeleteClick = (articleId) => {
        setDeleteTargetId(articleId);
        setShowDeleteConfirmation(true);
    };

    const handleIgnoreClick = (articleId) => {
        setDeleteTargetId(articleId);
        setShowDeleteIgnoreConfirmation(true);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        const newRowsPerPage = parseInt(event.target.value, 10);
        console.log('New rows per page:', newRowsPerPage);
        setRowsPerPage(newRowsPerPage);
        setPage(0);
        console.log('New page:', 0);
    };
    const handleConfirmDelete = async () => {
        try {
            await axios.patch(`http://localhost:3001/api/article/reportArticle/${deleteTargetId}`);
            await axios.patch(`http://localhost:3001/api/reportArticle/reportArticle/${deleteTargetId}`);
            // Update the state to remove the deactivated article from the UI
            setUniqueReportedArticles(uniqueReportedArticles.filter(item => item.articleId !== deleteTargetId));
            setShowDeleteConfirmation(false);
            setDeleteSuccessfulAlertOpen(true);
            setTimeout(() => {
                setDeleteSuccessfulAlertOpen(false);
            }, 20000);
        } catch (error) {
            console.error("Error deactivating article:", error);
        }
    };
    const handleCloseDeleteSuccessfulAlertOpen = () => {
        setDeleteSuccessfulAlertOpen(false);
    };

    const handleConfirmIgnore = async () => {
        try {

            await axios.delete(`http://localhost:3001/api/reportArticle/delete/${deleteTargetId}`);
            setUniqueReportedArticles(uniqueReportedArticles.filter(item => item.topicId !== deleteTargetId));
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
                                <Typography variant="h4" marginBottom={2} color={"primary.dark"}> User Reported Article Management</Typography>
                                <Typography variant="body1" marginBottom={2} color={"primary.dark"} marginTop={2}>  Manage User Reported Articles  </Typography>
                                <Divider />
                                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                                <Typography variant="h5" marginBottom={2} color={"primary.dark"} marginTop={2}>Reported Articles by Users</Typography>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    <h4 style={{ color: 'white' }}>Article Title</h4>
                                                </TableCell>
                                                <TableCell>
                                                    <h4 style={{ color: 'white' }}>Writer</h4>
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
                                            {uniqueReportedArticles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((article) => (

                                                <TableRow key={article.articleIdId}>
                                                    <TableCell>
                                                        <a href={`http://localhost:3000/article/${article.articleId}`} style={{ textDecoration: 'none', color: 'inherit' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>
                                                            {article.title}
                                                        </a>
                                                    </TableCell>
                                                    <TableCell>{article.writerName}</TableCell>
                                                    <TableCell>
                                                        {article.reasons.map((reasonObj, index) => (
                                                            <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <span style={{ textAlign: 'left' }}>{reasonObj.reason}</span>
                                                                <span style={{ textAlign: 'right' }}>{reasonObj.count}</span>
                                                            </div>
                                                        ))}
                                                    </TableCell>
                                                    <TableCell>{article.count}</TableCell>
                                                    <TableCell>
                                                        <Box sx={{ display: 'flex', gap: '8px' }}>
                                                            <Button variant="contained" color="error" onClick={() => handleDeleteClick(article.articleId)}>Remove</Button>
                                                            <Button variant="contained" color="success" onClick={() => handleIgnoreClick(article.articleId)}>Cancel</Button>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                        <TableFooter>
                                            <TableRow>
                                                <TablePagination
                                                    style={{ marginLeft: "auto" }} // Aligns pagination to the right
                                                    rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                                    colSpan={3}
                                                    count={uniqueReportedArticles.length}
                                                    rowsPerPage={rowsPerPage}
                                                    page={page}
                                                    SelectProps={{
                                                        inputProps: {
                                                            "aria-label": "rows per page",
                                                        },
                                                        native: true,
                                                    }}
                                                    onPageChange={handleChangePage}
                                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                                    ActionsComponent={TablePaginationActions}
                                                />
                                            </TableRow>
                                        </TableFooter>
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

                        <Grid container spacing={1}>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={10}>
                            <Typography variant="h5" marginBottom={2} color={"primary.dark"} marginTop={2}>Reported Articles by Admins</Typography>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    <h4 style={{ color: 'white' }}>Article</h4>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {reportedArticles.map((article) => (
                                                <TableRow key={article.articleId}>
                                                    <TableCell>{article.title}</TableCell>
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

export default DeactivateArticles;
