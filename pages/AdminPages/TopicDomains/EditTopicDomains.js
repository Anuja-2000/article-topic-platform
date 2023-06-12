import React from 'react';
import Navbar from '../../../components/Navbar';
import TopTabDomains from '../../../components/TopTabDomains';
import Button from '@mui/material/Button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';


export const getStaticProps = async () => {
  const response = await fetch('https://vrscop1u3m.execute-api.us-east-1.amazonaws.com/templatesProject/templates');
  const data = await response.json();
  return {
    props: { templates: data.templates }
  };
};
function EditTopicDomains({ templates }) {


  const topicDomains = [...new Set(templates.map(template => template.topicDomain))];

  const getTemplateIdsByArticleType = (topicDomain) => {
    const matchingTemplates = templates.filter(template => template.topicDomain === topicDomain);
    return matchingTemplates.map(template => template.templateId);
  }

  return (
    <div>
      <Navbar />

      <TopTabDomains />
      <Box
        sx={{
          padding: '20px',
          marginTop: '2px',
          marginLeft: '300px',
          marginRight: '260px',
          backgroundColor: '#242444',
          color: 'white',
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="Topic-Domain-Table">
            <TableHead >

              <TableRow sx={{ backgroundColor: '#b3b3b3' }}>
                <TableCell sx={{ fontSize: '1.1rem', color: 'white' }}>Topic Domain</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', color: 'white' }}>Template Id s</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', color: 'white' }}>Edit</TableCell>
              </TableRow>

            </TableHead>
            <TableBody>
              {topicDomains.map(topicDomain => (
                <TableRow key={topicDomain}>
                  <TableCell style={{ width: 260 }} >
                    {topicDomain}
                  </TableCell>
                  <TableCell component="th" scope="row">{getTemplateIdsByArticleType(topicDomain).join(', ')}</TableCell>

                  <TableCell>
                    <Button variant="contained" color="primary" >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
};



export default EditTopicDomains;


















/*
import { useState, useEffect } from 'react';
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

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';





  

function EditTopicDomains() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDialog, setOpenDialog] = React.useState(false);
  
  const [TopicDomain, setTopicDomains] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/getTopics');
      const data = await response.json();
      setTopicDomains(data.topicDomains);
    }
    fetchData();
  }, []);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - topicDomains.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditButtonClick = (id) => {
    // Find the row with the given id
    const row = topicDomains.find((r) => r.id === id);

    // Set the initial value of the text field
    setTopicDomain(row.name);

    // Open the dialog
    setOpenDialog(true);
  };

  return (
    <div >

      <Navbar />

    
      <TablePaginationActions/>
      <TopTabDomains />
      <Box
        sx={{
          padding: '20px',
          marginTop: '2px',
          marginLeft: '300px',
          marginRight: '260px',
          backgroundColor: '#242444',
          color: 'white',
        }}
      >
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Edit Topic Domain</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Topic Domain"
              fullWidth
              value={TopicDomain}
              onChange={(e) => setTopicDomain(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              // Save the updated value of the article type and i have to code this further
              // and close the dialog
              setOpenDialog(false);
            }} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="custom pagination table">
            <TableHead >

              <TableRow sx={{ backgroundColor: '#b3b3b3' }}>
                <TableCell sx={{ fontSize: '1.1rem', color: 'white' }}>Topic Domain Id</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', color: 'white' }}>Topic Domain</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', color: 'white' }}>Edit</TableCell>
              </TableRow>

            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? topicdomain.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : topicdomain
                
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell style={{ width: 260 }} align="Left">
                 

                    {row.name}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEditButtonClick(row.id)}>
                      Edit
                    </Button>
                  </TableCell>

                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows.length}
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
export default EditTopicDomains;
*/

/*
import Navbar from '../../../components/Navbar';
import TopTabDomains from '../../../components/TopTabDomains';

import * as React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme }  from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";


export const getStaticProps = async () => {
  const response = await fetch('https://m6x0ff12cj.execute-api.us-east-1.amazonaws.com/topicDoms/topicdomains');
  const data = await response.json();
  console.log(data);
  return {
    props: { topicDomains: data.topicDomains }
  }
}

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>

      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};



function EditTopicDomains({ topicDomains }) {
  console.log(topicDomains);
  const sortedTopicDomains = topicDomains.sort((a, b) =>
    a.topicDomainId.localeCompare(b.topicDomainId)
  );
  console.log(sortedTopicDomains);

  const rows =sortedTopicDomains;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDialog, setOpenDialog] = React.useState(false);
  const[TopicDomainName ,setTopicDomainName]= React.useState(0);



  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditButtonClick = (id) => {
    // Find the row with the given id
    const row = topicDomains.find((r) => r.topicDomainId === id);

    //Set the initial value of the text field
    setTopicDomainName(row.topicDomainName);

    // Open the dialog
    setOpenDialog(true);
  };


  return (
    <div>
      
      <Navbar />
     
      <TopTabDomains />
      <Box
        sx={{
          padding: '20px',
          marginTop: '2px',
          marginLeft: '300px',
          marginRight: '260px',
          backgroundColor: '#242444',
          color: 'white',
        }}
      >
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Edit Topic Domain</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Topic Domain"
              fullWidth
              value={TopicDomainName}
              onChange={(e) => setTopicDomainName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              // Save the updated value of the article type and i have to code this further
              // and close the dialog
              setOpenDialog(false);
            }} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="Topic-Domain-Table">
            <TableHead >

              <TableRow sx={{ backgroundColor: '#b3b3b3' }}>
                <TableCell sx={{ fontSize: '1.1rem', color: 'white' }}>Topic Domain Id</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', color: 'white' }}>Topic Domain</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', color: 'white' }}>Edit</TableCell>
              </TableRow>

            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                :rows
              ).map(row => (
                <TableRow key={row.topicDomainId}>
                  <TableCell component="th" scope="row">
                    {row.topicDomainId}
                  </TableCell>
                  <TableCell style={{ width: 260 }} align="Left">
                    {row.topicDomainName}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleEditButtonClick(row.topicDomainId)}>
                      Edit
                    </Button>
                  </TableCell>

                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={rows.length}
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

export default EditTopicDomains;


{/* 
        <h1>Topic Domains</h1>
        <table>
          <thead>
            <tr>
              <th>Topic Domain ID</th>
              <th>Topic Domain Name</th>
            </tr>
          </thead>
          <tbody>
            {topicDomains.map(topicDomain => (
              <tr key={topicDomain.topicDomainId}>
                <td>{topicDomain.topicDomainId}</td>
                <td>{topicDomain.topicDomainName}</td>
              </tr>
            ))}
          </tbody>
        </table>
        

            */