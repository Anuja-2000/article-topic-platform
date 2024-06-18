import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
const TopicSuggestionFeedback = () => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const [showFeedbackSuccessfulAlert, setShowFeedbackSuccessfulAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    const fetchGeneratedTopic = async () => {
    try {
      const { searchResults } = router.query;
      if (searchResults) {
        
        const parsedResults = JSON.parse(searchResults);
        const allTopics = Object.values(parsedResults).flatMap(keywordTopics =>
          keywordTopics.map(topic => ({
            topicId: topic.topicId,
            topicName: topic.topicName,
            relevant: false,
            irrelevant: false,
            reason: '', // Initialize reason property
          }))
        );
        setSearchResults(allTopics);
        
        router.replace(router.pathname, undefined, { shallow: true });
        setIsLoading(true);
      }
    } catch (error) {
      console.error('Error fetching generated topics:', error);
    }
  };
    const fetchWriter = async () => {
      try {
        const username = localStorage.getItem("username");
        const email = localStorage.getItem("email");
        if (username && email) {
          setUsername(username);
          setEmail(email);
        } else {
          setUsername("");
          setEmail("");
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    console.log("writer",username);

    fetchGeneratedTopic();
    fetchWriter();
  }, [router]);
  /*
   useEffect(() => {
     const storedResults = sessionStorage.getItem('searchResults');
     if (storedResults) {
         setSearchResults(JSON.parse(storedResults));
     } else {
         const { searchResults } = router.query;
         if (searchResults) {
             setSearchResults(JSON.parse(searchResults));
             sessionStorage.setItem('searchResults', searchResults);
             router.replace(router.pathname, undefined, { shallow: true });
         } else {
             router.push('/userTopicSuggestion');
         }
     }
 
     // Clear sessionStorage when unmounting or when new results are generated
     return () => sessionStorage.removeItem('searchResults');
 }, [router]);
 
 */
  const handleRelevanceChange = (topicId) => {
    setSearchResults((prevResults) =>
      prevResults.map((result) => {
        if (result.topicId === topicId) {
          return {
            ...result,
            relevant: !result.relevant,
            irrelevant: false,
            reason: '',
          };
        }
        return result;
      })
    );
  };

  const handleIrrelevanceChange = (topicId) => {
    setSearchResults((prevResults) =>
      prevResults.map((result) => {
        if (result.topicId === topicId) {
          return {
            ...result,
            irrelevant: !result.irrelevant,
            relevant: false,
          };
        }
        return result;
      })
    );
  };


  const handleReasonChange = (topicId, reason) => {
    setSearchResults((prevResults) =>
      prevResults.map((result) =>
        result.topicId === topicId ? { ...result, reason } : result
      )
    );
  };
  const handleSubmit = async () => {
    try {
      const irrelevantTopics = searchResults.filter((result) => result.irrelevant);
      const relevantTopics = searchResults.filter((result) => result.relevant);
      // Check if reason is provided for irrelevant topics
      const invalidTopics = irrelevantTopics.filter((topic) => topic.irrelevant && !topic.reason);
      if (invalidTopics.length > 0) {
        alert('Please provide a reason for all irrelevant topics.');
        return;
      }

      // Save irrelevant topics as flagged topics
      await Promise.all(
        irrelevantTopics.map(async (topic) => {
          const { topicId, topicName, reason } = topic;
          const flaggedTopic = {
            topicId,
            topicName,
            flaggedBy: username,  //need to change further
            reason,

          };
          console.log('Flagged Topic:', flaggedTopic);

          await fetch('http://localhost:3001/api/flaggedTopics/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(flaggedTopic),
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
            .catch(error => {
              console.error('Error:', error);
            });
        })
      );
      setShowFeedbackSuccessfulAlert(true);
      setTimeout(() => {
        setShowFeedbackSuccessfulAlert(false);
        router.push('/WriterPages/CreateArticle');
      }, 3000);
    } catch (error) {
      console.error('Error submitting flagged topics:', error);
    }
  };


  return (
    <div >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <div style={{ margin: '100px' }}>
            <Typography variant="h4" marginBottom={2} color={"primary.dark"} marginTop={2}>Feedback  for User Topic Suggestion </Typography>
            {isLoading ?
              (<div>
                <Typography variant="body1" marginBottom={2} color={"primary.dark"} marginTop={2}>  Generated Topics according to  ypur selected Topic Domain and keyword </Typography>

                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ color: "white" }}>
                        <TableCell></TableCell>
                        <TableCell>
                          <h4 style={{ color: 'white' }}>Relevant </h4>
                        </TableCell>
                        <TableCell>
                          <h4 style={{ color: 'white' }}>Irrelevant</h4>
                        </TableCell>
                        <TableCell>
                          <h4 style={{ color: 'white' }}>Reason</h4>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {searchResults.map((result) => (
                        <TableRow key={result.topicId}>
                          <TableCell>{result.topicName}</TableCell>
                          <TableCell>
                            <Checkbox
                              color="success"
                              checked={result.relevant}
                              onChange={() => handleRelevanceChange(result.topicId)}
                            />

                          </TableCell>
                          <TableCell>

                            <Checkbox
                              color="error"
                              checked={result.irrelevant}
                              onChange={() => handleIrrelevanceChange(result.topicId)}
                            />

                          </TableCell>
                          <TableCell>
                            <TextField
                              variant="outlined"
                              size="small"
                              disabled={!result.irrelevant}
                              value={result.reason || ''}
                              onChange={(e) => handleReasonChange(result.topicId, e.target.value)}
                            />

                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Button variant="contained" color="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
                  Submit
                </Button>
              </div>) :
              <Typography variant="h6" align='center' color={"error"} marginTop={2} >No generated Topics to display</Typography>}
            {showFeedbackSuccessfulAlert && (
              <div style={{ backgroundColor: '#1E1E3C', color: 'white', padding: '10px', marginTop: '10px' }}>
                Thank you for your feedback!. We will redirect You to Dashboard.
              </div>
            )}
          </div>
        </Grid>
      </Grid>

    </div>
  );
};

export default TopicSuggestionFeedback;
