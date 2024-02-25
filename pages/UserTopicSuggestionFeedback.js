import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, TextField } from '@mui/material';
import { useUserId } from './UserIdContext'; // Import useUserId hook

const UserTopicSuggestionFeedback = () => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  //const { userId } = useUserId(); // Get userId from context
  const [showFeedbackSuccessfulAlert, setShowFeedbackSuccessfulAlert] = useState(false);

  /*ENable this if dont use session storage
  useEffect(() => {
    const { searchResults } = router.query;
    if (searchResults) {
      setSearchResults(
        JSON.parse(searchResults).map((result) => ({
          ...result,
          relevant: false, // Initialize relevant property
          irrelevant: false, // Initialize irrelevant property
          reason: '' // Initialize reason property
         
        }))
      );
      
      router.replace(router.pathname, undefined, { shallow: true });
    }
  }, [router]);
  */
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
  }, [router]);

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

      // Check if reason is provided for irrelevant topics
      const invalidTopics = irrelevantTopics.filter((topic) => topic.irrelevant && !topic.reason);
      if (invalidTopics.length > 0) {
        // Alert the user to fill in the reason for all irrelevant topics
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
            flaggedBy: "sampleUser",  // You can specify the user who flagged the topic here
            reason, // You can specify the reason for flagging here

          };
          console.log('Flagged Topic:', flaggedTopic); // Log flagged topic before fetch

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

      // Set a timeout to hide the happy alert and redirect after 3 seconds
      setTimeout(() => {
        setShowFeedbackSuccessfulAlert(false);
        router.push('/WriterDashboard');
      }, 3000);
    } catch (error) {
      console.error('Error submitting flagged topics:', error);
      // Handle error
    }
  };


  return (
    <div>
      <h1>User Topic Suggestion Feedback</h1>
      <h2>Generated Topics</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Relevant</TableCell>
              <TableCell>Irrelevant</TableCell>
              <TableCell>Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map((result) => (
              <TableRow key={result.topicId}>
                <TableCell>{result.topicName}</TableCell>
                <TableCell>
                  <Checkbox
                    color="success"
                    checked={result.relevant || false} // Ensure consistent controlled state
                    onChange={() => handleRelevanceChange(result.topicId)}
                  />

                </TableCell>
                <TableCell>
                  
                <Checkbox
                    color="error"
                    checked={result.irrelevant || false} // Ensure consistent controlled state
                    onChange={() => handleIrrelevanceChange(result.topicId)}
                  />

                </TableCell>
                <TableCell>
                <TextField
                    variant="outlined"
                    size="small"
                    disabled={!result.irrelevant}
                    value={result.reason || ''} // Ensure consistent controlled state
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
      {showFeedbackSuccessfulAlert && (
        <div style={{ backgroundColor: '#1E1E3C', color: 'white', padding: '10px', marginTop: '10px' }}>
          Thank you for your feedback!. We will redirect You to Dashboard.
        </div>
      )}
    </div>
  );
};

export default UserTopicSuggestionFeedback;
