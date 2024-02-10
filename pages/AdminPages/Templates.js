import * as React from 'react';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import axios from 'axios';


import TablePaginationActions from '../../components/TablePaginationActions';

import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';

import { FormControl, InputLabel, Grid } from '@mui/material';
import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'AKIAWXE5Y3RWOMG75RHO',
  secretAccessKey: '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'

});

export const getStaticProps = async () => {
  try {
    const response = await fetch('https://vmm8vve6hg.execute-api.us-east-1.amazonaws.com/topicTemplates/templates');
    const data = await response.json();
    console.log('Fetched data:', data);
    const templates = data.templates.map(item => ({
      templateId: item.templateId,
      templateContent: item.templateContent,
      topicDomain: item.topicDomain,
      articleType: item.articleType,
      editable: false,
    }));
    console.log('Transformed templates:', templates);
    const uniqueArticleTypes = [...new Set(templates.map(item => item.articleType))];
    const uniqueTopicDomains = [...new Set(templates.map(item => item.topicDomain))];
    console.log('Unique Topic Domains:', uniqueTopicDomains);
    return {
      props: {
        templates,
        articleTypes: uniqueArticleTypes,
        topicDomains: uniqueTopicDomains,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        templates: [],
        articleTypes: [],
        topicDomains: [],
      },
    };
  }
};


const dynamodb = new AWS.DynamoDB.DocumentClient();

