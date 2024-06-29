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
import Image from 'next/image';
import searchTopicImage from '../../public/asset/searchTopicImage.jpg';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Link from "next/link"
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';

const TopicSuggestion = () => {
  const [topicDomains, setTopicDomains] = useState([]);
  //selectedTopicDomain is a ID
  const [selectedTopicDomain, setSelectedTopicDomain] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [searchResults, setSearchResults] = useState({});
  const [searchClicked, setSearchClicked] = useState(false);


  const [selectedSearchResult, setSelectedSearchResult] = useState(null);

  const [copiedTopic, setCopiedTopic] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter();


  useEffect(() => {
    const fetchTopicDomains = async () => {
      try {
        const response = await axios.get('https://article-writing-backend.onrender.com/api/topicDomains/get');
        setTopicDomains(response.data);
        console.log("TopicDomains",topicDomains)
      } catch (error) {
        console.error('Error fetching topic domains:', error);
      }
    };

    fetchTopicDomains();
  }, []);



  const handleTopicDomainChange = async (event) => {
    setSelectedKeywords('');
    const selectedDomain = event.target.value;
    console.log("selectedDomain", selectedDomain)
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
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const handleSelectSearchResult = (resultId) => {
    setSelectedSearchResult(resultId);
  };

  const handleCopySelectedTopicNames = (topicName) => {
    navigator.clipboard.writeText(topicName)
      .then(() => {
        console.log('Selected topic name copied:', topicName);
        setCopiedTopic(topicName);
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
          setCopiedTopic('');
        }, 3000);
      })
      .catch((error) => console.error('Error copying selected topic name:', error));
  };


  const handleFeedback = () => {
    // Pass searchResults to feedback page
    router.push({
      pathname: '/WriterPages/TopicSuggestionFeedback',
      query: { searchResults: JSON.stringify(searchResults) },
    });
  };

  return (

    <div>
      <Navbar >
        <Typography variant="h4" marginBottom={2} color={"primary.dark"} marginTop={2}>Topics Suggestion for Your Articles </Typography>
        <Typography variant="body1" marginBottom={2} color={"primary.dark"} marginTop={2}>  According to  a Topic Domain and  a keyword </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <div style={{ marginRight: '20px' }}>
              <Card style={{ backgroundColor: '#0080FE', color: 'white', borderRadius: '20px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Topic Domains</Typography>
                  {topicDomains.map((domain) => (
                    <FormControlLabel
                      key={domain.topicDomainId}
                      control={<Checkbox checked={selectedTopicDomain === domain.topicDomainId} onChange={handleTopicDomainChange} value={domain.topicDomainId}
                        sx={{
                          color: 'white',
                          '&.Mui-checked': {
                            color: 'black',
                          },
                        }} />}
                      label={domain.topicDomainName}
                      style={{ color: 'white' }} />
                  ))}
                </CardContent>
              </Card>
              <Card style={{ backgroundColor: '#0080FE', color: 'white', marginTop: '20px', borderRadius: '20px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Keywords</Typography>
                  {keywords.map((keyword) => (
                    <FormControlLabel
                      key={keyword.keywordId}
                      control={<Checkbox checked={selectedKeywords.includes(keyword.keywordId)} onChange={handleKeywordChange} value={keyword.keywordId} sx={{
                        color: 'white',
                        '&.Mui-checked': {
                          color: 'black',
                        },
                      }} />}
                      label={keyword.keywordName}
                      style={{ color: 'white' }} />
                  ))}
                </CardContent>
              </Card>
              <Card style={{ backgroundColor: '#0080FE', color: 'white', marginTop: '20px',  width: '100%', borderRadius: '20px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Trending Keywords</Typography>
                  {/* Add trending keywords here */}
                </CardContent>
              </Card>
              <Button variant="contained" color="primary" onClick={handleSearch} disabled={!selectedTopicDomain || selectedKeywords.length === 0} style={{ marginTop: '20px' }}>Search</Button>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>


              {!searchClicked ? (

                <>
                  <Card style={{ backgroundColor: '#0080FE', padding: '20px', width: '100%', borderRadius: '20px' }}>
                    <CardContent>
                      <Typography variant="h6" style={{ marginBottom: '10px', textAlign: 'center', fontWeight: 'bold', fontStyle: 'italic', color: 'white' }}>We will provide topics according to your topic domain & keyword</Typography>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Image src={searchTopicImage} alt="Placeholder" width={500} height={300} />
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  {Object.keys(searchResults).map((keywordId) => (
                    <Card key={keywordId} style={{ backgroundColor: '#0080FE', padding: '20px', marginTop: '20px', width: '100%', borderRadius: '20px' }}>
                      <CardContent>
                        <Typography variant="h6" style={{ marginBottom: '10px', color: 'white', fontWeight: 'bold' }}>
                          {`${keywordId}:`}
                        </Typography>
                        {searchResults[keywordId].map((topic) => (
                          <div key={topic.topicId}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Typography variant="h6" style={{ color: 'white', fontWeight: 'bold' }}>
                                {topic.topicName}
                              </Typography>
                              <IconButton onClick={() => handleCopySelectedTopicNames(topic.topicName)}>
                                <ContentCopy />
                              </IconButton>
                            </div>
                            <Typography variant="body1" style={{ color: 'primary.dark' }}>
                              {topic.description}
                            </Typography>
                            {copiedTopic === topic.topicName && (
                              <Alert severity="success" action={
                                <IconButton
                                  aria-label="close"
                                  color="inherit"
                                  size="small"
                                  onClick={() => {
                                    setShowAlert(false);
                                    setCopiedTopic('');
                                  }}
                                >
                                  <CloseIcon fontSize="inherit" />
                                </IconButton>
                              }
                                style={{ position: 'absolute', top: '0', right: '0', zIndex: '9999' }}
                              >
                                <AlertTitle>Successfully copied</AlertTitle>
                                {copiedTopic}
                              </Alert>
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}


                  {/* Feedback button and text */}
                  <Grid container spacing={2} marginTop={2}>
                    <Grid item xs={12} sm={6}>
                      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                        <Typography variant="h7" style={{ color: 'primary.dark', fontStyle: 'italic' }}>
                          Please take a moment to fill this feedback
                        </Typography>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end'}}>
                        <Button variant="contained" color="primary" onClick={handleFeedback}>
                          Feedback
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                  {/* Redirect link to writer dashboard */}
                  {/*<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Link href="http://localhost:3000/WriterPages/CreateArticle">
                      <Typography variant="body1" style={{ color: 'blue', fontStyle: 'italic' }}>
                        Redirect to writer dashboard
                      </Typography>
                    </Link>
                  </div>*/}

                </>
              )}

            </div>
          </Grid>
        </Grid>


      </Navbar>
    </div >

  );
};

export default TopicSuggestion;
