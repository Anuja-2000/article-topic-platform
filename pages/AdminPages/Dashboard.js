import React from 'react';
import { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  marginBottom: '20px',

}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 700,
  letterSpacing: '.1rem',
  color: theme.palette.primary.contrastText,
}));

const StyledCount = styled(Typography)(({ theme }) => ({
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 700,
  color: theme.palette.primary.contrastText,
}));

function Dashboard({ }) {
  function getCurrentDate() {
    const now = new Date();
    const dateString = now.toLocaleDateString();
    return dateString;
  }

  function getCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    return timeString;
  }

  const [msgcount, setMsgCount] = React.useState(0);
  const [topicDomainCount, setTopicDomainCount] = useState(0);
  const [keywordCount, setKeywordCount] = useState(0);
  const [topicCount, setTopicCount] = useState(0);
  const [isLoading, setLoading] = React.useState(true)
  useEffect(() => {
    if (isLoading) {
      axios.get('http://localhost:3001/api/contactMessage/get-count')
        .then((res) => {
          const data = res.data;
          setMsgCount(data);
        })
        .catch((error) => {
          console.log(error);
        });

      
      axios.get('http://localhost:3001/api/topicDomains/count')
        .then((res) => {
          const data = res.data;
          setTopicDomainCount(data);
        })
        .catch((error) => {
          console.log(error);
        });

        axios.get('http://localhost:3001/api/keywords/count')
        .then((res) => {
          const data = res.data;
          setKeywordCount(data);
        })
        .catch((error) => {
          console.log(error);
        });

        
        axios.get('http://localhost:3001/api/topics/count')
        .then((res) => {
          const data = res.data;
          setTopicCount(data);
        })
        .catch((error) => {
          console.log(error);
        });

      

      setLoading(false);
    }
  }, [isLoading]);

  return (
    <div>
      <Navbar>
      <Box
        sx={{
          padding: '20px',
          marginTop: '2px',
          marginLeft: '20px',
          marginRight: '260px',
          backgroundColor: 'white',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="h4"
          noWrap
          component="div"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'black',
            textDecoration: 'none',
            paddingLeft: '10px',
            marginTop: '20px',
            marginBottom: '30px',
          }}
        >
          Welcome to your Dashboard
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap',
            width: '100%',
          }}
        >
         

          <StyledCard>
            <CardContent>
              <StyledTitle variant="h6" component="div">
                Topic Domain Count
              </StyledTitle>
              <StyledCount variant="h4" component="div">
                {topicDomainCount.count}
              </StyledCount>
            </CardContent>
          </StyledCard>
          <StyledCard>
            <CardContent>
              <StyledTitle variant="h6" component="div">
              Keyword Count
              </StyledTitle>
              <StyledCount variant="h4" component="div">
                {keywordCount.count}
              </StyledCount>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <StyledTitle variant="h6" component="div">
                Topics Count
              </StyledTitle>
              <StyledCount variant="h4" component="div">
              {topicCount.count}
              </StyledCount>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <StyledTitle variant="h6" component="div">
                Unread messages Count
              </StyledTitle>
              <StyledCount variant="h4" component="div">
                 {msgcount}
              </StyledCount>
            </CardContent>
          </StyledCard>
        </Box>

        <Typography
          variant="h6"
          component="div"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'black',
            textDecoration: 'none',
            marginTop: '20px',
          }}
        >
          Current Date: {getCurrentDate()}
        </Typography>

        <Typography
          variant="h6"
          component="div"
          sx={{
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'black',
            textDecoration: 'none',
            marginTop: '10px',
          }}
        >
          Current Time: {getCurrentTime()}
        </Typography>
      </Box>
      </Navbar>
    </div>
  );
}
 export default Dashboard;
