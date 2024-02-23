import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material';
import WriterNavbar from '../components/WriterNavbar';
const UserTopicSuggestionFeedback = () => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Retrieve search results from query parameters
    const { searchResults } = router.query;
    if (searchResults) {
      setSearchResults(JSON.parse(searchResults));
    }
  }, [router.query]);

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

  return (
    <><div>
    <WriterNavbar />
  </div>

    <div className="App" style={{ marginTop: '120px', backgroundColor: '#669999', minHeight: '100vh', padding: '20px' }}>
      <h1>User Topic Suggestion Feedback</h1>
      <h2>Generated Topics</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Topic</TableCell>
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
    </div>
    </>
  );
};

export default UserTopicSuggestionFeedback;
