/*
import { useRouter } from 'next/router';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import NavBar from '../../components/Navbar';

const StyledButton = styled(Button)({
    textTransform: 'none', // set textTransform to none to prevent auto-uppercase
});

function Templates() {
    const router = useRouter();
    const handleCreateButtonClick = () => {
        console.log('Button 1 clicked');
        router.push('/AdminPages/createTemplates');
    };

    const handleEditButtonClick = () => {
        router.push('/AdminPages/editTemplates');
    };

    return (
        <div>
            <NavBar />
            <Box sx={{
                padding: '20px',
                marginTop: '100px',
                marginLeft: '260px',
                marginRight: '260px',
                color: 'white',
                backgroundImage: 'url("/templates.png")',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                /*when the screen width is 600px or less. We've set the height to 300px and changed the backgroundSize to contain, which will scale the image down to fit within the Box component.*/

/* height: '500px',
 '@media screen and (max-width: 600px)': {
     height: '300px',
     backgroundSize: 'contain',
     backgroundPosition: 'top',
 },
/*         }}>



 <Box
     sx={{
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         height: '500px',
         flexDirection: 'column'
     }}
 >
     <StyledButton variant="contained"  color="secondary" onClick={handleCreateButtonClick} sx={{ width: '250px',fontWeight:'600', ':hover': { color: '#030d28', backgroundColor: 'white' } }} >
         Create New Topic Templates
     </StyledButton>
     <Box sx={{ my: 2 }} />
     <StyledButton variant="contained" color="secondary" onClick={handleEditButtonClick} sx={{ width: '250px',fontWeight:'600' , ':hover': { color: '#030d28', backgroundColor: 'white'} }} >
         Edit Topic Templates
     </StyledButton>
 </Box>
</Box>
</div>
)

}

export default Templates

*/
/*
import * as React from 'react';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import TablePaginationActions from '../../components/TablePaginationActions';

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
import MenuItem from '@mui/material/MenuItem';


export const getStaticProps = async () => {
    try {
      const response = await fetch('https://vrscop1u3m.execute-api.us-east-1.amazonaws.com/templatesProject/templates');
      const data = await response.json();
      const uniqueArticleTypes = [...new Set(data.map((item) => item.articleType))];
      return {
        props: {
          templates: data,
          articleTypes: uniqueArticleTypes,
        },
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        props: {
          templates: [],
          articleTypes: [],
        },
      };
    }
  };
  
 
export default function Templates({ articleTypes }) {
  const [data, setData] = useState([
    { templateId: 1, template: 'Template 1', topic: 'Topic 1', articleType: 'Listicle', editable: true },
    { templateId: 2, template: 'Template 2', topic: 'Topic 2', articleType: 'Guide', editable: false },
    { templateId: 3, template: 'Template 3', topic: 'Topic 3', articleType: 'Article Type 3', editable: false },
    // Add more sample data as needed
  ]);
  const [dropdownData, setDropdownData] = useState(articleTypes || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (articleTypes) {
      setDropdownData(articleTypes);
      setIsLoading(false);
    }
  }, [articleTypes]);

  useEffect(() => {
    console.log('Data fetched:', !isLoading);
  }, [isLoading]);


 
      


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleEditClick = (index) => {
        setData((prevData) => {
            const updatedData = prevData.map((item, i) => {
                if (i === index) {
                    return { ...item, editable: true };
                }
                return item;
            });
            return updatedData;
        });
    };

    const handleSaveClick = (index) => {
        setData((prevData) => {
            const updatedData = prevData.map((item, i) => {
                if (i === index) {
                    return { ...item, editable: false };
                }
                return item;
            });
            return updatedData;
        });
    };



    const handleFieldChange = (index, field, value) => {
        setData((prevData) => {
            const updatedData = [...prevData];
            updatedData[index][field] = value;
            return updatedData;
        });
    };

    const handleAddClick = () => {
        const lastRow = data[data.length - 1];

        if (lastRow && (!lastRow.template || !lastRow.topic || !lastRow.articleType)) {
            // Don't add a new row if the previous row's fields are empty
            return;
        }

        setData((prevData) => {
            const newTemplateId = prevData.length + 1;
            const newRow = {
                templateId: newTemplateId,
                template: '',
                topic: '',
                articleType: '',
                editable: true,
            };
            return [...prevData, newRow];
        });
    };


    return (

        <div>
            <Navbar />

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


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="custom pagination table">
                        <TableHead >

                            <TableRow sx={{ backgroundColor: '#0e0e42', fontWeight: 700 }}>
                                <TableCell sx={{ fontSize: '1rem', color: 'white' }}>Template Id</TableCell>
                                <TableCell sx={{ fontSize: '1rem', color: 'white' }}>Template</TableCell>
                                <TableCell sx={{ fontSize: '1rem', color: 'white' }}>Topic Domain</TableCell>
                                <TableCell sx={{ fontSize: '1rem', color: 'white' }}>Article Type</TableCell>
                                <TableCell sx={{ fontSize: '1rem', color: 'white' }}>Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.templateId}</TableCell>
                                        <TableCell>
                                            {item.editable ? (
                                                <input
                                                    type="text"
                                                    value={item.template}
                                                    onChange={(e) => handleFieldChange(index, 'template', e.target.value)}
                                                />
                                            ) : (
                                                item.template
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.editable ? (
                                                <input
                                                    type="text"
                                                    value={item.topic}
                                                    onChange={(e) => handleFieldChange(index, 'topic', e.target.value)}
                                                />
                                            ) : (
                                                item.topic
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {item.editable ? (
                                                <Select
                                                    value={item.articleType}
                                                    onChange={(e) => handleFieldChange(index, 'articleType', e.target.value)}
                                                >
                                                    {dropdownData.map((option, index) => (
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
                                            {item.editable ? (
                                                <Button variant="contained" color="primary" onClick={() => handleSaveClick(index)}>Save</Button>
                                            ) : (
                                                <Button variant="contained" color="primary" onClick={() => handleEditClick(index)}>Edit</Button>
                                            )}
                                        </TableCell>
                                    </TableRow>

                                ))}
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Button variant="contained" color="secondary" onClick={handleAddClick}>Add a Template</Button>
                                </TableCell>
                            </TableRow>
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
            </Box>
        </div>
    );
}
*/
import * as React from 'react';
import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import TablePaginationActions from '../../components/TablePaginationActions';

