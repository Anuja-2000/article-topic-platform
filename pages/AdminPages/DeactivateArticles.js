import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
const DeactivateArticles = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [uniqueReportedArticles, setUniqueReportedArticles] = useState([]);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [ignoreSuccessfulAlertOpen, setIgnoreSuccessfulAlertOpen] = useState(false);
    const [deleteTargetId, setDeleteTargetId] = useState(null);
    const [deleteSuccessfulAlertOpen, setDeleteSuccessfulAlertOpen] = useState(false);
    const [showDeleteIgnoreConfirmation, setShowDeleteIgnoreConfirmation] = useState(false);
    const [rejectedArticles, setRejectedArticles] = useState([]);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [showReApproveConfirmation, setShowReApproveConfirmation] = useState(false);
    const [reApproveSuccessfulAlertOpen, setReApproveSuccessfulAlertOpen] = useState(false);
    const router = useRouter();
    const [rejectedReason, setRejectedReason] = useState("");
    const [dataChanged, setDataChanged] = useState(false);
    const [deletedArticleWriterID, setDeletedArticleWriterID] = useState("");
    const [deleteTargetTitle, setDeleteTargetTitle] = useState("");
    const [axiosConfig, setAxiosConfig] = useState({
        headers: {
            Authorization: "",
        },
    });
    const[userType, setUserType] = React.useState(" ");

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("token",token);
        setUserType(localStorage.getItem("type"));
        if (token) {
            setAxiosConfig({
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }
    
    }, []);

    useEffect(() => {
        if (axiosConfig.headers.Authorization !== "") {
            fetchAdmin();
            fetchData();
            fetchRejectedArticles();
        }
    }, [axiosConfig, dataChanged]);


    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/reportArticle/get', axiosConfig);
            console.log("response", response.data);

            // Iterate over reported articles and fetch details
            const reportedArticlesWithDetails = await Promise.all(response.data.map(async (reportedArticle) => {
                console.log(reportedArticle);
                console.log("articleId", reportedArticle.articleId); // Access topicId, topicName directly from flagged topics
                // Fetch article details by articleId
                const reportedArticleResponse = await axios.get(`http://localhost:3001/api/article/${reportedArticle.articleId}`, axiosConfig);
                const { articleId, title, userId, createdAt } = reportedArticleResponse.data.article; // Destructure response.data
                console.log("for test", reportedArticleResponse.data)
                console.log("title", title);

                const articleWriterResponse = await axios.get(`http://localhost:3001/api/user/${userId}`, axiosConfig);
                console.log(userId);
                const { name } = articleWriterResponse.data; // Destructure response.data
                console.log("for user test", articleWriterResponse.data)
                console.log(name);

                // Count unique reasons
                const reasonCounts = {};
                reportedArticle.reasons.forEach(reason => {
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
                    createdAt: new Date(createdAt).toISOString().substring(0, 10),
                    reasons: uniqueReasonsWithCounts,
                    count: reportedArticle.count
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

    const fetchRejectedArticles = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/rejectedArticle/getAll', axiosConfig);
            console.log("Rejected article response.data", response.data);

            const rejectedArticlesWithDetails = await Promise.all(response.data.map(async (rejectedArticle) => {
                const rejectedArticleResponse = await axios.get(`http://localhost:3001/api/article/${rejectedArticle.articleId}`, axiosConfig);
                console.log("article", rejectedArticleResponse.data.data);
                const { articleId, title, userId, createdAt } = rejectedArticleResponse.data.article;
                const articleWriterResponse = await axios.get(`http://localhost:3001/api/user/${userId}`, axiosConfig);
                const { name } = articleWriterResponse.data;
                return {
                    title: title,
                    articleId: articleId,
                    writer: name,
                    userId: userId,
                    createdAt: createdAt,
                    rejectedBy: rejectedArticle.rejectedBy,
                    rejectedReason: rejectedArticle.rejectedReason,
                    rejectedAt: new Date(rejectedArticle.rejectedAt).toISOString().substring(0, 10),
                    daysSinceDeactivation: calculateDaysDifference(rejectedArticle.rejectedAt)
                };
            }));

            setRejectedArticles(rejectedArticlesWithDetails);
            console.log('Rejected Articles', rejectedArticlesWithDetails);
        } catch (error) {
            console.error('Error fetching reported articles:', error);
        }
    };

    const calculateDaysDifference = (rejectedAt) => {
        const givenDate = new Date(rejectedAt);
        console.log("givenDate", givenDate);
        const currentDate = new Date();
        console.log("currentDate", currentDate);
        const differenceInTime = currentDate - givenDate;
        const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

        if (differenceInDays >= 30 || differenceInDays < 0) {
            return 0;
        } else {
            return (30 - differenceInDays);
        }
    }

    const fetchAdmin = async () => {
        try {
            const username = localStorage.getItem("username");
            const email = localStorage.getItem("email");
            if (username && email) {
                setUsername(username);
                setEmail(email);
            } else {
                setUsername("");
                setEmail("");
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
        console.log("adminName ", username)
    };
    



const handleDeleteClick = (article) => {
    setDeleteTargetId(article.articleId);
    setDeleteTargetTitle(article.title);
    setDeletedArticleWriterID(article.userId)
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
        await axios.patch(`http://localhost:3001/api/article/reportArticle/${deleteTargetId}`, axiosConfig);
        await axios.delete(`http://localhost:3001/api/reportArticle/delete/${deleteTargetId}`, axiosConfig);
        await axios.post(`http://localhost:3001/api/rejectedArticle/save/${deleteTargetId}/${deleteTargetTitle}/${deletedArticleWriterID}/${username}`, {
            rejectedReason: rejectedReason
        }, axiosConfig);
        // Update the state to remove the deactivated article from the UI
        setUniqueReportedArticles(uniqueReportedArticles.filter(item => item.articleId !== deleteTargetId));
        setShowDeleteConfirmation(false);
        setDeleteSuccessfulAlertOpen(true);
        setTimeout(() => {
            setDeleteSuccessfulAlertOpen(false);
        }, 2000);
        setDataChanged(prev => !prev);
    } catch (error) {
        console.error("Error deactivating article:", error);
    }
};
const handleCloseDeleteSuccessfulAlertOpen = () => {
    setDeleteSuccessfulAlertOpen(false);
};

const handleConfirmIgnore = async () => {
    try {

        await axios.delete(`http://localhost:3001/api/reportArticle/delete/${deleteTargetId}`, axiosConfig);
        setUniqueReportedArticles(uniqueReportedArticles.filter(item => item.articleId !== deleteTargetId));
        setShowDeleteIgnoreConfirmation(false);
        setIgnoreSuccessfulAlertOpen(true);
        setTimeout(() => {
            setIgnoreSuccessfulAlertOpen(false);
        }, 2000);
    } catch (error) {
        console.error("Error ignoring flagged topic:", error);
    }
};



const handleCloseIgnoreConfirmation = () => {
    setShowDeleteIgnoreConfirmation(false);
};
const handleWriterClick = (writerId) => {
    // Use router to navigate to writer profile page
    router.push(`/writer/${writerId}`);
};

const handleReApproveClick = (articleId) => {
    setDeleteTargetId(articleId);
    setShowReApproveConfirmation(true);
};

const handleConfirmReApprove = async () => {
    try {
        await axios.patch(`http://localhost:3001/api/article/approveArticles/${deleteTargetId}`, axiosConfig);
        console.log("article Id",deleteTargetId);
        console.log("adminId",localStorage.getItem("userId"));
        const response = await axios.post(`http://localhost:3001/api/approval/save`, {
            articleId: deleteTargetId,
            adminId: localStorage.getItem("userId"),
            status: "approved",
        });
        console.log("response backend", response);
        await axios.delete(`http://localhost:3001/api/rejectedArticle/delete/${deleteTargetId}`, axiosConfig);
        setRejectedArticles(rejectedArticles.filter((rejectedArticle) => rejectedArticle.articleId !== deleteTargetId));
        setShowReApproveConfirmation(false);
        setReApproveSuccessfulAlertOpen(true);
        setTimeout(() => {
            setReApproveSuccessfulAlertOpen(false);
        }, 2000);
        setDataChanged(prev => !prev);
    } catch (error) {
        console.error("Error Re-approving article :", error);
    }
};

const handleCloseReApproveConfirmation = () => {
    setShowReApproveConfirmation(false);
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
                                                    <h4 style={{ color: 'white', textAlign: "center" }}>Actions</h4>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {uniqueReportedArticles.length == 0 ? (
                                                <TableRow>
                                                    <TableCell colSpan={6} align="center">
                                                        No data
                                                    </TableCell>
                                                </TableRow>
                                            ) : (
                                                uniqueReportedArticles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((article) => (

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
                                                                <Button variant="contained" color="error" size="small" sx={{ borderRadius: '4px', textTransform: 'capitalize' }} onClick={() => handleDeleteClick(article)}>Remove</Button>
                                                                <Button variant="contained" color="success" size="small" sx={{ borderRadius: '4px', textTransform: 'capitalize' }} onClick={() => handleIgnoreClick(article.articleId)}>Ignore</Button>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>

                                                )))}
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
                        <Alert severity="success" sx={{ width: '100%' }}>
                            Article rejected successfully.
                        </Alert>
                    )}
                    {ignoreSuccessfulAlertOpen && (
                        <Alert severity="success" sx={{ width: '100%' }}>
                            Article ignored from reported successfully.
                        </Alert>
                    )}

                    <Grid container spacing={1}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={10}>
                            <Typography variant="h5" marginBottom={2} color={"primary.dark"} marginTop={2}>Rejected Articles by Admins</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <h4 style={{ color: 'white' }}>Article</h4>
                                            </TableCell>
                                            <TableCell>
                                                <h4 style={{ color: 'white' }}>Writer</h4>
                                            </TableCell>
                                            <TableCell>
                                                <h4 style={{ color: 'white' }}>Rejected By</h4>
                                            </TableCell>
                                            <TableCell>
                                                <h4 style={{ color: 'white', }}>Rejected Reason</h4>
                                            </TableCell>
                                            <TableCell>
                                                <h4 style={{ color: 'white' }}>Created At</h4>
                                            </TableCell>
                                            <TableCell>
                                                <h4 style={{ color: 'white' }}>Rejected At</h4>
                                            </TableCell>
                                            <TableCell>
                                                <h4 style={{ color: 'white', }}>Activate</h4>
                                            </TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {rejectedArticles.length == 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center">
                                                    No data
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            rejectedArticles.map((rejectedArticle) => (
                                                <TableRow key={rejectedArticle.articleId}>
                                                    <TableCell>{rejectedArticle.title}</TableCell>
                                                    <TableCell>
                                                        <a
                                                            style={{ textDecoration: 'none', cursor: 'pointer' }}
                                                            onClick={() => handleWriterClick(rejectedArticle.userId)}
                                                            onMouseOver={(e) => (e.currentTarget.style.color = 'blue')}
                                                            onMouseOut={(e) => (e.currentTarget.style.color = 'inherit')}
                                                        >
                                                            {rejectedArticle.writer}
                                                        </a>
                                                    </TableCell>
                                                    <TableCell>{rejectedArticle.rejectedBy}</TableCell>
                                                    <TableCell>{rejectedArticle.rejectedReason}</TableCell>
                                                    <TableCell>{new Date(rejectedArticle.createdAt).toISOString().substring(0, 10)}</TableCell>
                                                    <TableCell>{rejectedArticle.rejectedAt}</TableCell>
                                                    <TableCell>
                                                        {(rejectedArticle.daysSinceDeactivation < 1) ? "" :
                                                            (
                                                                <>
                                                                    <Button variant="contained" color="success" size="medium" sx={{ borderRadius: '4px', textTransform: 'capitalize' }} onClick={() => handleReApproveClick(rejectedArticle.articleId)} >Re-approve</Button>
                                                                    <Typography sx={{ color: 'red', marginTop: '8px' }}>
                                                                        {rejectedArticle.daysSinceDeactivation} days remaining
                                                                    </Typography>
                                                                </>
                                                            )}
                                                    </TableCell>
                                                </TableRow>
                                            )))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    {reApproveSuccessfulAlertOpen && (
                        <Alert severity="success" sx={{ width: '100%' }}>
                            Article was re-approved successfully.
                        </Alert>
                    )}
                </div>
            </Navbar>
        </div>
        <Dialog open={showDeleteConfirmation} onClose={() => setShowDeleteConfirmation(false)}>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
                <Typography>Are you sure you want to delete this topic?</Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Rejection Reason"
                    type="text"
                    fullWidth
                    value={rejectedReason}
                    onChange={(e) => setRejectedReason(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setShowDeleteConfirmation(false)} color="primary">Cancel</Button>
                <Button onClick={handleConfirmDelete} color="error">Delete</Button>
            </DialogActions>
        </Dialog>
        <Dialog open={showDeleteIgnoreConfirmation} onClose={handleCloseIgnoreConfirmation}>
            <DialogTitle>Confirm Ignore</DialogTitle>
            <DialogContent>Are you sure you want to ignore this reported article?</DialogContent>
            <DialogActions>
                <Button onClick={handleCloseIgnoreConfirmation} color="primary">Cancel</Button>
                <Button onClick={handleConfirmIgnore} color="primary">Ignore</Button>
            </DialogActions>
        </Dialog>
        <Dialog open={showReApproveConfirmation} >
            <DialogTitle>Confirm Re-approve Article</DialogTitle>
            <DialogContent>Are you sure you want to re-approve this article?</DialogContent>
            <DialogActions>
                <Button onClick={handleCloseReApproveConfirmation} color="primary">Cancel</Button>
                <Button onClick={handleConfirmReApprove} color="success">Re-approve</Button>
            </DialogActions>
        </Dialog>

    </>
);
};

export default DeactivateArticles;
