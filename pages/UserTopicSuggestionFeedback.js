import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button } from '@mui/material';
import { useUserId } from './UserIdContext'; // Import useUserId hook
const UserTopicSuggestionFeedback = () => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);
  const { userId } = useUserId(); // Get userId from context

  useEffect(() => {
    // Retrieve search results from query parameters
    const { searchResults } = router.query;
    if (searchResults) {
      setSearchResults(JSON.parse(searchResults));
      
      // Remove searchResults from URL after component mounts
      router.replace(router.pathname, undefined, { shallow: true });
    }
  }, [router]);
  
  const handleRelevanceChange = (index) => {
    setSearchResults((prevResults) =>
      prevResults.map((result, i) =>
        i === index
          ? { ...result, relevant: true, irrelevant: false }
          : { ...result, relevant: false, irrelevant: false }
      )
    );
  };

  const handleIrrelevanceChange = (index) => {
    setSearchResults((prevResults) =>
      prevResults.map((result, i) =>
        i === index
          ? { ...result, relevant: false, irrelevant: true }
          : { ...result, relevant: false, irrelevant: false }
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const irrelevantTopics = searchResults.filter((result) => result.irrelevant);
      
      // Save irrelevant topics as flagged topics
      await Promise.all(
        irrelevantTopics.map(async (topic) => {
          const { topicId, topicName } = topic;
          const flaggedTopic = {
            topicId,
            topicName,
            flaggedBy: "sampleUser",  // You can specify the user who flagged the topic here
            reason: 'Irrelevant', // You can specify the reason for flagging here
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
      router.push('/AdminPages/flaggedTopics'); // Redirect after successful submission
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
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResults.map((result, index) => (
              <TableRow key={result.topicId}>
                <TableCell>{result.topicName}</TableCell>
                <TableCell>
                  <Checkbox 
                    color="success" 
                    checked={result.relevant} 
                    onChange={() => handleRelevanceChange(index)}
                    disabled={result.irrelevant}
                  />
                </TableCell>
                <TableCell>
                  <Checkbox 
                    color="error" 
                    checked={result.irrelevant} 
                    onChange={() => handleIrrelevanceChange(index)}
                    disabled={result.relevant}
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
    </div>
  );
};

export default UserTopicSuggestionFeedback;
