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
import Chip from "@mui/material/Chip";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

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
  const [otherUsers, setOtherUsers] = React.useState([]);
  const [userSearchTerm, setUserSearchTerm] = React.useState(" ");

  React.useEffect(() => {
    const response = axios
      .get("http://localhost:3001/api/user/getAll")
      .then((res) => {
        console.log(res.data);
        const filteredAdmins = res.data.filter((user) => user.type === "Admin");
        let others = res.data.filter((user) => user.type != "Admin");
        setOtherUsers(others);
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

  const handleUserSearch = (event) => {
    if (event.target.value === "") {
      setUserSearchTerm(event.target.value);
      const result = axios
        .get("http://localhost:3001/api/user-util/get-others")
        .then((res) => {
          setOtherUsers(res.data);
          console.log(res.data);
          return;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setUserSearchTerm(event.target.value);
      let type = "Reader";
      const nameResult = axios
        .get(`http://localhost:3001/api/user-util/search/${userSearchTerm}`)
        .then((res) => {
          setOtherUsers(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
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
                    <Chip
                          label={admin.type}
                          color="primary"
                        />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
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
            <Box display="flex" justifyContent="space-between" marginY={2}>
              <Typography variant="h5" marginY={3} color={"primary.dark"}>
                Other Users
              </Typography>
              <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-search">
                  Search User Name
                </InputLabel>
                <OutlinedInput
                  id="reader-search"
                  type="text"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton>
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Search"
                  onChange={handleUserSearch}
                  value={userSearchTerm}
                />
              </FormControl>
            </Box>
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
                    <TableCell
                      sx={{
                        backgroundColor: "#0080FE",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: "1rem",
                      }}
                    >
                      Assign Role
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(userRowsPerPage > 0
                    ? otherUsers.slice(
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
                        <Chip
                          label={user.type}
                          color={user.type === "Writer" ? "primary" : "success"}
                        />
                      </TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary">
                          Assign
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 25]}
                      count={otherUsers.length}
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
