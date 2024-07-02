import Navbar from "../../../components/Navbar";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import { Container, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import axios from "axios";
import urls from "../../../enums/url";
import { set } from "react-hook-form";
import Skeleton from "@mui/material/Skeleton";
import { Suspense } from "react";
import Loading from "./loading";
import Button  from "@mui/material/Button";


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

export default function ApproveArticles() {
  const [value, setValue] = React.useState(0);

  const [articles, setArticles] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [approvals, setApprovals] = React.useState([]);
  const [approvalPage, setApprovalPage] = React.useState(0);
  const [rowsPerApprovalPage, setRowsPerApprovalPage] = React.useState(10);
  const [articleDomain, setArticleDomain] = React.useState({
    domainId: "",
    domainName: "",
    domainDescription: "",
  });
  const [domains, setDomains] = React.useState([]);

  const [isClient, setIsClient] = React.useState(false)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangeApprovalPage = (event, newPage) => {
    setApprovalPage(newPage);
  };

  const handleChangeRowsPerApprovalPage = (event) => {
    setRowsPerApprovalPage(+event.target.value);
    setApprovalPage(0);
  };

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  React.useEffect(() => {
    const data = axios
      .get(`${urls.BASE_URL_ARTICLE}pending`)
      .then((response) => {
        setArticles(response.data.articles);
      })
      .catch((error) => {
        console.log(error);
      });

    const approvalData = axios
      .get(`${urls.BASE_URL_APPROVAL}history`)
      .then((response) => {
        setApprovals(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const domains = axios.get(`${urls.BASE_URL_ARTICLE_DOMAINS}`).then((response) => {
      setDomains(response.data);
    }).catch((error) => {
      console.log(error);
    });

  }, []);

  return (
    <div>
      <Navbar>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }} marginBottom={1}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Pending Approvals" {...a11yProps(0)} />
            <Tab label="Approval History" {...a11yProps(1)} />
            <Tab label="Article Domains" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Container maxWidth="lg">
            <Typography variant="h4" marginBottom={2} color={"primary.main"}>
              Approve Articles
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "1.1rem", color: "white" }}>
                      Title
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.1rem", color: "white" }}>
                      Writer
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.1rem", color: "white" }}>
                      Date
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: "1.1rem", color: "white" }}
                    >
                      View & Approve
                    </TableCell>
                  </TableRow>
                </TableHead>
                {articles.length != 0 ? (
                  <TableBody suppressHydrationWarning>
                    {articles
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((article) => (
                        <TableRow
                          key={article.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {article.title}
                          </TableCell>
                          <TableCell>{article.userData[0].name}</TableCell>
                          <TableCell>
                            {new Date(article.updatedAt).toDateString()}
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label="View"
                              component="a"
                              href={"reviewArticle/" + article.articleId}
                              color="primary"
                              clickable
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                ) : (
                  <Loading />
                )}
                {/* <Suspense fallback={<Loading />}>
                  <TableBody>
                    {articles
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((article) => (
                        <TableRow
                          key={article.id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {article.title}
                          </TableCell>
                          <TableCell>{article.userData[0].name}</TableCell>
                          <TableCell>
                            {new Date(article.updatedAt).toDateString()}
                          </TableCell>
                          <TableCell align="center">
                            <Chip
                              label="View"
                              component="a"
                              href={"reviewArticle/" + article.articleId}
                              color="primary"
                              clickable
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Suspense> */}
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
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Container maxWidth="lg">
            <Typography variant="h4" marginBottom={2} color={"primary.main"}>
              Approval History
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "1.1rem", color: "white" }}>
                      Article Title
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.1rem", color: "white" }}>
                      Writer
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.1rem", color: "white" }}>
                      Approved By
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.1rem", color: "white" }}>
                      Status
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ fontSize: "1.1rem", color: "white" }}
                    >
                      Approved Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {approvals
                    .slice(
                      approvalPage * rowsPerApprovalPage,
                      approvalPage * rowsPerApprovalPage + rowsPerApprovalPage
                    )
                    .map((approval) => (
                      <TableRow
                        key={approval.articleId}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {approval.article.title}
                        </TableCell>
                        <TableCell>{approval.writer.name}</TableCell>
                        <TableCell>{approval.admin.name}</TableCell>
                        <TableCell>
                          <Chip
                            label={approval.status}
                            color={
                              approval.status === "approved"
                                ? "success"
                                : "error"
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          {new Date(approval.approvedAt).toDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={approvals.length}
              rowsPerPage={rowsPerApprovalPage}
              page={approvalPage}
              onPageChange={handleChangeApprovalPage}
              onRowsPerPageChange={handleChangeRowsPerApprovalPage}
            />
          </Container>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Container maxWidth="lg">
            <Box marginBottom={2} justifyContent={"space-between"} display={'flex'}>
            <Typography variant="h4" marginBottom={2} color={"primary.main"}>
              Article Domains
            </Typography>
            <Button variant="contained" color="primary" sx={{height:'3rem'}}>
              Add Domain
            </Button>
              </Box>            
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "1.1rem", color: "white" }}>
                      Domain
                    </TableCell>
                    <TableCell sx={{ fontSize: "1.1rem", color: "white" }}>
                      Description
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {domains.map((domain) => (
                    <TableRow
                      key={domain.domainId}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {domain.domainName}
                      </TableCell>
                      <TableCell>{domain.domainDescription}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </CustomTabPanel>
      </Navbar>
    </div>
  );
}
