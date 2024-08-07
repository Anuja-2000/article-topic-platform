import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Navbar from '../../components/Navbar';
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import EditConfirmationDialog from '../../components/EditConfirmationDialog';
import AddKeywordConfirmationDialog from '../../components/AddKeywordConfirmationDialog';
import AlertDialog from '../../components/AlertDialog';
import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select";
import MenuItem from '@mui/material/MenuItem';
import InputLabel from "@mui/material/InputLabel";
import Paper from '@mui/material/Paper';
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePaginationActions from '../../components/TablePaginationActions';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { Chip } from '@mui/material';
import urls from '../../enums/url';

const api = axios.create({
  baseURL: `http://localhost:3001/api/keywords`
});

function Keywords() {
  const [data, setData] = useState([]);
  const [topicDomains, setTopicDomains] = useState([]);
  const [selectedTopicDomain, setSelectedTopicDomain] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingRowId, setEditingRowId] = useState(null);
  const [keywordName, setKeywordName] = useState('');
  const [description, setDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to control the visibility of the delete confirmation dialog
  const [deleteTargetId, setDeleteTargetId] = useState(null); // State to store the id of the topic domain to be deleted
  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  // Define a new state variable to store the currently edited row
  const [editingRow, setEditingRow] = useState(null);
  const [showAddConfirmation, setShowAddConfirmation] = useState(false);
  const [newItem, setNewItem] = useState({ topicDomainName: '', description: '' });
  // State variables to track whether the fields are empty
  const [keywordNameError, setKeywordNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteSuccessfulAlertOpen, setDeleteSuccessfulAlertOpen] = React.useState(false);
  const [addSuccessfulAlertOpen, setAddSuccessfulAlertOpen] = React.useState(false);
  const [editSuccessfulAlertOpen, setEditSuccessfulAlertOpen] = React.useState(false);
  const [selectedTopicDomainAddForm, setSelectedTopicDomainAddForm] = useState('');
  const [suggestedKeywords, setSuggestedKeywords] = useState([]);
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
      fetchTopicDomains();
      setSelectedTopicDomain('all');
    }

  }, [axiosConfig]);

  const fetchData = async () => {
    try {
      const responseData = await api.get("/get", axiosConfig);
      const sortedData = responseData.data.sort((a, b) => a.keywordName.localeCompare(b.keywordName));
      setData(sortedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  const fetchTopicDomains = async () => {
    try {
      const topicDomainsResponse = await axios.get('http://localhost:3001/api/topicDomains/get', axiosConfig);
      const sortedDataTopicDomainsResponse = topicDomainsResponse.data.sort((a, b) => a.topicDomainName.localeCompare(b.topicDomainName));
      setTopicDomains(sortedDataTopicDomainsResponse);
    } catch (error) {
      console.error('Error fetching topic domains:', error);
    }
  };


  const handleFilterChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedTopicDomain(selectedValue);
    try {
      if (selectedValue === 'all') {
        const responseData = await api.get("/get", axiosConfig);
        const sortedData = responseData.data.sort((a, b) => a.keywordName.localeCompare(b.keywordName));
        setData(sortedData);
      } else {
        const response = await api.get(`/get/${selectedValue}`, axiosConfig);
        console.log(`${selectedValue}`);
       // Show data filtered by the selected topic domain
       const sortedData = response.data.sort((a, b) => a.keywordName.localeCompare(b.keywordName));
      setData(sortedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleAddClick = () => {
    if (keywordName.trim() === "") {
      setKeywordNameError(true);
      setShowAlert(true);
      return;
    } else {
      setKeywordNameError(false);
    }
    if (description.trim() === "") {
      setDescriptionError(true);
      setShowAlert(true);
      return;
    } else {
      setDescriptionError(false);
    }
    // Update newItem state with latest values
    setNewItem({ keywordName, description });
    setShowAddConfirmation(true);
  };

  const handleConfirmAdd = async () => {
    console.log("handleConfirmAdd function called");
    console.log(newItem);
    try {
      // Ensure that selectedTopicDomain is not empty
      if (!selectedTopicDomainAddForm) {
        console.error("No topic domain selected");
        return;
      }
      const newItemWithTopicDomainId = { ...newItem, topicDomainId: selectedTopicDomainAddForm };
      console.log(newItemWithTopicDomainId);
     
      const response = await api.post("/add", newItemWithTopicDomainId, axiosConfig);
      
      console.log("after save",response);
      setData([...data, response.data]); // Update data array with the new item
      setNewItem({ keywordName: '', description: '' });
      setShowAddConfirmation(false);
      setShowAddForm(false);

      setSelectedTopicDomainAddForm('');
      setKeywordName('');
      setDescription('');
      setAddSuccessfulAlertOpen(true);
      setTimeout(() => {
        setAddSuccessfulAlertOpen(false);
      }, 2000);

    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleCancelAdd = () => {
    setShowAddConfirmation(false);
    setNewItem({ keywordName: '', description: '' });
    setShowAddForm(false);
    setKeywordName('');
    setDescription('');
  };

  // Update the handleEditClick function to set the editingRow state
  const handleEditClick = (row) => {
    setEditingRow(row);
    setEditingRowId(row.keywordId);
  };
  const handleSaveClick = async (row) => {
    try {
      setShowEditConfirmation(true);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  const handleConfirmSave = async () => {
    try {
      const updatedRow = data.find(item => item.keywordId === editingRowId);
      await api.patch(`/edit/${editingRowId}`, updatedRow, axiosConfig);
      setEditingRowId(null); // Reset editing row ID
      setShowEditConfirmation(false);
      const response = selectedTopicDomain === 'all' ? await api.get("/get", axiosConfig) : await api.get(`/get/${selectedTopicDomain}`, axiosConfig);
      setData(response.data);
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
    setEditingRowId(null); // Reset editing row ID
    const updatedData = data.map(item => {
      if (item.keywordId === editingRow.keywordId) {
        return editingRow;
      }
      return item;
    });
    setData(updatedData);
  }

  const handleDeleteClick = (keywordId) => {
    setDeleteTargetId(keywordId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Fetch topics associated with the keywords
      const topicsResponse = await axios.get(`http://localhost:3001/api/topics/getByKeyword/${deleteTargetId}`);
      const topicsToDelete = topicsResponse.data;
      console.log("Topics to delete:", topicsToDelete);

      // Delete each topic sequentially
      for (const topic of topicsToDelete) {
        console.log("Deleting topic:", topic);
        console.log(`Deleting topic with ID: ${topic.topicId}`);
        await axios.delete(`http://localhost:3001/api/topics/delete/${topic.topicId}`);
      }

      // Delete the keyword itself
      await axios.delete(`http://localhost:3001/api/keywords/delete/${deleteTargetId}`, axiosConfig);
      // Update the state to remove the deleted keyword from the UI
      setData(data.filter(item => item.keywordId !== deleteTargetId));
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

  const handleCloseAddSuccessfulAlertOpen = () => {
    setAddSuccessfulAlertOpen(false);
  };

  const handleCloseEditSuccessfulAlertOpen = () => {
    setEditSuccessfulAlertOpen(false);
  };

  const handleKeywordNameChange = (e) => {
    let emptyarray = []
    if (e.target.value === '') {
      setSuggestedKeywords(emptyarray);
    }
    setKeywordName(e.target.value);
    if (e.target.value.length < 3) return;
    fetchSuggestedKeywords(e.target.value);
  };

  const fetchSuggestedKeywords = async (keywordName) => {
    try {
      const response = await axios.get(`${urls.BASE_URL_KEYWORDS}suggestions/${keywordName}`);
      console.log("sugeested",response);
      let data = response.data.titles;
      setSuggestedKeywords(data);
    } catch (error) {
      console.error("Error fetching suggested keywords:", error);
    }
  };

  /*if (isLoading) {
    return <div>Loading...</div>;
  }*/


  return (
    <div>
      <Navbar>
        <div className="App" style={{ marginTop: "60px" }}>
          <Grid container spacing={1}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Typography variant="h4" marginBottom={2} color={"primary.dark"} marginTop={2}>Keywords Management </Typography>
              <Typography variant="body1" marginBottom={2} color={"primary.dark"} marginTop={2}>  Manage Keywords  </Typography>
              <Divider />
              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                {/* Add Form */}
                {showAddForm && (
                  <div style={{ marginBottom: "20px", textAlign: "center" }}>
                    <FormControl variant="outlined" style={{ minWidth: 200, marginRight: '10px' }}>
                      <InputLabel id="topic-domain-label">Topic Domain</InputLabel>
                      <Select
                        labelId="topic-domain-label"
                        id="topic-domain-select"
                        value={selectedTopicDomainAddForm}
                        onChange={(e) => setSelectedTopicDomainAddForm(e.target.value)}
                        label="Topic Domain"
                        
                      >
                        {topicDomains.map((topicDomain) => (
                          <MenuItem key={topicDomain.topicDomainId} value={topicDomain.topicDomainId}>
                            {topicDomain.topicDomainName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <TextField
                      label="Keyword Name"
                      variant="outlined"
                      value={keywordName}
                      onChange={(e) => setKeywordName(e.target.value)}
                      /* Commented out due to When more than 5 keywords adding , there was an error from the backend and adding function not worked*/
                      //onChange={(e) => handleKeywordNameChange(e)}
                      error={keywordNameError}
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
                    <div style={{ marginTop: "20px" }}>Suggested Keywords: {
                      suggestedKeywords.length === 0 ? <Chip label="No key words right now" color='primary' /> : suggestedKeywords.map(keywordName => (<Chip key={keywordName} label={keywordName} color='primary' sx={{ margin: '5px' }} onClick={() => setKeywordName(keywordName)} />))
                    }</div>
                  </div>
                )}

                {/* Toggle Add Form Button */}
                <div style={{ textAlign: "Right", marginBottom: "30px" }}>
                  <Button variant="contained" color="primary" sx={{ borderRadius: '4px', textTransform: 'capitalize' }} onClick={() => setShowAddForm(!showAddForm)} disabled={editingRowId !== null}>
                    {showAddForm ? "Cancel" : "Create Keyword"}
                  </Button>
                </div>

                <div style={{ marginBottom: "20px", textAlign: "center" }}>
                  <Box display="flex" justifyContent="space-between" marginY={2}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} sm={4}>
                        <FormControl variant="outlined" fullWidth>
                          <InputLabel id="topic-domain-label">Filter by Topic Domain</InputLabel>
                          <Select
                            labelId="topic-domain-label"
                            id="topic-domain-select"
                            value={selectedTopicDomain}
                            onChange={handleFilterChange}
                            label="Filter by Topic Domain"
                          >
                            <MenuItem value="all">All</MenuItem>
                            {topicDomains.map((topicDomain) => (
                              <MenuItem key={topicDomain.topicDomainId} value={topicDomain.topicDomainId}>
                                {topicDomain.topicDomainName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                </div>

                {/* Table */}
                <Typography variant="h5" marginBottom={2} color={"primary.dark"} marginTop={2}>Keywords</Typography>
                <TableContainer component={Paper} sx={{ marginBottom: 8 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <h4 style={{ color: 'white' }}>Keyword</h4>
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
                        data
                          .filter(row => selectedTopicDomain === 'all' || row.topicDomainId === selectedTopicDomain)
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <TableRow key={row.keywordId}>
                              <TableCell sx={{ fontWeight: 'bold' }}>{editingRowId === row.keywordId ? (
                                <input
                                  type="text"
                                  value={row.keywordName}
                                  onChange={(e) => setData(data.map((item) => (item.keywordId === row.keywordId ? { ...item, keywordName: e.target.value } : item)))}
                                  style={{ width: '100%', height: '50px', padding: '6px' }}
                                />
                              ) : (
                                row.keywordName
                              )}</TableCell>
                              <TableCell>{editingRowId === row.keywordId ? (
                                <input
                                  type="text"
                                  value={row.description}
                                  onChange={(e) => setData(data.map((item) => (item.keywordId === row.keywordId ? { ...item, description: e.target.value } : item)))}
                                  style={{ width: '100%', height: '50px', padding: '6px' }}
                                />
                              ) : (
                                row.description
                              )}</TableCell>
                              <TableCell>{editingRowId === row.keywordId ? (
                                <Button variant="contained" color="success" onClick={() => handleSaveClick(row)}>Save</Button>
                              ) : (
                                <Box sx={{ display: 'flex', gap: '8px' }}>
                                  <Button variant="contained" color="primary" sx={{ borderRadius: '4px', textTransform: 'capitalize' }} onClick={() => handleEditClick(row)} disabled={editingRowId !== null || showAddForm}>Edit</Button>
                                  <Button variant="contained" color="error" sx={{ borderRadius: '4px', textTransform: 'capitalize' }} onClick={() => handleDeleteClick(row.keywordId)} disabled={editingRowId !== null || showAddForm}>Delete</Button>
                                </Box>
                              )}</TableCell>
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

                <AddKeywordConfirmationDialog
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
                    Keyword and related topics deleted successfully!
                  </MuiAlert>
                </Snackbar>

                <Snackbar open={addSuccessfulAlertOpen} autoHideDuration={6000} onClose={handleCloseAddSuccessfulAlertOpen}>
                  <MuiAlert onClose={handleCloseAddSuccessfulAlertOpen} severity="success">
                    Keyword added successfully!
                  </MuiAlert>
                </Snackbar>

                <Snackbar open={editSuccessfulAlertOpen} autoHideDuration={6000} onClose={handleCloseEditSuccessfulAlertOpen}>
                  <MuiAlert onClose={handleCloseEditSuccessfulAlertOpen} severity="success">
                    Keyword edited successfully!
                  </MuiAlert>
                </Snackbar>
              </div>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </div>
      </Navbar >
    </div >
  );
}

export default Keywords;