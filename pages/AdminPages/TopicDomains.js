import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Navbar from '../../components/Navbar';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import EditConfirmationDialog from '../../components/EditConfirmationDialog';
import AddTopicDomainConfirmationDialog from '../../components/AddTopicDomainConfirmationDialog';
import AlertDialog from '../../components/AlertDialog';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePaginationActions from '../../components/TablePaginationActions';
import Paper from '@mui/material/Paper';
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const api = axios.create({
  baseURL: `http://localhost:3001/api/topicDomains`
});

function TopicDomains() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingRowId, setEditingRowId] = useState(null);
  const [topicDomainName, setTopicDomainName] = useState('');
  const [description, setDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to control the visibility of the delete confirmation dialog
  const [deleteTargetId, setDeleteTargetId] = useState(null); // State to store the id of the topic domain to be deleted
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);  // Define a new state variable to store the currently edited row
  const [editingRow, setEditingRow] = useState(null);
  const [showAddConfirmation, setShowAddConfirmation] = useState(false);
  const [newItem, setNewItem] = useState({ topicDomainName: '', description: '' });
  const [topicDomainNameError, setTopicDomainNameError] = useState(false);// State variables to track whether the fields are empty
  const [descriptionError, setDescriptionError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteSuccessfulAlertOpen, setDeleteSuccessfulAlertOpen] = useState(false);
  const [addSuccessfulAlertOpen, setAddSuccessfulAlertOpen] = useState(false);
  const [editSuccessfulAlertOpen, setEditSuccessfulAlertOpen] = useState(false);
  const [axiosConfig, setAxiosConfig] = useState({
    headers: {
      Authorization: "",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    if (token) {
      setAxiosConfig({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

  }, []);

  useEffect(() => {
    if (axiosConfig.headers.Authorization !== "") {
      fetchData();
    }
  }, [axiosConfig]);

  const fetchData = async () => {
    try {
      const response = await api.get("/get", axiosConfig);
      const sortedData = response.data.sort((a, b) => a.topicDomainName.localeCompare(b.topicDomainName));
      setData(sortedData);
      setIsLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
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

  const handleAddClick = () => {
    if (topicDomainName.trim() === "") {
      setTopicDomainNameError(true);
      setShowAlert(true);
      return;
    } else {
      setTopicDomainNameError(false);
    }
    if (description.trim() === "") {
      setDescriptionError(true);
      setShowAlert(true);
      return;
    } else {
      setDescriptionError(false);
    }
    setNewItem({ topicDomainName, description });
    setShowAddConfirmation(true);
  };

  const handleConfirmAdd = async () => {
    console.log("handleConfirmAdd function called");
    console.log(newItem);
    try {
      await api.post("/add", newItem, axiosConfig);
      //get data after patch
      const response = await api.get("/get", axiosConfig);
      const sortedData = response.data.sort((a, b) => a.topicDomainName.localeCompare(b.topicDomainName));
      setData(sortedData);

      setNewItem({ topicDomainName: '', description: '' }); // Clear newItem state
      setShowAddConfirmation(false); // Hide the confirmation dialog
      setShowAddForm(false); // Close the add form
      setAddSuccessfulAlertOpen(true);

      setTimeout(() => {
        setAddSuccessfulAlertOpen(false);
      }, 20000);

      setTopicDomainName('');
      setDescription('');
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleCancelAdd = () => {
    setShowAddConfirmation(false);
    setNewItem({ topicDomainName: '', description: '' });
    setShowAddForm(false);
    setTopicDomainName('');
    setDescription('');
  };

  // To set the editingRow state
  const handleEditClick = (row) => {
    setEditingRow(row);
    setEditingRowId(row.topicDomainId);
  };

  const handleSaveClick = async (row) => {
    try {
      setShowEditConfirmation(true);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // To handle confirming the save operation after editing a row
  const handleConfirmSave = async () => {
    try {
      const updatedRow = data.find(item => item.topicDomainId === editingRowId);
      await api.patch(`/edit/${editingRowId}`, updatedRow, axiosConfig);
      setEditingRowId(null); // Reset editing row ID
      setShowEditConfirmation(false);
      //get data after patch
      const response = await api.get("/get", axiosConfig);
      const sortedData = response.data.sort((a, b) => a.topicDomainName.localeCompare(b.topicDomainName));
      setData(sortedData);
      setEditSuccessfulAlertOpen(true);
      setTimeout(() => {
        setEditSuccessfulAlertOpen(false);
      }, 20000);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const handleCancelSave = () => {
    setShowEditConfirmation(false);
    setEditingRowId(null);
    // Revert the changes made to the edited row using the editingRow state
    const updatedData = data.map(item => {
      if (item.topicDomainId === editingRow.topicDomainId) {
        return editingRow;
      }
      return item;
    });
    setData(updatedData);
  }

  const handleDeleteClick = (topicDomainId) => {
    setDeleteTargetId(topicDomainId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Fetch keywords associated with the topic domain
      const keywordsResponse = await axios.get(`http://localhost:3001/api/keywords/get/${deleteTargetId}`);
      const keywordsToDelete = keywordsResponse.data;
      console.log("Keywords to delete:", keywordsToDelete);

      // Delete each keyword sequentially
      await Promise.all(keywordsToDelete.map(async keyword => {
        console.log("Deleting keyword:", keyword); // Log the keyword being deleted
        console.log(`Deleting keyword with ID: ${keyword.keywordId}`);
        await axios.delete(`http://localhost:3001/api/keywords/delete/${keyword.keywordId}`, axiosConfig);
      }));


      // Fetch topics associated with the topic domain
      const topicsResponse = await axios.get(`http://localhost:3001/api/topics/${deleteTargetId}`);
      const topicsToDelete = topicsResponse.data;
      console.log("Topics to delete:", topicsToDelete);

      // Delete each topic sequentially
      for (const topic of topicsToDelete) {
        console.log("Deleting topic:", topic);
        console.log(`Deleting topic with ID: ${topic.topicId}`);
        await axios.delete(`http://localhost:3001/api/topics/delete/${topic.topicId}`);
      }

      // Delete the topic domain itself
      await axios.delete(`http://localhost:3001/api/topicDomains/${deleteTargetId}`, axiosConfig);

      // Update the state to remove the deleted topic domain from the UI
      setData(data.filter(item => item.topicDomainId !== deleteTargetId));
      setShowDeleteConfirmation(false);
      setDeleteSuccessfulAlertOpen(true);
      setTimeout(() => {
        setDeleteSuccessfulAlertOpen(false);
      }, 2000);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleCloseDeleteSuccessfulAlertOpen = () => {
    setDeleteSuccessfulAlertOpen(false);
  };

  const handleCloseAddSuccessfulAlertOpen = () => {
    setAddSuccessfulAlertOpen(false);
  };

  const handleCloseEditSuccessfulAlertOpen = () => {
    setEditSuccessfulAlertOpen(false);
  };


/*  if (isLoading) {
    return <div>Loading...</div>;
  }*/

  return (
    <div>
      <Navbar>
        <div className="App" style={{ marginTop: "60px" }}>
          <Grid container spacing={1}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Typography variant="h4" marginBottom={2} color={"primary.dark"} marginTop={2}>Topic Domains Management </Typography>
              <Typography variant="body1" marginBottom={2} color={"primary.dark"} marginTop={2}>  Manage Topic domains  </Typography>
              <Divider />
              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                {/* Add Form */}
                {showAddForm && (
                  <div style={{ marginBottom: "20px", textAlign: "center" }}>
                    <TextField
                      label="Topic Domain Name"
                      variant="outlined"
                      value={topicDomainName}
                      onChange={(e) => setTopicDomainName(e.target.value)}
                      error={topicDomainNameError}
                      style={{ marginRight: "10px" }}
                    />
                    <TextField
                      label="Description"
                      variant="outlined"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      error={descriptionError}
                      style={{ marginRight: "10px" }}
                    />
                    <Button variant="contained" color="success" onClick={handleAddClick}>Add</Button>
                  </div>
                )}
              </div>
              {/* Toggle Add Form Button */}
              <div style={{ textAlign: "Right", marginBottom: "30px" }}>
                <Button variant="contained" color="primary" sx={{ borderRadius: '4px', textTransform: 'capitalize' }} onClick={() => setShowAddForm(!showAddForm)} disabled={editingRowId !== null}>
                  {showAddForm ? "Cancel" : "Create Topic Domain"}
                </Button>
              </div>
              <Typography variant="h5" marginBottom={2} color={"primary.dark"} marginTop={2}>Topic Domains</Typography>
              <TableContainer component={Paper} sx={{ marginBottom: 8 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ width: '30%' }}>
                        <h4 style={{ color: 'white' }}>Topic Domain</h4>
                      </TableCell>
                      <TableCell>
                        <h4 style={{ color: 'white' }}>Description</h4>
                      </TableCell>
                      <TableCell>
                        <h4 style={{ color: 'white' }}>Actions</h4>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.length == 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} align="center">

                        </TableCell>
                      </TableRow>
                    ) : (

                      data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.topicDomainId}>
                          <TableCell sx={{ fontWeight: 'bold' }}>
                            {editingRowId === row.topicDomainId ? (
                              <input
                                type="text"
                                value={row.topicDomainName}
                                onChange={(e) => setData(data.map((item) => (item.topicDomainId === row.topicDomainId ? { ...item, topicDomainName: e.target.value } : item)))}
                                style={{ width: '100%', height: '50px', padding: '6px' }}
                              />
                            ) : (
                              row.topicDomainName
                            )} </TableCell>
                          <TableCell>
                            {editingRowId === row.topicDomainId ? (
                              <input
                                type="text"
                                value={row.description}
                                onChange={(e) => setData(data.map((item) => (item.topicDomainId === row.topicDomainId ? { ...item, description: e.target.value } : item)))}
                                style={{ width: '100%', height: '50px', padding: '6px' }}
                              />

                            ) : (
                              row.description
                            )}
                          </TableCell>
                          <TableCell>
                            {editingRowId === row.topicDomainId ? (
                              <Button variant="contained" color="success" onClick={() => handleSaveClick(row)}>Save</Button>

                            ) : (
                              <Box sx={{ display: 'flex', gap: '8px' }}>
                                <Button variant="contained" color="primary" sx={{ borderRadius: '4px', textTransform: 'capitalize' }} onClick={() => handleEditClick(row)} disabled={editingRowId !== null || showAddForm}>Edit</Button>
                                <Button variant="contained" color="error" sx={{ borderRadius: '4px', textTransform: 'capitalize' }} onClick={() => handleDeleteClick(row.topicDomainId)} disabled={editingRowId !== null || showAddForm}>Delete</Button>
                              </Box>
                            )}
                          </TableCell>
                        </TableRow>
                      )))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        style={{ marginLeft: "auto" }}
                        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                        colSpan={3}
                        count={data.length}
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

              <DeleteConfirmationDialog
                open={showDeleteConfirmation}
                onClose={() => setShowDeleteConfirmation(false)}
                onConfirm={handleConfirmDelete}
              />
              <EditConfirmationDialog
                open={showEditConfirmation}
                onClose={handleCancelSave}
                onConfirm={handleConfirmSave}
              />
              <AddTopicDomainConfirmationDialog
                open={showAddConfirmation}
                onClose={handleCancelAdd}
                onConfirm={handleConfirmAdd}
                newItem={newItem}
                setNewItem={setNewItem}
              />
              <AlertDialog
                open={showAlert}
                message="Please fill in all required fields."
                onClose={() => setShowAlert(false)}
              />
              <Snackbar open={deleteSuccessfulAlertOpen} autoHideDuration={6000} onClose={handleCloseDeleteSuccessfulAlertOpen}>
                <MuiAlert onClose={handleCloseDeleteSuccessfulAlertOpen} severity="success">
                  Topic Domain and related keywords and topics deleted successfully!
                </MuiAlert>
              </Snackbar>

              <Snackbar open={addSuccessfulAlertOpen} autoHideDuration={6000} onClose={handleCloseAddSuccessfulAlertOpen}>
                <MuiAlert onClose={handleCloseAddSuccessfulAlertOpen} severity="success">
                  Topic Domain added successfully!
                </MuiAlert>
              </Snackbar>

              <Snackbar open={editSuccessfulAlertOpen} autoHideDuration={6000} onClose={handleCloseEditSuccessfulAlertOpen}>
                <MuiAlert onClose={handleCloseEditSuccessfulAlertOpen} severity="success">
                  Topic Domain edited successfully!
                </MuiAlert>
              </Snackbar>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </div>
      </Navbar>
    </div>
  );
}
export default TopicDomains;