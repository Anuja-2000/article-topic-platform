import { Button, Container, Typography } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import NavBar from "../../components/Navbar";
import axios from "axios";
import Divider from "@mui/material/Divider";

// export async function getStaticProps() {
//   const messages = await GetContactUsMessages();
//   return { props: { messages } };
// }

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
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
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

export default function UserRoles() {
  const [admins, setAdmins] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    const response = axios
      .get("http://localhost:3001/api/user/getAll", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        const filteredAdmins = res.data.filter((user) => user.type === "Admin");
        const otherUsers = res.data.filter((user) => user.type != "Admin");
        setUsers(otherUsers);
        setAdmins(filteredAdmins);
        console.log(admins);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [adminPage, setAdminPage] = React.useState(0);
  const [adminRowsPerPage, setAdminRowsPerPage] = React.useState(5);

  const [userPage, setUserPage] = React.useState(0);
  const [userRowsPerPage, setUserRowsPerPage] = React.useState(5);

//   function sort_by_key(array, key) {
//     return array.sort(function (a, b) {
//       var x = a[key];
//       var y = b[key];
//       return x > y ? -1 : x < y ? 1 : 0;
//     });
//   }



  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    adminPage > 0 ? Math.max(0, (1 + adminPage) * adminRowsPerPage - admins.length) : 0;

  const handleChangeAdminPage = (event, newPage) => {
    setAdminPage(newPage);
  };

  const handleChangeAdminRowsPerPage = (event) => {
    setAdminRowsPerPage(parseInt(event.target.value, 10));
    setAdminPage(0);
  };

  const handleChangeUserPage = (event, newPage) => {
    setUserPage(newPage);
  };

  const handleChangeUserRowsPerPage = (event) => {
    setUserRowsPerPage(parseInt(event.target.value, 10));
    setUserPage(0);
  };

  return (
    <div>
      <NavBar>
        <Container maxWidth="lg">
          <Typography variant="h4" marginBottom={2} color={"primary.dark"}>
            Assign User Roles
          </Typography>
          <Divider />
          <Typography variant="h5" marginY={3} color={"primary.dark"}>
            Administators
          </Typography>
          <Divider />
          <TableContainer component={Paper} elevation={4}>
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#0080FE",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "1rem",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#0080FE",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "1rem",
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#0080FE",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "1rem",
                    }}
                  >
                    User Type
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(adminRowsPerPage > 0
                  ? admins.slice(
                    adminPage * adminRowsPerPage,
                    adminPage * adminRowsPerPage + adminRowsPerPage
                    )
                  : admins
                ).map((admin) => (
                  <TableRow
                    key={admin.userId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{admin.name}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>
                        <Button variant="contained" color="primary">
                            Admin
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25
                    ]}
                    count={admins.length}
                    rowsPerPage={adminRowsPerPage}
                    page={adminPage}
                    onPageChange={handleChangeAdminPage}
                    onRowsPerPageChange={handleChangeAdminRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          <Box marginTop={5}>
          <Typography variant="h5" marginY={3} color={"primary.dark"}>
            Other Users
          </Typography>
          <TableContainer component={Paper} elevation={4} marginY={3}>
            <Table
              sx={{ minWidth: 650 }}
              stickyHeader
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      backgroundColor: "#0080FE",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "1rem",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#0080FE",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "1rem",
                    }}
                  >
                    Email
                  </TableCell>
                  <TableCell
                    sx={{
                      backgroundColor: "#0080FE",
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: "1rem",
                    }}
                  >
                    User Type
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(userRowsPerPage > 0
                  ? users.slice(
                    userPage * userRowsPerPage,
                    userPage * userRowsPerPage + userRowsPerPage
                    )
                  : users
                ).map((user) => (
                  <TableRow
                    key={user.userId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                        <Button variant="contained" color="primary">
                            {user.type}
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25
                    ]}
                    count={users.length}
                    rowsPerPage={userRowsPerPage}
                    page={userPage}
                    onPageChange={handleChangeUserPage}
                    onRowsPerPageChange={handleChangeUserRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
          </Box>
        </Container>
      </NavBar>
    </div>
  );
}
