/*import React from 'react';


import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
*/

import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Navbar from '../../components/Navbar';

const api = axios.create({
  baseURL: `http://localhost:3001/api/topicDomains`
});

function TopicDomains() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

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

  const handleDelete = async (topicDomainId) => {
    try {
      await api.delete(`/${topicDomainId}`);
      // Filter out the deleted topic domain from the data
      setData(data.filter((item) => item.topicDomainId !== topicDomainId));
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
      <Navbar />
      <div className="App" style={{ marginTop: "60px" }}>
        <h2 style={{ textAlign: "center" }}>
          Topic Domains
        </h2>
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
                {data && data.map((row, index) => (
                  <tr key={index}>
                    <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>{row.topicDomainName}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>{row.description}</td>
                    <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>
                      <Button onClick={() => handleDelete(row.topicDomainId)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Grid>
          <Grid item xs={1}></Grid>
        </Grid>
      </div>
    </div>
  );
}

export default TopicDomains;
