import React from 'react';
import Navbar from '../../components/Navbar';
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
  const response = await fetch('https://vrscop1u3m.execute-api.us-east-1.amazonaws.com/templatesProject/templates');
  const data = await response.json();
  return {
    props: { templates: data.templates }
  };
};
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

function EditTemplates({ templates }) {
  const sortedTemplates = templates.sort((a, b) =>
    a.templateId.localeCompare(b.templateId)
  );
  console.log(sortedTemplates);
  console.log(templates);

  const rows = templates;

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


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

  return (
    <div >
      <Box sx={{ backgroundColor: '#e6e6ee' }}>
      <Navbar />
     
      <Box
        sx={{
          padding: '20px',
          marginTop: '2px',
          marginLeft: '300px',
          marginRight: '260px',
          marginTop:"64px",
          backgroundColor: '#242444',
          color: 'white',
        }}
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="Topic-Domain-Table">
            <TableHead >
              <TableRow sx={{ backgroundColor: '#b3b3b3' }}>
                <TableCell sx={{ fontSize: '1.1rem', color: 'white' }}>Template Id</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', color: 'white' }}>Template</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', color: 'white' }}>Edit</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
              ).map(row => (
                <TableRow key={row.templateId}>
                  <TableCell component="th" scope="row">{row.templateId}</TableCell>
                  <TableCell style={{ width: 260 }} >
                    {row.templateContent}
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" >
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
      </Box>
    </div>
  );
};

export default EditTemplates;



{/*
import Navbar from '../../../components/Navbar';
import TopTab from '../../../components/TopTab';
import TablePaginationActions from '../../../components/TablePaginationActions';

import * as React from 'react';
import { useState } from 'react';

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




function createData(id, name) {
  return { id, name };
}

const rows = [
  createData(1, 'Article Type 1'),
  createData(2, 'Article Type 2'),
  createData(3, 'Article Type 3'),
  createData(4, 'Article Type 4'),
  createData(5, 'Article Type 5'),
  createData(6, 'Article Type 6'),
  createData(7, 'Article Type 7'),
  createData(8, 'Article Type 8'),
]



function EditArticleTypes() {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [articleType, setArticleType] = React.useState('');


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
    const row = rows.find((r) => r.id === id);

    // Set the initial value of the text field
    setArticleType(row.name);

    // Open the dialog
    setOpenDialog(true);
  };

  return (
    <div >

      <Navbar />

 
      <TablePaginationActions/>
      <TopTab />
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
          <DialogTitle>Edit Article Type</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Article Type"
              fullWidth
              value={articleType}
              onChange={(e) => setArticleType(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={() => {
              // Save the updated value of the article type and i have to code this further
              // and close the dialog
              setOpenDialog(false);
            }} color="primary">
             Update
            </Button>
          </DialogActions>
        </Dialog>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 600 }} aria-label="custom pagination table">
            <TableHead >

              <TableRow sx={{ backgroundColor: '#b3b3b3' }}>
                <TableCell sx={{ fontSize: '1.1rem', color: 'white' }}>Article Type Id</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', color: 'white' }}>Article Type</TableCell>
                <TableCell sx={{ fontSize: '1.1rem', color: 'white' }}>Edit</TableCell>
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
export default EditArticleTypes;
*/}




/*
import Navbar from '../../components/Navbar';
import React, { useState } from 'react';
import AWS from 'aws-sdk'; // import AWS SDK

import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import  ListItem  from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

AWS.config.update({
  region: 'your-region',
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

const StyledButton = styled(Button)({
  textTransform: 'none', // set textTransform to none to prevent auto-uppercase
});

function EditTemplates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  async function handleSearch(event) {
    event.preventDefault();

    const params = {
      TableName: 'topic-template',
      KeyConditionExpression: 'searchKey = :searchTerm',
      ExpressionAttributeValues: {
        ':searchTerm': searchTerm
      }
    };

    try {
      const { Items } = await dynamodb.query(params).promise();
      setResults(Items);
    } catch (error) {
      console.error(error);
      // handle error
    }
  }

  return (
    <>
      <Navbar />
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
}}>
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '500px',
      // bgcolor: 'rgba(192, 192, 192, 0.6)', //red, green, and blue values, and the fourth parameter (0.5) is the alpha value.
      flexDirection: 'column'
    }}
  >
    <TextField
      label="Search Term"
      variant="outlined"
      placeholder="Search"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />

    <Box sx={{ my: 2 }} />
    <StyledButton variant="contained" color="secondary" onClick={handleSearch}>
      Search
    </StyledButton>
  </Box>

  {results.length > 0 && (
    <List>
      {results.map((item) => (
        <ListItem key={item.id}>
          <ListItemText primary={item.name} secondary={item.description} />
        </ListItem>
      ))}
    </List>
  )}
</Box>
</>
);
}

export default EditTemplates;
*/