export default function Templates({ templates, articleTypes, topicDomains }) {
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    templateId: '',
    templateContent: '',
    topicDomain: '',
    articleType: '',
  });

  // Sort the templates based on templateId
  useEffect(() => {
    if (templates) {
      const sortedTemplates = [...templates].sort((a, b) => a.templateId.localeCompare(b.templateId));
      setData(sortedTemplates);
    }
  }, [templates]);

  //handle Event functions
  const handleOpenAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewTemplate({
      templateId: '',
      templateContent: '',
      topicDomain: '',
      articleType: '',
    });
  };

  const handleAddTemplate = async () => {
    // Perform validation on the newTemplate object
    if (
      newTemplate.templateId === '' ||
      newTemplate.templateContent === '' ||
      newTemplate.topicDomain === '' ||
      newTemplate.articleType === ''
    ) {
      alert('All fields are required.');
      return;
    }

    // Create a new template object using newTemplate object
    const template = {
      templateId: newTemplate.templateId,
      articleType: newTemplate.articleType,
      placeholders: ['PLACEHOLDER_1', 'PLACEHOLDER_2', 'PLACEHOLDER_3'],
      topicDomain: newTemplate.topicDomain,
      templateContent: newTemplate.templateContent,
    };

    try {
      const params = {
        TableName: 'topicDom-type-template-pro',
        Item: template,
      };

      await dynamodb.put(params).promise();
      console.log('Data saved successfully:', template);
      alert('Data saved successfully');

    } catch (error) {
      console.error('Failed to save data:', error);
    }

    // Close the modal and reset the newTemplate object
    handleCloseAddModal();
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [editableRowIndex, setEditableRowIndex] = useState(null); // Track the editable row index

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (index) => {
    if (editableRowIndex === null) {
      setEditableRowIndex(index); // Set the editable row index
    }
  };

  const handleSaveClick = async (index) => {
    setEditableRowIndex(null); // Reset the editable row index

    const updatedRow = data[index];

    try {
      console.log(updatedRow);
      const response = await fetch('https://vmm8vve6hg.execute-api.us-east-1.amazonaws.com/topicTemplates/template', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRow),
      });

      const responseData = await response.json();
      if (response.ok) {
        // Update successful
        console.log('Data updated successfully:', responseData);
        alert('Data updated successfully');
      } else {
        // Handle update failure
        console.log('Failed to update data:', responseData);
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };



  const handleFieldChange = (index, field, value) => {
    setData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index] = {
        ...updatedData[index],
        [field]: value,
      };
      return updatedData;
    });
  };
  const handleAddClick = () => {
    handleOpenAddModal();
  };

  const isRowEditable = (index) => index === editableRowIndex;

  return (
    <>
      <Navbar>

        <TablePaginationActions />
        <Box
          sx={{
            padding: '20px',
            marginTop: '2px',
            marginLeft: '300px',
            marginRight: '260px',
            backgroundColor: 'white',
            color: 'white',
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            <Button variant="contained" color="secondary" onClick={handleAddClick}>
              Add a Template
            </Button>
          </div>
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="custom pagination table">
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#0e0e42', fontWeight: 700 }}>
                    <TableCell sx={{ fontSize: '1rem', color: 'white' }}>Template Id</TableCell>
                    <TableCell sx={{ fontSize: '1rem', color: 'white' }}>Template Content</TableCell>
                    <TableCell sx={{ fontSize: '1rem', color: 'white' }}>Topic Domain</TableCell>
                    <TableCell sx={{ fontSize: '1rem', color: 'white' }}>Article Type</TableCell>
                    <TableCell sx={{ fontSize: '1rem', color: 'white' }}>Edit</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.templateId}</TableCell>
                      <TableCell>
                        {isRowEditable(index) ? (
                          <TextField
                            value={item.templateContent}
                            onChange={(e) => handleFieldChange(index, 'templateContent', e.target.value)}
                          />
                        ) : (
                          item.templateContent
                        )}
                      </TableCell>


                      <TableCell>
                        {isRowEditable(index) ? (
                          <Select
                            value={item.topicDomain}
                            onChange={(e) => handleFieldChange(index, 'topicDomain', e.target.value)}
                          >
                            {topicDomains.map((option, index) => (
                              <MenuItem key={index} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          item.topicDomain
                        )}
                      </TableCell>
                      <TableCell>
                        {isRowEditable(index) ? (
                          <Select
                            value={item.articleType}
                            onChange={(e) => handleFieldChange(index, 'articleType', e.target.value)}
                          >
                            {articleTypes.map((option, index) => (
                              <MenuItem key={index} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Select>
                        ) : (
                          item.articleType
                        )}
                      </TableCell>
                      <TableCell>
                        {isRowEditable(index) ? (
                          <Button variant="contained" onClick={() => handleSaveClick(index)}>Save</Button>
                        ) : (
                          <Button variant="contained" onClick={() => handleEditClick(index)}>Edit</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}

                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      colSpan={3}
                      count={data.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        inputProps: {
                          'aria-label': 'rows per page',
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
        </Box>

        {/* Add Template Modal */}
        <Modal
          open={showAddModal}
          onClose={handleCloseAddModal}
          aria-labelledby="add-template-modal-title"
          aria-describedby="add-template-modal-description"
        >

          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <h2 id="add-template-modal-title">Add a Template</h2>
            <div id="add-template-modal-description">
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Template Id"
                    value={newTemplate.templateId}
                    onChange={(e) =>
                      setNewTemplate((prevTemplate) => ({
                        ...prevTemplate,
                        templateId: e.target.value,
                      }))
                    }

                    helperText={
                      !/^temp\d+$/.test(newTemplate.templateId) &&
                      'Template Id  contains numbers but allow strings also'
                    }

                  />
                </Grid>


                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Template Content"
                    value={newTemplate.templateContent}
                    onChange={(e) =>
                      setNewTemplate((prevTemplate) => ({
                        ...prevTemplate,
                        templateContent: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl required fullWidth>
                    <InputLabel id="topic-domain-label">Topic Domain</InputLabel>
                    <Select
                      labelId="topic-domain-label"
                      value={newTemplate.topicDomain}
                      onChange={(e) =>
                        setNewTemplate((prevTemplate) => ({
                          ...prevTemplate,
                          topicDomain: e.target.value,
                        }))
                      }
                    >
                      {topicDomains.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl required fullWidth>
                    <InputLabel id="article-type-label">Article Type</InputLabel>
                    <Select
                      labelId="article-type-label"
                      value={newTemplate.articleType}
                      onChange={(e) =>
                        setNewTemplate((prevTemplate) => ({
                          ...prevTemplate,
                          articleType: e.target.value,
                        }))
                      }
                    >
                      {articleTypes.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" fullWidth onClick={handleAddTemplate}>
                    Add
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" color="primary" fullWidth onClick={handleCloseAddModal}>
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Box>
        </Modal >
      </Navbar>

    </>
  );
}
