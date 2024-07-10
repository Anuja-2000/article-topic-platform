import {
  Button,
  Container,
  Divider,
  Grid,
  Input,
  Paper,
  Typography,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import axios from "axios";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import Iconbutton from "@mui/material/IconButton";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import urls from "../../enums/url";
import { set } from "react-hook-form";
import UserDetailsDialog from "../../components/userDetailsDialog";

const chartSetting = {
  yAxis: [
    {
      label: "user count",
    },
  ],
  width: 1100,
  height: 340,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-5px, 0)",
    },
  },
};

const columns = [
  { id: "name", label: "User Name", minWidth: 135 },
  { id: "email", label: "Email", minWidth: 135 },
  { id: "savedAt", label: "Joined at", minWidth: 135 },
];

const Articlecolumns = [
  { id: "title", label: "Article Title", minWidth: 135 },
  { id: "name", label: "Author username", minWidth: 135 },
  { id: "email", label: "Author email", minWidth: 135 },
  { id: "published", label: "Published On", minWidth: 135 },
];

let popularityResData = [];
let popularityData = [];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

let domData = [0, 0];

const xLabelsUser = ["Readers", "Writers"];

let xLabelsDomain = [
  "Technical",
  "Health",
  "Science",
  "Entertainment",
  "Sports",
  "Politics",
  "Business",
];

