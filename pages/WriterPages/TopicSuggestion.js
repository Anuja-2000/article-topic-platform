import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Navbar from "../../components/createArticleNavbar";
import ContentCopy from '@mui/icons-material/ContentCopy';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Divider from "@mui/material/Divider";
import { Stepper, Step, StepLabel } from '@mui/material';
import AssistantIcon from '@mui/icons-material/Assistant';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FeedbackIcon from '@mui/icons-material/Feedback';
import { useRouter } from 'next/router';
import { Feedback } from '@mui/icons-material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
const TopicSuggestion = () => {
  const [topicDomains, setTopicDomains] = useState([]);
  const [selectedTopicDomain, setSelectedTopicDomain] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [searchResults, setSearchResults] = useState({});
  const [searchClicked, setSearchClicked] = useState(false);
  const [copiedTopicMessage, setCopiedTopicMessage] = useState('');
  const [activeStep, setActiveStep] = useState(0);
  const [showAlertMessage, setShowAlertMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [hoveredDomain, setHoveredDomain] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Track current page for topics
  const router = useRouter();
  const [copiedTopicId, setCopiedTopicId] = useState(null);
  const steps = ['Select Topic Domain', 'Select Keywords', 'View Suggested Topics'];

  useEffect(() => {
    const fetchTopicDomains = async () => {
      try {
        const response = await axios.get('https://article-writing-backend.onrender.com/api/topicDomains/get');
        setTopicDomains(response.data);
      } catch (error) {
        console.error('Error fetching topic domains:', error);
      }
    };

    fetchTopicDomains();
  }, []);

  const handleNext = () => {
    if (activeStep === 0 && !selectedTopicDomain) {
      setAlertMessage('Please select a topic domain.');
      setShowAlertMessage(true);
    } else if (activeStep === 1 && selectedKeywords.length === 0) {
      setAlertMessage('Please select at least one keyword.');
      setShowAlertMessage(true);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setShowAlertMessage(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setShowAlertMessage(false);
  };

  const handleTopicDomainChange = async (event) => {
    setSelectedKeywords([]);
    const selectedDomain = event.target.value;
    setSelectedTopicDomain(selectedDomain);
    try {
      const response = await axios.get(`https://article-writing-backend.onrender.com/api/keywords/get/${selectedDomain}`);
      setKeywords(response.data);
    } catch (error) {
      console.error('Error fetching keywords:', error);
    }
  };

  const handleKeywordChange = (event) => {
    const selectedKeyword = event.target.value;
    setSelectedKeywords((prevSelectedKeywords) => {
      if (prevSelectedKeywords.includes(selectedKeyword)) {
        return prevSelectedKeywords.filter((keyword) => keyword !== selectedKeyword);
      } else {
        return [...prevSelectedKeywords, selectedKeyword];
      }
    });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://article-writing-backend.onrender.com/api/topics/get/${selectedTopicDomain}/${selectedKeywords.join(',')}`);
      console.log("selected keys", selectedKeywords.join(','));
      console.log("Backend response", response);
      console.log("searchResults", response.data);
      setSearchResults(response.data);
      setSearchClicked(true);
      handleNext();
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleCopySelectedTopicNames = (topicId, topicName) => {
    navigator.clipboard.writeText(topicName)
      .then(() => {
        setCopiedTopicMessage(`Topic: ${topicName} copied successfully`);
        setShowAlert(true);
        setCopiedTopicId(topicId);
        setTimeout(() => {
          setShowAlert(false);
          setCopiedTopicMessage('');
          setCopiedTopicId(null);
        }, 3000);
      })
      .catch((error) => console.error('Error copying selected topic name:', error));
  };

  const handleFeedback = () => {
    router.push({
      pathname: '/WriterPages/TopicSuggestionFeedback',
      query: { searchResults: JSON.stringify(searchResults) },
    });
  };


  const renderTopics = () => {
    const topics = [];
    Object.keys(searchResults).forEach((keyword) => {
      topics.push(...searchResults[keyword]);
    });

    const topicsPerPage = 5;
    const pageCount = Math.ceil(topics.length / topicsPerPage);

    if (topics.length === 0) {
      return null;
    }

    const renderedTopics = topics.slice(currentPage * topicsPerPage, (currentPage + 1) * topicsPerPage).map((topic) => (
      <Grid item xs={12} key={topic.topicId}>
        <Card style={{ backgroundColor: 'white', padding: '10px', marginTop: '20px', borderRadius: '10px' }}>
          <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <Typography variant="h6" style={{ marginBottom: '10px', fontWeight: 'bold' }}>
                {topic.topicName}
              </Typography>
              <Typography variant="body1" style={{ color: '#333' }}>
                {topic.description}
              </Typography>
            </div>
            <IconButton onClick={() => handleCopySelectedTopicNames(topic.topicId, topic.topicName)} style={{ marginLeft: 'auto' }}>
            {copiedTopicId === topic.topicId ? <CheckOutlinedIcon /> : <ContentCopy />}
            </IconButton>
          </CardContent>
        </Card>
      </Grid>
    ));

    return (
      <>
        <Grid container spacing={2}>
          {renderedTopics}
        </Grid>
        {pageCount > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <IconButton
              onClick={() => setCurrentPage(currentPage > 0 ? currentPage - 1 : 0)}
              disabled={currentPage === 0}
              style={{ visibility: currentPage === 0 ? 'hidden' : 'visible' }}
            >
              <ArrowBackIosNewIcon sx={{ color: 'black', backgroundColor: 'white' }} />
            </IconButton>
            <Box sx={{ flex: 1 }} /> {/* This box will take up the remaining space */}
            <IconButton
              onClick={() => setCurrentPage(currentPage < pageCount - 1 ? currentPage + 1 : pageCount - 1)}
              disabled={currentPage === pageCount - 1}
              style={{ visibility: currentPage === pageCount - 1 ? 'hidden' : 'visible' }}
            >
              <ArrowForwardIosIcon sx={{ color: 'black', backgroundColor: 'white' }} />
            </IconButton>
          </Box>
        )}
      </>
    );
  };

  return (
    <div>
      <Navbar>
        <Typography variant="h4" marginBottom={2} color="primary.dark" marginTop={2}>Topics Suggestion</Typography>
        <Typography variant="body1" marginBottom={2} color="primary.dark" marginTop={2}>According to a Topic Domain and a keyword</Typography>
        <div style={{ marginTop: '20px', marginBottom: '50px' }}>
          <Divider />
        </div>

        <Stepper alternativeLabel activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {activeStep === 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card style={{ backgroundColor: '#0080FE', borderRadius: '20px', padding: '20px', marginTop: '10px', marginLeft: '50px', marginRight: '50px' }}>
                <CardContent>
                  <Typography variant="h5" style={{ margin: '10px', color: 'white' }}>Topic Domains</Typography>
                  {topicDomains.map((domain) => (
                    <div key={domain.topicDomainId} style={{ margin: '5px' }}>
                      <Card style={{ backgroundColor: 'white', borderRadius: '15px' }}>
                        <CardContent>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedTopicDomain === domain.topicDomainId}
                                onChange={handleTopicDomainChange}
                                value={domain.topicDomainId}
                                sx={{
                                  color: '#0080FE',
                                  '&.Mui-checked': {
                                    color: '#0080FE',
                                  },
                                }}
                              />
                            }
                            label={domain.topicDomainName}
                            style={{ color: 'black', fontWeight: 'bold' }}
                          />
                          <Typography variant="body2" style={{ color: 'gray' }}>
                            {domain.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeStep === 1 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card style={{ backgroundColor: '#0080FE', borderRadius: '20px', padding: '20px', marginTop: '10px', marginLeft: '50px', marginRight: '50px' }}>
                <CardContent>
                  <Typography variant="h5" style={{ margin: '10px', color: 'white' }}>Keywords</Typography>
                  {keywords.map((keyword) => (
                    <div key={keyword.keywordId} style={{ margin: '5px' }}>
                      <Card style={{ backgroundColor: 'white', borderRadius: '15px' }}>
                        <CardContent>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedKeywords.includes(keyword.keywordId)}
                                onChange={handleKeywordChange}
                                value={keyword.keywordId}
                                sx={{
                                  color: '#0080FE',
                                  '&.Mui-checked': {
                                    color: '#0080FE',
                                  },
                                }}
                              />
                            }
                            label={keyword.keywordName}
                            style={{ color: 'black', fontWeight: 'bold' }}
                          />
                          <Typography variant="body2" style={{ color: 'gray' }}>
                            {keyword.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Button
                      variant="contained"
                      color="success"
                      size="large"
                      startIcon={<AssistantIcon />}
                      onClick={handleSearch}
                      disabled={!selectedTopicDomain || selectedKeywords.length === 0}
                      sx={{ marginRight: '10px', borderRadius: '4px', textTransform: 'none' }}
                    >
                      Generate
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {activeStep === 2 && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card style={{ backgroundColor: '#0080FE', borderRadius: '20px', padding: '20px', marginTop: '10px', marginLeft: '50px', marginRight: '50px' }}>
                <CardContent>
                  <Typography variant="h5" style={{ margin: '10px', color: 'white' }}>Topic Suggestion</Typography>
                  {showAlert && (
                    <Alert severity="success" style={{ marginTop: '10px' }}>
                      <AlertTitle>Successfully Copied the Topic</AlertTitle>
                      {copiedTopicMessage}
                    </Alert>
                  )}

                  {/* Render topics */}
                  {renderTopics()}
                </CardContent>
              </Card>

            </Grid>
          </Grid>
        )}
       
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, marginRight: '50px', marginLeft: '50px' }}>

        {activeStep !== 0 && (
          <Button
            variant="contained"
            color="primary"
            size="medium"
            sx={{ borderRadius: '4px', textTransform: 'none' }}
            onClick={handleBack}
          >
            Back
          </Button>
        )}
        <Box sx={{ flex: '1 1 auto' }} />
        {activeStep !== steps.length - 1 && activeStep !== 1 && (
          <Button
            variant="contained"
            color="success"
            size="medium"
            sx={{ borderRadius: '4px', textTransform: 'none' }}
            onClick={handleNext}
          >
            Next
          </Button>
        )}

      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1, marginRight: '50px', marginLeft: '50px' }}>
        {searchClicked && (
          <Grid container spacing={2} marginTop={2}>
            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '20px', marginTop: '10px', marginLeft: '50px' }}>
                <Typography variant="h7" style={{ color: 'primary.dark', fontStyle: 'italic' }}>
                  Please take a moment to fill this feedback
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '50px' }}>
                <Button variant="contained" color="primary" onClick={handleFeedback}   startIcon={<FeedbackIcon />}>
                  Feedback
                </Button>
              </div>
            </Grid>
          </Grid>
        )}
      </Box>

      {showAlertMessage && (
        <Alert severity="error" style={{ marginTop: '10px' }}>
          <AlertTitle>Error</AlertTitle>
          {alertMessage}
        </Alert>
      )}
    </Navbar>
    </div >
  );
};

export default TopicSuggestion;
