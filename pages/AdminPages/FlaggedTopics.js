
import * as React from 'react';
import { useState } from 'react';
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
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


function createData(id, name) {
  return { id, name };
}

//Flagged Topics
export default function FlaggedTopics() {
  const [rows, setRows] = useState([
    
    createData(1, '1st flagged topic'),
    createData(2, '2nd flagged topic'),
    createData(3, '3rd flagged topic'),
    createData(4, '4th flagged topic'),
    createData(5, '5th flagged topic'),
    createData(6, 'Third flagged topic'),
    createData(7, 'First flagged topic'),
    createData(8, 'Second flagged topic'),
    createData(9, 'Third flagged topic'),
    createData(10, 'First flagged topic'),
    createData(11, 'Second flagged topic'),
    createData(12, 'Third flagged topic'),

  ]);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [showClearAlert, setClearAlert] = React.useState(false);
  const [deletedRowId, setDeletedRowId] = useState(null);
  const [showKeepAlert, setKeepAlert] = React.useState(false);
  const [keepRowId, setKeepRowId] = useState(null);


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



  const handleClearButtonClick = (id) => {
    const newRows = rows.filter(row => row.id !== id);
    setRows(newRows);
    const deletedRowId = id; // Define deletedRowId here

    //console.log('deletedRowId:', deletedRowId); // log the deletedRowId state
    setDeletedRowId(deletedRowId); // set the deletedRowId state
    setClearAlert(true); // set the showClearAlert state to true

    //console.log('showClearAlert:', showClearAlert);

  };
  const handleKeepButtonClick = (id) => {
    const newRows = rows.filter(row => row.id !== id);
    setRows(newRows);
    const keepRowId = id; // Define keepRowId here

  
    setKeepRowId(keepRowId); // set the keepRowId state
    setKeepAlert(true); // set the keepClearAlert state to true

    console.log('showKeepAlert:', showKeepAlert);

  };


  return (
    
    <div>
      <Navbar />
     
      <TablePaginationActions/>
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
      
        {showClearAlert && deletedRowId !== null && (
          <Alert severity="success" onClose={() => setClearAlert(false)}>
            <AlertTitle>Success</AlertTitle>
            Row {deletedRowId} deleted successfully.
          </Alert>
        )}
        {showKeepAlert && keepRowId !== null && (
          <Alert severity="success" onClose={() => setKeepAlert(false)}>
            <AlertTitle>Success</AlertTitle>
            Row {keepRowId} keep successfully.
          </Alert>
        )}
          
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="custom pagination table">
            <TableHead >

              <TableRow sx={{ backgroundColor: '#0e0e42',fontWeight: 700 }}>
                <TableCell sx={{ fontSize: '1rem', color: 'white' }}>Topic Id</TableCell>
                <TableCell sx={{ fontSize: '1rem', color: 'white' }}>Topic</TableCell>
                <TableCell sx={{ fontSize: '1rem', color: 'white' }}>Remove Topic</TableCell>
                <TableCell sx={{ fontSize: '1rem', color: 'white' }}>Keep Topic</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell style={{ width: 250 }} >
                    {row.name}
                  </TableCell>
                  <TableCell>

                    <Button variant="contained" color="primary" onClick={() => handleClearButtonClick(row.id)}>
                      Clear
                    </Button>


                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleKeepButtonClick(row.id)} >
                      Keep
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