const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Reports() {
  const [axiosConfig, setAxiosConfig] = React.useState({
    headers: {
      Authorization: "",
    },
  });

  const [writerPage, setWriterPage] = React.useState(0);
  const [rowsPerWriterPage, setRowsPerWriterPage] = React.useState(10);

  const handleChangeWriterPage = (event, newPage) => {
    setWriterPage(newPage);
  };

  const handleChangeRowsPerWriterPage = (event) => {
    setRowsPerWriterPage(+event.target.value);
    setWriterPage(0);
  };

  const [readerPage, setReaderPage] = React.useState(0);
  const [rowsPerReaderPage, setRowsPerReaderPage] = React.useState(10);

  const handleChangeReaderPage = (event, newPage) => {
    setReaderPage(newPage);
  };

  const handleChangeRowsPerReaderPage = (event) => {
    setRowsPerReaderPage(+event.target.value);
    setReaderPage(0);
  };

  const [deletedPage, setDeletedPage] = React.useState(0);
  const [rowsPerDeletedPage, setRowsPerDeletedPage] = React.useState(10);

  const handleChangeDeletedPage = (event, newPage) => {
    setDeletedPage(newPage);
  };

  const handleChangeRowsPerDeletedPage = (event) => {
    setRowsPerDeletedPage(+event.target.value);
    setDeletedPage(0);
  };

  const [articlesPage, setArticlesPage] = React.useState(0);
  const [rowsPerArticlesPage, setRowsPerArticlesPage] = React.useState(10);

  const handleChangeArticlesPage = (event, newPage) => {
    setArticlesPage(newPage);
  };

  const handleChangeRowsPerArticlesPage = (event) => {
    setRowsPerArticlesPage(+event.target.value);
    setArticlesPage(0);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeDomain = (event, newValue) => {
    console.log(newValue);
    setDomain(newValue);

    const result = axios
      .get(`${urls.BASE_URL_READER_ARTICLE}articles-by-domain/${newValue}`)
      .then((res) => {
        console.log(res.data);
        setArticles(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = React.useState("");
  const [usersCount, setUsersCount] = React.useState([0, 0]);
  const [writers, setWriters] = React.useState([]);
  const [readers, setReaders] = React.useState([]);
  const [deletedUsers, setDeletedUsers] = React.useState([]);
  const [articles, setArticles] = React.useState([]);
  const [writerSearchTerm, setWriterSearchTerm] = React.useState("");
  const [readerSearchTerm, setReaderSearchTerm] = React.useState("");
  const [domain, setDomain] = React.useState("Technical");
  const [writerCountForMonth, setWriterCountForMonth] = React.useState(0);
  const [readerCountForMonth, setReaderCountForMonth] = React.useState(0);
  const [noOfArticlesWritten, setNoOfArticlesWritten] = React.useState([]);
  const [approvalCount, setApprovalCount] = React.useState({
    approvals: 0,
    rejections: 0,
  });
  const [signupCountData, setSignupCountData] = React.useState([
    {
      Date: "2024 - Jun",
      Reader: 1,
      Writer: 5,
      Admin: 0,
    },
    {
      Date: "2024 - May",
      Reader: 14,
      Writer: 18,
      Admin: 0,
    },
  ]);
  const [domainCountData, setDomainCountData] = React.useState([
    {
      domain: "Technical",
      count: 0,
    },
    {
      domain: "Health",
      count: 0,
    }
  ]);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAxiosConfig({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }, []);

  React.useEffect(() => {
    if (axiosConfig.headers.Authorization !== "") {
      // Call your fetchData function here
      fetchData();
    }
  }, [axiosConfig]);

  async function fetchData() {
    //get users count
    const userRes = axios
      .get(`${urls.BASE_URL_USER_UTILITY}count`, axiosConfig)
      .then((res) => {
        setUsersCount(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //get all writers details
    const writerRes = axios
      .get(`${urls.BASE_URL_USER_UTILITY}get-writers`, axiosConfig)
      .then((res) => {
        setWriters(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //get all readers details
    const readerRes = axios
      .get(`${urls.BASE_URL_USER_UTILITY}get-readers`, axiosConfig)
      .then((res) => {
        setReaders(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const deletedUserRes = axios
      .get(`${urls.BASE_URL_USER}getDeleted`, axiosConfig)
      .then((res) => {
        setDeletedUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const domains = axios
      .get(`${urls.BASE_URL_READER_ARTICLE}count-by-domain`, axiosConfig)
      .then((res) => {
        let temp = [];
        let countData = [];
        let obj = {
          domain: "Technical",
          count: 0,
        }
        res.data.forEach((item) => {
          if (item.domain != null) {
            temp.push(item.domain);
            countData.push({
              domain: item.domain,
              count: item.count,
            })
          }
        });
        setDomainCountData(countData);
        xLabelsDomain = temp;
      })
      .catch((error) => {
        console.log(error);
      });

    //get writer count for the month
    const writersCountForMonth = axios
      .get(
        `${urls.BASE_URL_USER_UTILITY}get-user-count-by-month/Writer`,
        axiosConfig
      )
      .then((res) => {
        let count = res.data;
        if (count < 10) {
          count = "0" + count;
        }
        setWriterCountForMonth(count);
      })
      .catch((error) => {
        console.log(error);
      });

    //get reader count for the month
    const readersCountForMonth = axios
      .get(
        `${urls.BASE_URL_USER_UTILITY}get-user-count-by-month/Reader`,
        axiosConfig
      )
      .then((res) => {
        let count = res.data;
        if (count < 10) {
          count = "0" + count;
        }
        setReaderCountForMonth(count);
      })
      .catch((error) => {
        console.log(error);
      });

    //get all articles by domain
    const articleData = axios
      .get(
        `${urls.BASE_URL_READER_ARTICLE}articles-by-domain/${domain}`,
        axiosConfig
      )
      .then((res) => {
        setArticles(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    //get writer popularity on number of articles they have written
    const writerPopularityData = axios
      .get(`${urls.BASE_URL_FOLLOW}popular-writers`, axiosConfig)
      .then((res) => {
        popularityResData = res.data;
        popularityData = [];
        for (let user of popularityResData) {
          popularityData.push({
            label: user.userName,
            value: user.count,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    //get writers who has written the most number of articles
    const mostWritten = axios
      .get(`${urls.BASE_URL_READER_ARTICLE}writer-popularity`, axiosConfig)
      .then((res) => {
        const data = res.data;
        data.map((item) => {
          item.label = item.userData[0].name;
          item.value = item.count;
        });
        setNoOfArticlesWritten(data);
      })
      .catch((error) => {
        console.log(error);
      });

    //get approval count
    const approvalData = axios
      .get(`${urls.BASE_URL_APPROVAL}count`, axiosConfig)
      .then((res) => {
        setApprovalCount({
          ...approvalCount,
          approvals: res.data.approved,
          rejections: res.data.rejected,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    //get signup count by month
    const signupCount = axios
      .get(`${urls.BASE_URL_USER_UTILITY}get-signup-count`, axiosConfig)
      .then((res) => {
        setSignupCountData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleWriterSearch = (event) => {
    if (event.target.value === "") {
      setWriterSearchTerm(event.target.value);
      const writerRes = axios
        .get(`${urls.BASE_URL_USER_UTILITY}get-writers`, axiosConfig)
        .then((res) => {
          setWriters(res.data);
          return;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setWriterSearchTerm(event.target.value);
      console.log(writerSearchTerm);
      let type = "Writer";
      const nameResult = axios
        .get(
          `${urls.BASE_URL_USER_UTILITY}get-user-by-name/${type}/${writerSearchTerm}`
        )
        .then((res) => {
          setWriters(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleReaderSearch = (event) => {
    if (event.target.value === "") {
      setReaderSearchTerm(event.target.value);
      const result = axios
        .get(`${urls.BASE_URL_USER_UTILITY}get-writers`, axiosConfig)
        .then((res) => {
          setWriters(res.data);
          return;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setReaderSearchTerm(event.target.value);
      let type = "Reader";
      const nameResult = axios
        .get(
          `${urls.BASE_URL_USER_UTILITY}get-user-by-name/${type}/${readerSearchTerm}`,
          axiosConfig
        )
        .then((res) => {
          setReaders(res.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const openDialog = (id) => {
    setUserId(id);
    setOpen(true);
  }

  return (
    <>
      <Navbar>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Graphs" {...a11yProps(0)} />
              <Tab label="User Details" {...a11yProps(1)} />
              <Tab label="Article details" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Container maxWidth="xl">
              <Box display={"flex"}>
                <Typography
                  variant="h4"
                  marginBottom={1}
                  color={"primary.dark"}
                >
                  Graphs
                </Typography>
                {/* <Button
                  variant="outlined"
                  color="primary"
                  style={{
                    marginBottom: "8px",
                    marginLeft: "auto",
                    paddingY: "8px",
                  }}
                >
                  Download
                </Button> */}
              </Box>
              <Divider />
              <Box sx={{ display: "flex" }}>
                <Paper
                  elevation={3}
                  style={{
                    width: 300,
                    padding: "20px",
                    marginTop: "20px",
                    marginRight: "40px",
                  }}
                >
                  <Typography
                    variant="h5"
                    color={"primary.dark"}
                    gutterBottom
                    fontStyle={"bold"}
                  >
                    User Details
                  </Typography>
                  <BarChart
                    width={250}
                    height={300}
                    series={[
                      {
                        data: usersCount,
                        label: "No of users",
                        id: "pvId",
                        yAxisKey: "leftAxisId",
                      },
                    ]}
                    xAxis={[{ data: xLabelsUser, scaleType: "band" }]}
                    yAxis={[{ id: "leftAxisId" }]}
                  />
                </Paper>
                <Paper
                  elevation={3}
                  style={{
                    width: 800,
                    padding: "20px",
                    marginTop: "20px"
                  }}
                >
                  <Typography variant="h5" color={"primary.dark"} gutterBottom>
                    Domain Popularity
                  </Typography>
                  <BarChart
                    dataset={domainCountData}
                    width={800}
                    height={300}
                    xAxis={[{ scaleType: "band", dataKey: "domain", label: "Domain" }]}
                    series={[
                      { dataKey: "count", label: "Count", color: "#0080FE" },
                    ]}
                    yAxis={[{ id: "leftAxisId", label: "Count" }]}
                  />
                </Paper>
              </Box>
              <Box sx={{ display: "flex", marginTop: "30px" }}>
                <Paper
                  elevation={3}
                  style={{ height: 350, width: 600, padding: "20px" }}
                >
                  <Typography variant="h5" color={"primary.dark"}>
                    Writer Popularity
                  </Typography>
                  <Typography varient="subtitle1" color={"primary.dark"}>
                    (Based on the number of follwers)
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: popularityData,
                        innerRadius: 50,
                        outerRadius: 95,
                        paddingAngle: 4,
                        cornerRadius: 8,
                        startAngle: -180,
                        endAngle: 180,
                        cx: 125,
                        cy: 130,
                      },
                    ]}
                  />
                </Paper>

                <Paper
                  elevation={3}
                  style={{
                    height: 350,
                    width: 500,
                    padding: "20px",
                    marginLeft: "40px",
                  }}
                >
                  <Typography variant="h5" color={"primary.dark"} gutterBottom>
                    New Users for {month[new Date().getMonth()]}
                  </Typography>
                  <Box
                    display={"flex"}
                    sx={{ justifyContent: "space-evenly", marginTop: "50px" }}
                  >
                    <Paper elevation={3} sx={{ borderRadius: "10px" }}>
                      <Box padding={2} color={"primary.main"}>
                        <Typography variant="h2">
                          {writerCountForMonth}
                        </Typography>
                        <Typography variant="h4">Writers</Typography>
                      </Box>
                    </Paper>
                    <Paper elevation={3} sx={{ borderRadius: "10px" }}>
                      <Box padding={2} color={"primary.dark"}>
                        <Typography variant="h2">
                          {readerCountForMonth}
                        </Typography>
                        <Typography variant="h4">Readers</Typography>
                      </Box>
                    </Paper>
                  </Box>
                </Paper>
              </Box>
              <Box sx={{ display: "flex", marginTop: "30px" }}>
                <Paper
                  elevation={3}
                  style={{
                    height: 350,
                    width: 500,
                    padding: "20px",
                  }}
                >
                  <Typography variant="h5" color={"primary.dark"} gutterBottom>
                    No of approvals by you
                  </Typography>
                  <Box
                    display={"flex"}
                    sx={{ justifyContent: "space-evenly", marginTop: "50px" }}
                  >
                    <Paper elevation={3} sx={{ borderRadius: "10px" }}>
                      <Box padding={2} color={"primary.success"}>
                        <Typography variant="h2">
                          {approvalCount.approvals}
                        </Typography>
                        <Typography variant="h5">Approvals</Typography>
                      </Box>
                    </Paper>
                    <Paper elevation={3} sx={{ borderRadius: "10px" }}>
                      <Box padding={2} color={"primary.error"}>
                        <Typography variant="h2">
                          {approvalCount.rejections}
                        </Typography>
                        <Typography variant="h5">Rejections</Typography>
                      </Box>
                    </Paper>
                  </Box>
                </Paper>
                <Paper
                  elevation={3}
                  style={{
                    height: 350,
                    width: 600,
                    padding: "20px",
                    marginLeft: "40px",
                  }}
                >
                  <Typography variant="h5" color={"primary.dark"}>
                    Writers with most number of articles
                  </Typography>
                  <Typography varient="subtitle1" color={"primary.dark"}>
                    (Writers who has written the most number of articles)
                  </Typography>
                  <PieChart
                    series={[
                      {
                        data: noOfArticlesWritten,
                        innerRadius: 50,
                        outerRadius: 95,
                        paddingAngle: 4,
                        cornerRadius: 8,
                        startAngle: -180,
                        endAngle: 180,
                        cx: 125,
                        cy: 130,
                      },
                    ]}
                  />
                </Paper>
              </Box>
              <Box sx={{ display: "flex", marginTop: "30px" }}>
                <Paper
                  elevation={3}
                  style={{
                    height: 450,
                    width: 1140,
                    padding: "20px",
                  }}
                >
                  <Typography variant="h5" color={"primary.dark"} gutterBottom>
                    User registration count for past 12 months
                  </Typography>
                  <Box display={"flex"} sx={{ marginTop: "20px" }}>
                    <BarChart
                      dataset={signupCountData}
                      xAxis={[{ scaleType: "band", dataKey: "Date" }]}
                      series={[
                        { dataKey: "Reader", label: "Reader" },
                        { dataKey: "Writer", label: "Writer" },
                        { dataKey: "Admin", label: "Admin" },
                      ]}
                      {...chartSetting}
                    />
                  </Box>
                </Paper>
              </Box>
            </Container>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Container maxWidth="lg">
              <Typography variant="h4" marginBottom={1} color={"primary.dark"}>
                User Details
              </Typography>
              <Divider />
              <Box display="flex" justifyContent="space-between" marginY={2}>
                <Typography variant="h5" marginY={2} color={"primary.dark"}>
                  Writer Details
                </Typography>
                <FormControl sx={{ m: 1, width: "35ch" }} variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-search">
                    Search User Name
                  </InputLabel>
                  <OutlinedInput
                    id="writer-search"
                    type="text"
                    endAdornment={
                      <InputAdornment position="end">
                        <Iconbutton>
                          <SearchIcon />
                        </Iconbutton>
                      </InputAdornment>
                    }
                    label="Search"
                    value={writerSearchTerm}
                    onInputCapture={handleWriterSearch}
                  />
                </FormControl>
              </Box>
              <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={3}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              backgroundColor: "#0080FE",
                              color: "#FFFFFF",
                              fontWeight: "bold",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {writers
                        .slice(
                          writerPage * rowsPerWriterPage,
                          writerPage * rowsPerWriterPage + rowsPerWriterPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.userId}
                              onClick={() => openDialog(row.userId)}
                            >
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.email}</TableCell>
                              <TableCell>
                                {new Date(row.savedAt).toDateString()}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={writers.length}
                  rowsPerPage={rowsPerWriterPage}
                  page={writerPage}
                  onPageChange={handleChangeWriterPage}
                  onRowsPerPageChange={handleChangeRowsPerWriterPage}
                />
              </Paper>
              <Box display="flex" justifyContent="space-between" marginY={2}>
                <Typography variant="h5" marginY={2} color={"primary.dark"}>
                  Reader Details
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
                        <Iconbutton>
                          <SearchIcon />
                        </Iconbutton>
                      </InputAdornment>
                    }
                    label="Search"
                    onChange={handleReaderSearch}
                    value={readerSearchTerm}
                  />
                </FormControl>
              </Box>
              <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={3}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              backgroundColor: "#0080FE",
                              color: "#FFFFFF",
                              fontWeight: "bold",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {readers
                        .slice(
                          readerPage * rowsPerReaderPage,
                          readerPage * rowsPerReaderPage + rowsPerReaderPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.userId}
                              onClick={() => openDialog(row.userId)}
                            >
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.email}</TableCell>
                              <TableCell>
                                {new Date(row.savedAt).toDateString()}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={readers.length}
                  rowsPerPage={rowsPerReaderPage}
                  page={readerPage}
                  onPageChange={handleChangeReaderPage}
                  onRowsPerPageChange={handleChangeRowsPerReaderPage}
                />
              </Paper>
              <Box display="flex" justifyContent="space-between" marginY={2}>
                <Typography variant="h5" marginY={2} color={"primary.dark"}>
                  Deleted users
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
                        <Iconbutton>
                          <SearchIcon />
                        </Iconbutton>
                      </InputAdornment>
                    }
                    label="Search"
                    onChange={handleReaderSearch}
                    value={readerSearchTerm}
                  />
                </FormControl>
              </Box>
              <Paper sx={{ width: "100%", overflow: "hidden" }} elevation={3}>
                <TableContainer sx={{ maxHeight: 440 }}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              minWidth: column.minWidth,
                              backgroundColor: "#0080FE",
                              color: "#FFFFFF",
                              fontWeight: "bold",
                            }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {deletedUsers
                        .slice(
                          deletedPage * rowsPerDeletedPage,
                          deletedPage * rowsPerDeletedPage + rowsPerDeletedPage
                        )
                        .map((row) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.userId}
                              onClick={() => openDialog(row.userId)}
                            >
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.email}</TableCell>
                              <TableCell>
                                {new Date(row.savedAt).toDateString()}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 100]}
                  component="div"
                  count={deletedUsers.length}
                  rowsPerPage={rowsPerDeletedPage}
                  page={deletedPage}
                  onPageChange={handleChangeDeletedPage}
                  onRowsPerPageChange={handleChangeRowsPerDeletedPage}
                />
              </Paper>
            </Container>
            <UserDetailsDialog userId={userId} open={open} onClose={() => setOpen(false)} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Container maxWidth="lg">
              <Typography variant="h4" marginBottom={1} color={"primary.dark"}>
                Article Details
              </Typography>
              <Divider />
              <Paper
                elevation={3}
                style={{ padding: "20px", marginTop: "20px" }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container>
                    <Grid item xs={8}>
                      <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={xLabelsDomain}
                        sx={{ width: 300, marginTop: 3 }}
                        renderInput={(params) => (
                          <TextField {...params} label="Select Domain" />
                        )}
                        value={domain}
                        onChange={handleChangeDomain}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Paper elevation={3} sx={{ borderRadius: "10px" }}>
                        <Box padding={2} color={"primary.main"} display="flex">
                          <Typography variant="h2">
                            {articles.length}
                          </Typography>
                          <Box sx={{ marginLeft: "2rem" }}>
                            <Typography variant="h4">{articles.length === 1? 'Article':'Articles'}</Typography>
                            <Typography variant="h6">Created</Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <TableContainer sx={{ maxHeight: 440, marginTop: 2 }}>
                        <Table stickyHeader aria-label="sticky table">
                          <TableHead>
                            <TableRow>
                              {Articlecolumns.map((column) => (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  style={{
                                    minWidth: column.minWidth,
                                    backgroundColor: "#0080FE",
                                    color: "#FFFFFF",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {column.label}
                                </TableCell>
                              ))}
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {articles
                              .slice(
                                articlesPage * rowsPerArticlesPage,
                                articlesPage * rowsPerArticlesPage +
                                rowsPerArticlesPage
                              )
                              .map((row) => {
                                return (
                                  <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={row._id}
                                  >
                                    <TableCell>{row.title}</TableCell>
                                    <TableCell>
                                      {row.userData[0].name}
                                    </TableCell>
                                    <TableCell>
                                      {row.userData[0].email}
                                    </TableCell>
                                    <TableCell>
                                      {new Date(row.updatedAt).toDateString()}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                      <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={articles.length}
                        rowsPerPage={rowsPerArticlesPage}
                        page={articlesPage}
                        onPageChange={handleChangeArticlesPage}
                        onRowsPerPageChange={handleChangeRowsPerArticlesPage}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Container>
          </CustomTabPanel>
        </Box>
      </Navbar>
    </>
  );
}
export default Reports;
