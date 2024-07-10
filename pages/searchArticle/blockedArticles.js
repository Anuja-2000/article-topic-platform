import React, { useState, useEffect } from 'react';
import style from "../../styles/search.module.css";
import {
    Box,
    Button,
    Grid,
    Paper,
    Typography,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Alert,
} from '@mui/material';
import { useRouter } from 'next/router';
import axios from 'axios';
import Navbar from '../../components/navbarReader/Navbar';
import Divider from "@mui/material/Divider";
function BlockedArticlesPage() {
    const router = useRouter();
    const [blockedArticles, setBlockedArticles] = useState([]);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [articleToUnblock, setArticleToUnblock] = useState(null);
    const [readerId, setReaderId] = useState('');
    const [articleDetails, setArticleDetails] = useState([]);
    const [articleUnblockedSuccessfully, setArticleUnblockedSuccessfully] = useState(false);
    const [axiosConfig, setAxiosConfig] = useState({
        headers: {
            Authorization: "",
        },
    });

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (userId !== null) {
            setReaderId(userId);
        }
        const token = localStorage.getItem("token");
        console.log("token", token);
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
            fetchBlockedArticles();
        }

    }, [axiosConfig]);

    // Fetch blocked articles for the current reader
    const fetchBlockedArticles = async () => {

        try {
            const response = await axios.get(`http://localhost:3001/api/blockedArticle/get/${readerId}`);
            setBlockedArticles(response.data);

            const articlePromises = response.data.map(async (articleId) => {
                const articleResponse = await axios.get(`http://localhost:3001/api/article/${articleId}`, axiosConfig);
                console.log(articleResponse);
                return { articleId, articleName: articleResponse.data.article.title };
            });

            const articleDetails = await Promise.all(articlePromises);
            setArticleDetails(articleDetails);
            console.log("articleDetails", articleDetails);
        } catch (error) {
            console.error('Error fetching blocked articles:', error);
        }
    };


    const handleUnblockClick = (articleId) => {
        setArticleToUnblock(articleId);
        setConfirmOpen(true);
    };

    const handleConfirmUnblock = async () => {
        try {

            const response = await axios.delete(`http://localhost:3001/api/blockedArticle/delete/${articleToUnblock}/${readerId}`);
            console.log('Blocked article deleted successfully:', response.data);
            setArticleUnblockedSuccessfully(true);
            //setArticleDetails(articleDetails.filter(id => id !== articleToUnblock));
            fetchBlockedArticles();
            setConfirmOpen(false);
            setTimeout(() => {
                setArticleUnblockedSuccessfully(false);
              }, 2000);
            
        } catch (error) {
            console.error('Error deleting blocked article:', error);
        }
    };

    const handleCancelUnblock = () => {
        setConfirmOpen(false);
    };

    const handleArticleClick = (articleId) => {
        router.push(`/article/${articleId}`);
    };

    return (
        <div className="App" style={{ margin: "60px" }}>
            <div className={style.navbar}>
                <Navbar />
            </div>
            <div style={{ padding: '20px' }}>
                <Typography variant="h4" marginBottom={2} color={"primary.dark"} marginTop={2}>  Article Management  </Typography>
                <Typography variant="body1" marginBottom={2} color={"primary.dark"} marginTop={2}>  Manage Blocked Articles  </Typography>

                <Divider />
                <Grid container spacing={3}>
                    
                    <Grid item xs={12} marginTop={3} color={"primary.dark"}>
                        <Typography variant="h5" gutterBottom>
                            Blocked Articles
                        </Typography>
                        {articleDetails.map((article) => (
                            <Paper key={article.articleId} style={{ padding: '20px', marginTop: '30px', backgroundColor:'#E8E8E8' }}>
                                <Typography variant="h6" color={"primary.dark"}>{article.articleName}</Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding:2, mt: 1 }}>
                                    <Button variant="contained" color="success" size="medium" sx={{ borderRadius: '4px', textTransform: 'capitalize' }} onClick={() => handleUnblockClick(article.articleId)}>
                                        Unblock Article
                                    </Button>
                                    <Button onClick={() => handleArticleClick(article.articleId)}>
                                        View Article
                                    </Button>
                                </Box>
                            </Paper>
                        ))}
                    </Grid>
                </Grid>
                {articleUnblockedSuccessfully && (
                        <Alert severity="success" sx={{ width: '100%' }}>
                            Article unblocked successfully.
                        </Alert>
                    )}
                <Dialog
                    open={confirmOpen}
                    onClose={handleCancelUnblock}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">Confirm Unblock</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure you want to unblock this article?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancelUnblock} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmUnblock} color="error" autoFocus>
                            Yes, Unblock
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}


export default BlockedArticlesPage;
