import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import axios from 'axios';
import urls from '../enums/url';
import { Avatar, Typography } from '@mui/material';

export default function UserDetailsDialog({ userId, open, onClose }) {
    const [user, setUser] = useState({});
    const [approvedCount, setApprovedCount] = useState(0);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${urls.BASE_URL_USER}${userId}`);
                setUser(response.data);
                if (response.data.type === 'Writer')
                    fetchArticles();
            } catch (error) {
                console.log(error);
            }
        };

        const fetchArticles = async () => {
            try {
                const response = await axios.get(`${urls.BASE_URL_ARTICLE}writer/${userId}`);
                const articles = response.data.articles;                
                if (articles.length > 0){
                getApprovedCount(articles);
                }else{
                    setApprovedCount(0);
                }
            } catch (error) {
                console.log(error);
            }
        };

        const getApprovedCount = async (articles) => {
            let count = 0;
            articles.forEach((article) => {
                if (article.status === 'approved'){
                    count++;                    
                }
            });
            setApprovedCount(count);
        };

        fetchUser();
    }, [userId]);

    const handleDelete = async () => {
        try {
            const result = await axios.patch(`${urls.BASE_URL_USER}deactiveUser`,{
                userId: userId
            });
            if(result.status === 200)
                alert('User Deleted Successfully');
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

    const handleRestore = async () => {
        try {
            const result = await axios.patch(`${urls.BASE_URL_USER}restoreUser`,{
                userId: userId
            });
            if(result.status === 200)
                alert('User Restored Successfully');
            onClose();
        } catch (error) {
            console.log(error);
        }
    }

return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth='xs'>
        <DialogTitle color={"primary.dark"}>User Details</DialogTitle>
        <DialogContent>
            <Avatar src={user.imgUrl} sx={{ width: 70, height: 70, marginX: 'auto' }} />
            <Typography variant='h6' marginY={1}>Name: {user.name}</Typography>
            <Typography marginY={1}>Email: <a href='mailto:'>{user.email}</a></Typography>
            <Typography marginY={1}>Joined At: {new Date(user.savedAt).toDateString()}</Typography>
            {user.type === 'Admin' && <Typography variant='h6' marginY={1}>Admin</Typography>}
            {user.type === 'Writer' ?
                (<div>
                    <Typography marginY={1}>No. of Currently <b>approved</b> articles : {approvedCount}</Typography>
                </div>)
                : null}
        </DialogContent>
        <DialogActions>
            { user.isDeactived ?<Button variant='contained' onClick={handleRestore} color="success">
                Restore
            </Button> :<Button variant='contained' onClick={handleDelete} color="error">
                Delete
            </Button>}
            <Button onClick={onClose} color="primary">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
);
}
