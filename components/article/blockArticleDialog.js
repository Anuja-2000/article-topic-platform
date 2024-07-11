import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useRouter } from 'next/router';
const BlockArticleDialog = ({ isOpen, onClose, writerId, articleId }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const [customReason, setCustomReason] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [readerId, setReaderId] = useState('');
  const [readerName, setReaderName] = useState('');
  const [alreadyBlocked, setAlreadyBlocked] = useState(false);
  const [axiosConfig, setAxiosConfig] = useState({
    headers: {
      Authorization: '',
    },
  });
  const router = useRouter();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = localStorage.getItem('token');

        if (storedToken) {
          setAxiosConfig({
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });
        }
        const userId = localStorage.getItem("userId");
        const username = localStorage.getItem("username");
        
        if (userId !== null && username !== null) {
          setReaderName(username);
          setReaderId(userId);
          console.log("readerId",readerId);
          console.log("readerName",readerName);
          console.log("articleId",articleId);
          console.log("writerId",writerId);
        } else {
            setReaderName('');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchData();
  }, []);



  const handleBlock = async () => {
    let reason = selectedReason;
    if (selectedReason === 'Other' && customReason.trim() !== '') {
      reason = customReason.trim();
    }
    if (reason) {
        const blockedData = {
            readerId,
            readerName: readerName,
            blockedReason: reason,
            articleId,
            writerId,
          };

      
      try {
        const isBlockedResponse = await axios.get(`http://localhost:3001/api/blockedArticle/isBlocked/${articleId}/${readerId}`);
        console.log("isBlockedResponse", isBlockedResponse.data);
        const isBlocked = isBlockedResponse.data;
        if(isBlocked){
          setAlreadyBlocked(true);
          return;
        }   
        const response = await axios.post(`http://localhost:3001/api/blockedArticle/save/${articleId}/${readerId}`, blockedData, axiosConfig);
        if (response.status === 201) {
          console.log('Article Blocked Successfully');
          setSuccessMessage('Article Blocked Successfully!');

          try {
            const response = await fetch(`http://localhost:3001/api/like/isLiked/${readerId}/${articleId}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (localStorage.getItem('token') || ''),
              },
            });
          
            const data = await response.json();
            console.log('article isLiked:', data.exists);
          
            const isLikedArticle = data.exists;
            if(isLikedArticle){
              unlikeArticle();
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
      
          setTimeout(() => {
            setSuccessMessage('');
            handleClose();
            router.push('/searchArticle/search');
          }, 3000);
        } else {
          console.error('Failed to block article');
        }
      } catch (error) {
        console.error('Error blocking article:', error);
      }
    }
  };

  const handleChange = (event) => {
    setSelectedReason(event.target.value);
  };

  const handleCustomReasonChange = (event) => {
    setCustomReason(event.target.value);
  };

  const handleClose = () => {
    onClose();
    setSelectedReason('');
    setCustomReason('');
    setSuccessMessage('');
  };

  const handleOpen = () => {
    setSelectedReason('');
    setCustomReason('');
    setSuccessMessage('');
  };
  const unlikeArticle = async() => {
    try {
      const response = await fetch(`http://localhost:3001/api/like/delete`, {
        method: 'DELETE',
        body: JSON.stringify(
          {
            readerId: readerId,
            articleId:articleId
          }
        ),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token') || '',
        },
      });
      console.log('article unLiking:', response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  return (
    <Dialog open={isOpen} onClose={handleClose} onEnter={handleOpen} maxWidth="sm" fullWidth>
      <DialogTitle>Block Article</DialogTitle>
      <DialogContent dividers>
        <RadioGroup value={selectedReason} onChange={handleChange}>
          <FormControlLabel value="Not Relevant to me" control={<Radio />} label="Not Relevant to me" />
          <FormControlLabel value="Don't like the post" control={<Radio />} label="Don't like the post" />
          <FormControlLabel value="Other" control={<Radio />} label="Other" />
        </RadioGroup>
        {selectedReason === 'Other' && (
          <TextField
            label="Custom Reason"
            variant="outlined"
            fullWidth
            value={customReason}
            onChange={handleCustomReasonChange}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleBlock}
          color="primary"
          disabled={!selectedReason || (selectedReason === 'Other' && customReason.trim() === '')}
        >
          Block
        </Button>
      </DialogActions>
      {successMessage && (
        <div style={{ backgroundColor: 'green', color: 'white', padding: '10px', textAlign: 'center' }}>
          {successMessage}
        </div>
      )}
     {alreadyBlocked && (
        <div style={{ backgroundColor: 'red', color: 'white', padding: '10px', textAlign: 'center' }}>
          Sorry, this article is already blocked by you.
        </div>
      )}
    </Dialog>
  );
};

export default BlockArticleDialog;
