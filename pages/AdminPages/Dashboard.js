import React from 'react';
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

function Dashboard({ templateCount, topicDomainCount, articleTypeCount }) {
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

  function getMessageCount() {
    var data = 0;
    const response = axios.get('https://2if7bk5j1b.execute-api.us-east-1.amazonaws.com/msg/messagescount').then((res) => {
      console.log(res.data.count);
      data = res.data.count;
    }).catch((error) => {
      console.log(error);
    });
    return data;
  }

  return (
    <div>
      <Navbar />
      <Box
        sx={{
          padding: '20px',
          marginTop: '2px',
          marginLeft: '300px',
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
                Template Count
              </StyledTitle>
              <StyledCount variant="h4" component="div">
                {templateCount}
              </StyledCount>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <StyledTitle variant="h6" component="div">
                Topic Domain Count
              </StyledTitle>
              <StyledCount variant="h4" component="div">
                {topicDomainCount.length}
              </StyledCount>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <StyledTitle variant="h6" component="div">
                Article Type Count
              </StyledTitle>
              <StyledCount variant="h4" component="div">
                {articleTypeCount.length}
              </StyledCount>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent>
              <StyledTitle variant="h6" component="div">
                Unread messages Count
              </StyledTitle>
              <StyledCount variant="h4" component="div">
                {getMessageCount}
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
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch('https://vrscop1u3m.execute-api.us-east-1.amazonaws.com/templatesProject/templates');
    const data = await response.json();

    const uniqueTopicDomains = new Set();
    const uniqueArticleTypes = new Set();

    // Count the unique topic domains and article types
    data.templates.forEach((item) => {
      uniqueTopicDomains.add(item.topicDomain);
      uniqueArticleTypes.add(item.articleType);
    });

    return {
      props: {
        templateCount: data.templates.length,
        topicDomainCount: Array.from(uniqueTopicDomains),
        articleTypeCount: Array.from(uniqueArticleTypes)
      },
      revalidate: 60, // Refresh every 60 seconds
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        templateCount: 0,
        topicDomainCount: [],
        articleTypeCount: []
      },
    };
  }
}

export default Dashboard;
