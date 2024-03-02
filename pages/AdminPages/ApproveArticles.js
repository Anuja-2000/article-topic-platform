import Navbar from '../../components/Navbar';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import { Container } from '@mui/material';
import axios from 'axios';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];



export default function ApproveArticles() {

    const [articles, setArticles] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    React.useEffect(() => {
        const data = axios.get('http://localhost:3001/api/readerArticle/getAll').then((response) => {
            setArticles(response.data);
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div>
            <Navbar>
                <Container maxWidth="lg">
                    <h1>Approve Articles</h1>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Writer</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell align='center'>View & Approve</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {articles
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((article) => (
                                        <TableRow
                                            key={article.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {article.title}
                                            </TableCell>
                                            <TableCell>{article.writer}</TableCell>
                                            <TableCell>{new Date(article.date).toDateString()}</TableCell>
                                            <TableCell align='center'>
                                                <Chip label="View" component="a" href="#basic-chip" color='primary' clickable />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={articles.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Container>
            </Navbar>
        </div>
    );
}