import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
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
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";


const DeactivateWriters = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [uniqueReportedWriters, setUniqueReportedWriters] = useState([]);
  const [showDeactivateConfirmation, setShowDeactivateConfirmation] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);
  const [deactivateSuccessfulAlertOpen, setDeactivateSuccessfulAlertOpen] = useState(false);
  const [deactivateIgnoreAlertOpen, setDeactivateIgnoreAlertOpen] = useState(false);
  const [showDeactivateIgnoreConfirmation, setShowDeactivateIgnoreConfirmation] = useState(false);
  const [deactivatedWriters, setDeactivatedWriters] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [showActivateConfirmation, setShowActivateConfirmation] = useState(false);
  const [activateSuccessfulAlertOpen, setActivateSuccessfulAlertOpen] = useState(false);
  const router = useRouter();
  const [deactivationReason, setDeactivationReason] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await axios.get('http://localhost:3001/api/reportedWriter/reportedWriters/get');
        console.log("response.data", response.data);

        // Iterate over reported writers and fetch details
        const reportedWritersWithDetails = await Promise.all(response.data.map(async (reportedWriter) => {
          console.log("writer", reportedWriter.writerId);
          console.log(reportedWriter); // Access topicId, topicName directly from flagged topics

          // Fetch writer details by writerId
          const reportedWriterResponse = await axios.get(`http://localhost:3001/api/user/${reportedWriter.writerId}`);
          const { name, email, savedAt } = reportedWriterResponse.data; // Destructure response.data
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
            joinedAt: new Date(savedAt).toISOString().substring(0, 10), // Format 
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
    const fetchDeactivatedWriters = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/deactivatedWriter/deactivatedWriters/getAll');
        console.log("Deactivated response.data", response.data);

        const deactivatedWritersWithDetails = await Promise.all(response.data.map(async (deactivatedWriter) => {
          const deactivatedWriterResponse = await axios.get(`http://localhost:3001/api/user/${deactivatedWriter.writerId}`);
          const { name, email, savedAt } = deactivatedWriterResponse.data;
          console.log("writer username", username);
          console.log('DeactivatedWriterResponse.data;', deactivatedWriterResponse.data);

          return {
            deactivatedBy: deactivatedWriter.deactivatedBy,
            writerName: name,
            email: email,
            joinedAt: new Date(savedAt).toISOString().substring(0, 10), // Format date
            writerId: deactivatedWriter.writerId,
            reasons: deactivatedWriter.deactivatedReason,
            deactivatedAt: new Date(deactivatedWriter.deactivatedAt).toISOString().substring(0, 10), // Format date
            daysSinceDeactivation: calculateDaysDifference(deactivatedWriter.deactivatedAt)
          };
        }));

        setDeactivatedWriters(deactivatedWritersWithDetails);

      } catch (error) {
        console.error('Error fetching deactivated writers:', error);
      }
    };

    const calculateDaysDifference = (deactivatedAt) => {
      const givenDate = new Date(deactivatedAt);
      const currentDate = new Date();
      const differenceInTime = currentDate - givenDate;
      const differenceInDays = Math.floor(differenceInTime / (1000 * 60 * 60 * 24));

      if (differenceInDays >= 30 || differenceInDays < 0) {
        return 0;
      } else {
        return (30 - differenceInDays);
      }
    }

    const fetchAdmin = async () => {
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
    console.log("adminName 2", username)
    fetchAdmin();
    fetchData();
    fetchDeactivatedWriters();
  }, []);



  const handleIgnoreClick = (writerId) => {
    setDeleteTargetId(writerId);
    setShowDeactivateIgnoreConfirmation(true);
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
  const handleDeleteClick = async (writerId) => {
    setDeleteTargetId(writerId);
    setShowDeactivateConfirmation(true);
  };

  const handleConfirmDeactivate = async () => {
    try {

      await axios.patch(`http://localhost:3001/api/user/deactivateUser/${deleteTargetId}`);
      await axios.delete(`http://localhost:3001/api/reportedWriter/delete/${deleteTargetId}`);
      await axios.post(`http://localhost:3001/api/deactivatedWriter/save/${deleteTargetId}/${username}`, {
        deactivatedReason: deactivationReason
      });
      setUniqueReportedWriters(uniqueReportedWriters.filter((writer) => writer.writerId !== deleteTargetId));
      setShowDeactivateConfirmation(false);
      setDeactivateSuccessfulAlertOpen(true);
      setTimeout(() => {
        setDeactivateSuccessfulAlertOpen(false);
      }, 2000);
      // Fetch updated list of deactivated writers since new writer added to deactivate
      const response = await axios.get('http://localhost:3001/api/deactivatedWriter/deactivatedWriters/getAll');
      const deactivatedWritersWithDetails = await Promise.all(response.data.map(async (deactivatedWriter) => {
        const reportedWriterResponse = await axios.get(`http://localhost:3001/api/user/${deactivatedWriter.writerId}`);
        const { name, email, savedAt } = reportedWriterResponse.data;

        console.log('deactivatedWriter.deactivatedBy', deactivatedWriter.deactivatedBy);
        return {
          deactivatedBy: deactivatedWriter.deactivatedBy,
          writerName: name,
          email: email,
          writerId: deactivatedWriter.writerId,
          reasons: deactivatedWriter.deactivatedReason,
          joinedAt: new Date(savedAt).toISOString().substring(0, 10), // Format date 
          deactivatedAt: new Date(deactivatedWriter.deactivatedAt).toISOString().substring(0, 10), // Format date
          daysSinceDeactivation: calculateDaysDifference(deactivatedWriter.deactivatedAt)
        };
      }));
      setDeactivatedWriters(deactivatedWritersWithDetails);
    } catch (error) {
      console.error("Error deactivating user:", error);
    }
  };
  const handleCloseDeleteSuccessfulAlertOpen = () => {
    setDeactivateSuccessfulAlertOpen(false);
  };

  const handleConfirmIgnore = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/reportedWriter/delete/${deleteTargetId}`);
      setUniqueReportedWriters(uniqueReportedWriters.filter((writer) => writer.writerId !== deleteTargetId));
      setShowDeactivateIgnoreConfirmation(false);
      setDeactivateIgnoreAlertOpen(true);
      setTimeout(() => {
        setDeactivateIgnoreAlertOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error ignoring writer from deactivating:", error);
    }
  };



  const handleCloseIgnoreConfirmation = () => {
    setShowDeactivateIgnoreConfirmation(false);
  };

  const handleActivateClick = (writerId) => {
    setDeleteTargetId(writerId);
    setShowActivateConfirmation(true);
  };

  const handleConfirmActivate = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/deactivatedWriter/deleteDeactivateWriter/${deleteTargetId}`);
      await axios.patch(`http://localhost:3001/api/user/activateUser/${deleteTargetId}`);
      setDeactivatedWriters(deactivatedWriters.filter((writer) => writer.writerId !== deleteTargetId));
      setShowActivateConfirmation(false);
      setActivateSuccessfulAlertOpen(true);
      setTimeout(() => {
        setActivateSuccessfulAlertOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error reactivating writer :", error);
    }
  };
  const handleCloseActivateConfirmation = () => {
    setShowActivateConfirmation(false);
  };
  const handleWriterClick = (writerId) => {
    // Use router to navigate to writer profile page
    router.push(`/writer/${writerId}`);
  };
  return (
    <>
      <div>
        <Navbar>
          <div className="App" style={{ marginTop: "60px" }}>

            <Grid container spacing={1}>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Typography variant="h4" marginBottom={2} color={"primary.dark"} marginTop={2}>User Reported Writers Management</Typography>
                <Typography variant="body1" marginBottom={2} color={"primary.dark"} marginTop={2}>  Manage Reported Writers </Typography>
                <Divider />
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Typography variant="h5" marginBottom={2} color={"primary.dark"} marginTop={2}>User Reported Writers</Typography>
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
                            <h4 style={{ color: 'white' }}>Joined At</h4>
                          </TableCell>
                          <TableCell>
                            <h4 style={{ color: 'white' }}>Reasons</h4>
                          </TableCell>
                          <TableCell>
                            <h4 style={{ color: 'white' }}>Count</h4>
                          </TableCell>
                          <TableCell>
                            <h4 style={{ color: 'white', textAlign: "center" }}>Actions</h4>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {uniqueReportedWriters.length == 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} align="center">
                              No data
                            </TableCell>
                          </TableRow>
                        ) : (
                          uniqueReportedWriters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((writer) => (

                            <TableRow key={writer.writerId}>
                              <TableCell>
                                <a
                                  style={{ textDecoration: 'none', cursor: 'pointer' }}
                                  onClick={() => handleWriterClick(writer.writerId)}
                                  onMouseOver={(e) => (e.currentTarget.style.color = 'blue')}
                                  onMouseOut={(e) => (e.currentTarget.style.color = 'inherit')}
                                >
                                  {writer.writerName}
                                </a>
                              </TableCell>
                              <TableCell>{writer.email}</TableCell>
                              <TableCell>{writer.joinedAt}</TableCell>
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
                                  <Button variant="contained" color="error" size="small" sx={{ borderRadius: '4px', textTransform: 'capitalize' }} onClick={() => handleDeleteClick(writer.writerId)}>Deactivate</Button>
                                  <Button variant="contained" color="success" size="small" sx={{ borderRadius: '4px', textTransform: 'capitalize' }} onClick={() => handleIgnoreClick(writer.writerId)}>Reject</Button>
                                </Box>
                              </TableCell>
                            </TableRow>
                          )))}
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
                </div>
              </Grid>
            </Grid>
            {deactivateSuccessfulAlertOpen && (
              <div style={{ backgroundColor: '#1E1E3C', color: 'white', padding: '10px', marginTop: '10px' }}>
                User Deactivated successfully.
              </div>
            )}
            {deactivateIgnoreAlertOpen && (
              <div style={{ backgroundColor: '#1E1E3C', color: 'white', padding: '10px', marginTop: '10px' }}>
                Ignore User Deactivating.
              </div>
            )}

            <Grid container spacing={1}>
              <Grid item xs={1}></Grid>
              <Grid item xs={10}>
                <Typography variant="h5" marginBottom={2} color={"primary.dark"} marginTop={2}> Deactivated Writers</Typography>
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
                          <h4 style={{ color: 'white' }}>Joined At</h4>
                        </TableCell>
                        <TableCell>
                          <h4 style={{ color: 'white' }}>Deactivated By</h4>
                        </TableCell>
                        <TableCell>
                          <h4 style={{ color: 'white' }}>Deactivated At</h4>
                        </TableCell>
                        <TableCell>
                          <h4 style={{ color: 'white', }}>Activate</h4>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {deactivatedWriters.length == 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} align="center">
                            No data
                          </TableCell>
                        </TableRow>
                      ) : (
                        deactivatedWriters.map((writer) => (
                          <TableRow key={writer.writerId}>
                            <TableCell>
                              <a
                                style={{ textDecoration: 'none', cursor: 'pointer' }}
                                onClick={() => handleWriterClick(writer.writerId)}
                                onMouseOver={(e) => (e.currentTarget.style.color = 'blue')}
                                onMouseOut={(e) => (e.currentTarget.style.color = 'inherit')}
                              >
                                {writer.writerName}
                              </a>
                            </TableCell>
                            <TableCell>{writer.email}</TableCell>
                            <TableCell>{writer.joinedAt}</TableCell>
                            <TableCell>{writer.deactivatedBy}</TableCell>
                            <TableCell>{new Date(writer.deactivatedAt).toISOString().substring(0, 10)}</TableCell>
                            <TableCell>
                              {(writer.daysSinceDeactivation < 1) ? "" :
                                (
                                  <>
                                    <Button variant="contained" color="success" size="medium" sx={{ borderRadius: '4px', textTransform: 'capitalize' }} onClick={() => handleActivateClick(writer.writerId)}>Activate</Button>
                                    <Typography sx={{ color: 'red', marginTop: '8px' }}>
                                      {writer.daysSinceDeactivation} days remaining
                                    </Typography>
                                  </>
                                )}
                            </TableCell>
                          </TableRow>
                        )))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
            {activateSuccessfulAlertOpen && (
              <div style={{ backgroundColor: '#1E1E3C', color: 'white', padding: '10px', marginTop: '10px' }}>
                User Activated successfully.
              </div>
            )}
          </div>
        </Navbar>
      </div>
      <Dialog open={showDeactivateConfirmation} onClose={() => setShowDeactivateConfirmation(false)}>
        <DialogTitle>Confirm Deactivate</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to deactivate this user?</Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Deactivation Reason"
            type="text"
            fullWidth
            value={deactivationReason}
            onChange={(e) => setDeactivationReason(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeactivateConfirmation(false)} color="primary">Cancel</Button>
          <Button onClick={handleConfirmDeactivate} color="error">Deactivate</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showDeactivateIgnoreConfirmation} onClose={handleCloseIgnoreConfirmation}>
        <DialogTitle>Confirm Ignore Deactivating</DialogTitle>
        <DialogContent>Are you sure you want to reject deactivating this user?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseIgnoreConfirmation} color="primary">Cancel</Button>
          <Button onClick={handleConfirmIgnore} color="primary">Ignore</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={showActivateConfirmation} >
        <DialogTitle>Confirm Activate Writer</DialogTitle>
        <DialogContent>Are you sure you want to activate this user?</DialogContent>
        <DialogActions>
          <Button onClick={handleCloseActivateConfirmation} color="primary">Cancel</Button>
          <Button onClick={handleConfirmActivate} color="success">Activate</Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default DeactivateWriters;
