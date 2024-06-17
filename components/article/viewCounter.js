import React, { useState, useEffect} from 'react';
import { IconButton, Typography, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';





const ViewCounter = ({ articleId,view, readerId}) => {
 
  const router = useRouter();
  const { article } = router.query;
  const [views, setViews] = useState(0);
  

  //const [readerId, setReaderId] = useState("");
  console.log(view);
  const viewId = "view" + uuidv4();
  
  useEffect(() => {
    setViews(view);
    console.log(views);
    const fetchData = async () => {
      if (!articleId || !readerId) return;
      console.log(":in");
      try {
        const response = await fetch(`http://localhost:3001/api/view/get`, {
         method: 'POST',
         body: JSON.stringify({
          readerId: readerId,
          articleId:articleId
         }),
         headers: {
               'Content-Type': 'application/json',
         },
     });

     if (response.status !== 200) {
        let newViews = view +1;
        console.log(newViews)
        setViews(newViews);     
        saveView();
        updateView(newViews);    
        } 
     } catch (error) {
       console.error('Error fetching data:', error);
     }
   
    }
    
    fetchData();
  }, [view]);

const updateView = async(newViews)=>{
  
  try {
    const response = await fetch(`http://localhost:3001/api/readerArticle/updateViews`, {
    method: 'PUT',
    body: JSON.stringify({
      id: articleId,
      viewCount:newViews
    }),
    headers: {
          'Content-Type': 'application/json',
    },
});
  
  const jsonData = await response.json();
  console.log(jsonData);
} catch (error) {
  console.error('Error fetching data:', error);
}
}  


const saveView = async () =>{
  try {
    const response = await fetch(`http://localhost:3001/api/view/save`, {
    method: 'POST',
    body: JSON.stringify({
      id:viewId,
      readerId: readerId,
      articleId:articleId
    }),
    headers: {
          'Content-Type': 'application/json',
    },
});
  const jsonData = await response.json();
} catch (error) {
  console.error('Error fetching data:', error);
}}


  return (
    <>
        <IconButton color="inherit" sx={{ backgroundColor: '#f5f5f5', color: 'black', marginLeft: '10px' }} >
        <Typography variant="subtitle2" color="textSecondary">
              {views} views
           </Typography>
        </IconButton>
    </>
  );
};

export default ViewCounter;
