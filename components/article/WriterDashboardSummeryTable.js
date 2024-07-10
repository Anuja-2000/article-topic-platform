import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// Columns for the table
const columns = [
  { id: 'title', label: 'Article Name', minWidth: 170 },
  { id: 'domain', label: 'Article Domain', minWidth: 170 },
  { id: 'createdDate', label: 'Created Date', minWidth: 170, align: 'right' },
  { id: 'createdTime', label: 'Created Time', minWidth: 170, align: 'right' },
  { id: 'status', label: 'Status', minWidth: 170, align: 'right' },
];

const WriterDashboardSummeryTable = ({ articles }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <TableContainer component={Paper} sx={{ width: '80%', margin: 'auto', overflowX: 'auto' }}>
      <Table stickyHeader aria-label="customized table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {articles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((article) => (
            <StyledTableRow hover role="checkbox" tabIndex={-1} key={article._id}>
              {columns.map((column) => {
                const value = column.id === 'createdDate'
                  ? new Date(article['createdAt']).toLocaleDateString()
                  : column.id === 'createdTime'
                    ? new Date(article['createdAt']).toLocaleTimeString()
                    : article[column.id];
                return (
                  <StyledTableCell key={column.id} align={column.align}>
                    {value}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={articles.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default WriterDashboardSummeryTable;
