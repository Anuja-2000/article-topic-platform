/*import React from 'react';


import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
*/

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
import AddTopicConfirmationDialog from '../../components/AddTopicConfirmationDialog';
import AlertDialog from '../../components/AlertDialog';
import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select"
import MenuItem from '@mui/material/MenuItem';
import InputLabel from "@mui/material/InputLabel"
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
  baseURL: `http://localhost:3001/api/topics`
});

function Topics() {
  const [data, setData] = useState([]);
  const [topicDomains, setTopicDomains] = useState([]);
  const [selectedTopicDomain, setSelectedTopicDomain] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [filterSelectedTopicDomain, setFilterSelectedTopicDomain] = useState('');
  const [filterSelectedKeyword, setFilterSelectedKeyword] = useState('');
  const [filteredTopicDomainKeywords, setFilteredTopicDomainKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editingRowId, setEditingRowId] = useState(null);
  const [topicName, setTopicName] = useState('');
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
  const [topicNameError, setTopicNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [deleteSuccessfulAlertOpen, setDeleteSuccessfulAlertOpen] = React.useState(false);
  const [addSuccessfulAlertOpen, setAddSuccessfulAlertOpen] = React.useState(false);
  const [editSuccessfulAlertOpen, setEditSuccessfulAlertOpen] = React.useState(false);
  const [topicDomainKeywords, setTopicDomainKeywords] = React.useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await api.get("/get");
        setData(responseData.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    const fetchTopicDomains = async () => {
      try {
        const topicDomainsResponse = await axios.get('http://localhost:3001/api/topicDomains/get');
        setTopicDomains(topicDomainsResponse.data);
      } catch (error) {
        console.error('Error fetching topic domains:', error);
      }
    };

    const fetchKeywords = async () => {
      try {
        const keywordResponse = await axios.get('http://localhost:3001/api/keywords/get');
        setKeywords(keywordResponse.data);
      } catch (error) {
        console.error('Error fetching keywords:', error);
      }
    };

    fetchData();
    fetchTopicDomains();
    fetchKeywords();
  }, []);

  // Fetch keywords associated with the selected topic domain
  useEffect(() => {
    const fetchKeywordsByTopicDomain = async () => {
      try {
        if (selectedTopicDomain) {
          const response = await axios.get(`http://localhost:3001/api/keywords/get/${selectedTopicDomain}`);
          setTopicDomainKeywords(response.data);
          console.log(response.data);
        } else {
          // If no topic domain is selected, clear the keywords
          setTopicDomainKeywords([]);

        }
      } catch (error) {
        console.error('Error fetching keywords by topic domain:', error);
      }
    };

    fetchKeywordsByTopicDomain();

  }, [selectedTopicDomain]);


  useEffect(() => {
    const fetchFilteredTopicDomainKeywords = async () => {
      try {
        if (filterSelectedTopicDomain) {
          const response = await axios.get(`http://localhost:3001/api/keywords/get/${filterSelectedTopicDomain}`);
          setFilteredTopicDomainKeywords(response.data); // Assuming response.data.keywords contains the array of keywords
          console.log(response.data);

        } else {
          // If no keyword is selected
          const response = await axios.get(`http://localhost:3001/api/keywords/get`);
          setFilteredTopicDomainKeywords(response.data);
        }
      } catch (error) {
        console.error('Error fetching keywords by topic domain:', error);
      }
    };

    fetchFilteredTopicDomainKeywords();

  }, [filterSelectedTopicDomain]);


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

  const bothDropdownsSelected = filterSelectedTopicDomain !== '' && filterSelectedKeyword !== '';

  const handleFilterChange = async (event) => {
    const selectedValue = event.target.value;
    setFilterSelectedTopicDomain(selectedValue);
    if (selectedValue !== filterSelectedTopicDomain) {
      setFilterSelectedKeyword('allKeywords');

    }

    try {
      if (selectedValue === 'allTopicDomains') {
        const responseData = await api.get(`http://localhost:3001/api/topics/get`);
        setData(responseData.data); // Show all data

        setFilteredTopicDomainKeywords((await api.get(`http://localhost:3001/api/keywords/get`)).data);

      } else {
        const response = await api.get(`http://localhost:3001/api/topics/${filterSelectedTopicDomain}`);
        setData(response.data); // Show data filtered by the selected topic domain

      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleKeywordFilterChange = async (event) => {
    const selectedKeywordValue = event.target.value;
    setFilterSelectedKeyword(selectedKeywordValue);


  };

  const handleAddClick = () => {
    if (topicName.trim() === "") {
      setTopicNameError(true);
      setShowAlert(true);
      return;
    } else {
      setTopicNameError(false);
    }

    if (description.trim() === "") {
      setDescriptionError(true);
      setShowAlert(true);
      return;
    } else {
      setDescriptionError(false);
    }

    // Update newItem state with latest values
    setNewItem({ topicName, description });

    // Show the confirmation dialog
    setShowAddConfirmation(true);
  };


  const handleConfirmAdd = async () => {
    console.log("handleConfirmAdd function called"); // Add this line for debugging
    console.log(newItem);
    try {
      // Ensure that selectedTopicDomain and selectedKeyword are not empty
      if (!selectedTopicDomain || !selectedKeyword) {
        console.error("No topic domain or keyword selected");
        return;
      }

      const newItemWithIds = { ...newItem, topicDomainId: selectedTopicDomain, keywordId: selectedKeyword };
      console.log(newItemWithIds);
      //console.log(selectedTopicDomain);
      const response = await api.post("/addTopic", newItemWithIds);

      setData([...data, response.data]); // Update data array with the new item
      setNewItem({ keywordName: '', description: '' }); // Clear newItem state
      setShowAddConfirmation(false);
      setShowAddForm(false);
      setSelectedTopicDomain('');
      setSelectedKeyword('');
      setTopicName('');
      setDescription('');

      setAddSuccessfulAlertOpen(true);
      setTimeout(() => {
        setAddSuccessfulAlertOpen(false);
      }, 20000);
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };


  const handleCancelAdd = () => {
    setShowAddConfirmation(false);
    setNewItem({ topicName: '', description: '' });
    setShowAddForm(false); // Close the form after adding data
    //Remove if typed data shown
    setTopicName('');
    setDescription('');
    setSelectedTopicDomain('');
    setSelectedKeyword('');
  };


  // Update the handleEditClick function to set the editingRow state
  const handleEditClick = (row) => {
    setEditingRow(row);
    setEditingRowId(row.topicId);
  };

  const handleSaveClick = async (row) => {
    try {
      setShowEditConfirmation(true); // Show confirmation dialog before making the API call
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleConfirmSave = async () => {
    try {
      const updatedRow = data.find(item => item.topicId === editingRowId);
      await api.patch(`/edit/${editingRowId}`, updatedRow);
      setEditingRowId(null); // Reset editing row ID
      setShowEditConfirmation(false);
      const response = filterSelectedTopicDomain === 'all' ? await api.get("/get") : await api.get(`/get/${filterSelectedTopicDomain}`);
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
    // Revert the changes made to the edited row using the editingRow state
    const updatedData = data.map(item => {
      if (item.topicId === editingRow.topicId) {
        return editingRow;
      }
      return item;
    });

    setData(updatedData);
  }

  const handleDeleteClick = (topicId) => {
    setDeleteTargetId(topicId);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    try {
      // Delete the topic
      await axios.delete(`http://localhost:3001/api/topics/delete/${deleteTargetId}`);
      // Update the state to remove the deleted keyword from the UI
      setData(data.filter(item => item.topicId !== deleteTargetId));
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

  const handleFilterClick = async () => {
    try {
      let responseData;
      if (filterSelectedTopicDomain === 'allTopicDomains' && filterSelectedKeyword === 'allKeywords') {
        // Fetch all data when both topic domain and keyword are 'all'
        responseData = await api.get("http://localhost:3001/api/topics/get");
      } else if (filterSelectedTopicDomain === 'allTopicDomains') {
        // Fetch data filtered by keyword when only topic domain is 'all'
        responseData = await api.get(`http://localhost:3001/api/topics/getByKeyword/${filterSelectedKeyword}`);
      } else if (filterSelectedKeyword === 'allKeywords') {
        // Fetch data filtered by topic domain when only keyword is 'all'
        responseData = await api.get(`http://localhost:3001/api/topics/${filterSelectedTopicDomain}`);
      } else {
        // Fetch data filtered by both topic domain and keyword
        responseData = await api.get(`http://localhost:3001/api/topics/get/${filterSelectedTopicDomain}/${filterSelectedKeyword}`);
      }

      setData(responseData.data); // Update the data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <Alert severity="error">Error fetching data. Please try again later.</Alert>;
  }

  return (
    <div>
      <Navbar>
        <div className="App" style={{ marginTop: "60px" }}>
          <Grid container spacing={1}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Typography variant="h4" marginBottom={2} color={"primary.dark"} marginTop={2}>  Topic Management  </Typography>
              <Typography variant="body1" marginBottom={2} color={"primary.dark"} marginTop={2}>  Manage Topics  </Typography>

              <Divider />
              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                {/* Add Form */}
                {showAddForm && (
                  <div style={{ marginTop: "20px", marginBottom: "20px", textAlign: "center" }}>
                    <FormControl variant="outlined" style={{ minWidth: 200, marginRight: '10px' }}>
                      <InputLabel id="topic-domain-label">Topic Domain</InputLabel>
                      <Select
                        labelId="topic-domain-label"
                        id="topic-domain-select"
                        value={selectedTopicDomain}
                        onChange={(e) => setSelectedTopicDomain(e.target.value)}
                        label="Topic Domain"
                      >
                        {topicDomains.map((topicDomain) => (
                          <MenuItem key={topicDomain.topicDomainId} value={topicDomain.topicDomainId}>
                            {topicDomain.topicDomainName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl variant="outlined" style={{ minWidth: 200, marginRight: '10px' }}>
                      <InputLabel id="keyword-label">Keyword</InputLabel>
                      <Select
                        labelId="keyword-label"
                        id="keyword-select"
                        value={selectedKeyword}
                        onChange={(e) => setSelectedKeyword(e.target.value)}
                        label="Keyword"
                      >
                        {topicDomainKeywords.map((keyword) => (
                          <MenuItem key={keyword.keywordId} value={keyword.keywordId}>
                            {keyword.keywordName}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>

                    <TextField
                      label="Topic Name"
                      variant="outlined"
                      value={topicName}
                      onChange={(e) => setTopicName(e.target.value)}
                      error={topicNameError}
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
                <Button variant="contained" color="primary" onClick={() => setShowAddForm(!showAddForm)} disabled={editingRowId !== null}>
                  {showAddForm ? "Cancel" : "Create Topic"}
                </Button>
              </div>

              <div style={{ marginBottom: "20px" }}>


                <Box display="flex" justifyContent="space-between" marginY={2}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={4}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel id="topic-domain-label">Filter by Topic Domain</InputLabel>
                        <Select
                          labelId="topic-domain-label"
                          id="topic-domain-select"
                          value={filterSelectedTopicDomain}
                          onChange={handleFilterChange}
                          label="Filter by Topic Domain"
                        >
                          <MenuItem key="allTopicDomains" value="allTopicDomains">All</MenuItem>
                          {topicDomains.map((topicDomain) => (
                            <MenuItem key={topicDomain.topicDomainId} value={topicDomain.topicDomainId}>
                              {topicDomain.topicDomainName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel id="keyword-label">Filter by Keyword</InputLabel>
                        <Select
                          labelId="keyword-label"
                          id="keyword-select"
                          value={filterSelectedKeyword}
                          onChange={handleKeywordFilterChange}
                          label="Filter by Keyword"
                        >
                          <MenuItem key="allKeywords" value="allKeywords">All</MenuItem>
                          {filteredTopicDomainKeywords.map((keyword) => (
                            <MenuItem key={keyword.keywordId} value={keyword.keywordId}>
                              {keyword.keywordName}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Button variant="contained" color="primary" onClick={handleFilterClick} disabled={!bothDropdownsSelected}>
                        Filter
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

              </div>
              <Typography variant="h5" marginBottom={2} color={"primary.dark"} marginTop={2}>  Topics</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <h4 style={{ color: 'white' }}>Topic</h4>
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
                    {data
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <TableRow key={row.topicId}>
                          <TableCell>
                            {editingRowId === row.topicId ? (
                              <input
                                type="text"
                                value={row.topicName}
                                onChange={(e) => setData(data.map((item) => (item.topicId === row.topicId ? { ...item, topicName: e.target.value } : item)))}
                              />
                            ) : (
                              row.topicName
                            )}
                          </TableCell>
                          <TableCell>
                            {editingRowId === row.topicId ? (
                              <input
                                type="text"
                                value={row.description}
                                onChange={(e) => setData(data.map((item) => (item.topicId === row.topicId ? { ...item, description: e.target.value } : item)))}
                              />
                            ) : (
                              row.description
                            )}
                          </TableCell>
                          <TableCell>
                            {editingRowId === row.topicId ? (
                              <Button variant="contained" color="success" onClick={() => handleSaveClick(row)}>Save</Button>

                            ) : (
                              <Box sx={{ display: 'flex', gap: '8px' }}>
                                <Button variant="contained" color="primary" onClick={() => handleEditClick(row)} disabled={editingRowId !== null || showAddForm}>Edit</Button>
                                <Button variant="contained" color="error" onClick={() => handleDeleteClick(row.topicId)} disabled={editingRowId !== null || showAddForm}>Delete</Button>

                              </Box>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
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

              <AddTopicConfirmationDialog
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
                  Topic deleted successfully!
                </MuiAlert>
              </Snackbar>

              <Snackbar open={addSuccessfulAlertOpen} autoHideDuration={6000} onClose={handleCloseAddSuccessfulAlertOpen}>
                <MuiAlert onClose={handleCloseAddSuccessfulAlertOpen} severity="success">
                  Topic added successfully!
                </MuiAlert>
              </Snackbar>

              <Snackbar open={editSuccessfulAlertOpen} autoHideDuration={6000} onClose={handleCloseEditSuccessfulAlertOpen}>
                <MuiAlert onClose={handleCloseEditSuccessfulAlertOpen} severity="success">
                  Topic edited successfully!
                </MuiAlert>
              </Snackbar>
            </Grid>
          </Grid>
        </div>
      </Navbar>
    </div>

  );
}

export default Topics;