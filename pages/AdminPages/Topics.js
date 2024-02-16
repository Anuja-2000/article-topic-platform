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

const api = axios.create({
  baseURL: `http://localhost:3001/api/topics`
});

function Topics() {
  const [data, setData] = useState([]);
  const [topicDomains, setTopicDomains] = useState([]);
  const [selectedTopicDomain, setSelectedTopicDomain] = useState('');
  const [keywords, setKeywords] = useState([]);
  const [selectedKeyword, setSelectedKeyword] = useState('');

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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
      setShowAddConfirmation(false); // Hide the confirmation dialog
      setShowAddForm(false); // Close the add form
      setSelectedTopicDomain(''); // Clear selectedTopicDomain state
      setSelectedKeyword('');
      setTopicName('');
      setDescription('');

      setAddSuccessfulAlertOpen(true);

      // Hide the message after 30 seconds
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
      const response = await api.get("/get");
      setData(response.data);

      // Show success message
      setEditSuccessfulAlertOpen(true);

      // Hide the message after 30 seconds
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
      // Show success message
      setDeleteSuccessfulAlertOpen(true);

      // Hide the message after 30 seconds
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
          <h2 style={{ textAlign: "center" }}>Topics</h2>

          {/* Add Form */}
          {showAddForm && (
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
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
                  {keywords.map((keyword) => (
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

          {/* Toggle Add Form Button */}
          <div style={{ textAlign: "Right", marginBottom: "30px", marginRight: "150px" }}>
            <Button variant="contained" color="primary" onClick={() => setShowAddForm(!showAddForm)} disabled={editingRowId !== null}>
              {showAddForm ? "Hide Form" : "Show Add Form"}
            </Button>
          </div>


          <Grid container spacing={1}>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Topic</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Description</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.topicId}>
                      <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                        {editingRowId === row.topicId ? (
                          <input
                            type="text"
                            value={row.topicName}
                            onChange={(e) => setData(data.map((item) => (item.topicId === row.topicId ? { ...item, topicName: e.target.value } : item)))}
                          />
                        ) : (
                          row.topicName
                        )}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                        {editingRowId === row.topicId ? (
                          <input
                            type="text"
                            value={row.description}
                            onChange={(e) => setData(data.map((item) => (item.topicId === row.topicId ? { ...item, description: e.target.value } : item)))}
                          />
                        ) : (
                          row.description
                        )}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                        {editingRowId === row.topicId ? (
                          <Button variant="contained" color="success" onClick={() => handleSaveClick(row)}>Save</Button>

                        ) : (
                          <Box sx={{ display: 'flex', gap: '8px' }}>
                            <Button variant="contained" color="primary" onClick={() => handleEditClick(row)} disabled={editingRowId !== null || showAddForm}>Edit</Button>
                            <Button variant="contained" color="error" onClick={() => handleDeleteClick(row.topicId)} disabled={editingRowId !== null || showAddForm}>Delete</Button>
                          </Box>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>


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

        </div>
      </Navbar>
    </div>
  );
}

export default Topics;