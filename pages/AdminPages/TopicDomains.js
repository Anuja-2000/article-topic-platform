/*import React from 'react';


import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
*/

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

const api = axios.create({
  baseURL: `http://localhost:3001/api/topicDomains`
});

function TopicDomains() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [editingRowId, setEditingRowId] = useState(null);
  const [topicDomainName, setTopicDomainName] = useState('');
  const [description, setDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State to control the visibility of the delete confirmation dialog
  const [deleteTargetId, setDeleteTargetId] = useState(null); // State to store the id of the topic domain to be deleted

  const [showEditConfirmation, setShowEditConfirmation] = useState(false);
  // Define a new state variable to store the currently edited row
  const [editingRow, setEditingRow] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/get");
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);



  // Update the handleEditClick function to set the editingRow state
  const handleEditClick = (row) => {
    setEditingRow(row);
    setEditingRowId(row.topicDomainId);
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
      const updatedRow = data.find(item => item.topicDomainId === editingRowId);
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
      await api.delete(`/${deleteTargetId}`);
      setData(data.filter((item) => item.topicDomainId !== deleteTargetId));
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleAddClick = async () => {
    try {
      const response = await api.post("/add", { topicDomainName, description });
      setData([...data, response.data]);
      setTopicDomainName('');
      setDescription('');
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding data:", error);
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
          <h2 style={{ textAlign: "center" }}>Topic Domains</h2>

          {/* Add Form */}
          {showAddForm && (
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <TextField
                label="Topic Domain Name"
                variant="outlined"
                value={topicDomainName}
                onChange={(e) => setTopicDomainName(e.target.value)}
                style={{ marginRight: "10px" }}
              />
              <TextField
                label="Description"
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Topic Domain</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Description</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((row) => (
                    <tr key={row.topicDomainId}>
                      <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                        {editingRowId === row.topicDomainId ? (
                          <input
                            type="text"
                            value={row.topicDomainName}
                            onChange={(e) => setData(data.map((item) => (item.topicDomainId === row.topicDomainId ? { ...item, topicDomainName: e.target.value } : item)))}
                          />
                        ) : (
                          row.topicDomainName
                        )}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                        {editingRowId === row.topicDomainId ? (
                          <input
                            type="text"
                            value={row.description}
                            onChange={(e) => setData(data.map((item) => (item.topicDomainId === row.topicDomainId ? { ...item, description: e.target.value } : item)))}
                          />
                        ) : (
                          row.description
                        )}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                        {editingRowId === row.topicDomainId ? (
                          <Button variant="contained" color="success" onClick={() => handleSaveClick(row)}>Save</Button>

                        ) : (
                          <Box sx={{ display: 'flex', gap: '8px' }}>
                            <Button variant="contained" color="primary" onClick={() => handleEditClick(row)} disabled={editingRowId !== null}>Edit</Button>
                            <Button variant="contained" color="error" onClick={() => handleDeleteClick(row.topicDomainId)} disabled={editingRowId !== null}>Delete</Button>
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
        </div>
      </Navbar>
    </div>
  );
}

export default TopicDomains;