import TextField from '@mui/material/TextField'; // Add missing import

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
import { FormControl, InputLabel, Grid} from '@mui/material';

export const getStaticProps = async () => {
  try {
    const response = await fetch('https://vrscop1u3m.execute-api.us-east-1.amazonaws.com/templatesProject/templates');
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

export default function Templates({ templates, articleTypes, topicDomains }) {
  const [data, setData] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    templateId: '',
    templateContent: '',
    topicDomain: '',
    articleType: '',
  });

  useEffect(() => {
    if (templates) {
      setData(templates);
    }
  }, [templates]);

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

  const handleAddTemplate = () => {
    // Perform validation on the newTemplate object
    if (
      newTemplate.templateId.trim() === '' ||
      newTemplate.templateContent.trim() === '' ||
      newTemplate.topicDomain.trim() === '' ||
      newTemplate.articleType.trim() === ''
    ) {
      alert('All fields are required.');
      return;
    }

    // Add the new template to the data array
    const updatedData = [...data, newTemplate];
    setData(updatedData);

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
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRow),
    };

    try {
      const response = await fetch('/api/saveTemplate', requestOptions);
      if (response.ok) {
        // Update successful
        console.log('Data updated successfully');
      } else {
        // Handle update failure
        console.log('Failed to update data');
      }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleFieldChange = (index, field, value) => {
    setData(prevData => {
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
      <Navbar />

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
                        <input
                          type="text"
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
      </Modal>


    </>
  );
}

