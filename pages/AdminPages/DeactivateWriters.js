import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import TableContainer from "@mui/material/TableContainer";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Navbar from '../../components/Navbar';
import axios from 'axios';
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from '@mui/material/DialogActions';
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from '../../components/TablePaginationActions';

const DeactivateWriters = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [uniqueReportedWriters, setUniqueReportedWriters] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deleteSuccessfulAlertOpen, setDeleteSuccessfulAlertOpen] = useState(false);
  const [showDeleteIgnoreConfirmation, setShowDeleteIgnoreConfirmation] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/reportedWriter/get');
        console.log("response.data", response.data);

        // Iterate over reported articles and fetch details
        const reportedWritersWithDetails = await Promise.all(response.data.map(async (reportedWriter) => {
          console.log("writer", reportedWriter.writerId);
          console.log(reportedWriter); // Access topicId, topicName directly from flagged topics

          // Fetch writer details by writerId
          const reportedWriterResponse = await axios.get(`http://localhost:3001/api/user/${reportedWriter.writerId}`);
          const { name, email } = reportedWriterResponse.data; // Destructure response.data
          console.log("for user test", reportedWriterResponse.data);
          console.log(name);

          // Count unique reasons
          const reasonCounts = {};
          reportedWriter.reasons.forEach(reason => {
            if (reasonCounts[reason]) {
              reasonCounts[reason]++;
            } else {
              reasonCounts[reason] = 1;
            }
          });
          const uniqueReasonsWithCounts = Object.entries(reasonCounts).map(([reason, count]) => ({ reason, count }));

          // Return writer details with additional data
          return {
            writerName: name,
            email: email,
            writerId: reportedWriter.writerId,
            reasons: uniqueReasonsWithCounts,
            count: reportedWriter.count
          };
        }));
        console.log("reportedWritersWithDetails", reportedWritersWithDetails);
        const sortedArticles = reportedWritersWithDetails.slice().sort((a, b) => {
          return a.writerName.localeCompare(b.writerName);
      });
        // Update state with reported writers including additional details
        setUniqueReportedWriters(sortedArticles);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleDeleteClick = (topicId) => {
    setDeleteTargetId(topicId);
    setShowDeleteConfirmation(true);
  };
  const handleIgnoreClick = (topicId) => {
    setDeleteTargetId(topicId);
    setShowDeleteIgnoreConfirmation(true);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    console.log('New rows per page:', newRowsPerPage);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    console.log('New page:', 0);
  };
  const handleConfirmDelete = async () => {
    try {
      // Delete the topic
      await axios.delete(`http://localhost:3001/api/topics/delete/${deleteTargetId}`);

      // Delete flagged topics related to the deleted topic
      await axios.delete(`http://localhost:3001/api/flaggedTopics/delete/${deleteTargetId}`);

      // Update the state to remove the deleted topic from the UI
      setUniqueReportedWriters(uniqueReportedWriters.filter(item => item.topicId !== deleteTargetId));
      setShowDeleteConfirmation(false);
      setDeleteSuccessfulAlertOpen(true);
      setTimeout(() => {
        setDeleteSuccessfulAlertOpen(false);
      }, 20000);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleCloseDeleteSuccessfulAlertOpen = () => {
    setDeleteSuccessfulAlertOpen(false);
  };

  const handleConfirmIgnore = async () => {
    try {
      // Delete flagged topics related to the topic ID
      await axios.delete(`http://localhost:3001/api/flaggedTopics/delete/${deleteTargetId}`);

      // Update the state to remove the ignored topic from the UI
      setUniqueReportedWriters(uniqueReportedWriters.filter(item => item.topicId !== deleteTargetId));
      setShowDeleteIgnoreConfirmation(false);
      setDeleteSuccessfulAlertOpen(true);
      setTimeout(() => {
        setDeleteSuccessfulAlertOpen(false);
      }, 20000);
    } catch (error) {
      console.error("Error ignoring flagged topic:", error);
    }
  };



  const handleCloseIgnoreConfirmation = () => {
    setShowDeleteIgnoreConfirmation(false);
  };

  return (
    <>
      <div>
        <Navbar>
          <div className="App" style={{ marginTop: "60px" }}>
            <h2 style={{ textAlign: "center" }}>Reported Writers</h2>

            <Grid container spacing={1}>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <h4 style={{ color: 'white' }}>Writer Name</h4>
                        </TableCell>
                        <TableCell>
                          <h4 style={{ color: 'white' }}>Writer Email</h4>
                        </TableCell>
                        <TableCell>
                          <h4 style={{ color: 'white' }}>Reasons</h4>
                        </TableCell>
                        <TableCell>
                          <h4 style={{ color: 'white' }}>Count</h4>
                        </TableCell>
                        <TableCell>
                          <h4 style={{ color: 'white' }}>Actions</h4>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                    {uniqueReportedWriters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((writer) =>(
                      
                        <TableRow key={writer.writerId}>
                          <TableCell>{writer.writerName}</TableCell>
                          <TableCell>{writer.email}</TableCell>
                          <TableCell>
                            {writer.reasons.map((reasonObj, index) => (
                              <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ textAlign: 'left' }}>{reasonObj.reason}</span>
                                <span style={{ textAlign: 'right' }}>{reasonObj.count}</span>
                              </div>
                            ))}
                          </TableCell>
                          <TableCell>{writer.count}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: '8px' }}>
                              <Button variant="contained" color="error" onClick={() => handleDeleteClick(topic.topicId)}>Deactivate</Button>
                              <Button variant="contained" color="success" onClick={() => handleIgnoreClick(topic.topicId)}>Reject</Button>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          style={{ marginLeft: "auto" }} // Aligns pagination to the right
                          rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                          colSpan={3}
                          count={uniqueReportedWriters.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: {
                              "aria-label": "rows per page",
                            },
                            native: true,
                          }}
                          onPageChange={handleChangePage}
                          onRowsPerPageChange={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            {deleteSuccessfulAlertOpen && (
              <div style={{ backgroundColor: '#1E1E3C', color: 'white', padding: '10px', marginTop: '10px' }}>
                Topic deleted successfully.
              </div>
            )}
          </div>
        </Navbar>
      </div>
      <Dialog open={showDeleteConfirmation} onClose={() => setShowDeleteConfirmation(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this topic?</DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteConfirmation(false)} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showDeleteIgnoreConfirmation} onClose={handleCloseIgnoreConfirmation}>
        <DialogTitle>Confirm Ignore</DialogTitle>
        <DialogContent>Are you sure you want to ignore this flagged topic?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseIgnoreConfirmation} color="primary">Cancel</Button>
          <Button onClick={handleConfirmIgnore} color="primary">Ignore</Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default DeactivateWriters;
