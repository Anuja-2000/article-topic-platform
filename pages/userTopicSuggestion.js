import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import WriterNavbar from '../components/WriterNavbar';
import Image from 'next/image';
import searchTopicImage from '../public/asset/searchTopicImage.jpg';
import ContentCopy from '@mui/icons-material/ContentCopy';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Link from "next/link"
import { useRouter } from 'next/router';


const UserTopicSuggestion = () => {
  const [topicDomains, setTopicDomains] = useState([]);
  const [selectedTopicDomain, setSelectedTopicDomain] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);


  const [selectedSearchResult, setSelectedSearchResult] = useState(null);

  const [copiedTopic, setCopiedTopic] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const router = useRouter();


  useEffect(() => {
    const fetchTopicDomains = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/topicDomains/get');
        setTopicDomains(response.data);
      } catch (error) {
        console.error('Error fetching topic domains:', error);
      }
    };

    fetchTopicDomains();
  }, []);



  const handleTopicDomainChange = async (event) => {
    const selectedDomain = event.target.value;
    setSelectedTopicDomain(selectedDomain);
    try {
      const response = await axios.get(`http://localhost:3001/api/keywords/get/${selectedDomain}`);
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
      const response = await axios.get(`http://localhost:3001/api/topics/get/${selectedTopicDomain}/${selectedKeywords}`);
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

        // Automatically hide the alert after 3 seconds
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
      pathname: '/UserTopicSuggestionFeedback',
      query: { searchResults: JSON.stringify(searchResults) },
    });
  };

  return (

    <><div>
      <WriterNavbar />
    </div>

      <div className="App" style={{ marginTop: '120px', backgroundColor: '#669999', minHeight: '100vh', padding: '20px' }}>



        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <div style={{ marginRight: '20px' }}>
              <Card style={{ backgroundColor: '#1E1E3C', color: 'white', borderRadius: '20px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Topic Domains</Typography>
                  {topicDomains.map((domain) => (
                    <FormControlLabel
                      key={domain.topicDomainId}
                      control={<Checkbox checked={selectedTopicDomain === domain.topicDomainId} onChange={handleTopicDomainChange} value={domain.topicDomainId} />}
                      label={domain.topicDomainName}
                      style={{ color: 'white' }} />
                  ))}
                </CardContent>
              </Card>
              <Card style={{ backgroundColor: '#1E1E3C', color: 'white', marginTop: '20px', borderRadius: '20px' }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Keywords</Typography>
                  {keywords.map((keyword) => (
                    <FormControlLabel
                      key={keyword.keywordId}
                      control={<Checkbox checked={selectedKeywords.includes(keyword.keywordId)} onChange={handleKeywordChange} value={keyword.keywordId} />}
                      label={keyword.keywordName}
                      style={{ color: 'white' }} />
                  ))}
                </CardContent>
              </Card>
              <Card style={{ backgroundColor: '#1E1E3C', color: 'white', marginTop: '20px', borderRadius: '20px' }}>
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
                  {/* Alert for selecting topic domain and keyword */}
                  <Alert severity="warning" style={{ marginBottom: '20px' }}>
                    <AlertTitle>Please select a topic domain and at least one keyword. Then click search button</AlertTitle>
                  </Alert>
                  <Card style={{ backgroundColor: '#1E1E3C', padding: '20px', width: '100%', borderRadius: '20px' }}>
                    <CardContent>
                      <Typography variant="h4" style={{ marginBottom: '10px', textAlign: 'center', fontWeight: 'bold', fontStyle: 'italic', color: '#1e90ff' }}>Lets Start</Typography>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Image src={searchTopicImage} alt="Placeholder" width={500} height={300} />
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <>
                  <Card style={{ backgroundColor: '#E3F2FD', padding: '20px', width: '100%', borderRadius: '20px' }}>
                    <CardContent>
                      <Typography variant="h4" gutterBottom style={{ marginBottom: '10px', textAlign: 'center', fontWeight: 'bold', fontStyle: 'italic', color: '#1e90ff' }}> Search Results</Typography>
                      {searchResults.map((result) => (
                        <div key={result.topicId}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                              {result.topicName}
                            </Typography>

                            <IconButton onClick={() => handleCopySelectedTopicNames(result.topicName)}>
                              <ContentCopy />
                            </IconButton>
                          </div>
                          <Typography variant="body1">{result.description}</Typography>
                          {copiedTopic === result.topicName && (
                            <Alert severity="success" action={<IconButton
                              aria-label="close"
                              color="inherit"
                              size="small"
                              onClick={() => {
                                setShowAlert(false);
                                setCopiedTopic('');
                              }}
                            >
                              <CloseIcon fontSize="inherit" />
                            </IconButton>} style={{ position: 'absolute', top: '0', right: '0', zIndex: '9999' }}>
                              <AlertTitle>Successfully copied</AlertTitle>
                              {copiedTopic}
                            </Alert>
                          )}
                        </div>
                      ))}

                    </CardContent>
                  </Card>


                  {/* Feedback button */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                    <Button variant="contained" color="secondary" onClick={handleFeedback}>
                      Feedback
                    </Button>
                  </div>
                  {/* Redirect link to writer dashboard */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                    <Link href="http://localhost:3000/WriterDashboard">
                      <Typography variant="body1" style={{ color: 'blue', fontStyle: 'italic' }}>
                        Redirect to writer dashboard
                      </Typography>
                    </Link>
                  </div>

                </>
              )}

            </div>
          </Grid>
        </Grid>
      </div></>


  );
};

export default UserTopicSuggestion;
