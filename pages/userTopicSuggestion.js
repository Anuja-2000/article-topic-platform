import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Navbar from '../components/Navbar';
import Image from 'next/image';
import searchTopicImage from '../public/asset/searchTopicImage.jpg';

const UserTopicSuggestion = () => {
  const [topicDomains, setTopicDomains] = useState([]);
  const [selectedTopicDomain, setSelectedTopicDomain] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

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

  return (
    <Navbar>
      <div className="App" style={{ marginTop: '60px' }}>
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
                      style={{ color: 'white' }}
                    />
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
                      style={{ color: 'white' }}
                    />
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
                <Card style={{ backgroundColor: '#1E1E3C', padding: '20px', width: '100%', borderRadius: '20px' }}>
                  <CardContent>
                    <Typography variant="h4" style={{ marginBottom: '10px', textAlign: 'center', fontWeight: 'bold', fontStyle: 'italic', color: '#1e90ff' }}>Lets Start</Typography>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      <Image src={searchTopicImage} alt="Placeholder" width={500} height={300} />
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card style={{ backgroundColor: '#E3F2FD', padding: '20px', width: '100%', borderRadius: '20px' }}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom style={{ marginBottom: '10px', textAlign: 'center', fontWeight: 'bold', fontStyle: 'italic', color: '#1e90ff' }}> Search Results</Typography>
                    {searchResults.map((result) => (
                      <div key={result.topicId}>
                        <ul>
                          <li key={result.topicId}>
                            <Typography variant="h6" style={{ marginBottom: '8px' }}>{result.topicName}</Typography>
                            <Typography variant="body1">{result.description}</Typography>
                          </li>
                        </ul>
                      </div>
                    ))}

                  </CardContent>
                </Card>
              )}
            </div>
          </Grid>
        </Grid>
      </div>
    </Navbar>
  );
};

export default UserTopicSuggestion;
