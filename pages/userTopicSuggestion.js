import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Navbar from '../components/Navbar';
import SearchIcon from '@mui/icons-material/Search';
import searchTopicImage from '../public/asset/searchTopicImage.jpg'

const UserTopicSuggestion = () => {
  const [topicDomains, setTopicDomains] = useState([]);
  const [selectedTopicDomain, setSelectedTopicDomain] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [selectedKeywords, setSelectedKeywords] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false); // State to track if search button is clicked

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
    // Implement search functionality based on selected topic domain and keywords
    try {
      // Your search implementation here
      setSearchClicked(true); // Set search button clicked to true
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <Navbar>
      <div className="App" style={{ marginTop: "60px" }}>
        {/* Upper Section */}
        <Grid container spacing={3} alignItems="center" style={{ marginBottom: '20px' }}>
          <Grid item xs={12}>
            <TextField
              label=""
              variant="outlined"
              fullWidth
              placeholder="Search"
              InputProps={{
                startAdornment: <SearchIcon />,
              }}
              // Add value and onChange handlers
            />
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" onClick={handleSearch}>Search</Button>
          </Grid>
        </Grid>
        {/* Lower Section */}
        <Grid container spacing={3}>
          {/* Filters Section */}
          <Grid item xs={12} sm={6}>
            <Card style={{ backgroundColor: '#1E1E3C', color: 'white' }}>
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
            <Card style={{ backgroundColor: '#1E1E3C', color: 'white', marginTop: '20px' }}>
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
            <Card style={{ backgroundColor: '#1E1E3C', color: 'white', marginTop: '20px' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Trending Keywords</Typography>
                {/* Add trending keywords here */}
              </CardContent>
            </Card>
          </Grid>
          {/* Search Results Section */}
          <Grid item xs={12} sm={6}>
            <Card style={{ backgroundColor: '#E3F2FD', padding: '20px' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>Search Results</Typography>
                {/* Display search results here */}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        {/* Let's Try Suggestion Section */}
        {!searchClicked && (
          <Grid container justifyContent="center" style={{ marginTop: '20px' }}>
            <Grid item>
              <Typography variant="h6" style={{ marginBottom: '10px' }}>Lets try something</Typography>
              <img src={searchTopicImage} alt="Placeholder" style={{ maxWidth: '100%' }} />
            </Grid>
          </Grid>
        )}
      </div>
    </Navbar>
  );
};

export default UserTopicSuggestion;
