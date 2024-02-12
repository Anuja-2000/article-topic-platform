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
import AddConfirmationDialog from '../../components/AddConfirmationDialog';
import AlertDialog from '../../components/AlertDialog';
import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select"
import MenuItem from '@mui/material/MenuItem';
import InputLabel from "@mui/material/InputLabel"

const api = axios.create({
  baseURL: `http://localhost:3001/api/keywords`
});

function Keywords() {
  const [data, setData] = useState([]);
  const [topicDomains, setTopicDomains] = useState([]);
  const [selectedTopicDomain, setSelectedTopicDomain] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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

    fetchData();
    fetchTopicDomains();
  }, []);



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

    // Show the confirmation dialog
    setShowAddConfirmation(true);
  };


  const handleConfirmAdd = async () => {
    console.log("handleConfirmAdd function called"); // Add this line for debugging
    console.log(newItem);
    try {
      // Ensure that selectedTopicDomain is not empty
      if (!selectedTopicDomain) {
        console.error("No topic domain selected");
        return;
      }

      const newItemWithTopicDomainId = { ...newItem, topicDomainId: selectedTopicDomain };
      console.log(newItemWithTopicDomainId);
      //console.log(selectedTopicDomain);

      const response = await api.post("/add", newItemWithTopicDomainId);

      setData([...data, response.data]); // Update data array with the new item
      setNewItem({ keywordName: '', description: '' }); // Clear newItem state
      setShowAddConfirmation(false); // Hide the confirmation dialog
      setShowAddForm(false); // Close the add form
      setSelectedTopicDomain(''); // Clear selectedTopicDomain state
      setKeywordName('');
      setDescription('');
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };


  const handleCancelAdd = () => {
    setShowAddConfirmation(false);
    setNewItem({ keywordName: '', description: '' });
    setShowAddForm(false); // Close the form after adding data
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
      setShowEditConfirmation(true); // Show confirmation dialog before making the API call
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleConfirmSave = async () => {
    try {
      const updatedRow = data.find(item => item.keywordId === editingRowId);
      await api.patch(`/edit/${editingRowId}`, updatedRow);
      setEditingRowId(null); // Reset editing row ID
      setShowEditConfirmation(false);
      const response = await api.get("/get");
      setData(response.data);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleCancelSave = () => {
    setShowEditConfirmation(false);
    setEditingRowId(null); // Reset editing row ID
    // Revert the changes made to the edited row using the editingRow state
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
      const topicsResponse = await axios.get(`http://localhost:3001/api/topics/${deleteTargetId}`);
      const topicsToDelete = topicsResponse.data;
      console.log("Topics to delete:", topicsToDelete);

      // Delete each topic sequentially
      for (const topic of topicsToDelete) {
        console.log("Deleting topic:", topic);
        console.log(`Deleting topic with ID: ${topic.topicId}`);
        await axios.delete(`http://localhost:3001/api/topics/delete/${topic.topicId}`);
      }

      // Delete the keyword itself
      await axios.delete(`http://localhost:3001/api/keywords/delete/${deleteTargetId}`);

      // Update the state to remove the deleted keyword from the UI
      setData(data.filter(item => item.keywordId !== deleteTargetId));
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting data:", error);
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
          <h2 style={{ textAlign: "center" }}>Keywords</h2>

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

              <TextField
                label="Keyword Name"
                variant="outlined"
                value={keywordName}
                onChange={(e) => setKeywordName(e.target.value)}
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
              <Button variant="contained" color="primary" onClick={handleAddClick}>Add</Button>
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
                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Keyword</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Description</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.keywordId}>
                      <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                        {editingRowId === row.keywordId ? (
                          <input
                            type="text"
                            value={row.keywordName}
                            onChange={(e) => setData(data.map((item) => (item.keywordId === row.keywordId ? { ...item, keywordName: e.target.value } : item)))}
                          />
                        ) : (
                          row.keywordName
                        )}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                        {editingRowId === row.keywordId ? (
                          <input
                            type="text"
                            value={row.description}
                            onChange={(e) => setData(data.map((item) => (item.keywordId === row.keywordId ? { ...item, description: e.target.value } : item)))}
                          />
                        ) : (
                          row.description
                        )}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                        {editingRowId === row.keywordId ? (
                          <Button variant="contained" color="success" onClick={() => handleSaveClick(row)}>Save</Button>

                        ) : (
                          <Box sx={{ display: 'flex', gap: '8px' }}>
                            <Button variant="contained" color="primary" onClick={() => handleEditClick(row)} disabled={editingRowId !== null || showAddForm}>Edit</Button>
                            <Button variant="contained" color="error" onClick={() => handleDeleteClick(row.keywordId)} disabled={editingRowId !== null || showAddForm}>Delete</Button>
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

          <AddConfirmationDialog
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

        </div>
      </Navbar>
    </div>
  );
}

export default Keywords;